using Newtonsoft.Json;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class trkGPX
    {
        [JsonProperty("trkseg")]
        public trksegGPX TrksegGPX { get; set; }
    }
}
