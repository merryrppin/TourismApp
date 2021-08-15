angular.module("tourismApp").controller('homeController', ["$scope", "GeneralService", homeController]);
function homeController($scope, GeneralService) {
    GeneralService.hideGeneralButtons();
}