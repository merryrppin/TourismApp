angular.module("tourismApp")
    .factory('GeneralService', ['$http', '$rootScope', '$window', GeneralService]);
function GeneralService($http, $rootScope, $window) {
    var generalService = {};

    generalService.autentication = { isAuthenticated: false, showPanel: false };
    generalService.userLogin = null;

    generalService.executeAjax = function (data) {
        var options = angular.extend({}, {
            'method': "POST",
            'url': data.url,
            'params': "",
            'data': data.data,
            'async': true,
            'carga': true,
            'success': function () { },
            'confirmation': false,
            'funcionCorrecto': function () { },
            'funcionIncorrecto': function () { },
            'spinner': true,
            'mapData': true,
            'dataType': data.dataType,
            'contentType': data.contentType,
            'Authorization': $window.localStorage.getItem('token')
        }, data);
        $http({
            method: options.method,
            async: options.async,
            url: options.url,
            params: options.params,
            data: options.data,
            headers: {
                'Content-Type': options.contentType
                , 'Authorization': `Bearer  ${options.Authorization}`
            },
            dataType: options.dataType,
        }).then(function (response) {
            if (typeof response === 'undefined' || (typeof response.data.Exception !== 'undefined' && response.data.Exception !== null)) {
                var errorMessage = typeof response === 'undefined' ? aLanguage.generalError : response.data.Exception.Message;
                generalService.showToastR({
                    body: errorMessage,
                    type: 'error'
                });
                return;
            } else {
                if (options.confirmation) {
                    if (response.data === true) {
                        generalService.showToastR({
                            body: aLanguage.generalSuccess
                        });
                        options.funcionCorrecto(response.data);
                    }
                    else {
                        generalService.showToastR({
                            body: aLanguage.generalError,
                            type: 'error'
                        });
                        options.funcionIncorrecto();
                    }
                }
            }
            if (options.mapData && response.data.Value !== null) {
                var dataResponseMapped = [];
                $.each(response.data.Value, function (i, objValue) {
                    var objValueMapped = angular.copy(objValue);
                    objValueMapped.DataMapped = [];
                    var aColumns = objValue.Columns;
                    var aRows = objValue.Rows;
                    $.each(aRows, function (j, objRow) {
                        var objRowMapped = {};
                        $.each(aColumns, function (k, objColumn) {
                            objRowMapped[objColumn] = objRow[k];
                        });
                        objValueMapped.DataMapped.push(objRowMapped);
                    });
                    dataResponseMapped.push(objValueMapped);
                });
                if (typeof response.data.Value !== 'undefined')
                    response.data.Value = angular.copy(dataResponseMapped);
            }
            options.success(response.data);
        }).catch(function onError(response) {
            toastr.error(`Error ${response.data}` );

        });
    };

    generalService.showToastR = function (data) {
        var options = angular.extend({}, {
            'type': 'success',
            'title': '',
            'body': aLanguage.generalSuccess,
            'timeOut': '3000',
            'escapeHtml': false,
            'closeButton': true,
            'closeMethod': 'fadeOut',
            'closeDuration': 300,
            'closeEasing': 'swing',
            'onShown': function () { },
            'onHidden': function () { },
            'onclick': function () { },
            'onCloseClick': function () { },
            'preventDuplicates': true,
            'progressBar': false
        }, data);
        toastr.clear();
        switch (options.type) {
            case 'success':
                toastr.success(options.body, options.title, options);
                break;
            case 'error':
                toastr.error(options.body, options.title, options);
                break;
            case 'warning':
                toastr.warning(options.body, options.title, options);
                break;
            case 'info':
                toastr.info(options.body, options.title, options);
                break;
        }
    };

    generalService.showSweetAlert = function (data) {
        var options = angular.extend({}, {
            'icon': 'success',
            'title': '',
            'text': aLanguage.generalSuccess,
            'showConfirmButton': true,
            'showCancelButton': false,
            'confirmButtonColor': '#3085d6',
            'cancelButtonColor': '#d33',
            'confirmButtonText': aLanguage.yes,
            'cancelButtonText': aLanguage.no,
            'footer': '',
            'funcIsConfirmed': function () { },
            'funcCancel': function () { },
            'funcTimer': function () { },
        }, data);
        Swal.fire({
            icon: options.icon,
            title: options.title,
            text: options.text,
            showConfirmButton: options.showConfirmButton,
            showCancelButton: options.showCancelButton,
            confirmButtonColor: options.confirmButtonColor,
            cancelButtonColor: options.cancelButtonColor,
            confirmButtonText: options.confirmButtonText,
            cancelButtonText: options.cancelButtonText,
            footer: options.footer
        }).then((result) => {
            if (result.isConfirmed) {
                options.funcIsConfirmed();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                options.funcCancel();
            } else if (result.dismiss === Swal.DismissReason.timer) {
                options.funcTimer();
            }
        });
    };

    //BEGIN General Buttons
    generalService.hideGeneralButtons = function () {
        $rootScope.showNewButton = false;
        $rootScope.showSaveButton = false;
        $rootScope.showClearButton = false;
        $rootScope.showCancelButton = false;
        $rootScope.showPrintButton = false;
        $rootScope.cancelBtnFunction = function (validateForm) {
            if (typeof validateForm === 'undefined' || (typeof validateForm !== 'undefined' && validateForm())) {
                $window.history.back();
            }
        };
    };
    //END General Buttons

    generalService.hideGeneralButtons();

    return generalService;
}