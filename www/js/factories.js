var factories = angular.module('starter.factories', [])

factories.factory('Camera', [ '$q', function($q) {

	return {
		getPicture : function(options) {
			var q = $q.defer();

			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

			return q.promise;
		}
	}
} ])

factories.factory('appFactory', [ '$soap','ServerConfig', function($soap,ServerConfig) {

	return {
        VSHOCreateSession: function(){
            return $soap.post(ServerConfig.url,"VSHOCreateSession");
        },
        VSHOGetClientIPAddress: function(userId){
            return $soap.post(ServerConfig.url,"VSHOGetClientIPAddress",{userId:userId});
        },
        GetConsumerDescriptionEx: function(SessionId,InstitutionId,UserId,Password,ChangePassword,IpAddress,ApplicationType){
            return $soap.post(ServerConfig.url,"GetConsumerDescriptionEx",{SessionId:SessionId,InstitutionId:InstitutionId,UserId:UserId,Password:Password,ChangePassword:ChangePassword,IpAddress:IpAddress,ApplicationType:ApplicationType});
        },
        VSHOStartSession:function(strSessionId,instId,merchantId,locationId,userId,inFlag){
            return $soap.post(ServerConfig.url,"VSHOStartSession",{strSessionId:strSessionId,instId:instId,merchantId:merchantId,locationId:locationId,userId:userId,inFlag:inFlag});
        },
        GetMerchantLocationsAndAccounts : function(institutionId,merchantId,userId,applicationType){
            return $soap.post(ServerConfig.url,"GetMerchantLocationsAndAccounts",{institutionId:institutionId,merchantId:merchantId,userId:userId,applicationType:applicationType});
        },
        GetCurrentDayAvailableThresholdLimits: function(ApplicationType,BusDate,InstitutionId,MerchantId){
            return $soap.post(ServerConfig.url,"GetCurrentDayAvailableThresholdLimits",{ApplicationType:ApplicationType,BusDate:BusDate,InstitutionId:InstitutionId,MerchantId:MerchantId});
        },
        GetDepositThresholdLimits: function(ApplicationType,InstitutionId,MerchantId,BusDate){
            return $soap.post(ServerConfig.url,"GetDepositThresholdLimits",{ApplicationType:ApplicationType,InstitutionId:InstitutionId,MerchantId:MerchantId,BusDate:BusDate});
        },
        getDepositHistory: function(institutionId, UserID, depositDateMMDDYYYY, applicationType) {
            return $soap.post(ServerConfig.url, "VSHOGetDepositHistory", {
                instId: institutionId,
                userId: UserID,
                depositDateMMDDYYYY: depositDateMMDDYYYY,
                applicationType: applicationType
            });
        }
	}
} ])