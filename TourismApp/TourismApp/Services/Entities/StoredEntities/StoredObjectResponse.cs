using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TourismApp.Services.Entities.StoredEntities
{
    public class StoredObjectResponse
    {
        public Exception Exception { get; set; }
        public string ValueResponse { get; set; }
        public List<StoredTableResponse> Value { get; set; }
    }
}
