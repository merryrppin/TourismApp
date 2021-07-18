using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TourismApp.Services;
using TourismApp.Services.Entities.StoredEntities;

namespace TourismApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourismController : ControllerBase
    {
        private readonly IConfiguration _Configuration;
        AdministrationService _AdministrationService;
        private readonly ILogger<TourismController> _logger;

        public TourismController(IConfiguration configuration, ILogger<TourismController> logger)
        {
            _Configuration = configuration;
            _logger = logger;
            _AdministrationService = new AdministrationService(configuration);
        }

        [HttpPost]
        public StoredObjectResponse Post(StoredObjectParams StoredObjectParams)
        {
            return _AdministrationService.ExecuteStoredProcedure(StoredObjectParams);
        }

        [HttpGet]
        public string Get()
        {
            return "Ver. " + _Configuration.GetValue<string>("Version");
        }
    }
}
