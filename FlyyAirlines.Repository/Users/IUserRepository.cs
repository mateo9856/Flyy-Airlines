using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User Get(string id);
        Task Add(User entity);
        void Update(User entity);
        Task Delete(string id);
    }
}
