using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Util
{
    public class HtmlResult : IActionResult
    {
        string htmlCode;
        private readonly IWebHostEnvironment _env;
        public HtmlResult(string html, IWebHostEnvironment env)
        {
            htmlCode = html;
            _env = env;
        }
        public async Task ExecuteResultAsync(ActionContext context)
        {
            string fullHtmlCode = "<!DOCTYPE html><html><head>";
            fullHtmlCode += "<title>Главная страница</title>";
            fullHtmlCode += "<meta charset=utf-8 />";
            fullHtmlCode += "</head> <body>";
            fullHtmlCode += htmlCode;
            fullHtmlCode += "<script crossorigin src=\"https://unpkg.com/react@16/umd/react.production.min.js\"></script>";
            fullHtmlCode += "<script crossorigin src=\"https://unpkg.com/react-dom@16/umd/react-dom.production.min.js\"></script>";
            fullHtmlCode += "<script src=\"https://unpkg.com/react-router-dom/umd/react-router-dom.min.js\"></script>";
            fullHtmlCode += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js\"></script>";

            string path = Path.Combine(_env.WebRootPath, "js/app.jsx");

            //fullHtmlCode += $"<script type=\"text/babel\" src=\"{path}\"></script>";
            fullHtmlCode += $"<script type=\"text/babel\" src=\"js/app.js\"></script>";
            fullHtmlCode += "</body></html>";
            await context.HttpContext.Response.WriteAsync(fullHtmlCode);
        }
    }
}
