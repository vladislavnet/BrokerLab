using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public double Balance { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }

        public Portfolio Portfolio { get; set; }

        public int? RoleId { get; set; }
        public Role Role { get; set; }
    }
}
