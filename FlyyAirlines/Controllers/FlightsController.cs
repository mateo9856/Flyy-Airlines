using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using FlyyAirlines.Repository.FlightsAirplanes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


namespace FlyyAirlines.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IAirplanesFlightsData _planesData;
        private readonly IMainRepository<Flight> _mainPlanes;
        private readonly IMainRepository<Airplane> _mainAirplanes;
        public FlightsController(IAirplanesFlightsData planesData, IMainRepository<Flight> mainPlanes, IMainRepository<Airplane> mainAirplanes)
        {
            _planesData = planesData;
            _mainPlanes = mainPlanes;
            _mainAirplanes = mainAirplanes;
        }

        [Route("GetFlights")]
        [HttpGet]
        public IActionResult GetFlights()
        {
            var child = new string[] {"Airplane", "Reservation" };
            var GetDetails = _mainPlanes.GetAll(child);
            return Ok(GetDetails);
        }

        [Route("GetAirplanes")]
        [HttpGet]
        public IActionResult GetAirplanes()
        {
            var GetDetails = _mainAirplanes.GetAll();
            return Ok(GetDetails);
        }

        [Route("GetFlight/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetFlight(string id)
        {
            var child = new string[] { "Airplane", "Reservation" };//przyczya== wartosci null zrbic skrypt by dzialal z nullem
            var FlightDetails = await _mainPlanes.EntityWithEagerLoad(d => d.Id == id, child);
            return Ok(FlightDetails);
        }

        [Route("GetAirplane/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetAirplane(string id)
        {
            var child = new string[] { "Flight" };
            var AirplaneDetails = await _mainAirplanes.EntityWithEagerLoad(d => d.Id == id, child);
            return Ok(AirplaneDetails);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [Route("Airplane")]
        [HttpPost]
        public IActionResult AddPlane(Airplane airplane)
        {
            if(airplane == null)
            {
                return BadRequest();
            }

            var newAirplane = new Airplane
            {
                Id = Guid.NewGuid().ToString(),
                PlaneName = airplane.PlaneName,
                NumberOfSeats = airplane.NumberOfSeats,
                Flights = airplane.Flights
            };

            _mainAirplanes.Add(newAirplane);
            return CreatedAtAction("Get", new { id = airplane.Id }, airplane);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> AddFlight([FromBody] FlightDTO flight)
        {
            if(flight == null)
            {
                return BadRequest();
            }
            int[] Times = new int[5];
            for(int i = 0; i < Times.Length; i++)
            {
                Times[i] = Int32.Parse(flight.DepartureDate[i]);
            }

            var GetAirplane = await _mainAirplanes.Get(flight.Airplane);
            var Flight = new Flight()
            {
                Id = Guid.NewGuid().ToString(),
                FlightName = flight.FlightName,
                FromCountry = flight.FromCountry,
                FromCity = flight.FromCity,
                ToCountry = flight.ToCountry,
                ToCity = flight.ToCity,
                Airplane = GetAirplane,
                DepartureDate = new DateTime(Times[0], Times[1], Times[2], Times[3], Times[4], 0)
            };

            await _mainPlanes.Add(Flight);
            return CreatedAtAction("Get", new { id = Flight.Id }, Flight);
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpPut("{id}")]
        public IActionResult Put(string id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _mainPlanes.Update(flight);
            return NoContent();
        }

        //[Authorize(Roles = "Admin, SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlight(string id)
        {
            var Flight = await _mainPlanes.Get(id);
            await _mainPlanes.Delete(Flight);
            return NoContent();
        }
    }
}
