angular
    .module('tourismApp.loginController', [])
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$window', '$location', 'GeneralService'];

function loginController($scope, $window, $location, GeneralService) {

    var ctrl = this;
    ctrl.IsValidMenu = false;
    ctrl.IsValid = false;
    ctrl.IsLoad = false;
    ctrl.messageLoginInvalid;
    $("aside").hide();

    ctrl.aside = 'app/modules/general/templates/aside.html';

    ctrl.LoginEntity = {
        user: '',
        password: '',
    }

    ctrl.loginUser = function (credentials) {
        if (ctrl.LoginEntity.user.lenght === 0) {
            ctrl.IsValid = true;
            ctrl.messageLoginInvalid = 'Ingrese su usuario';
            return;
        }
        else if (ctrl.LoginEntity.password === 0) {
            ctrl.IsValid = true;
            ctrl.messageLoginInvalid = 'Ingrese su contraseña';
            return;
        }

        ctrl.IsValid = false;
        ctrl.IsLoad = true;

        var StoredObjectParams =
        {
            "StoredParams": [{ "Name": "Email", "Value": ctrl.LoginEntity.user }, { "Name": "Password", "Value": ctrl.LoginEntity.password }],
            "StoredProcedureName": "ObtenerUsuario"
        }

        GeneralService.executeAjax({
            url: 'https://localhost:44355/api/tourism/Login',
            data: StoredObjectParams,
            success: function (response) {
                ctrl.IsLoad = false;
                if (response !== null && response !== '' && response.token !== null) {
                    ctrl.IsValid = false;
                    $location.path(response.redirecTo);
                    $("aside").show();
                } else {
                    ctrl.IsValid = true;
                    ctrl.messageLoginInvalid = 'Usuario y/o contraseña no válidas';
                }
            }
        });
    };

    ctrl.transformRespond = function (Data) {
        var Result = [];
        var Columns = Data.Columns;
        var Rows = Data.Rows;
        for (var i = 0; i < Rows.length; i++) {
            var Value = {};
            for (var j = 0; j < Columns.length; j++) {
                var ColumnName = Columns[j];
                Value[ColumnName] = Rows[i][j];
            }
            Result.push(Value);
        }
        return Result;
    };
}
