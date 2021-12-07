using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
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
                        StoredObjectResponse.Exception = ex;
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

        #region GPX
        public string procesar(int IdSitioTuristico)
        {
            string res = ProcPathGPX(IdSitioTuristico);
            return res;
        }
        public string ProcPathGPX(int IdSitioTuristico)
        {
            ProcessGPX processGPX = new ProcessGPX();
            GpxCls gpxCls = processGPX.ProcessFileFromName(IdSitioTuristico + ".gpx");
            string jsonTrkSeg = string.Join(", ", gpxCls.gpx.TrkGPX.TrksegGPX.TrkSegList);

            StoredParams jsonTrkSegParam = new StoredParams
            {
                Name = "jsonTrkSeg",
                Value = jsonTrkSeg
            };
            StoredParams IdSitioTuristicoParam = new StoredParams
            {
                Name = "IdSitioTuristico",
                Value = IdSitioTuristico.ToString()
            };

            List<StoredParams> StoredParams = new List<StoredParams> { jsonTrkSegParam, IdSitioTuristicoParam };
            StoredObjectParams StoredObjectParams = new StoredObjectParams
            {
                StoredProcedureName = "GuardarPuntosSenderismo",
                StoredParams = StoredParams
            };
            StoredObjectResponse storedObjectResponse = ExecuteStoredProcedure(StoredObjectParams);
            return storedObjectResponse.ValueResponse;
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