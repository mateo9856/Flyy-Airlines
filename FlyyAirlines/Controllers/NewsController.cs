using FlyyAirlines.Data.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly IMainRepository<News> _news;
        public NewsController(IMainRepository<News> news)
        {
            _news = news;
        }
    }
}
