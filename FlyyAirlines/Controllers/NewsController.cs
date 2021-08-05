using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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

        public void GetFile()
        {
            //File from fb connect (try File.ReadAllBytes())
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

        [Route("AddNews")]
        [HttpPost]
        public IActionResult AddFile([FromForm] NewsDTO news)
        {

            if(news.ImageFile == null && news.ImageUrl == null)
            {//tomorrow implement this method and react form
                return BadRequest();
            }
            var NewNews = new News();
            NewNews.Id = Guid.NewGuid().ToString();
            NewNews.Topic = news.Topic;
            NewNews.Content = news.Topic;
            NewNews.PublicDate = DateTime.Now;
            if (news.ImageFile != null)
            {
                try
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", news.ImageFile.FileName);

                    using (var stream = new MemoryStream())
                    {
                        news.ImageFile.CopyTo(stream);
                        NewNews.FileArr = stream.ToArray();
                    }
                    
                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            } else
            {
                NewNews.ImageUrl = news.ImageUrl;
            }
            _news.Add(NewNews);
            return StatusCode(StatusCodes.Status201Created);
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
