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
		getLocations : function(institutionId,merchantId,userId,applicationType){
            return $soap.post(ServerConfig.url,"GetMerchantLocationsAndAccounts",{institutionId:institutionId,merchantId:merchantId,userId:userId,applicationType:applicationType});
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