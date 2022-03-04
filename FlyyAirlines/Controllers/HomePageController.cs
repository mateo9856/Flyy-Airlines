using FlyyAirlines.Data.Models;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {
        private readonly IMainRepository<News> _quickNews;
        private readonly AppDBContext _dbContext;

        public HomePageController(IMainRepository<News> quickNews, AppDBContext dBContext)
        {
            _quickNews = quickNews;
            _dbContext = dBContext;
        }

        [Route("Bestseller")]
        [HttpGet]
        public IActionResult GetTopFlight()
        {
            try
            {
                var GetTopReservation = from reserve in _dbContext.Reservations
                                        group reserve by reserve.Flights.FlightName into flightName
                                        select new
                                        {
                                            Flight = flightName.Key,
                                            Count = flightName.Count()
                                        };
                return Ok(GetTopReservation.First());
            } catch (Exception ex)
            {
                throw new Exception("Reservations doesn't exist");
            }

        }

        [Route("News")]
        [HttpGet]
        public async Task<IActionResult> GetLastNews()
        {
            var GetLastNews = await _dbContext.QuickNews.OrderBy(d => d.PublicDate).ThenBy(d => d.PublicDate.Second).Take(3).ToListAsync();
            return Ok(GetLastNews);
        }
    }
}
