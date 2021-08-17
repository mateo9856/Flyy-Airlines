using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public class HubUserDatas
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public HubUserDatas(string name, string email)
        {
            this.UserName = name;
            this.Email = email;
        }
    }
}
