using DinkToPdf;
using DinkToPdf.Contracts;
using FlyyAirlines.Repository.PDFGenerator;
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
    public class PdfController : ControllerBase
    {
        private readonly IConverter _converter;

        public PdfController(IConverter converter)
        {
            _converter = converter;
        }
        
        [HttpGet]
        public IActionResult CreatePDF(string datas)
        {
            var GlobalSet = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "Reservation Check",
            };

            var Generator = new TemplateGenerator();

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = Generator.GetHTMLString("3333", "123123"),//change parameters
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "style.css") },//zmienic path
                HeaderSettings = { FontName = "Arial", FontSize = 12, Line = true},
                FooterSettings = { FontName = "Arial", FontSize = 12, Line = true }//jeszcze footer i header dopracowac
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
