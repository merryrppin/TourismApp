﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
            if (StoredObjectParams.StoredProcedureName == "GuardarComentariosSitioTuristico")
            {
                _AdministrationService.ConvertB64ToFile(StoredObjectParams);
            }
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
            StoredObjectResponse response = _AdministrationService.ExecuteStoredProcedure(StoredObjectParams);
            if (response.Value != null && response.Value[0].Rows.Count > 0)
            {
                return BuildToken(email, response);
            }

            return null;
        }

        private AuthenticationResponse BuildToken(string email, StoredObjectResponse response)
        {
            try
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
                    RedirecTo = "/home",
                    UserInfoResponse = response,
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        public string Get()
        {
            return "Ver. " + _Configuration.GetValue<string>("Version");
        }

        [HttpPost("OnPostUploadAsync")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> OnPostUploadAsync(List<IFormFile> files, string typeSite, int? turistSiteId)
        {
            try
            {
                if (files.Count > 50)
                {
                    throw new Exception("Solo esta permitido subir 50 imagenes al tiempo");
                }

                string myDir = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
                string pathTourismWeb = System.IO.Path.Combine(myDir, "wwwroot/TourismWeb");
                string pathTourismeApp = System.IO.Path.Combine(myDir, "wwwroot/TourismApp");

                bool exists = Directory.Exists(Path.Combine(pathTourismWeb, $"files/{typeSite}/"));
                if (!exists)
                    Directory.CreateDirectory(Path.Combine(pathTourismWeb, $"files/{typeSite}/"));

                long size = files.Sum(f => f.Length);
                List<string> filePaths = new List<string>();

                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        string rootPath = typeSite == "tmpGPX" ? pathTourismeApp : pathTourismWeb;
                        string filePath = Path.Combine($"{rootPath}/files/{typeSite}/", formFile.FileName);
                        filePaths.Add($"TourismWeb/files/{typeSite}/{formFile.FileName}");
                        using var stream = System.IO.File.Create(filePath);
                        await formFile.CopyToAsync(stream);
                    }
                }

                if (typeSite == "tmpGPX")
                {
                    exists = Directory.Exists(Path.Combine(pathTourismeApp, $"files/{typeSite}/"));
                    if (!exists)
                        Directory.CreateDirectory(Path.Combine(pathTourismeApp, $"files/{typeSite}/"));
                    _AdministrationService.procesar(turistSiteId);
                }

                return Ok(new { count = files.Count, size, filePaths = filePaths });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("ChangePassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public StoredObjectResponse ChangePassword(StoredObjectParams StoredObjectParams)
        {
            try
            {
                string newPassword = StoredObjectParams.StoredParams.Where(x => x.Name == "newPassword").Select(x => x.Value).ToList().FirstOrDefault();
                string realPassword = StoredObjectParams.StoredParams.Where(x => x.Name == "realPassword").Select(x => x.Value).ToList().FirstOrDefault();
                var encryptNewPassword = EncryptDecryptPassword.EncryptPlainText(newPassword);
                var encryptRealPassword = EncryptDecryptPassword.EncryptPlainText(realPassword);
                StoredObjectParams.StoredParams.Where(x => x.Name == "newPassword").ToList().ForEach(p => p.Value = encryptNewPassword);
                StoredObjectParams.StoredParams.Where(x => x.Name == "realPassword").ToList().ForEach(p => p.Value = encryptRealPassword);
                StoredObjectResponse response = _AdministrationService.ExecuteStoredProcedure(StoredObjectParams);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
