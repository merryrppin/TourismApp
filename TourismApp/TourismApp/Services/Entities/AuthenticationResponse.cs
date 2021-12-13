using System;
using TourismApp.Services.Entities.StoredEntities;

namespace TourismApp.Services.Entities
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string RedirecTo { get; set; }
        public StoredObjectResponse UserInfoResponse { get; set; }
    }
}
