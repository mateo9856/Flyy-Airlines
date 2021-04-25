﻿using FlyyAirlines.Models;
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
        public async Task AddReservation(Reservation reservation)
        {
            await _dbContext.Reservations.AddAsync(reservation);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> EditReserve(Reservation reservation)
        {
            var getReservation = await _dbContext.Reservations.FindAsync(reservation.ReservationId);
            if(getReservation == null)
            {
                return false;
            } else
            {
                getReservation = reservation;
                return true;
            }
    }

        public async Task<Reservation> GetReservation(int id)
        {
            var getReservation = await _dbContext.Reservations.FindAsync(id);
            return getReservation;
        }

        public async Task <IEnumerable<Reservation>> GetReservationsFromUser(User user)
        {
            var getUser = await _dbContext.Users.FindAsync(user);
            return getUser.Reservations;
        }

        public async Task RemoveReservation(Reservation reservation)
        {
            _dbContext.Remove(reservation);
            await _dbContext.SaveChangesAsync();
        }
    }
}
