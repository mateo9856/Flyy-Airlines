using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Data.Models
{
    public class Messages : BaseEntity
    {
        public string Author { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
        public User User { get; set; }
    }
}
