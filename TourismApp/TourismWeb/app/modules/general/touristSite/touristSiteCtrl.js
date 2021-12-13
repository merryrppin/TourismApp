agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp.touristSiteController', [])
    .controller('touristSiteController', touristSiteController);

touristSiteController.$inject = ['$scope', 'UserService', '$rootScope', '$window', '$filter', '$timeout', '$location', 'GeneralService'];

function touristSiteController($scope, UserService, $rootScope, $window, $filter, $timeout, $location, GeneralService) {
    let ctrl = this;
    ctrl.religiousData = [];
    ctrl.nameSite = $location.$$search.param.Name == undefined ? '' : $location.$$search.param.Name
    ctrl.title = `Sitio turistico ${ctrl.nameSite}`;
    ctrl.selectedDays = [];
    ctrl.selectedHours = [];
    ctrl.defaultTime = {};
    ctrl.newTimes = [ctrl.defaultTime];
    ctrl.IdSitioTuristico = '';
    ctrl.uploading = false;
    ctrl.countFiles = '';
    ctrl.data = [];
    ctrl.formdata = new FormData();
    ctrl.selectedOptionTown = { IdMunicipio: null, NombreMunicipio: '' };
    ctrl.showHeking = false;

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
            url: `https://localhost:44355/api/tourism/OnPostUploadAsync?typeSite=${fileName}`,  //`${UserService.ApiUrl}/OnPostUploadAsync?typeSite=${fileName}`, -- No esta guardado el archivo a través del api
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
                { "Name": "Usuario", "Value": $window.localStorage.getItem('userName') }
            ],
            "StoredProcedureName": "GuardarGaleriaFotos"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
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
        ctrl.newTimes.push(ctrl.defaultTime);
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

    function isValidSaved() {
        if (ctrl.siteNameESP == null || ctrl.descriptionESP == null || ctrl.routeESP == null || ctrl.DireccionESP == null || ctrl.selectedOptionTown.IdMunicipio == null || ctrl.presentationNameESP == null) {
            alert("Falta información");
            return false;
        }

        if (ctrl.siteNameESP == '' || ctrl.descriptionESP == '' || ctrl.routeESP == '' || ctrl.DireccionESP == '' || ctrl.selectedOptionTown.IdMunicipio == '' || ctrl.presentationNameESP == '') {
            alert("Falta información");
            return false;
        }

        return true;
    }

    ctrl.saveTouristSite = function () {

        if (!isValidSaved()) {
            return;
        }

        let objTimes = [];
        let objTouristSite = [];

        $location.$$search.param.Name == undefined ? '' : $location.$$search.param.Name

        objTouristSite = [
            {
                "IdSitioTuristico": ctrl.IdSitioTuristico == '' ? null : parseInt(ctrl.IdSitioTuristico),
                "NombreSitioTuristicoESP": ctrl.siteNameESP,
                "NombreSitioTuristicoENG": ctrl.siteNameENG,
                "IdMunicipio": ctrl.selectedOptionTown.IdMunicipio,
                "Latitud": ctrl.routeLatitude,
                "Longitud": ctrl.RouteLength,
                "IconoMarcador": "",
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
                objTimes.push({ "IdHorario": (days.IdHorario == undefined ? null : parseInt(days.IdHorario)), "IdSitioTuristico": (ctrl.IdSitioTuristico == '' ? null : parseInt(ctrl.IdSitioTuristico)), "IdDiaSemana": days.IdDiaSemana, "NombreDia": days.NombreDiaESP, "Horas": ctrl.selectedHours[inx] });
            });
        });

        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "jsonSitioTuristico", "Value": JSON.stringify(objTouristSite) },
                { "Name": "jsonHorarios ", "Value": JSON.stringify(objTimes) },
                { "Name": "CodigoTipoSitio", "Value": $location.$$search.param.Code },
                { "Name": "Usuario", "Value": $window.localStorage.getItem('userName')   },
                { "Name": "IdSitioTuristico", "Value": ctrl.IdSitioTuristico == '' ? null : ctrl.IdSitioTuristico.toString() }

            ],
            "StoredProcedureName": "GuardarSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
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

        let StoredObjectParams =
        {
            "StoredParams": [],
            "StoredProcedureName": "ObtenerMunicipios"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
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
            url: `${UserService.ApiUrl}/PostJWT`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.weekdays = ctrl.transformRespond(response.value[0]);
                    ctrl.selectionWeekDays = ctrl.weekdays;
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };

    function fillLoadData() {
        if ($location.$$search.param.Code == null || $location.$$search.param.Code == undefined) {
            $location.path('/home');
        }

        if ($location.$$search.param.data != undefined) {
            let modifiedSite = $location.$$search.param.data;
            ctrl.IdSitioTuristico = modifiedSite.IdSitioTuristico;
            ctrl.siteNameESP = modifiedSite.NombreSitioTuristicoESP;
            ctrl.siteNameENG = modifiedSite.NombreSitioTuristicoENG;
            ctrl.selectedOptionTown.IdMunicipio = modifiedSite.IdMunicipio;
            ctrl.routeLatitude = modifiedSite.Latitud;
            ctrl.RouteLength = modifiedSite.Longitud;
            ctrl.descriptionESP = modifiedSite.DescripcionESP;
            ctrl.descriptionENG = modifiedSite.DescripcionENG;
            ctrl.presentationNameESP = modifiedSite.PresentacionESP;
            ctrl.presentationNameENG = modifiedSite.PresentacionENG;
            ctrl.routeESP = modifiedSite.RutaESP;
            ctrl.routeENG = modifiedSite.RutaENG;
            ctrl.DireccionESP = modifiedSite.DireccionESP;
            ctrl.DireccionENG = modifiedSite.DireccionENG;
        }

        if ($location.$$search.param.time != undefined) {
            let modifiedTime = $location.$$search.param.time;
            ctrl.newTimes = modifiedTime;
            angular.forEach(ctrl.newTimes, function (time, inx) {
                ctrl.selectedDays.push({ NombreDiaESP: time.NombreDiaESP, IdDiaSemana: time.IdDiaSemana, IdHorario: time.IdHorario });
                ctrl.selectedHours.push(time.Horario);
            });
            const countDistinctTime = [...new Set(ctrl.newTimes.map(x => x.Horario))];
            ctrl.newTimes = [];
            countDistinctTime.forEach(function (dist, ind) {
                ctrl.newTimes.push(ctrl.defaultTime);
            });

            if (countDistinctTime.length == 0) {
                ctrl.newTimes.push(ctrl.defaultTime);
            };

        }

        if ($location.$$search.param.Code == 'SDM') {
            ctrl.showHeking = true;
        }

    }

    angular.element(document).ready(function () {
        fillLoadData();
        ctrl.getTowns();
        ctrl.getWeekDays();
    });
}
