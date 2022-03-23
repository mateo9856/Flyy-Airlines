using FlyyAirlines.Data.Models;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
            }
            catch (SqlException sqlEx)
            {
                return StatusCode(500, "Cannot load Sql server!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Error!");
            }
        }

        [Route("RandomComment")]
        [HttpGet]
        public IActionResult GetRandomComment()
        {//implement comments service
            return Ok();
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
