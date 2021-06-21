using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Reservations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReserveData _reserveData;
        private readonly IMainRepository<Reservation> _mainReserves;
        public ReservationController(IReserveData reserveData, IMainRepository<Reservation> mainRepository)
        {
            _reserveData = reserveData;
            _mainReserves = mainRepository;
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
            var child = new string[] { "Flight", "User" };
            var GetDetails = await _mainReserves.EntityWithEagerLoad(d => d.Id == id, child);
            return Ok(GetDetails);
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Reservation reservation)
        {
            await _mainReserves.Add(reservation);
            return CreatedAtAction("Get", new { id = reservation.Id }, reservation);
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
