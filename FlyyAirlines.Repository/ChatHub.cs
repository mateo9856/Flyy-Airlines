using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    public class ChatHub : Hub
    {
        public async Task ViewMessage(string author, string message, string topic)
        {
            await Clients.All.SendAsync("ReceiveMessage", author, message, topic);
        }

        public async Task AlertMessage(string topic, string author)
        {
            await Clients.All.SendAsync("AlertMessage", topic, author);
        }
    }
}
