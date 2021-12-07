using Newtonsoft.Json;
using System.Collections.Generic;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class trksegGPX
    {
        [JsonProperty("trkseg")]
        public List<trkptGPX> TrkSegList { get; set; }
    }
}
