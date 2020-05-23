using Broker.DAL;
using Broker.Models;
using Broker.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text.Json;

namespace Broker.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }






        [HttpGet]
        public IActionResult GetUser(int id)
        {
            var user = new User();
            using(var db = new BrokerContext())
            {
                user = db.Users.FirstOrDefault(x => x.Id == id);
            }
            if(user != null)
            {
                string json = JsonSerializer.Serialize<User>(user);
                return Ok(json);
            }
            return BadRequest();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                using (var _context = new BrokerContext())
                {
                    User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                    if (user == null)
                    {
                        // добавляем пользователя в бд
                        user = new User { Email = model.Email, Password = model.Password, FirstName = model.FirstName, SecondName = model.SecondName, Balance = 0 };
                        Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
                        if (userRole != null)
                            user.Role = userRole;

                        _context.Users.Add(user);
                        await _context.SaveChangesAsync();

                        Response.Cookies.Append("idUser", user.Id.ToString());
                        Response.Cookies.Append("login", user.Email);
                        Response.Cookies.Append("role", user.Role.Name);

                        return Ok("True Registry");
                    }
                    else
                        return Ok("Такой пользователь уже есть");
                }
            }
            return BadRequest();
        }


        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                using (var _context = new BrokerContext())
                {
                    User user = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                    if (user != null)
                    {
                        Response.Cookies.Append("idUser", user.Id.ToString());
                        Response.Cookies.Append("login", user.Email);
                        Response.Cookies.Append("role", user.Role.Name);
                        return Ok("true");
                    }
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> SetBalance(int IdUser, double Balance)
        {
            if (ModelState.IsValid)
            {
                using (var _context = new BrokerContext())
                {
                    User user = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Id == IdUser);
                    if (user != null && Balance > 0)
                    {
                        user.Balance += Balance;
                        _context.Users.Update(user);
                        _context.SaveChanges();
                        return Ok("true");
                    }
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetPortfolio(int IdUser)
        {
            if(IdUser != 0)
            {
                var portfolioUser = new List<PortfolioUser>();
                using (var db = new BrokerContext())
                {
                    var portfolio = db.Portfolios.FirstOrDefault(x => x.UserId == IdUser);
                    if(portfolio != null)
                    {
                       
                        var sharesPortfolio = db.PortfolioShares.Where(x => x.PortfolioId == portfolio.Id).Include(x => x.Share).ToList();
                        foreach(var item in sharesPortfolio)
                        {
                            var portf = new PortfolioUser();
                            var share = db.Shares.FirstOrDefault(x => x.Id == item.ShareId);
                            portf.Id = item.Id;
                            portf.CompanyName = item.Share.CompanyName;
                            portf.ShareId = item.Share.Id;
                            portf.Profitability = share.CurrentPrice - item.BuyPrice;
                            portf.ImgSrc = share.ImgSrc;
                            portfolioUser.Add(portf);
                        }
                    }
                    
                }
                if (portfolioUser.Count > 0)
                {
                    return Ok(portfolioUser);
                }
                else
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult SaleShare(int IdSharePortfolio)
        {
            if(IdSharePortfolio != 0)
            {
                string comment = "";
                var user = new User();
                using (var db = new BrokerContext())
                {
                    var portfolioShare = db.PortfolioShares.FirstOrDefault(x => x.Id == IdSharePortfolio);
                    var share = db.Shares.FirstOrDefault(X => X.Id == portfolioShare.ShareId);
                    var portfolio = db.Portfolios.FirstOrDefault(x => x.Id == portfolioShare.PortfolioId);
                    user = db.Users.FirstOrDefault(x => x.Id == portfolio.UserId);
                    user.Balance += share.CurrentPrice;
                    db.PortfolioShares.Remove(portfolioShare);
                    db.Users.Update(user);
                    db.SaveChanges();
                }
                return Ok(user.Balance);
            }
            else
            {
                return BadRequest();
            }
        }

        //[HttpPost]
        ////[ValidateAntiForgeryToken]
        //public async Task<ActionResult> Register(RegisterModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        using (var _context = new BrokerContext())
        //        {
        //            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        //            if (user == null)
        //            {
        //                // добавляем пользователя в бд
        //                user = new User { Email = model.Email, Password = model.Password, FirstName = model.FirstName, SecondName = model.SecondName, Balance = 0 };
        //                Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
        //                if (userRole != null)
        //                    user.Role = userRole;

        //                _context.Users.Add(user);
        //                await _context.SaveChangesAsync();

        //                await Authenticate(user); // аутентификация

        //                return RedirectToAction("Index", "Home");
        //            }
        //            else
        //                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
        //        }
        //    }
        //    return BadRequest(model);
        //}


        //[HttpPost]
        //public async Task<IActionResult> Login(LoginModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        using (var _context = new BrokerContext())
        //        {
        //            User user = await _context.Users
        //            .Include(u => u.Role)
        //            .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
        //            if (user != null)
        //            {
        //                await Authenticate(user); // аутентификация

        //                return RedirectToAction("Index", "Home");
        //            }
        //            ModelState.AddModelError("", "Некорректные логин и(или) пароль");
        //        }
        //    }
        //    return BadRequest(model);
        //}

        //private async Task Authenticate(User user)
        //{
        //    // создаем один claim
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
        //        new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
        //    };
        //    // создаем объект ClaimsIdentity
        //    ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
        //        ClaimsIdentity.DefaultRoleClaimType);
        //    // установка аутентификационных куки
        //    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        //}

    }
}
