using Newtonsoft.Json;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class GpxCls
    {
        [JsonProperty("gpx")]
        public gpxGPX gpx { get; set; }
    }
}
