var controllers = angular.module('starter.controllers', [])

controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	// $scope.$on('$ionicView.enter', function(e) {
	// });

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope : $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

})

controllers.controller('PlaylistCtrl', function($scope, Camera) {
	$scope.image = null;

	$scope.getPic = function() {
		Camera.getPicture({
			quality : 75,
			targetWidth : 320,
			targetHeight : 320,
			saveToPhotoAlbum : false
		}).then(function(imageURI) {
			console.log(imageURI);
			$scope.image = imageURI;
		}, function(err) {
			console.err(err);
		});
	}
	/*
	 * var options = { quality: 50, destinationType:
	 * Camera.DestinationType.DATA_URL, sourceType:
	 * Camera.PictureSourceType.CAMERA, allowEdit: true, encodingType:
	 * Camera.EncodingType.JPEG, targetWidth: 100, targetHeight: 100,
	 * popoverOptions: CameraPopoverOptions, saveToPhotoAlbum: false };
	 * $scope.image = null;
	 * 
	 * $scope.getPic = function() {
	 * $cordovaCamera.getPicture(options).then(function (imageData) { //var
	 * image = document.getElementById('myImage'); $scope.image =
	 * "data:image/jpeg;base64," + imageData; }, function (err) { // error }); }
	 */
})

controllers.controller('HistoryCtrl', function($scope) {

})

controllers.controller('CaptureCtrl', function($scope, appFactory, gConfig,
		ServerConfig, $cordovaCamera) {// 31191
// console.log(ServerConfig.url)
	var options = null || {}
	ionic.Platform.ready(function() {
		options = {
			quality : 50,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType : Camera.EncodingType.JPEG,
			targetWidth : 800,
			targetHeight : 600,
			popoverOptions : CameraPopoverOptions,
			saveToPhotoAlbum : false
		};
	});

	$scope.locationsResult = null || []
	$scope.accountResult = null || []
	$scope.Cheque = null || {}
	$scope.init = function() {/*
		appFactory.getLocations({}).$promise.then(function(getLocationsResult) {
			console.log(getLocationsResult)
			$scope.locationsResult = getLocationsResult;

			if ($scope.locationsResult.length == 1) {
				$($(".icon-select-drop-down")[0]).hide();
				$('#multipleLocDiv').addClass("disabled");
			} else {
				$($(".icon-select-drop-down")[0]).show();
				$('#multipleLocDiv').removeClass("disabled");
			}
			$('.selectpicker').selectpicker('render');
			$('.selectpicker').selectpicker('refresh');
		}, function(getLocationsError) {

		})
		appFactory.getAccounts({}).$promise.then(function(getAccountsResult) {
			$scope.accountResult = getAccountsResult;

			if ($scope.accountResult.length == 1) {
				$($(".icon-select-drop-down")[1]).hide();
				$('#multipleAccDiv').addClass("disabled");
			} else {
				$($(".icon-select-drop-down")[1]).show();
				$('#multipleAccDiv').removeClass("disabled");
			}

			$('.selectpicker').selectpicker('render');
			$('.selectpicker').selectpicker('refresh');
		}, function(getLocationsError) {

		})

		appFactory.getDailyLimit({
			'BusDate' : gConfig.BusDate,
			'InstitutionId' : ServerConfig.institutionId,
			'MerchantId' : gConfig.MerchantID
		}).$promise.then(function(getDailyLimitResult) {
			// TODO
			appFactory.getDepositLimit({
				'InstitutionId' : ServerConfig.institutionId,
				'MerchantId' : gConfig.MerchantID,
				'BusDate' : gConfig.BusDate
			}).$promise.then(function(getDepositLimitResult) {
				// TODO
			}, function(getDepositLimitError) {

			})
		}, function(getDailyLimitError) {

		})

		$('.selectpicker').selectpicker()
	*/}

	$scope.init();

	$scope.scrollRight = function() {

	}

	$scope.scrollLeft = function() {

	}

	$scope.showCarouselCheck = function() {

	}

	$scope.previewFrontImg = function() {

	}

	$scope.captureFront = function(retake) {
		/*if (retake != "retake") {
			if (screen.orientation.indexOf("portrait") != -1) {
				gConfig.origOrientation = "portrait";
			} else {
				gConfig.origOrientation = "landscape";
			}
		}*/
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.Cheque.frontImage = "data:image/jpeg;base64," + imageData;
			$("#frontImageDiv").hide();
			$("#frontValidImageDiv").show()
		}, function(err) {
			// error
		});

	}

	$scope.previewBackImg = function() {

	}

	$scope.captureBack = function() {

	}

	$scope.deleteCheck = function() {

	}

	$scope.depositChecks = function() {

	}

	$scope.discardChecks = function() {

	}

	$scope.updateAmt = function() {

	}

	$scope.locationsSelected = function() {

	}

})
