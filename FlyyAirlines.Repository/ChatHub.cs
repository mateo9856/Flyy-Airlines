using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FlyyAirlines.Repository
{
    [Authorize]
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.User(user).SendAsync("ReceiveMessage", message);
        }
        public override Task OnConnectedAsync()
        {
            var email = Context.User.Claims.SingleOrDefault(d => d.Type.Contains("email")).Value;
            var userName = Context.User.Claims.SingleOrDefault(d => d.Type.Contains("name")).Value;
            ConnectionUsers.Users.Add(Context.ConnectionId, new HubUserDatas(userName, email));
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectionUsers.Users.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
