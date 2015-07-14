angular.module('angularSoap', [])

.factory("$soap",['$q',function($q){
	return {
		post: function(url, action, params){
			$('#loadingImg').show()
			$('#loaderBackDrop').show()
			var deferred = $q.defer();
			
			//Create SOAPClientParameters
			var soapParams = new SOAPClientParameters();
			for(var param in params){
				soapParams.add(param, params[param]);
			}
			
			//Create Callback
			var soapCallback = function(e){
				if(e.constructor.toString().indexOf("function Error()") != -1){
					$('#loadingImg').hide()
					$('#loaderBackDrop').hide()
					deferred.reject("An error has occurred.");
				} else {
					$('#loadingImg').hide()
					$('#loaderBackDrop').hide()
					deferred.resolve(e);
				}
			}
			
			SOAPClient.invoke(url, action, soapParams, true, soapCallback);

			return deferred.promise;
		},
		setCredentials: function(username, password){
			SOAPClient.username = username;
			SOAPClient.password = password;
		}
	}
}]);
