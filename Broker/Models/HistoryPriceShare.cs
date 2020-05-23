using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Models
{
    public class HistoryPriceShare
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public DateTime DateHistory { get; set; }
        public int ShareId { get; set; }
        public Share Share { get; set; }
    }
}
