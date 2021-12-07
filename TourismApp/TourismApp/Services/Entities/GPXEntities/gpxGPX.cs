using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class gpxGPX
    {
        [JsonProperty("trk")]
        public trkGPX TrkGPX { get; set; }
    }
}
