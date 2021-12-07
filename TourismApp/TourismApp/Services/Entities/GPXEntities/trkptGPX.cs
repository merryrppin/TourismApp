using Newtonsoft.Json;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class trkptGPX
    {
        [JsonProperty("-lat")]
        public double Latitude { get; set; }
        [JsonProperty("-lon")]
        public double Longitude { get; set; }
        [JsonProperty("ele")]
        public double Elevation { get; set; }
        [JsonProperty("time")]
        public string TimeRec { get; set; }
    }
}
