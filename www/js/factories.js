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
		getLocations : function(){
            return $soap.post(ServerConfig.url,"GetMerchantLocationsAndAccounts");
        }
	}
} ])