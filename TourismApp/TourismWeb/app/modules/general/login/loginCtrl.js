angular
    .module('tourismApp.loginController', [])
    .controller('loginController', loginController);

loginController.$inject = ['$scope','UserService', '$window', '$location', '$rootScope', 'GeneralService'];

function loginController($scope, UserService, $window, $location, $rootScope, GeneralService) {
    $("aside").hide();
    let ctrl = this;
    ctrl.IsValidMenu = false;
    ctrl.IsValid = false;
    ctrl.IsLoad = false;
    ctrl.messageLoginInvalid;
 
    ctrl.user = [];
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
            url: `${UserService.ApiUrl}/Login`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                ctrl.IsLoad = false;
                if (response !== null && response !== '' && response.token !== null) {
                    ctrl.IsValid = false;
                    $location.path(response.redirecTo);
                    $("aside").show();
                    $window.localStorage.removeItem('token');
                    $window.localStorage.setItem('token', response.token);
                    ctrl.user = ctrl.transformRespond(response.userInfoResponse.value[0]);
                    $window.localStorage.setItem('userName', ctrl.user[0].NombreUsuario);
                } else {
                    ctrl.IsValid = true;
                    ctrl.messageLoginInvalid = 'Usuario y/o contraseña no válidas';
                }
            }
        });
    };
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
}
