using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static TourismApp.Services.Enums.Enums;

namespace TourismApp.Services.Constants
{
    public class Constants
    {
        public static readonly Dictionary<int, string> ListErrors = new Dictionary<int, string>(){
            { (int)EnumGeneralErrors.GeneralError, "generalError" }
        };
    }
}
