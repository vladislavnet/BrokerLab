using Broker.DAL;
using Broker.Models;
using Broker.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Broker.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ShareController : Controller
    {
        private readonly ILogger<ShareController> _logger;

        public ShareController(ILogger<ShareController> logger)
        {
            _logger = logger;
        }


        public ActionResult AddShare()
        {
            var share = new Share();
            using(var db = new BrokerContext())
            {
                share.Countries = new SelectList(db.Countries.ToList(),"Id","Name");
            }
            return View(share);
        }

        [HttpPost]
        public IActionResult AddShare(int CountryId, double CurrentPrice,  string ImgSrc, string CompanyName)
        {
            using(var db = new BrokerContext())
            {
                var share = new Share();
                share.CompanyName = CompanyName;
                share.ImgSrc = ImgSrc;
                share.Country = db.Countries.FirstOrDefault(x => x.Id == CountryId);
                share.CurrentPrice = CurrentPrice;
                db.Shares.Add(share);
                db.SaveChanges();
                var idShare = db.Shares.FirstOrDefault(x => x.CompanyName == share.CompanyName).Id;
                var historyPrice = new HistoryPriceShare() {DateHistory = DateTime.Now, Price = share.CurrentPrice, ShareId = idShare };
                db.HistoryPriceShares.Add(historyPrice);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult EditShare(int Id, int CountryId, double CurrentPrice, string ImgSrc, string CompanyName)
        {
            string comment = "";
            using (var db = new BrokerContext())
            {
                var share = db.Shares.FirstOrDefault(x => x.Id == Id);
                if(share != null)
                {
                    if (share.CurrentPrice != CurrentPrice)
                    {
                        var historyPrice = new HistoryPriceShare() { Price = share.CurrentPrice, DateHistory = DateTime.Now, ShareId = share.Id };
                        db.HistoryPriceShares.Add(historyPrice);
                        db.SaveChanges();
                    }
                    share.CompanyName = CompanyName;
                    share.CurrentPrice = CurrentPrice;
                    share.ImgSrc = ImgSrc;
                    share.Country = db.Countries.FirstOrDefault(x => x.Id == CountryId);
                    db.Shares.Update(share);
                    db.SaveChanges();
                    comment = "Изменения, добавлены успешно";
                }
                else
                {
                    comment = "Произошла ошибка, возможно акция уже удалена";
                }
            }
            return Ok(comment);
        }
        
        [HttpDelete]
        public IActionResult DeleteShare(int Id)
        {
            string comment = "";
            using (var db = new BrokerContext())
            {
                var share = db.Shares.FirstOrDefault(x => x.Id == Id);
                if(share != null)
                {
                    db.Shares.Remove(share);
                    db.SaveChanges();
                    comment = "Удаление произошло успешно";
                }
                else
                {
                    comment = "Произошла ошибка, возможно акция уже удалена";
                }
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult PayShare(int ShareId, int UserId)
        {
            if(ShareId == 0 || UserId == 0)
            {
                return BadRequest();
            }
            var comment = "";
            using (var db = new BrokerContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == UserId);
                var share = db.Shares.FirstOrDefault(x => x.Id == ShareId);
                var portfolio = db.Portfolios.FirstOrDefault(x => x.UserId == UserId);
                if(user != null)
                {
                    if(portfolio == null)
                    {
                        var newPortfolio = new Portfolio() { UserId = user.Id };
                        db.Portfolios.Add(newPortfolio);
                        db.SaveChanges();
                        portfolio = db.Portfolios.FirstOrDefault(x => x.UserId == user.Id);
                    }
                    if(user.Balance < share.CurrentPrice)
                    {
                        comment = "Недостаточно средств";
                    }
                    else
                    {
                        user.Balance -= share.CurrentPrice;
                        var shareAndPortfolio = new PortfolioShare() { BuyPrice = share.CurrentPrice, PortfolioId = portfolio.Id, ShareId = share.Id };
                        db.Users.Update(user);
                        db.PortfolioShares.Add(shareAndPortfolio);
                        db.SaveChanges();
                        comment = $"Операция прошла успешна. Ваш текущий баланс {user.Balance}";
                    }
                }
                else
                {
                    comment = "Произошла ошибка данный пользователь не найден!!!";
                }
            }
            return Ok(comment);
        }

        [HttpGet]
        public IActionResult GetShare(int? id)
        {
            var share = new Share();
            using(var db = new BrokerContext())
            {
                share = db.Shares.Include(x => x.Country).FirstOrDefault(x => x.Id == id);
            }
            if (share != null)
            {
                string json = JsonSerializer.Serialize(share);
                return Ok(json);
            }
            return BadRequest();
        }


        //Return
        [HttpGet]
        public IActionResult GetHistoryPeiceShare(int? id)
        {
            var historyPrice = new List<HistoryPriceShare>();
            using (var db = new BrokerContext())
            {
                historyPrice = db.HistoryPriceShares.Where(x=>x.ShareId == id).ToList();
            }
            string json = JsonSerializer.Serialize(historyPrice);
            return Ok(historyPrice);          
        }

        [HttpGet]
        public JsonResult GetShares()
        {
            var Shares = new List<Share>();
            var sharesViewModels = new List<ShareViewModels>();
            using (var db = new BrokerContext())
            {
                //var role1 = new Role() { Name = "Admin" };
                //db.Roles.Add(role1);
                //db.SaveChanges();
                Shares = db.Shares.Include(x => x.Country).Include(x => x.HistoryPriceShares).ToList();
                sharesViewModels = Shares.Select(x => new ShareViewModels()
                {
                    Id = x.Id,
                    Name = x.CompanyName,
                    Price = x.CurrentPrice,
                    ImgSrc = x.ImgSrc
                }).ToList();
            }
           
            return Json(sharesViewModels);
        }
    }
}
