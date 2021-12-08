using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class wptGPX
    {
        [JsonProperty("@lat")]
        public double Latitude { get; set; }
        [JsonProperty("@lon")]
        public double Longitude { get; set; }
        [JsonProperty("ele")]
        public double Elevation { get; set; }
        [JsonProperty("time")]
        public string TimeRec { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("cmt")]
        public string Cmt { get; set; }
        [JsonProperty("desc")]
        public string Description { get; set; }

        public override string ToString()
        {
            return "{" + string.Format(@"""Latitude"":""{0}"", ""Longitude"":""{1}"", ""Elevation"":""{2}"", ""TimeRec"":""{3}"", ""Name"":""{4}"", ""Cmt"":""{5}"", ""Description"":""{6}""", Latitude, Longitude, Elevation, TimeRec, Name, Cmt, Description) + "}";
        }
    }
}
