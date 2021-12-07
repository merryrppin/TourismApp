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
            GpxCls GpxObject = JsonToObject(jsonFromXML);
            return GpxObject;
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
            string jsonText = JsonConvert.SerializeXmlNode(doc);

            return jsonText;
        }

        private GpxCls JsonToObject(string json)
        {
            GpxCls GpxClsObj = (GpxCls)JsonConvert.DeserializeObject(json);
            return GpxClsObj;
        }
    }
}
