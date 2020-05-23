using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Models
{
    public class Portfolio
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<PortfolioShare> PortfolioShares { get; set; }

        public Portfolio()
        {
            PortfolioShares = new List<PortfolioShare>();
        }
    }
}
