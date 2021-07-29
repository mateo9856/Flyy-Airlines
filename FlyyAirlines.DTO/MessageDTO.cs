using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.DTO
{
    public class MessageDTO
    {
        public string AuthorId { get; set; }
        public string ReceiverId { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
