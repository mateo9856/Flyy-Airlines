using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Models;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMainRepository<Message> _message;
        private readonly AppDBContext _dbContext;

        public MessagesController(IMainRepository<Message> message, AppDBContext dBContext)
        {
            _message = message;
            _dbContext = dBContext;
        }
        [HttpGet("id")]
        public async Task<IActionResult> GetUserMessage(string id)
        {
            var GetUser = await _dbContext.Users.Include(d => d.Messages).FirstOrDefaultAsync(d => d.Id == id);
            return Ok(GetUser.Messages);
        }
        
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] MessageDTO message)
        {
            if (message == null)
            {
                return BadRequest();
            }
            var GetAuthorName = await _dbContext.Users.FirstOrDefaultAsync(d => d.Id == message.AuthorId);
            var GetReceiverUser = await _dbContext.Users.Include(d => d.Messages).FirstOrDefaultAsync(d => d.Email == message.ReceiverEmail);
            
            if(GetReceiverUser == null) {
                return BadRequest();
            }

            var NewMessage = new Message()
            {
                Id = Guid.NewGuid().ToString(),
                AuthorId = message.AuthorId,
                Author = GetAuthorName.Name + " " + GetAuthorName.Surname,
                Content = message.Content,
                Title = message.Title,
                User = GetReceiverUser
                
            };
            await _message.Add(NewMessage);

            return CreatedAtAction("Get", new {Id = NewMessage.Id}, NewMessage);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(string id)
        {
            var GetMessage = await _message.Get(id);
            await _message.Delete(GetMessage);
            return NoContent();
        }
    }
}
