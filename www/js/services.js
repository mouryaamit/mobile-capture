var services = angular.module('starter.services', [])

services.service('ServerConfig', function() {

	var urlStr = 'http://test15.deposit2day.com/ConsumerService/ConsumerService.asmx';
    var urlIVSStr = "http://test15.deposit2day.com//ValidationService/VSoftRemoteSvc.asmx";

    // *****  Dev India
    //var urlStr = 'http://115.113.85.7/MobileMerchant/ConsumerService.asmx';
    //var urlIVSStr = "http://115.113.85.7/MMValidationService/VSoftRemoteSvc.asmx";

    // *****  Sit India
    //var urlStr = "http://115.113.85.15/ConsumerSvc/ConsumerService.asmx";
    //var urlIVSStr = "http://115.113.85.15/ValidationService/VSoftRemoteSvc.asmx";

    var ServerConfig = {

        'url'               : urlStr,
        'urlIVS'            : urlIVSStr,
        'institutionId'     : '2',
        'contentType'       : 'text/xml',

        'sessionTimeout'       : 300000       // Milli Seconds

    };
    
    return ServerConfig;
})

services.service('gConfig', function() {
	var globalAttributes = {

            'ApplicationType' : '7',
            'Flag'          : '1',
            'DepositCount'  : '0',
            'SessionID'     : '',
            'ConsumerID'    : '',
            'MerchantID'    : '',
            'ConsumerName'  : '',
            'LocationID'    : '',
            'BusDate'       : '',
            'IVSProfileID'  : '',
            'IVSSessionId'  : '',

            'UserID'        : '',
            'EmailID'       : '',
            'Locations'      : [],

//          -----------------------
            'UserName'      : '',
//          -----------------------
            'IpAddress'      : '',
//          -----------------------
            'MaxAttempt'    : 3,
            'IsAccLocked'   : false,
//          -----------------------
            'isAndroid' : false,
            'isIos'  : false,
//          ----- Extras ------------------
            'isChangePass' : false,
            'isShowAgreement' : false,
            'isFirstTimeLogin' : false,
            'isCheckViewed' : false,
            'checkInProgress' : false,
            'checkImgBase64PreStr' : "data:image/jpeg;base64,",
            'AgreementText' : "",
            'origOrientation' : "portrait",
            'isLogout' : false,
            //***$GeoLocation$***:Global attributes for geoLocation
            'ErrorCode' : '',
            'strSessionId':"",
            'country' :"",
            'state' :"",
            'city' :"",
            'locality':""






        };

        globalAttributes.userInfo = {

            'IsChangePassword'          : false,
            'LastLogonDate'             : '',
            'BusDate'                   : '',
            'UserDate'                  : '',
            'UserTime'                  : ''

        };

        return globalAttributes;
})

services.service('dConfig', function() {
	var defaultConfig = {};

    defaultConfig.routeConfig = { trigger : true, replace : false };
    defaultConfig.nonRouteConfig = { trigger:true, replace:true };

    defaultConfig.userInfo = {};

    defaultConfig.clientLogoPath = "imgs/blank.png";

    defaultConfig.AppInState = false;

    return defaultConfig;
})
