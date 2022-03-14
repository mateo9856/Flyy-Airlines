using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Account
{
    public class AccountRepository : IAccountRepository
    {
        public Task<User> GetCurrentUser()
        {
            throw new NotImplementedException();
        }

        public Task<string[]> GetPermissions(User user)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetUserRole(User user)
        {
            throw new NotImplementedException();
        }

        public Task<object> Login(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RegisterUser(User user, string userType)
        {
            throw new NotImplementedException();
        }
    }
}
