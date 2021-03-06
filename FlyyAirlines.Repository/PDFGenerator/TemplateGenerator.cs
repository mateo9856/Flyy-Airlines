using FlyyAirlines.Models;
using System.Text;

namespace FlyyAirlines.Repository.PDFGenerator
{
    public static class TemplateGenerator
    {
        public static string GetHTMLString(Reservation reservation, Employee employee) {

            var sb = new StringBuilder();

            sb.Append(@"<html>
                          <head>
                          </head>
                           <body>
                             <div class='header'>
                             <h2 class = 'headerFont'>Flyy! Airlines</h2>
                             <h3 style = 'margin-top: 5px; color:#44504a' align='center'>Reservation nr " + reservation.Id + "</h3>" +
                             "<table cellpadding='7'>" +
                             "<thead><tr><th>Name</th><th>Surname</th><th>Seat</th>" +
                             "<th>Identify</th><th>Flight</th></tr></thead>");

                sb.AppendFormat(@"<tbody><tr><td>{0}</td>
                                <td>{1}</td>
                                <td>{2}</td>
                                <td>{3}</td>
                                <td>{4}</td>
                                </tr></tbody>", reservation.Name, reservation.Surname, reservation.Seat,
                                reservation.PersonIdentify, reservation.Flights.FlightName);

            sb.AppendFormat(@"</table>
                                 <div class='blockBottom'>
                                   <p class='confirmed'>Confirm :  <b>{0} {1}</b></p>
                                  </div>
                            </body>
                           </html>", employee.Surname, employee.Name);

            return sb.ToString();
        }
    }
}
