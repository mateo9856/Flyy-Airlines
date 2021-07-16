using FlyyAirlines.Data.Models;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {
        private readonly IMainRepository<QuickNews> _quickNews;
        private readonly AppDBContext _dbContext;

        public HomePageController(IMainRepository<QuickNews> quickNews, AppDBContext dBContext)
        {
            _quickNews = quickNews;
            _dbContext = dBContext;
        }

        [Route("Bestseller")]
        [HttpGet]
        public async Task<IActionResult> GetTopFlight()
        {
            var GetTopReservation = from reserve in _dbContext.Reservations
                                    group reserve by reserve.Flights.FlightName into flightName
                                    select new
                                    {
                                        Flight = flightName.Key,
                                        Count = flightName.Count()
                                    };
            return Ok(GetTopReservation.First());
        }

        [Route("News")]
        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            return Ok("");
        }
    }
}
