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
    public class MessagesController : ControllerBase
    {
        private readonly IMainRepository<Message> _message;
        public MessagesController(IMainRepository<Message> message)
        {
            _message = message;
        }
    }
}
