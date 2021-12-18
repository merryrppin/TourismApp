angular
    .module('tourismApp.changePasswordController', [])
    .controller('changePasswordController', changePasswordController);

changePasswordController.$inject = ['$scope', 'UserService', '$window', '$location', '$rootScope', 'GeneralService'];

function changePasswordController($scope, UserService, $window, $location, $rootScope, GeneralService) {
    let ctrl = this;

    function isValidNewPassword() {

        if (ctrl.newPassword_1 == undefined || ctrl.newPassword_2 == undefined || ctrl.realPassword == undefined) {
            alert("Todos los campos son obligatorios!");
            return false;
        }

        if (ctrl.newPassword_1.length === 0 || ctrl.newPassword_2.length === 0 || ctrl.realPassword.length === 0) {
            alert("Todos los campos son obligatorios!");
            return false;
        }

        if (ctrl.newPassword_1 != ctrl.newPassword_2) {
            alert("La nueva clave es diferente en ambos ingresos!");
            return false;
        }



        if (ctrl.newPassword_2.length <= 5) {
            alert("La nueva contraseña debe tener mas de cinco caracteres");
            return false;
        }

        if (ctrl.newPassword_2 == ctrl.realPassword) {
            alert("La nueva contraseña debe ser diferente a la anterior");
            return false;
        }
        return true;
    }

    ctrl.changePassword = function () {

        if (!isValidNewPassword()) {
            ctrl.newPassword_1 = '';
            ctrl.newPassword_2 = '';
            ctrl.realPassword = '';
            return;
        }

        let StoredObjectParams =
        {
            "StoredParams": [
                { "Name": "realPassword", "Value": ctrl.realPassword },
                { "Name": "newPassword", "Value": ctrl.newPassword_2 },
                { "Name": "Usuario", "Value": $window.localStorage.getItem('userName') }
            ],
            "StoredProcedureName": "CambiarCredenciales"
        }

        GeneralService.executeAjax({
            url: `${UserService.ApiUrl}/ChangePassword`,
            data: StoredObjectParams,
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                ctrl.IsLoad = false;
                if (response !== null && response !== '') {
                    alert(response.value[0].rows[0]);
                }
            }
        });
    }
}
