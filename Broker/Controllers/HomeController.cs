using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Broker.Models;
using Broker.DAL;
using Microsoft.EntityFrameworkCore;
using Broker.Util;
using Microsoft.AspNetCore.Hosting;

namespace Broker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _env;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        //public HtmlResult Index()
        //{
        //    return new HtmlResult("<div id=\"app\"></div>", _env);
        //}

        public IActionResult Index()
        {
            return View();
        }


        [Route("api/Get/Hello")]
        public JsonResult GetHello()
        {
            return Json("Hello");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
