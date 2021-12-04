agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp.religiousController', [])
    .controller('religiousController', religiousController);

religiousController.$inject = ['$scope', '$window', '$filter', '$timeout', '$location', 'GeneralService'];

function religiousController($scope, $window, $filter, $timeout, $location, GeneralService) {
    let ctrl = this;
    ctrl.religiousData = [];
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

    //Extension de los tipo array para hacer sumatoria por alguna propiedad
    Array.prototype.sum = function (prop) {
        let total = 0
        for (let i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop]
        }
        return total
    }

    //Funcion para calcular el total del footer
    ctrl.calculateTotal = function () {
        ctrl.religiousGrid.pinnedBottomRowData[0].TotalValue = $scope.data.sum("TotalValue");
        ctrl.religiousGrid.api.refreshCells();
    }

    //Funcion para auto ajustar el tamano de columnas
    ctrl.resizeGrid = function () {
        $timeout(function () {
            ctrl.religiousGrid.api.sizeColumnsToFit();
        }, 400);
    }

    ctrl.getDataReligious = function () {
        let StoredObjectParams =
        {
            "StoredParams": [{ "Name": "IdMunicipio", "Value": "-1" }, { "Name": "CodigoTipoSitio ", "Value": 'RGS' }],
            "StoredProcedureName": "ObtenerSitiosTuristicos"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/PostJWT',
            data: StoredObjectParams,
            success: function (response) {
                if (response.exception == null) {
                    ctrl.religiousGrid.api.setRowData([]);
                    ctrl.religiousData = ctrl.transformRespond(response.value[0]);
                    ctrl.religiousGrid.api.setRowData(ctrl.religiousData);
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

    //Funcion para dar formatos de fechas
    function shortDateFormat(data) {
        return $filter('date')(data.value, 'MM/dd/yyyy')
    }

    //Definicion de columnas
    ctrl.columns = [
        {
            headerName: '',
            field: 'Select',
            headerCheckboxSelectionFilteredOnly: true,
            suppressMenu: true,
            headerCheckboxSelection: true,
            sortable: false,
            checkboxSelection: true,
            width: 45,
            cellStyle: { "display": "flex", "justify-content": "center", "align-items": "center", 'cursor': 'pointer' },
            editable: false,
            maxWidth: 45,
        },
        {
            headerName: "Nombre",
            field: "NombreSitioTuristicoESP",
            width: 110,
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Descripcion",
            field: "DescripcionESP",
            width: 120,
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Presentacion",
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
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true,
            valueFormatter: shortDateFormat,
        },
        {
            headerName: "Longitud",
            field: "Longitud",
            width: 100,
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true
        },

        {
            headerName: "Icono marcador",
            field: "IconoMarcador",
            width: 120,
            cellStyle: { 'text-align': 'right' },
            sortable: true,
            resizable: true,
            editable: false,
            filter: true
        },
        {
            headerName: "",
            field: "Options",
            width: 200,
            cellStyle: { 'text-align': 'center' },
            resizable: true,
            editable: false,
            sortable: false,
            suppressMenu: true,
            cellRenderer: function (params) {
                if (params.node.rowPinned) {
                    return '';
                }
                return '<span class="material-icons">update</span> <span class="material-icons">delete</span>'
            }
        },
    ]

    //Definicion del grid
    ctrl.religiousGrid = {
        columnDefs: ctrl.columns,
        rowData: [],
        onGridReady: function (params) { },
        animateRows: true,
        rowSelection: 'multiple',
        onRowSelected: onRowSelected,
        defaultColDef: {
            editable: true,
        },
        stopEditingWhenGridLosesFocus: true,
        suppressRowClickSelection: true,
        onColumnMoved: onColumnMoved,
        onColumnVisible: columnVisible,
    }

    Array.prototype.sum = function (prop) {
        let total = 0
        for (let i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop]
        }
        return total
    }

    //Evento que se ejecuta cuando se selecciona una fila
    function onRowSelected() {
        $scope.totalSelected = ctrl.religiousGrid.api.getSelectedRows().sum('TotalValue');
        $scope.$apply();
    }

    //Evento que se ejecuta cuando una columna cambia de posicion
    function onColumnMoved(params) {
        setStorage('columnState', JSON.stringify(params.columnApi.getColumnState()));
    }

    //Evento que se ejecuta cuando se cambia el estado visible de una columna
    function columnVisible(params) {
        setStorage('columnState', JSON.stringify(params.columnApi.getColumnState()));
        $scope.resizeGrid();
    }

    angular.element(document).ready(function () {
        ctrl.getDataReligious();;
    });
}
