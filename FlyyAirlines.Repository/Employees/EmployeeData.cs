using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Employees
{
    public class EmployeeData : IEmployeeData
    {
        private readonly AppDBContext _dbContext;
        public EmployeeData(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CheckReservation(Reservation reservation, User user)
        {
            var getUser = await _dbContext.Users.FindAsync(user);
            var checkReservation = getUser.Reservations.FirstOrDefault(res => res == reservation);
            if(checkReservation != null)
            {
                return true;
            }
            return false;
        }

    }
}
