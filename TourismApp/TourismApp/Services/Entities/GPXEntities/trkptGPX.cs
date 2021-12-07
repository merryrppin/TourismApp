using Newtonsoft.Json;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class trkptGPX
    {
        [JsonProperty("@lat")]
        public double Latitude { get; set; }
        [JsonProperty("@lon")]
        public double Longitude { get; set; }
        [JsonProperty("ele")]
        public double Elevation { get; set; }
        [JsonProperty("time")]
        public string TimeRec { get; set; }

        public override string ToString()
        {
            return "{" + string.Format("'Latitude':'{0}','Longitude':'{1}','Elevation':'{2}','TimeRec':'{3}'", Latitude, Longitude, Elevation, TimeRec) + "}";
        }
    }
}
