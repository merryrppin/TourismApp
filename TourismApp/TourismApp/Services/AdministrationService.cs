using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using TourismApp.Services.Entities.FilesEntities;
using TourismApp.Services.Entities.GoogleDirectionsEntities;
using TourismApp.Services.Entities.GPXEntities;
using TourismApp.Services.Entities.StoredEntities;
using static TourismApp.Services.Enums.Enums;

namespace TourismApp.Services
{
    public class AdministrationService
    {
        private readonly IConfiguration Configuration;
        private ManageExceptions ManageExceptions;
        private string ConnString, GoogleApiKey;

        public AdministrationService(IConfiguration configuration)
        {
            Configuration = configuration;
            ManageExceptions = new ManageExceptions();
            ConnString = Configuration.GetValue<string>("ConnectionStrings:ConnString");
            GoogleApiKey = Configuration.GetValue<string>("ConnectionStrings:GoogleApiKey");
        }

        #region Stored Procedure
        public StoredObjectResponse ExecuteStoredProcedure(StoredObjectParams StoredObjectParams)
        {
            StoredObjectResponse StoredObjectResponse = new StoredObjectResponse();
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(ConnString))
            {
                using (SqlCommand cmd = new SqlCommand(StoredObjectParams.StoredProcedureName, con))
                {
                    try
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        foreach (StoredParams StoredParam in StoredObjectParams.StoredParams)
                        {
                            if (StoredParam.TypeOfParameter == (int)EnumTypeOfParameter.JSONType)
                            {
                                StoredParam.Value = StoredParam.Value.Replace("'", "\"");
                            }

                            cmd.Parameters.Add("@" + StoredParam.Name, TypeOfParameter(StoredParam.TypeOfParameter)).Value = StoredParam.Value;
                        }
                        con.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                        adapter.Fill(ds);
                        StoredObjectResponse.Value = new List<StoredTableResponse>();
                        foreach (DataTable dataTable in ds.Tables)
                        {
                            List<string> columns = new List<string>();
                            foreach (DataColumn column in dataTable.Columns)
                            {
                                columns.Add(column.ColumnName);
                            }
                            List<List<string>> rows = new List<List<string>>();
                            foreach (DataRow rowsT in dataTable.Rows)
                            {
                                List<string> row = (rowsT.ItemArray as object[]).ToList().ConvertAll(input => input.ToString());
                                rows.Add(row);
                            }
                            StoredObjectResponse.Value.Add(new StoredTableResponse { TableName = dataTable.TableName, Columns = columns, Rows = rows });
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                    finally
                    {
                        con.Dispose();
                        cmd.Dispose();
                    }
                }
            }
            return StoredObjectResponse;
        }

        private SqlDbType TypeOfParameter(int TypeOfParameter)
        {
            switch (TypeOfParameter)
            {
                case (int)EnumTypeOfParameter.StringType:
                    return SqlDbType.VarChar;
                case (int)EnumTypeOfParameter.IntType:
                    return SqlDbType.Int;
                case (int)EnumTypeOfParameter.BoolType:
                    return SqlDbType.Bit;
                case (int)EnumTypeOfParameter.DateType:
                    return SqlDbType.Date;
                case (int)EnumTypeOfParameter.JSONType:
                    return SqlDbType.VarChar;
                default:
                    return SqlDbType.VarChar;
            }
        }
        #endregion
        #region IMG
        public StoredObjectParams ConvertB64ToFile(StoredObjectParams StoredObjectParams)
        {
            EntidadComentarios entidadComentarios = JsonConvert.DeserializeObject<EntidadComentarios>(StoredObjectParams.StoredParams[0].Value);
            entidadComentarios.img1 = GenerateFileIMG(entidadComentarios.img1, entidadComentarios.IdSitioTuristico);
            entidadComentarios.img2 = GenerateFileIMG(entidadComentarios.img2, entidadComentarios.IdSitioTuristico);
            StoredObjectParams.StoredParams[0].Value = JsonConvert.SerializeObject(entidadComentarios);
            return StoredObjectParams;
        }

        private string GenerateFileIMG(string img1Base64, string IdSitioTuristico)
        {
            string myDir = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string pathTourismWeb = System.IO.Path.Combine(myDir, "wwwroot/TourismWeb");
            bool exists = Directory.Exists(Path.Combine(pathTourismWeb, $"files/commets/"));
            if (!exists)
                Directory.CreateDirectory(Path.Combine(pathTourismWeb, $"files/commets/"));
            string filePath1 = "";
            if (img1Base64 != "")
            {
                filePath1 = "TourismWeb/files/commets/" + IdSitioTuristico + "_" + Guid.NewGuid() + ".png";
                Base64ToImage(img1Base64, filePath1);
            }
            return filePath1;
        }

        private void Base64ToImage(string base64String, string filePath)
        {
            var bytes = Convert.FromBase64String(base64String);
            using (var imageFile = new FileStream(filePath, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
        }
        #endregion
        #region GPX
        public StoredObjectResponse procesar(int? IdSitioTuristico)
        {
            return ProcPathGPX(IdSitioTuristico);
        }
        public StoredObjectResponse ProcPathGPX(int? IdSitioTuristico)
        {
            ProcessGPX processGPX = new ProcessGPX();
            GpxCls gpxCls = processGPX.ProcessFileFromName(IdSitioTuristico + ".gpx");
            string jsonTrkSeg = string.Join(", ", gpxCls.gpx.TrkGPX.TrksegGPX.TrkSegList);
            string jsonWptGPX = string.Join(", ", gpxCls.gpx.WptGPX);
            jsonTrkSeg = "[" + jsonTrkSeg + "]";
            jsonWptGPX = "[" + jsonWptGPX + "]";

            StoredParams jsonTrkSegParam = new StoredParams
            {
                Name = "jsonTrkSeg",
                Value = jsonTrkSeg
            };
            StoredParams jsonWptGPXParam = new StoredParams
            {
                Name = "jsonWptGPX",
                Value = jsonWptGPX
            };
            StoredParams IdSitioTuristicoParam = new StoredParams
            {
                Name = "IdSitioTuristico",
                Value = IdSitioTuristico.ToString()
            };

            List<StoredParams> StoredParams = new List<StoredParams> { jsonTrkSegParam, jsonWptGPXParam, IdSitioTuristicoParam };
            StoredObjectParams StoredObjectParams = new StoredObjectParams
            {
                StoredProcedureName = "GuardarPuntosSenderismo",
                StoredParams = StoredParams
            };
            StoredObjectResponse storedObjectResponse = ExecuteStoredProcedure(StoredObjectParams);
            return storedObjectResponse;
        }
        #endregion

        #region Google directions
        public string GetDirection(OriginDirection originDirection)
        {
            string urlGoogleDirections = @"https://maps.googleapis.com/maps/api/directions/json?origin={0}&destination={1}&key={2}";
            string urlGoogleDirectionsFormatted = string.Format(urlGoogleDirections, originDirection.Origin, originDirection.Destination, GoogleApiKey);
            WebRequest request = WebRequest.Create(urlGoogleDirectionsFormatted);
            WebResponse response = request.GetResponse();
            Stream data = response.GetResponseStream();
            StreamReader reader = new StreamReader(data);
            string responseFromServer = reader.ReadToEnd();
            response.Close();
            return responseFromServer;
        }
        #endregion
    }
}