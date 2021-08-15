angular.module("tourismApp").controller('generalController', ["$scope", '$rootScope', "$timeout", "$filter", "$location", "SessionService", "GeneralService", generalController]);
function generalController($scope, $rootScope, $timeout, $filter, $location, SessionService, GeneralService) {
    var ctrl = this;
    ctrl.currentUrl = "-";

    ctrl.showNewButton = $rootScope.showNewButton;
    ctrl.showSaveButton = $rootScope.showSaveButton;
    ctrl.showClearButton = $rootScope.showClearButton;
    ctrl.showCancelButton = $rootScope.showCancelButton;
    ctrl.showPrintButton = $rootScope.showPrintButton;

    $rootScope.$broadcast('restorestate');
    GeneralService.userLogin = SessionService.model;
    ctrl.userLogin = GeneralService.userLogin;

    ctrl.autentication = GeneralService.autentication;//false por defecto

    $scope.$watch(GeneralService.autentication, function (change) { ///adding watcher on someService.getChange, it will fire when change changes value
        ctrl.autentication = GeneralService.autentication; //setting change to controller here you can put some extra logic
    }.bind(this));

    ctrl.loadDataFromGeneralService = function () {
        //$scope.contentTitle = GeneralService.contentTitle;
    };

    ctrl.verificarAutenticacion = function () {
        //TODO seteo de variable a true hasta terminar de tener los usuarios definidos
        GeneralService.autentication.isAuthenticated = true;
        GeneralService.showPanels();
        //Fin seteo variables

        if (typeof GeneralService.userLogin !== 'undefined' && typeof GeneralService.userLogin.UserId !== 'undefined' && GeneralService.userLogin.UserId !== null) {
            GeneralService.autentication.isAuthenticated = true;
            GeneralService.showPanels();
        } else {
            window.location.hash = "#!/login";
            window.location.pathname = "Login.html";
        }
    };

    ctrl.signOut = function () {
        $rootScope.$broadcast('clearState');
        window.location.hash = "#!/login";
        window.location.pathname = "Login.html";
    };

    angular.element(document).ready(init);

    function init() {
        ctrl.verificarAutenticacion();
        if (ctrl.autentication.isAuthenticated) {
            ctrl.loadDataFromGeneralService();
        }
    }
}