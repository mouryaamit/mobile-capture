// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularSoap', 'starter.controllers', 'starter.services', 'starter.factories', 'ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
        	/*$.ajax({
                url : 'http://test15.deposit2day.com//ValidationService/VSoftRemoteSvc.asmx',
                type : 'POST',
                data : '<GetMerchantLocationsAndAccounts xmlns="http://consumer.vsoftcorp.com/">'+
                '<institutionId>2</institutionId>'+
                '<merchantId>1</merchantId>'+
                '<userId>edesk50</userId>'+
                '<applicationType>7</applicationType>'+
                '</GetMerchantLocationsAndAccounts>',
                contentType: 'text/xml',
                success:function (response) {
                	alert('s')
    console.log(response)
                    // call model response function
//                    model.processResponse(response);


                },// show error message
                error: function(jqXHR, textStatus, errorThrown ){
                	alert('e')
                    console.log(jqXHR.statusCode());
//                    NotyMsg.errorMsg("Unable to Connect to the Internet. Please try again later.");

                }
            });*/
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
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.capture', {
                url: "/capture",
                views: {
                    'menuContent': {
                        templateUrl: "templates/capture.html",
                        controller: 'CaptureCtrl'
                    }
                }
            })

            .state('app.history', {
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
