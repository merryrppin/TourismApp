angular
    .module("tourismApp.homeController", [])
    .controller('homeController', homeController);

homeController.$inject = ['$scope', '$rootScope', 'GeneralService'];

function homeController($scope, $rootScope, GeneralService) {
    var ctrl = this;

    ctrl.message = 'Home Girardota App';

};