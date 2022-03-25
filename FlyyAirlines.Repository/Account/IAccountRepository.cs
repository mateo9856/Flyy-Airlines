using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Account
{
    public interface IAccountRepository
    {
        Task<User> GetCurrentUser(ClaimsIdentity identity);
        Task<string> GetUserRole(ClaimsIdentity user);
        Task<string[]> GetPermissions(ClaimsIdentity user);
        Task<bool> RegisterUser(User user, string userType);
        Task<object> Login(UserLoginDTO user);
    }
}
