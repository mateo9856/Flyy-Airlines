using FlyyAirlines.Data.Models;
using FlyyAirlines.DTO;
using FlyyAirlines.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Text.RegularExpressions;
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

        public string ReplaceToImageSource(string name)
        {
            string CutStart = Regex.Replace(name, @"^.*?(?=\\images)", "..");
            string ChangeSlashes = Regex.Replace(CutStart, @"\\", @"/");
            return ChangeSlashes;
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
            {
                return BadRequest();
            }
            var NewNews = new News();
            NewNews.Id = Guid.NewGuid().ToString();
            NewNews.Topic = news.Topic;
            NewNews.Content = news.Content;
            NewNews.PublicDate = DateTime.Now;
            if (news.ImageFile != null)
            {
                try
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "src", "images", news.ImageFile.FileName);
                    NewNews.ImageUrl = ReplaceToImageSource(path);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        news.ImageFile.CopyTo(stream);
                    }

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            } else
            {
                if(news.ImageUrl == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                NewNews.ImageUrl = ReplaceToImageSource(news.ImageUrl);
            }
            _news.Add(NewNews);
            return StatusCode(StatusCodes.Status201Created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditNews(string id, [FromForm] NewsDTO news)
        {
            if(id == null)
            {
                return NotFound();
            }

            var GetNews = await _news.Get(id);
            if(GetNews != null)
            {
                GetNews.Content = news.Content;
                GetNews.Topic = news.Topic;
            }

            if (news.ImageFile != null)
            {
                try
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "src", "images", news.ImageFile.FileName);
                    GetNews.ImageUrl = ReplaceToImageSource(path);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        news.ImageFile.CopyTo(stream);
                    }

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
            else
            {
                if(news.ImageUrl == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                GetNews.ImageUrl = ReplaceToImageSource(news.ImageUrl);
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
