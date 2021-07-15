using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {
        [Route("Bestseller")]
        [HttpGet]
        public async Task<IActionResult> GetTopFlight()
        {
            return Ok("");
        }

        [Route("News")]
        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            return Ok("");
        }
    }
}
