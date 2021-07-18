using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TourismApp.Services;
using TourismApp.Services.Entities.GoogleDirectionsEntities;

namespace TourismApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleDirectionsController : ControllerBase
    {

        private readonly IConfiguration _Configuration;
        AdministrationService _AdministrationService;
        private readonly ILogger<GoogleDirectionsController> _logger;

        public GoogleDirectionsController(IConfiguration configuration, ILogger<GoogleDirectionsController> logger)
        {
            _Configuration = configuration;
            _logger = logger;
            _AdministrationService = new AdministrationService(configuration);
        }

        [HttpPost]
        public string Post(OriginDirection originDirection)
        {
            return _AdministrationService.GetDirection(originDirection);
        }
    }
}
