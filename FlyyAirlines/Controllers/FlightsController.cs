using FlyyAirlines.Models;
using FlyyAirlines.Repository.FlightsAirplanes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IAirplanesFlightsData _planesData;
        public FlightsController(IAirplanesFlightsData planesData)
        {
            _planesData = planesData;
        }
        [Route("AirplanesFlights")]
        [HttpGet]
        public ActionResult GetAirplanesAndFlights()
        {
            var GetAll = _planesData.GetAll();
            return Ok(GetAll);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetFlight(int id)
        {
            var GetFlight = await _planesData.GetFlight(id);
            if(GetFlight == null)
            {
                return NotFound();
            }
            return Ok(GetFlight);
        }
        [Route("Airplane")]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAirplane(int id)
        {
            var GetAirplane = await _planesData.GetAirplane(id);
            if (GetAirplane == null)
            {
                return NotFound();
            }
            return Ok(GetAirplane);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Flight flight)
        {
            if(flight == null)
            {
                return BadRequest();
            }
            var AddFlight = _planesData.AddFlight(flight);
            return CreatedAtAction("Get", new { id = flight.FlightsId }, flight);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Flight flight)
        {
            if (id != flight.FlightsId)
            {
                return BadRequest();
            }

            var Edit = await _planesData.EditFlight(flight);
            if(Edit == null)
            {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Flight = await _planesData.GetFlight(id);
            await _planesData.RemoveFlight(Flight);
            return NoContent();
        }
    }
}
