angular
    .module("tourismApp", [])
    .controller('loginController', loginController);

loginController.$inject = ['$scope', 'GeneralService'];

function loginController($scope, GeneralService) {

    var ctrl = this;
    ctrl.IsValid = false;
    ctrl.IsLoad = false;
    ctrl.messageLoginInvalid;

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
                if (response != null && response.token != null) {
                    ctrl.IsValid = false;
                    window.location.hash = "#!/home";
                } else {
                    ctrl.IsValid = true;
                    ctrl.messageLoginInvalid = 'Usuario y/o contraseña no válidas';
                }
            }
        });
    };


}