agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp', [
        'tourismApp.loginController',
        'tourismApp.homeController',
        'tourismApp.religiousController',
        'tourismApp.gastronomyController',
        'tourismApp.hikingController',
        'ngRoute',
        'agGrid'
    ])
    .config(function ($routeProvider) {
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
                templateUrl: 'app/modules/general/religious/religious.html'
            })
            .when('/hiking', {
                controller: "hikingController",
                templateUrl: 'app/modules/general/hiking/hiking.html'
            })
            .when('/gastronomy', {
                controller: "gastronomyController",
                templateUrl: 'app/modules/general/gastronomy/gastronomy.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    });
