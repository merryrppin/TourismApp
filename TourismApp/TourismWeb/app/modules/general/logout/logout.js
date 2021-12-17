angular
    .module('tourismApp.logoutController', [])
    .controller('logoutController', logoutController);

logoutController.$inject = ['$scope', 'UserService', '$window', '$location', '$rootScope', 'GeneralService'];

function logoutController($scope, UserService, $window, $location, $rootScope, GeneralService) {

    angular.element(document).ready(function () {
        $("aside").hide();
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('userName');
        $location.path('/');
    });
   
}
