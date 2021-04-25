using FlyyAirlines.Models;
using FlyyAirlines.Repository.Reservations;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReserveData _reserveData;
        public ReservationController(IReserveData reserveData)
        {
            _reserveData = reserveData;
        }

        [HttpGet]
        public IEnumerable<string> Get()//wszystkie rezerwacje usera(po autoryzacji!)
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var GetReservation = await _reserveData.GetReservation(id);
            return Ok(GetReservation);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Reservation reservation)
        {
            var AddReserve = _reserveData.AddReservation(reservation);
            if (AddReserve != null)
            {
                return CreatedAtAction("Get", new { id = reservation.ReservationId }, reservation);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Reservation reservation)
        {
            if (id != reservation.ReservationId)
            {
                return BadRequest();
            }

            var Edit = await _reserveData.EditReserve(reservation);
            if(Edit == true)
            {
                return NoContent();
            } else
            {
                return BadRequest();
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Reserve = await _reserveData.GetReservation(id);
            await _reserveData.RemoveReservation(Reserve);
            return NoContent();
        }
    }
}
