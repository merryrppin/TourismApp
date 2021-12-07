using Newtonsoft.Json;
using System;
using System.IO;
using System.Text;
using System.Xml;
using TourismApp.Services.Entities.GPXEntities;

namespace TourismApp.Services
{
    public class ProcessGPX
    {
        public GpxCls ProcessFileFromName(string fileName)
        {
            string fileInfoXML = DeserializeFileGPX(fileName);
            string jsonFromXML = ConvertXMLtoJSON(fileInfoXML);
            return JsonToObject(jsonFromXML);
        }

        private string DeserializeFileGPX(string fileName)
        {
            string path = "../files/tmpGPX/" + fileName;
            string fileInfo = "";

            using (FileStream fs = File.Open(path, FileMode.Open))
            {
                byte[] b = new byte[1024];
                UTF8Encoding temp = new UTF8Encoding(true);

                while (fs.Read(b, 0, b.Length) > 0)
                {
                    fileInfo += temp.GetString(b);
                }
            }
            return fileInfo;
        }

        private string ConvertXMLtoJSON(string xml)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xml);
            return JsonConvert.SerializeXmlNode(doc);
        }

        private GpxCls JsonToObject(string json)
        {
            return (GpxCls)JsonConvert.DeserializeObject(json);
        }
    }
}
