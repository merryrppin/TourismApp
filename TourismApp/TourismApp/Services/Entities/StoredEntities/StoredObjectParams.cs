using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TourismApp.Services.Entities.StoredEntities
{
    public class StoredObjectParams
    {
        public List<StoredParams> StoredParams { get; set; }
        public string StoredProcedureName { get; set; }
    }
}
