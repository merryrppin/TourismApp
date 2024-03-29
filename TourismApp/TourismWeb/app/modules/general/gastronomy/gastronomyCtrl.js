﻿agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp.gastronomyController', [])
    .controller('gastronomyController', gastronomyController);

gastronomyController.$inject = ['$scope', 'UserService', '$window', '$filter', '$timeout', '$location', 'GeneralService'];

function gastronomyController($scope, UserService,$window, $filter, $timeout, $location, GeneralService) {
    let ctrl = this;
    ctrl.CodeGastronomy = 'GTM';
    ctrl.gastronomyData = [];
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

    ctrl.resizeGrid = function () {
        $timeout(function () {
            ctrl.gastronomyGrid.api.sizeColumnsToFit();
        }, 400);
    }

    ctrl.addNewSite = function () {
        let newSite = { 'Code': ctrl.CodeGastronomy, 'Name': 'Gastronómicos', 'fileName': 'gastronomy' };
        $location.path('/touristSite/GTM').search({ param: newSite });
    }

    ctrl.modifiedSite = function (ev, data) {
        let modifiedSite = { 'Code': ctrl.CodeGastronomy, 'Name': 'Gastronómicos', 'fileName': 'gastronomy', 'data': data};
        $location.path('/touristSite/GTM').search({ param: modifiedSite });
    }

    ctrl.getDatastronomy = function () {
        let StoredObjectParams =
        {
            "StoredParams": [{ "Name": "IdMunicipio", "Value": "-1" }, { "Name": "CodigoTipoSitio ", "Value": ctrl.CodeGastronomy  }],
            "StoredProcedureName": "ObtenerSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.gastronomyGrid.api.setRowData([]);
                    ctrl.gastronomyData = ctrl.transformRespond(response.value[0]);
                    ctrl.gastronomyGrid.api.setRowData(ctrl.gastronomyData);
                    ctrl.resizeGrid();
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                }
            }
        });
    };

    window.onresize = function (event) {
        let offsetDivGrid = $("#divData").offset();
        let heightPage = $(document).height();
        document.getElementById("divData").style.height = (heightPage - offsetDivGrid.top - 15) + "px";
    }

    ctrl.columns = [
        {
            headerName: "Nombre",
            field: "NombreSitioTuristicoESP",
            width: 110,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Descripción",
            field: "DescripcionESP",
            width: 120,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Presentación",
            field: "PresentacionESP",
            width: 120,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true,
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
                cellHeight: 50,
                values: ['ARM', 'PRI', 'FLB'],
            },
        },
        {
            headerName: "Como llegar",
            field: "RutaESP",
            width: 120,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true,
            tooltipField: "Ruta",
            cellEditor: 'agLargeTextCellEditor',
        },
        {
            headerName: "Latitud",
            field: "Latitud",
            width: 100,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true,
        },
        {
            headerName: "Longitud",
            field: "Longitud",
            width: 100,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Dirección",
            field: "DireccionESP",
            width: 120,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            editable: false,
            filter: true
        },
        {
            headerName: "Edición",
            field: "Options",
            width: 150,
            cellStyle: { 'text-align': 'left' },
            resizable: true,
            editable: false,
            sortable: false,
            suppressMenu: true,
            cellRenderer: function (params) {
                if (params.node.rowPinned) {
                    return '';
                }
                return "<span title='actualizar' class='material-icons' ng-click='ctrl.modifiedSite($event, this.data)'>edit</span> <span style='margin-left: 15px;'  title='Eliminar' ng-click='ctrl.delete($event, this.data)' class='material-icons'>delete</span>"
            }
        },
    ]


    ctrl.delete = function (ev, data) {
        toastr.warning("Las imagenes e información asociada a este sitio turistico sera eliminada al precionar el botón ok");
        if (!window.confirm("Esta seguro de eliminar el sitio turistico seleccionado?")) {
            return;
        }

        let StoredObjectParams =
        {
            "StoredParams":
                [
                    { "Name": "IdSitioTuristico", "Value": data.IdSitioTuristico.toString() },
                    { "Name": "Usuario", "Value": $window.localStorage.getItem('userName') }
                ],
            "StoredProcedureName": "EliminarSitioTuristico"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/PostJWT`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                if (response.exception == null) {
                    ctrl.response = response;
                    ctrl.getDatastronomy();
                    ctrl.uploading = false;
                    toastr.success("Sitio eliminado correctamente");
                } else {
                    ctrl.messageLoginInvalid = 'No se encontraron datos';
                    ctrl.uploading = false;
                }
            }
        });
    };

    ctrl.gastronomyGrid = {
        columnDefs: ctrl.columns,
        rowData: [],
        onGridReady: function (params) { },
        animateRows: true,
        rowSelection: 'multiple',
        defaultColDef: {
            editable: true,
        },
        stopEditingWhenGridLosesFocus: true,
        suppressRowClickSelection: true,
        angularCompileRows: true
    }

    Array.prototype.sum = function (prop) {
        let total = 0
        for (let i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop]
        }
        return total
    };

    angular.element(document).ready(function () {
        ctrl.getDatastronomy();
    });
}
