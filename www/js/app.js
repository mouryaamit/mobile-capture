// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularSoap', 'starter.controllers', 'starter.services', 'starter.factories', 'ngCordova'])

    .run(function ($ionicPlatform,appFactory,gConfig,$timeout,dConfig,ServerConfig) {

        $ionicPlatform.ready(function () {
            gConfig.UserID = 'dennis' // Hardcoded
            var password = 'Xyz@123@'
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
            appFactory.VSHOCreateSession().then(function(VSHOCreateSessionResult){

                gConfig.SessionId = VSHOCreateSessionResult;
                appFactory.VSHOGetClientIPAddress().then(function(VSHOGetClientIPAddressResult){
                    gConfig.IpAddress = VSHOGetClientIPAddressResult;
                    appFactory.GetConsumerDescriptionEx(gConfig.SessionId,ServerConfig.institutionId,gConfig.UserID,password,false,gConfig.IpAddress,gConfig.ApplicationType).then(function(GetConsumerDescriptionExResult){
                        var ConsumerID=GetConsumerDescriptionExResult.ConsumerID;
                        var ConsumerName=GetConsumerDescriptionExResult.ConsumerName;
                        var LocationID=GetConsumerDescriptionExResult.LocationID;
                        var IsLocked=GetConsumerDescriptionExResult.IsLocked;
                        var Change_Pwd=GetConsumerDescriptionExResult.Change_Pwd;
                        var Role_ID=GetConsumerDescriptionExResult.Role_ID;
                        var All_Grp_Ind=GetConsumerDescriptionExResult.All_Grp_Ind;
                        var Inst_Grp_Ind=GetConsumerDescriptionExResult.Inst_Grp_Ind;
                        var Error_Code=GetConsumerDescriptionExResult.Error_Code;
                        var Error_Message=GetConsumerDescriptionExResult.Error_Message;
                        var IVSProfileID=GetConsumerDescriptionExResult.IVSProfileID;
                        var MobileAgreementStatus=GetConsumerDescriptionExResult.MobileAgreementStatus;
                        var MobileAgreementId=GetConsumerDescriptionExResult.MobileAgreementId;
                        var AgreementFileName=GetConsumerDescriptionExResult.AgreementFileName;
                        var FirstTimeLogin=GetConsumerDescriptionExResult.FirstTimeLogin;
                        var BusDate=GetConsumerDescriptionExResult.BusDate;
                        function isAccLocked(status){
                            return (status == "true" || status == true)
                        }
                        function isChangePass(status){
                            return (status == "true" || status == true)
                        }
                        function isShowAgreement(status){
                            return (status == "false" || status == false)
                        }
                        function isFirstTimeLogin(status){
                            return (status == "true" || status == true)
                        }

                        //If Error = 0 : user authentication success
                        if( Error_Code == 0){
                            dConfig.AppInState = true;
//                            Utils.sessionCheck.startSession();

                            gConfig.ConsumerID = ConsumerID;
                            gConfig.MerchantID = ConsumerID;
                            gConfig.ConsumerName = ConsumerName;
                            gConfig.LocationID = LocationID;
                            gConfig.IVSProfileID = IVSProfileID;
                            gConfig.BusDate = BusDate;
                            gConfig.ErrorCode=Error_Code ;
                            gConfig.isChangePass = isChangePass(Change_Pwd);
                            gConfig.isShowAgreement = isShowAgreement(MobileAgreementStatus);
                            gConfig.isFirstTimeLogin = isFirstTimeLogin(FirstTimeLogin);

                            appFactory.VSHOStartSession(gConfig.SessionId,ServerConfig.institutionId,gConfig.MerchantID,gConfig.LocationID,gConfig.UserID,gConfig.Flag).then(function(VSHOStartSessionResult) {
                                var VSHOStartSessionResult = VSHOStartSessionResult;
                                appFactory.GetMerchantLocationsAndAccounts(ServerConfig.institutionId, gConfig.MerchantID, gConfig.UserID, ServerConfig.ApplicationType).then(function(GetMerchantLocationsAndAccountsResult) {
                                    gConfig.Locations = GetMerchantLocationsAndAccountsResult;
                                    $timeout(function () {
                                        navigator.splashscreen.hide();
                                    }, 100);

                                })
                            });

                        }else if(isAccLocked(IsLocked)){
//                            NotyMsg.errorMsg("Your account is locked. Please contact bank administrator for further queries.");
                        }else{
//                Show error
                            gConfig.ErrorCode = 1;
//                            Utils.enableActionItems();
//                            NotyMsg.errorMsg(Error_Message);
//                            console.log(Error_Message);
                        }
                    })
                })

            })
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
