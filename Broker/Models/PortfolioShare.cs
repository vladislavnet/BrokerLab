using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Models
{
    public class PortfolioShare
    {
        public int Id { get; set; }
        public int PortfolioId { get; set; }
        public Portfolio Portfolio { get; set; }

        public int ShareId { get; set; }
        public Share Share { get; set; }

        public double BuyPrice { get; set; }
    }
}
