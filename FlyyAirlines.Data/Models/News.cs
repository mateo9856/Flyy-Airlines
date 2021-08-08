using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Data.Models
{
    public class News : BaseEntity
    {
        public string Topic { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public DateTime PublicDate { get; set; }
    }
}
