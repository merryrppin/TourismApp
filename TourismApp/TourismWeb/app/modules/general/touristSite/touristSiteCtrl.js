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
    ctrl.IdSitioTuristico = '';

    ctrl.uploading = false;
    ctrl.countFiles = '';
    ctrl.data = [];
    ctrl.formdata = new FormData();

    ctrl.getFiles = function (file) {
        if (ctrl.IdSitioTuristico != null && ctrl.IdSitioTuristico != '' && ctrl.IdSitioTuristico != undefined) {
            angular.forEach(file, function (value, key) {
                const renamedFile = new File([value], `${ctrl.IdSitioTuristico}_${value.name}`);
                ctrl.formdata.append("files", renamedFile);
                ctrl.data.push({ FileName: value.name, FileLength: value.size });
            });
            ctrl.countFiles = ctrl.data.length == 0 ? '' : ctrl.data.length + ' files selected';
            $scope.$apply();
            ctrl.formdata.append('countFiles', ctrl.countFiles);
        } else {
            alert("Debe guardar cambios para subir la imagen"); //TODO organizar mensajes
        }
    };

    ctrl.uploadFiles = function () {
        let fileName = $location.$$search.param.fileName;

        ctrl.uploading = true;
        GeneralService.executeAjax({
            url: `https://localhost:44355/api/tourism/OnPostUploadAsync?typeSite=${fileName}`,
            data: ctrl.formdata,
            contentType: undefined,
            dataType: false,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.uploading = false;
                    ctrl.countFiles = '';
                    ctrl.data = [];
                    ctrl.formdata = new FormData();

                    if (response.count > 0) {
                        ctrl.savePhotoGallery(response);
                    }

                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                    ctrl.uploading = false;
                }
            }
        });
    };

    ctrl.savePhotoGallery = function (responseUploadImage) {
        ctrl.uploading = true;
        let objTimes = [];
        responseUploadImage.filePaths.forEach(path => {
            objTimes.push({ "IdGaleriaFoto": null, "IdSitioTuristico": ctrl.IdSitioTuristico, "UrlFoto": path });
        });

        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "jsonFotos ", "Value": JSON.stringify(objTimes) },
                { "Name": "Usuario", "Value": "jsanchez" }
            ],
            "StoredProcedureName": "GuardarGaleriaFotos"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.response = response;
                    ctrl.uploading = false;
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                    ctrl.uploading = false;
                }
            }
        });
    };


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
                "RutaENG": ctrl.routeENG,
                "DireccionESP": ctrl.DireccionESP,
                "DireccionENG": ctrl.DireccionENG
            }
        ];

        angular.forEach(ctrl.selectedDays, function (times, inx) {
            angular.forEach(times, function (days) {
                objTimes.push({ "IdHorario": null, "IdSitioTuristico": null, "IdDiaSemana": days.IdDiaSemana, "NombreDia": days.NombreDiaESP, "Horas": ctrl.selectedHours[inx] });
            });
        });


        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "jsonSitioTuristico", "Value": JSON.stringify(objTouristSite) },
                { "Name": "jsonHorarios ", "Value": JSON.stringify(objTimes) },
                { "Name": "CodigoTipoSitio", "Value": $location.$$search.param.Code },
                { "Name": "Usuario", "Value": "jsanchez" },
                { "Name": "IdSitioTuristico", "Value": null }

            ],
            "StoredProcedureName": "GuardarSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.IdSitioTuristico = parseInt(response.value[0].rows[0]);
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
            dataType: 'json',
            contentType: 'application/json',
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
            dataType: 'json',
            contentType: 'application/json',
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

        if ($location.$$search.param.Code == null || $location.$$search.param.Code == undefined) {
            $location.path('/home');
        }

        ctrl.getTowns();
        ctrl.getWeekDays();

    });
}
