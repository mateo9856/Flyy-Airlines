using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Account
{
    public interface IAccountRepository
    {
        Task<User> GetCurrentUser();
        Task<string> GetUserRole(User user);
        Task<string[]> GetPermissions(User user);
        Task<bool> RegisterUser(User user, string userType);
        Task<object> Login(User user);
    }
}
