using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Reservations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReserveData _reserveData;
        private readonly AppDBContext _dbContext;
        private readonly IMainRepository<Reservation> _mainReserves;
        public ReservationController(IReserveData reserveData, IMainRepository<Reservation> mainRepository, AppDBContext dBContext)
        {
            _reserveData = reserveData;
            _mainReserves = mainRepository;
            _dbContext = dBContext;
        }

        [HttpGet]
        public IActionResult GetReservations()
        {
            try
            {
                var child = new string[] { "Flights", "User" };
                var GetDetails = _mainReserves.GetAll(child);
                return Ok(GetDetails);
                
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            var child = new string[] { "Flights", "User" };
            var GetDetails = await _mainReserves.EntityWithEagerLoad(d => d.Id == id, child);
            return Ok(GetDetails);
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ReservationDTO reservation)
        {
            var GetUser = await _dbContext.Users.SingleOrDefaultAsync(u => u.Id == reservation.User);
            var GetFlight = _dbContext.Flights.SingleOrDefault(u => u.Id == reservation.Flight);
                var NewReserve = new Reservation()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = reservation.Name,
                    Surname = reservation.Surname,
                    PersonIdentify = reservation.PersonIdentify,
                    Seat = reservation.Seat,
                    Flights = GetFlight,
                    User = GetUser
                };

            await _mainReserves.Add(NewReserve);
            return CreatedAtAction("Get", new { id = NewReserve.Id }, NewReserve);
        }
        
        [Route("CheckReserve")]
        [HttpPost]
        public async Task<IActionResult> CheckReserve([FromBody] ReservationDTO reservation)
        {
            var GetData = await _dbContext.Reservations.Include(r => r.Flights).FirstOrDefaultAsync(r => r.Name == reservation.Name &&
            r.Surname == reservation.Surname && r.PersonIdentify == reservation.PersonIdentify);
            if (GetData != null)
            {
                return CreatedAtAction("Checked", new {flight = GetData.Flights.Id, reservation = GetData.Id});
            }
            else
            {
                return StatusCode(500);
            }
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

             _mainReserves.Update(reservation);
            return NoContent();
            
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var Reserve = await _mainReserves.Get(id);
            await _mainReserves.Delete(Reserve);
            return NoContent();
        }
    }
}
