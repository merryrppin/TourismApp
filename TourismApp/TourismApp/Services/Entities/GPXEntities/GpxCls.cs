using Newtonsoft.Json;

namespace TourismApp.Services.Entities.GPXEntities
{
    public class GpxCls
    {
        [JsonProperty("trk")]
        public trkGPX TrkGPX { get; set; }
    }
}
