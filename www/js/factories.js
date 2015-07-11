var factories = angular.module('starter.factories', [])

factories.factory('Camera', [ '$q', function ($q) {

    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
} ])

factories.factory('appFactory', [ '$soap', 'ServerConfig', function ($soap, ServerConfig) {

    return {
        VSHOCreateSession: function () {
            return $soap.post(ServerConfig.url, "VSHOCreateSession");
        },
        VSHOGetClientIPAddress: function (userId) {
            return $soap.post(ServerConfig.url, "VSHOGetClientIPAddress", {userId: userId});
        },
        GetConsumerDescriptionEx: function (SessionId, InstitutionId, UserId, Password, ChangePassword, IpAddress, ApplicationType) {
            return $soap.post(ServerConfig.url, "GetConsumerDescriptionEx", {"consumerDescriptionRequest": {SessionId: SessionId, InstitutionId: InstitutionId, UserId: UserId, Password: Password, ChangePassword: ChangePassword, IpAddress: IpAddress, ApplicationType: ApplicationType}});
        },
        VSHOStartSession: function (strSessionId, instId, merchantId, locationId, userId, inFlag) {
            return $soap.post(ServerConfig.url, "VSHOStartSession", {strSessionId: strSessionId, instId: instId, merchantId: merchantId, locationId: locationId, userId: userId, inFlag: inFlag});
        },
        GetMerchantLocationsAndAccounts: function (institutionId, merchantId, userId, applicationType) {
            return $soap.post(ServerConfig.url, "GetMerchantLocationsAndAccounts", {institutionId: institutionId, merchantId: merchantId, userId: userId, applicationType: applicationType});
        },
        GetCurrentDayAvailableThresholdLimits: function (ApplicationType, BusDate, InstitutionId, MerchantId) {
            return $soap.post(ServerConfig.url, "GetCurrentDayAvailableThresholdLimits", {"request": {ApplicationType: ApplicationType, BusDate: BusDate, InstitutionId: InstitutionId, MerchantId: MerchantId}});
        },
        GetDepositThresholdLimits: function (ApplicationType, InstitutionId, MerchantId, BusDate) {
            return $soap.post(ServerConfig.url, "GetDepositThresholdLimits", {"request": {ApplicationType: ApplicationType, InstitutionId: InstitutionId, MerchantId: MerchantId, BusDate: BusDate}});
        },
        StartTran: function (InstId,ApplicationId, UserId, Email, AccountNumber, AccountType, ProfileId,ImageFormat,ImageView,ReturnImage, DeviceMake, DeviceVersion, OperatingSystem, OperatingSystemVersion, MerchantId, LocationId) {
            return $soap.post(ServerConfig.urlIVS, "StartTran", {request:{
                InstId: InstId,
                ApplicationId:ApplicationId,
                UserId: UserId,
                Email: Email,
                AccountNumber: AccountNumber,
                AccountType: AccountType,
                ProfileId: ProfileId,
                ImageFormat:ImageFormat,
                ImageView:ImageView,
                ReturnImage:ReturnImage,
                DeviceMake: DeviceMake,
                DeviceVersion: DeviceVersion,
                OperatingSystem: OperatingSystem,
                OperatingSystemVersion: OperatingSystemVersion,
                MerchantId: MerchantId,
                LocationId: LocationId
            }});
        },
        Process : function(SessionId,Amount,FrontImage,RearImage,ReturnImage){
            return $soap.post(ServerConfig.urlIVS, "Process", {request:{
                SessionId: SessionId,
                Amount: Amount,
                FrontImage: FrontImage,
                RearImage: RearImage,
                ReturnImage: ReturnImage
            }
            });
        },
        PurgeTransaction: function(SessionId,Amount,RawMICR){
            return $soap.post(ServerConfig.urlIVS, "Acknowledgment", {"request": {SessionId: SessionId, Amount: Amount,RawMICR:RawMICR}});
        },
        Acknowledgment: function (SessionId, ReturnValue) {
            return $soap.post(ServerConfig.urlIVS, "Acknowledgment", {"request": {SessionId: SessionId, ReturnValue: ReturnValue}});
        },
        getDepositHistory: function (institutionId, UserID, depositDateMMDDYYYY, applicationType) {
            return $soap.post(ServerConfig.url, "VSHOGetDepositHistory", {
                instId: institutionId,
                userId: UserID,
                depositDateMMDDYYYY: depositDateMMDDYYYY,
                applicationType: applicationType
            });
        }
    }
} ])