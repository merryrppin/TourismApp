agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp.gastronomyController', [])
    .controller('gastronomyController', gastronomyController);

gastronomyController.$inject = ['$scope', '$window', '$location', 'GeneralService'];

function gastronomyController($scope, $window, $location, GeneralService) {

    //Definicion de columnas
    $scope.columns = [
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
            headerName: "",
            field: "Options",
            width: 60,
            cellStyle: { 'text-align': 'center' },
            resizable: true,
            editable: false,
            sortable: false,
            suppressMenu: true,
            cellRenderer: function (params) {
                if (params.node.rowPinned) {
                    return '';
                }
                return '<span class="material-icons">create</span> <span class="material-icons">delete</span>'
            }
        },
        {
            headerName: "Nombre",
            field: "Nombre",
            width: 110,
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Descripcion",
            field: "Descripcion",
            width: 120,
            cellStyle: { 'text-align': 'center' },
            sortable: true,
            resizable: true,
            filter: true
        },
        {
            headerName: "Presentacion",
            field: "Presentacion",
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
            field: "Ruta",
            width: 120,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            filter: true,
            tooltipField: "CustomerName",
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
            valueFormatter: calculateCurrency,
            editable: false,
            filter: true
        },
        {
            headerName: "Edicion",
            field: "Edicion",
            width: 150,
            cellStyle: { 'text-align': 'left' },
            sortable: true,
            resizable: true,
            valueFormatter: calculateCurrency,
            editable: false,
            cellRenderer: function (params) {

                if (params.node.rowPinned) {
                    return '';
                }

                return '<input class="gridInputText" type="textbox" />'
            }
        },
    ]

    //Definicion del grid
    $scope.myGrid = {
        columnDefs: $scope.columns,
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

    //Evento que se ejecuta cuando se selecciona una fila
    function onRowSelected() {
        $scope.totalSelected = $scope.myGrid.api.getSelectedRows().sum('TotalValue');
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
        $scope.getData();
    });

    $scope.transformRespond = function (Data) {
        var Result = [];
        var Columns = Data.Columns;
        var Rows = Data.Rows

        for (var i = 0; i < Rows.length; i++) {

            var Value = {}

            for (var j = 0; j < Columns.length; j++) {

                var ColumnName = Columns[j];
                var ColumnIndex = j;

                Value[ColumnName] = Rows[i][j];

            }
            Result.push(Value);
        }
        return Result;
    }

    Array.prototype.sum = function (prop) {
        var total = 0
        for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop]
        }
        return total
    }

    //Funcion para auto ajustar el tamano de columnas
    $scope.resizeGrid = function () {
        $timeout(function () {
            $scope.myGrid.api.sizeColumnsToFit();
        }, 400);
    }


    window.onresize = function (event) {
        var offsetDivGrid = $("#divData").offset();
        var heightPage = $(document).height();
        document.getElementById("divData").style.height = (heightPage - offsetDivGrid.top - 15) + "px";
    }

    //Funcion para dar formato de dinero
    function calculateCurrency(params) {
        return $filter('currency')((params.value == null) ? 0 : params.value, '$', 2);
    }

    //Funcion para dar formatos de fechas
    function shortDateFormat(data) {
        return $filter('date')(data.value, 'MM/dd/yyyy')
    }
}
