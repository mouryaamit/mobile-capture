// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularSoap', 'starter.controllers', 'starter.services', 'starter.factories', 'ngCordova'])

    .run(function ($ionicPlatform,appFactory,gConfig,$timeout,dConfig,ServerConfig,$rootScope) {
        gConfig.UserID = 'dennis' // Hardcoded
        $rootScope.password = 'Dennis@123'
        $ionicPlatform.ready(function () {

            if(device.platform == "Android"){
                gConfig.isAndroid = true;
            }else{
                gConfig.isIos = true;
            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                cache: false,
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.capture', {
                cache: false,
                url: "/capture",
                views: {
                    'menuContent': {
                        templateUrl: "templates/capture.html",
                        controller: 'CaptureCtrl'
                    }
                }
            })

            .state('app.history', {
                cache: false,
                url: "/history",
                views: {
                    'menuContent': {
                        templateUrl: "templates/history.html",
                        controller: 'HistoryCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/capture');
    });
