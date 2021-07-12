using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TourismApp.Services.Entities;
using static TourismApp.Services.Enums.Enums;

namespace TourismApp.Services
{
    public class ManageExceptions
    {
        public void SaveLogException(Exception ex, GeneralResponse GeneralResponse = null)
        {
            if (GeneralResponse != null)
            {
                GeneralResponse.BooleanResponse = false;
                GeneralResponse.GeneralError = Constants.Constants.ListErrors[(int)EnumGeneralErrors.GeneralError];
            }
        }
    }
}

