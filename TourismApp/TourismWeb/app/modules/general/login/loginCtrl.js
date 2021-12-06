angular
    .module('tourismApp.loginController', [])
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$window', '$location', '$rootScope', 'GeneralService'];

function loginController($scope, $window, $location, $rootScope, GeneralService) {

    let ctrl = this;
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

        let StoredObjectParams =
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
                    $rootScope.token = response.token;
                    $window.localStorage.removeItem('token')
                    $window.localStorage.setItem('token', response.token)
                } else {
                    ctrl.IsValid = true;
                    ctrl.messageLoginInvalid = 'Usuario y/o contraseña no válidas';
                }
            }
        });
    };

    ctrl.transformRespond = function (Data) {
        let Result = [];
        let Columns = Data.Columns;
        let Rows = Data.Rows;
        for (let i = 0; i < Rows.length; i++) {
            let Value = {};
            for (let j = 0; j < Columns.length; j++) {
                let ColumnName = Columns[j];
                Value[ColumnName] = Rows[i][j];
            }
            Result.push(Value);
        }
        return Result;
    };
}
