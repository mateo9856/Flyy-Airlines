using FlyyAirlines.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public static class ConnectionUsers
    {
        public static Dictionary<string, HubUserDatas> Users = new Dictionary<string, HubUserDatas>();
    }
}
