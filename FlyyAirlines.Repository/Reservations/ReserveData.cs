using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Reservations
{
    public class ReserveData : IReserveData
    {
        private readonly AppDBContext _dbContext;
        public ReserveData(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task <IEnumerable<Reservation>> GetReservationsFromUser(User user)
        {
            var getUser = await _dbContext.Users.FindAsync(user);
            return getUser.Reservations;
        }
    }
}
