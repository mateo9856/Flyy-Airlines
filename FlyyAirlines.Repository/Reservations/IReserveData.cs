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
        Task<Reservation> GetReservation(int id);
        Task<IEnumerable<Reservation>> GetReservationsFromUser(User user);
        Task AddReservation(Reservation reservation);
        Task RemoveReservation(Reservation reservation);
        Task<bool> EditReserve(Reservation reservation);

    }
}
