using DinkToPdf;
using DinkToPdf.Contracts;
using FlyyAirlines.Models;
using FlyyAirlines.Repository.PDFGenerator;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FlyyAirlines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IConverter _converter;
        private readonly AppDBContext _dbContext;

        public PdfController(IConverter converter, AppDBContext context)
        {
            _converter = converter;
            _dbContext = context;
        }
        
        [HttpGet("reservationId={reservationId}&employeeId={employeeId}")]
        public IActionResult CreatePDF(string reservationId, string employeeId)
        {
            var GetDatas = _dbContext.Reservations.Include(bl => bl.Flights).FirstOrDefault(d => d.Id == reservationId);
            var GetEmployee = _dbContext.Employees.Include(u => u.User).FirstOrDefault(d => d.User.Id == employeeId);

            if(GetDatas == null || GetEmployee == null)
            {
                return NotFound();
            }

            var GlobalSet = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "Reservation Check",
            };
            var GetPath = Directory.GetCurrentDirectory();
            string ChangedPath = Regex.Replace(GetPath, @"\\FlyyAirlines$", "\\FlyyAirlines.Repository\\PDFGenerator");
            var Generator = new TemplateGenerator();
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = Generator.GetHTMLString(GetDatas, GetEmployee),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(ChangedPath, "assets", "style.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 12, Line = true},
                FooterSettings = { FontName = "Arial", FontSize = 12, Line = true }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = GlobalSet,
                Objects = { objectSettings }
            };
            
            var file = _converter.Convert(pdf);

            return File(file, "application/pdf");
        }

    }

}
