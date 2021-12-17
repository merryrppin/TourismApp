agGrid.initialiseAgGridWithAngular1(angular);
angular
    .module('tourismApp.touristSiteController', [])
    .controller('touristSiteController', touristSiteController);

touristSiteController.$inject = ['$scope', 'UserService', '$rootScope', '$window', '$filter', '$timeout', '$location', 'GeneralService'];

function touristSiteController($scope, UserService, $rootScope, $window, $filter, $timeout, $location, GeneralService) {
    let ctrl = this;
    ctrl.religiousData = [];
    ctrl.DefaultCode = null;

    if ($location.$$path != '/touristSite/:DEF') {
        ctrl.nameSite = $location.$$search.param.Name == undefined ? '' : $location.$$search.param.Name;
    } else {
        ctrl.nameSite = 'oficial'
        ctrl.DefaultCode = 'DEF';
    }

    ctrl.title = `Sitio turistico ${ctrl.nameSite}`;
    ctrl.selectedDays = [];
    ctrl.selectedHours = [];
    ctrl.defaultTime = {};
    ctrl.newTimes = [ctrl.defaultTime];
    ctrl.IdSitioTuristico = '';
    ctrl.uploading = false;
    ctrl.countFiles = '';
    ctrl.countFilesGpx = '';
    ctrl.data = [];
    ctrl.dataGpx = [];
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

    function isValidFileGpx(file) {
        if (ctrl.IdSitioTuristico == null || ctrl.IdSitioTuristico == '' || ctrl.IdSitioTuristico == undefined) {
            alert("Debe guardar cambios para subir la imagen"); //TODO organizar mensajes
            return false;
        }

        if (file.length > 1) {
            alert("Solo esta permitido subir una única imagen"); //TODO organizar mensajes
            return false;
        }

        if (file[0].name.split('.').pop() != 'gpx') {
            alert("Solo esta permitido subir una imagen con extensión .gpx"); //TODO organizar mensajes
            return false;
        }
        return true;
    }

    ctrl.getFileGpx = function (file) {

        if (!isValidFileGpx(file)) {
            return;
        }

        angular.forEach(file, function (value, key) {
            const renamedFile = new File([value], `${ctrl.IdSitioTuristico}.${value.name.split('.').pop()}`);
            ctrl.formdata.append("files", renamedFile);
            ctrl.dataGpx.push({ FileName: value.name, FileLength: value.size });
        });
        ctrl.countFilesGpx = ctrl.dataGpx.length == 0 ? '' : ctrl.dataGpx.length + ' files selected';
        $scope.$apply();
        ctrl.formdata.append('countFiles', ctrl.countFilesGpx);
    };

    ctrl.uploadFiles = function (path) {
        ctrl.pathFile = path;
        let fileName = '';

        if (ctrl.DefaultCode == null) {
            fileName = path == '' ? $location.$$search.param.fileName : path;
        } else {
            fileName = 'Default'
        }

        ctrl.uploading = true;
        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/OnPostUploadAsync?typeSite=${fileName}&turistSiteId=${ctrl.IdSitioTuristico}`,
            data: ctrl.formdata,
            contentType: undefined,
            dataType: false,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.uploading = false;
                    ctrl.countFiles = '';
                    ctrl.data = [];
                    ctrl.dataGpx = [];
                    ctrl.countFilesGpx = '';
                    ctrl.formdata = new FormData();
                    if (response.count > 0 && ctrl.pathFile != 'tmpGPX') {
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
            alert("Falta información por digitar, los sitios marcados con * son campos obligatorios");
            return false;
        }

        if (ctrl.siteNameESP == '' || ctrl.descriptionESP == '' || ctrl.routeESP == '' || ctrl.DireccionESP == '' || ctrl.selectedOptionTown.IdMunicipio == '' || ctrl.presentationNameESP == '') {
            alert("Falta información por digitar, los sitios marcados con * son campos obligatorios");
            return false;
        }
        return true;
    }

    ctrl.saveTouristSite = function () {
        let objTouristSite = [];
        if (!isValidSaved()) {
            return;
        }

        objTouristSite = [
            {
                "IdSitioTuristico": ctrl.IdSitioTuristico == '' ? null : parseInt(ctrl.IdSitioTuristico),
                "NombreSitioTuristicoESP": ctrl.siteNameESP,
                "NombreSitioTuristicoENG": ctrl.siteNameENG == undefined ? null : ctrl.siteNameENG,
                "IdMunicipio": ctrl.selectedOptionTown.IdMunicipio,
                "Latitud": ctrl.routeLatitude == undefined ? null : ctrl.routeLatitude,
                "Longitud": ctrl.RouteLength == undefined ? null : ctrl.RouteLength,
                "IconoMarcador": "",
                "Activo": 1,
                "DescripcionESP": ctrl.descriptionESP,
                "DescripcionENG": ctrl.descriptionENG == undefined ? null : ctrl.descriptionENG,
                "PresentacionESP": ctrl.presentationNameESP,
                "PresentacionENG": ctrl.presentationNameENG == undefined ? null : ctrl.presentationNameENG,
                "RutaESP": ctrl.routeESP,
                "RutaENG": ctrl.routeENG == undefined ? null : ctrl.routeENG,
                "DireccionESP": ctrl.DireccionESP,
                "DireccionENG": ctrl.DireccionENG == undefined ? null : ctrl.DireccionENG,
                "Horario": ctrl.time == undefined ? null : ctrl.time
            }
        ];

        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "jsonSitioTuristico", "Value": JSON.stringify(objTouristSite) },
                { "Name": "CodigoTipoSitio", "Value": $location.$$search.param == undefined ? 'DEF' : $location.$$search.param.Code },
                { "Name": "Usuario", "Value": $window.localStorage.getItem('userName') },
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
                    ctrl.turistSiteSaved = ctrl.transformRespond(response.value[0]);
                    ctrl.IdSitioTuristico = parseInt(ctrl.turistSiteSaved[0].IdSitioTuristico);
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

    ctrl.getDataTouristSite = function () {
        let StoredObjectParams =
        {
            "StoredParams": [{ "Name": "IdMunicipio", "Value": "-1" }, { "Name": "CodigoTipoSitio ", "Value": ctrl.DefaultCode }],
            "StoredProcedureName": "ObtenerSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.touristSite = ctrl.transformRespond(response.value[0]);
                    fillLoadData(ctrl.touristSite[0]);
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };

    function fillLoadData(modifiedSite) {

        if (ctrl.DefaultCode == null) {
            if ($location.$$search.param.Code == null || $location.$$search.param.Code == undefined) {
                $location.path('/home');
            }
        }

        if ($location.$$search.param != undefined) {
            modifiedSite = $location.$$search.param.data;
        }

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
        ctrl.time = modifiedSite.Horario;

        if ($location.$$search.param.Code == 'SDM') {
            ctrl.showHeking = true;
        }
    }

    angular.element(document).ready(function () {
        if (ctrl.DefaultCode == null) {
            fillLoadData();
        } else {
            ctrl.getDataTouristSite();
        }
        ctrl.getTowns();
    });
}
