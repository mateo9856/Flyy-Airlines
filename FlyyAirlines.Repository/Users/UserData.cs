using FlyyAirlines.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Users
{
    public class UserData : IUserData
    {
        private readonly AppDBContext _dbContext;
        public UserData(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public User GetUser(int id)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Id == id.ToString());
        }
        public User GetUser(string UserName, string Password)
        {
            return _dbContext.Users.FirstOrDefault(user => user.UserName == UserName && user.Password == Password);
        }

        public async Task<bool> RegisterUser(User user)
        {
            var checkLoginFree = await _dbContext.Users.FindAsync(user.UserName);
            if(checkLoginFree != null)
            {
                return false;
            } else
            {
                var newUser = new User
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Password = user.Password,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    IsEmployee = user.IsEmployee,
                    Reservations = new HashSet<Reservation>(),
                };
                await _dbContext.Users.AddAsync(newUser);
                await _dbContext.SaveChangesAsync();
                return true;
            }
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }
        public async Task RemoveUser(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
