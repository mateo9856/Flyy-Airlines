using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.Reservations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Authorize]
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
                var GetReserves = _mainReserves.GetAll();
                return Ok(GetReserves);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(Guid id)
        {
            var GetReservation = await _mainReserves.Get(id);
            return Ok(GetReservation);
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Reservation reservation)
        {
            await _mainReserves.Add(reservation);
            return CreatedAtAction("Get", new { id = reservation.ReservationId }, reservation);
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Reservation reservation)
        {
            if (id != reservation.ReservationId)
            {
                return BadRequest();
            }

             _mainReserves.Update(reservation);
            return NoContent();
            
        }
        
        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var Reserve = await _mainReserves.Get(id);
            await _mainReserves.Delete(Reserve);
            return NoContent();
        }
    }
}
