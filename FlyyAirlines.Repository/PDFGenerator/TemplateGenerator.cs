using FlyyAirlines.Models;
using System.Text;

namespace FlyyAirlines.Repository.PDFGenerator
{
    public class TemplateGenerator
    {
        public string GetHTMLString(Reservation reservation, Employee employee) {

            var sb = new StringBuilder();

            sb.Append(@"<html>
                          <head>
                          </head>
                           <body>
                             <div class='header'>
                             <h1 align='center'>Reservation nr " + reservation.Id + "</h1>" +
                             "<table align='center'>" +
                             "<thead><tr><th>Name></th><th>Surname</th><th>Seat</th>" +
                             "<th>Identify</th><th>Flight</th></tr></thead>");

                sb.AppendFormat(@"<tbody><tr><td>{0}</td>
                                <td>{1}</td>
                                <td>{2}</td>
                                <td>{3}</td>
                                <td>{4}</td>
                                </tr></tbody>", reservation.Name, reservation.Surname, reservation.Seat,
                                reservation.PersonIdentify, reservation.Flights.FlightName);

            sb.AppendFormat(@"</table
                                 <div class='block'>
                                   <p><h3 align='center'>Confirmed</h3></p>
                                   <p class='confirmed'>{0} {1}</p>
                                   <span>...................................</span>
                                  </div>
                            </body>
                           </html>", employee.Surname, employee.Name);

            return sb.ToString();
        }
    }
}
