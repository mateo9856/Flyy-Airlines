using FlyyAirlines.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text;

namespace FlyyAirlines.Repository.PDFGenerator
{
    public class TemplateGenerator
    {
        private readonly AppDBContext _dbContext;

        public TemplateGenerator()
        {
            _dbContext = new AppDBContext();
        }

        public string GetHTMLString(string data, string employeeId) {

            var GetDatas = _dbContext.Reservations.Include(bl => bl.Flights).FirstOrDefault(d => d.Id == data);
            var GetEmployee = _dbContext.Employees.FirstOrDefault(e => e.Id == employeeId);
            var sb = new StringBuilder();

            sb.Append(@"<html>
                          <head>
                          </head>
                           <body>
                             <div class='header'>
                             <h1 align='center'>Reservation nr " + Guid.NewGuid().ToString() + "</h1>" +
                             "<table align='center'>" +
                             "<thead><tr><th>Name></th><th>Surname</th><th>Seat</th>" +
                             "<th>Identify</th><th>Flight</th></tr></thead>");

                sb.AppendFormat(@"<tbody><tr><td>{0}</td>
                                <td>{1}</td>
                                <td>{2}</td>
                                <td>{3}</td>
                                <td>{4}</td>
                                </tr></tbody>", GetDatas.Name, GetDatas.Surname, GetDatas.Seat,
                                GetDatas.PersonIdentify, GetDatas.Flights.FlightName);

            sb.AppendFormat(@"</table
                                 <div class='block'>
                                   <p><h3 align='center'>Confirmed</h3></p>
                                   <p class='confirmed'>{0} {1}</p>
                                   <span>...................................</span>
                                  </div>
                            </body>
                           </html>", GetEmployee.Surname, GetEmployee.Name);

            return sb.ToString();
        }
    }
}
