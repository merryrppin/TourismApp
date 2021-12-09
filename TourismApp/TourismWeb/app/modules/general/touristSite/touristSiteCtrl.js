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
    ctrl.selectedDays = [];
    ctrl.selectedHours = [];
    let defaultTime = {};
    ctrl.newTimes = [defaultTime];


    ctrl.AddTime = function () {
        ctrl.newTimes.push(defaultTime);
    }

    ctrl.onTagAdded = function ($tag) {
        let weekSelected = (JSON.stringify($tag));
    }

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
        let objTimes = [];
        let objPhotoGallery = [];
        let objTouristSite = [];

        objTouristSite = [
            {
                "IdSitioTuristico": null,
                "NombreSitioTuristicoESP": ctrl.siteNameESP,
                "NombreSitioTuristicoENG": ctrl.siteNameENG,
                "IdMunicipio": ctrl.selectedOptionTown.IdMunicipio,
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

        angular.forEach(ctrl.selectedDays, function (times, inx) {
            angular.forEach(times, function (days) {
                objTimes.push({ "IdHorario": null, "IdSitioTuristico": null, "IdDiaSemana": days.IdDiaSemana, "NombreDia": days.NombreDiaESP, "Horas": ctrl.selectedHours[inx] });
            });
        });

        objTimes = { "Horario": [objTimes] }

        objPhotoGallery =
        {
            "Galeria": [
                {
                    "IdGaleriaFoto": 1,
                    "IdSitioTuristico": 1,
                    "Nombre": "foto 1",
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
                    ctrl.response = response;

                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };

    ctrl.getTowns = function () {
        ctrl.selectedOptionTown = { IdMunicipio: null, NombreMunicipio: '' };
        let StoredObjectParams =
        {
            "StoredParams": [],
            "StoredProcedureName": "ObtenerMunicipios"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.towns = ctrl.transformRespond(response.value[0]);
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };

    ctrl.getWeekDays = function () {
        ctrl.weekdays = [];
        let StoredObjectParams =
        {
            "StoredParams": [],
            "StoredProcedureName": "ObtenerDiasSemana"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.weekdays = ctrl.transformRespond(response.value[0]);
                    ctrl.invoiceSingleSelectionaccountlist = ctrl.weekdays;
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };


    angular.element(document).ready(function () {
        ctrl.getTowns();
        ctrl.getWeekDays();

    });
}
