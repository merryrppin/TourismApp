using System;

namespace TourismApp.Services.Entities
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
