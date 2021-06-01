using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSocket.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", Context.ConnectionId, message);
        }

        public async Task SetPlayer1()
        {
            await Clients.All.SendAsync("SetPlayer1", Context.ConnectionId);
        }
        public async Task SetPlayer2()
        {
            await Clients.All.SendAsync("SetPlayer2", Context.ConnectionId);
        }

        public async Task SqrGame(string sqr)
        {
            await Clients.All.SendAsync("SqrGame", sqr, Context.ConnectionId);
        }
        public async Task ResetGame()
        {
            await Clients.All.SendAsync("ResetGame");
        }
    }
}
