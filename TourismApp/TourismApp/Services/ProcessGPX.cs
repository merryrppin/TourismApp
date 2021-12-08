using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using TourismApp.Services.Entities.GPXEntities;

namespace TourismApp.Services
{
    public class ProcessGPX
    {
        public GpxCls ProcessFileFromName(string fileName)
        {
            //string fileInfoXML = DeserializeFileGPX(fileName);
            string jsonFromXML = ConvertXMLtoJSON(fileName);
            return JsonToObject(jsonFromXML);
        }

        //private string DeserializeFileGPX(string fileName)
        //{
        //    string path = "files/tmpGPX/" + fileName;
        //    string fileInfo = "";

        //    using (FileStream fs = File.Open(path, FileMode.Open))
        //    {
        //        byte[] b = new byte[1024];
        //        UTF8Encoding temp = new UTF8Encoding(true);

        //        while (fs.Read(b, 0, b.Length) > 0)
        //        {
        //            fileInfo += temp.GetString(b);
        //        }
        //    }
        //    return fileInfo;
        //}

        private string ConvertXMLtoJSON(string fileName)
        {
            string path = "files/tmpGPX/" + fileName;
            XmlDocument doc = new XmlDocument();
            //string _byteOrderMarkUtf8 = Encoding.UTF8.GetString(Encoding.UTF8.GetPreamble());
            //if (xml.StartsWith(_byteOrderMarkUtf8))
            //{
            //    xml = xml.Remove(0, _byteOrderMarkUtf8.Length);
            //}
            doc.Load(path);
            return JsonConvert.SerializeXmlNode(doc);
        }

        private GpxCls JsonToObject(string json)
        {
            return JsonConvert.DeserializeObject<GpxCls>(json);
        }
    }
}
