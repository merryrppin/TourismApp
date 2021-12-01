angular
    .module("tourismApp.homeController", [])
    .controller('homeController', homeController);

homeController.$inject = ['$scope', 'GeneralService'];

function homeController($scope, GeneralService) {
    var ctrl = this;

    ctrl.message = 'Home Girardota App';


}