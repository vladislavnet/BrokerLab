using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.ViewModels
{
    public class PortfolioUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ShareId { get; set; }
        public int PortfolioId { get; set; }
        public string CompanyName { get; set; }
        public double Profitability { get; set; }
        public string ImgSrc { get; set; }
    }
}
