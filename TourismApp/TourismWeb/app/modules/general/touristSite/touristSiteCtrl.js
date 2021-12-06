agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp.touristSiteController', [])
    .controller('touristSiteController', touristSiteController);

touristSiteController.$inject = ['$scope', '$rootScope', '$window', '$filter', '$timeout', '$location', 'GeneralService'];

function touristSiteController($scope, $rootScope, $window, $filter, $timeout, $location, GeneralService) {
    let ctrl = this;
    ctrl.religiousData = [];
    ctrl.nameSite = $location.$$search.param.Name == undefined ? '' : $location.$$search.param.Name
    ctrl.title = `Sitio turistico ${ctrl.nameSite}`;

    ctrl.transformRespond = function (Data) {
        let Result = [];
        let Columns = Data.columns;
        let Rows = Data.rows

        for (let i = 0; i < Rows.length; i++) {

            let Value = {}

            for (let j = 0; j < Columns.length; j++) {
                let ColumnName = Columns[j];
                Value[ColumnName] = Rows[i][j];
            }
            Result.push(Value);
        }
        return Result;
    };

    ctrl.saveTouristSite = function () {

        let objTouristSite = [
            {
                "IdSitioTuristico": 4,
                "NombreSitioTuristicoESP": ctrl.siteNameESP,
                "NombreSitioTuristicoENG": ctrl.siteNameENG,
                "IdMunicipio": 1,
                "Latitud": ctrl.routeLatitude,
                "Longitud": ctrl.RouteLength,
                "IconoMarcador": "https://webflowers-wmalpha-rf.azurewebsites.net/Images/shopping-cart.png",
                "Activo": 1,
                "DescripcionESP": ctrl.descriptionESP,
                "DescripcionENG": ctrl.descriptionENG,
                "PresentacionESP": ctrl.presentationNameESP,
                "PresentacionENG": ctrl.presentationNameENG,
                "RutaESP": ctrl.routeESP,
                "RutaENG": ctrl.routeENG
            }
        ];

        let objTimes =
        {
            "Horario": [
                {
                    "IdHorario": 1,
                    "IdSitioTuristico": 1,
                    "IdDiaSemana": 2,
                    "NombreDia": "Lunes",
                    "Horas": "10:30 , 12:30"
                },
                {
                    "IdHorario": 1,
                    "IdSitioTuristico": 1,
                    "IdDiaSemana": 6,
                    "NombreDia": "Viernes",
                    "Horas": "02:30 , 06:30"
                },
                {
                    "IdHorario": 1,
                    "IdSitioTuristico": 1,
                    "IdDiaSemana": 1,
                    "NombreDia": "Domingo",
                    "Horas": "02:30 , 06:30"
                }
            ]
        };

        let objPhotoGallery =
        {
            "Galeria": [
                {
                    "IdGaleriaFoto": 1,
                    "IdSitioTuristico": 1,
                    "Nombre": "foto 1",
                    "UrlFoto": "https://webflowers-wmalpha-rf.azurewebsites.net/Images/shopping-cart.png"
                },
                {
                    "IdGaleriaFoto": 2,
                    "IdSitioTuristico": 1,
                    "Nombre": "foto 2",
                    "UrlFoto": "https://webflowers-wmalpha-rf.azurewebsites.net/Images/shopping-cart.png"
                }
            ]
        };

        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "jsonSitioTuristico", "Value": JSON.stringify(objTouristSite) },
                { "Name": "jsonHorarios ", "Value": JSON.stringify(objTimes) },
                { "Name": "jsonFotos ", "Value": JSON.stringify(objPhotoGallery) },
                { "Name": "CodigoTipoSitio", "Value": $location.$$search.param.Code },
                { "Name": "Usuario", "Value": "jsanchez" }
                
            ],
            "StoredProcedureName": "GuardarSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.religiousData = ctrl.transformRespond(response.value[0]);

                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };
}
