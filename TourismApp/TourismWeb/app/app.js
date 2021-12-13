agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp', [
        'tourismApp.loginController',
        'tourismApp.homeController',
        'tourismApp.religiousController',
        'tourismApp.gastronomyController',
        'tourismApp.hikingController',
        'tourismApp.touristSiteController',
        'ngTagsInput',
        'ngRoute',
        'angular-loading-bar',
        'agGrid'
    ])
    .directive('myDirectory', ['$parse', function ($parse) {

        function link(scope, element, attrs) {
            var model = $parse(attrs.myDirectory);
            element.on('change', function (event) {
                scope.data = [];    //Clear shared scope in case user reqret on the selection
                model(scope, { file: event.target.files });

            });
        };

        return {
            link: link
        }
    }])

    .factory('UserService', function () {
        return {
            ApiUrl: 'http://testappservicewf.azurewebsites.net/api/tourism'
        };
    })

    .config(function ($routeProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $routeProvider
            .when('/', {
                controller: "loginController",
                controllerAs: 'lc',
                templateUrl: 'app/modules/general/login/Login.html',
            })
            .when('/home', {
                controller: "homeController",
                controllerAs: 'hc',
                templateUrl: 'app/modules/general/home/Home.html'
            })
            .when('/religious', {
                controller: "religiousController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/religious/religious.html'
              
            })
            .when('/hiking', {
                controller: "hikingController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/hiking/hiking.html'
            })
            .when('/gastronomy', {
                controller: "gastronomyController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/gastronomy/gastronomy.html'
            })
            .when('/touristSite', {
                controller: "touristSiteController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/touristSite/touristSite.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    });
