using FlyyAirlines.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository.Reservations
{
    public interface IReserveData
    {
        Task<IEnumerable<Reservation>> GetReservationsFromUser(User user);
    }
}
