using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TourismApp.General;
using TourismApp.Services;
using TourismApp.Services.Entities;
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

        [HttpPost("PostJWT")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public StoredObjectResponse PostJWT(StoredObjectParams StoredObjectParams)
        {
            return _AdministrationService.ExecuteStoredProcedure(StoredObjectParams);
        }

        [HttpPost("Login")]

        public AuthenticationResponse Login(StoredObjectParams StoredObjectParams)
        {
            string password = StoredObjectParams.StoredParams.Where(x => x.Name == "Password").Select(x => x.Value).ToList().FirstOrDefault();
            string email = StoredObjectParams.StoredParams.Where(x => x.Name == "Email").Select(x => x.Value).ToList().FirstOrDefault();
            var encriptPassword = EncryptDecryptPassword.EncryptPlainText(password);
            StoredObjectParams.StoredParams.Where(x => x.Name == "Password").ToList().ForEach(p => p.Value = encriptPassword);
            var response = _AdministrationService.ExecuteStoredProcedure(StoredObjectParams);
            if (response.Value != null && response.Value[0].Rows.Count > 0)
            {
                return BuildToken(email);
            }

            return null;
        }

        private AuthenticationResponse BuildToken(string email)
        {
            var claims = new List<Claim>()
            {
                new Claim("email",email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration.GetValue<string>("keyJwt")));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expirationDate = DateTime.UtcNow.AddYears(1); // TODO aun por definir tiempo de expiración por ahora un año
            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expirationDate, signingCredentials: credentials);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                ExpirationDate = expirationDate,
                RedirecTo= "/home",
            };
        }

        [HttpGet]
        public string Get()
        {
            //int IdSitioTuristico = 12;
            //_AdministrationService.procesar(IdSitioTuristico);
            return "Ver. " + _Configuration.GetValue<string>("Version");
        }


    }
}
