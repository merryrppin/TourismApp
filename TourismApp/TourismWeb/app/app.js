﻿agGrid.initialiseAgGridWithAngular1(angular);

angular
    .module('tourismApp', [

        'tourismApp.loginController',
        'tourismApp.homeController',
        'tourismApp.religiousController',
        'tourismApp.gastronomyController',
        'tourismApp.hikingController',
        'tourismApp.touristSiteController',
        'tourismApp.mustSeePlaceController',
        'tourismApp.officialHolidaysController',
        'tourismApp.logoutController',
        'tourismApp.changePasswordController',
        'ngTagsInput',
        'ngRoute',
        'angular-loading-bar',
        'agGrid'
    ])

    .directive('myDirectory', ['$parse', function ($parse) {

        function link(scope, element, attrs) {
            var model = $parse(attrs.myDirectory);
            element.on('change', function (event) {
                scope.data = [];
                model(scope, { file: event.target.files });
            });
        };
        return {
            link: link
        }
    }])

    .factory('UserService', function () {
        return {
            ApiUrl: 'http://girardotaturistica.azurewebsites.net/TourismApp/api/tourism'
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
            .when('/touristSite/:DEF', {
                controller: "touristSiteController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/touristSite/touristSite.html'
            })
            .when('/mustSeePlace', {
                controller: "mustSeePlaceController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/mustSeePlaces/mustSeePlaces.html'
            })
            .when('/officialHolidays', {
                controller: "officialHolidaysController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/officialHolidays/officialHolidays.html'
            })
            .when('/logout', {
                controller: "logoutController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/login/Login.html',
            })
            .when('/changePassword', {
                controller: "changePasswordController",
                controllerAs: 'ctrl',
                templateUrl: 'app/modules/general/changePassword/changePassword.html',
            })
            .otherwise({
                redirectTo: '/'
            })
    });
