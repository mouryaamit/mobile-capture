var services = angular.module('starter.services', [])

services.service('sessionCheck', function (NotyMsg) {
    var sessionExp;
    this.initSession = function () {
        var userWasIdle = false;
        sessionExp = false;
        $(document).on("idle.idleTimer", function () {
            userWasIdle = true;
        });

        $(document).on("active.idleTimer", function () {

            if (userWasIdle) {
                sessionExp = true;
                userWasIdle = false;
                NotyMsg.errorMsg("Your Session has expired. You have been logged out due to inactivity.");
                $(document).idleTimer("destroy");
                navigator.app.exitApp();
            }

        });

    }
    this.startSession = function () {
        $(document).idleTimer(300000);
    }
    this.stopSession = function () {
        $(document).idleTimer("destroy");
    }
})

services.service('ServerConfig', function () {

    var urlStr = 'http://test15.deposit2day.com/ConsumerService/ConsumerService.asmx';
    var urlIVSStr = "http://test15.deposit2day.com//ValidationService/VSoftRemoteSvc.asmx";

    // *****  Dev India
    //var urlStr = 'http://115.113.85.7/MobileMerchant/ConsumerService.asmx';
    //var urlIVSStr = "http://115.113.85.7/MMValidationService/VSoftRemoteSvc.asmx";

    // *****  Sit India
    //var urlStr = "http://115.113.85.15/ConsumerSvc/ConsumerService.asmx";
    //var urlIVSStr = "http://115.113.85.15/ValidationService/VSoftRemoteSvc.asmx";

    var ServerConfig = {

        'url': urlStr,
        'urlIVS': urlIVSStr,
        'institutionId': '2',
        'contentType': 'text/xml',

        'sessionTimeout': 300000       // Milli Seconds

    };

    return ServerConfig;
})

services.service('gConfig', function () {
    var globalAttributes = {

        'ApplicationType': '7',
        'Flag': '1',
        'DepositCount': '0',
        'SessionID': '',
        'ConsumerID': '',
        'MerchantID': '',
        'ConsumerName': '',
        'LocationID': '',
        'BusDate': '',
        'IVSProfileID': '',
        'IVSSessionId': '',

        'UserID': '',
        'EmailID': '',
        'Locations': [],

//          -----------------------
        'UserName': '',
//          -----------------------
        'IpAddress': '',
//          -----------------------
        'MaxAttempt': 3,
        'IsAccLocked': false,
//          -----------------------
        'isAndroid': false,
        'isIos': false,
//          ----- Extras ------------------
        'isChangePass': false,
        'isShowAgreement': false,
        'isFirstTimeLogin': false,
        'isCheckViewed': false,
        'checkInProgress': false,
        'checkImgBase64PreStr': "data:image/jpeg;base64,",
        'AgreementText': "",
        'origOrientation': "portrait",
        'isLogout': false,
        //***$GeoLocation$***:Global attributes for geoLocation
        'ErrorCode': '',
        'strSessionId': "",
        'country': "",
        'state': "",
        'city': "",
        'locality': ""


    };

    globalAttributes.userInfo = {

        'IsChangePassword': false,
        'LastLogonDate': '',
        'BusDate': '',
        'UserDate': '',
        'UserTime': ''

    };

    return globalAttributes;
})

services.service('dConfig', function () {
    var defaultConfig = {};

    defaultConfig.routeConfig = {trigger: true, replace: false};
    defaultConfig.nonRouteConfig = {trigger: true, replace: true};

    defaultConfig.userInfo = {};

    defaultConfig.clientLogoPath = "imgs/blank.png";

    defaultConfig.AppInState = false;

    return defaultConfig;
})

services.service('NotyMsg', function () {
    this.errorMsg = function (msg) {
        var errText,
            response = msg.responseJSON;
        if (response) {
            if (response.responseData) {
                errText = response.responseData.message;
            }
            /*else if(response.error.status == 403){
             Utils.sessionExp = true;
             AppActivity.trigger("login");
             }*/
        } else if (msg.status) {
            errText = "Error Code: " + msg.status + ", Error Message : " + msg.statusText + "";
        } else {
            errText = msg;
        }
        var options = {
            text: errText,
            type: "error",
            killer: true,
            layout: "center",
            timeout: false
        };
        var n = noty(options);

    }

    /*validationErrMsg = function (msg) {
     var options = {
     text: msg,
     type: "error",
     layout: "center",
     killer: true,
     timeout: false,
     callback: {
     onClose: function() {
     var AppViewCollection = require('../app/app_view_collection');
     AppViewCollection.home_view.validationError();
     }
     }

     };
     var n = noty(options);
     },*/
    this.successMsg = function (msg) {
        var options = {
            text: msg,
            type: "success",
            layout: "top",
            killer: true,
            timeout: "5000"
        };
        var n = noty(options);
    }
    this.confirmMsg = function (msg, callback) {
        var options = {
            text: msg,
            type: "error",
            layout: "center",
            killer: true,
            timeout: false,
            buttons: [
                {
                    addClass: 'btn btn-default', text: 'No', onClick: function ($noty) {
                    $noty.close();
                }
                },
                {
                    addClass: 'btn btn-info', text: 'Yes', onClick: function ($noty) {
                    // this = button element
                    // $noty = $noty element
                    $noty.close();
                    callback();
                }
                }
            ]
        };
        var n = noty(options);
    }

    this.warningMsg = function (msg) {
        var options = {
            text: msg,
            type: "warning",
            layout: "center",
            killer: true,
            timeout: false
        };
        var n = noty(options);
    }

})