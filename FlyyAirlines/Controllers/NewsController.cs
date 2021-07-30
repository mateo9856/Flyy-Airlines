using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
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

        [HttpGet]
        public IActionResult GetAllNews()
        {
            return Ok(_news.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNews(string id)
        {
            var GetNews = await _news.Get(id);
            return Ok(GetNews);
        }

        [HttpPost]
        public IActionResult AddNews([FromBody] NewsDTO news)
        {
            if(news == null)
            {
                return BadRequest();
            }

            var NewNews = new News()
            {
                Id = Guid.NewGuid().ToString(),
                Topic = news.Topic,
                Content = news.Content,
                Header = news.Header,
                ImageUrl = news.ImageUrl,
                PublicDate = news.PublicDate
            };

            _news.Add(NewNews);
            
            return CreatedAtAction("Get", new { id = NewNews.Id }, NewNews);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNews(string id, [FromBody] NewsDTO news)
        {
            if(id == null)
            {
                return NotFound();
            }

            var GetNews = await _news.Get(id);
            if(GetNews != null)
            {
                GetNews.Header = news.Header;
                GetNews.ImageUrl = news.ImageUrl;
                GetNews.Content = news.Content;
                GetNews.Topic = news.Topic;
            }

            _news.Update(GetNews);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveNews(string id)
        {
            var GetNews = await _news.Get(id);
            await _news.Delete(GetNews);
            return NoContent();
        }
    }
}
