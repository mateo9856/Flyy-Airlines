using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Users
{
    public interface IUserData
    {
        User GetUser(int id);
        User GetUser(string UserName, string Password);
        Task<IEnumerable<User>> GetUsers();
        Task<bool> RegisterUser(User user);
        Task RemoveUser(User user);
    }
}
