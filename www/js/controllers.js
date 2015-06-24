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
		ServerConfig, $cordovaCamera) {/*// 31191
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
	$scope.checkList = null || []
	$scope.locationsResult = null || []
	$scope.accountResult = null || []
	$scope.Cheque = null || {}
	$scope.init = function() {
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
	
		
	
		
	
	
	
	}

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
		if (retake != "retake") {
			if (screen.orientation.indexOf("portrait") != -1) {
				gConfig.origOrientation = "portrait";
			} else {
				gConfig.origOrientation = "landscape";
			}
		}
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
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.Cheque.backImage = "data:image/jpeg;base64," + imageData;
			$("#backImageDiv").hide();
			$("#backValidImageDiv").show()
		}, function(err) {
			// error
		});
	}
	
	$scope.isCheckCaptured = function() {

        var amtMsg = "",
            frontImgMsg = "",
            backImgMsg = "";
        var amtValid = false, frontValid = false, backValid = false;
       //***$GeoLocation$***:adding if condition for checking the boolean response of server

        if(gConfig.geoAllow=="false"){
            NotyMsg.errorMsg("Sorry you are not allowed to deposit the check from the current location");
            return false;
        }
        else{

        if($scope.amt.length > 0 || parseFloat($scope.amt.val()) > 0){
            amtMsg = "";
            amtValid = true;
        }else{
            amtMsg = "<br> -> Check Amount";
            amtValid = false;
        }
        if($("#frontImage").prop("src").length > 30){
            frontImgMsg = "";
            frontValid = true;
        }else{
            frontImgMsg = "<br> -> Front Check";
            frontValid = false;
        }
        if($("#backImage").prop("src").length > 30){
            backImgMsg = "";
            backValid = true;
        }else{
            backImgMsg = "<br> -> Back Check";
            backValid = false;
        }
        if(amtValid && frontValid && backValid){
            return true;
        }else {
//            NotyMsg.errorMsg("Please enter missing fields:"+amtMsg+""+frontImgMsg+""+backImgMsg+"");//TODO
            return false;
        }

   }
	}
	checkLimit: function(){
        if(parseFloat($scope.amt) > parseFloat($scope.dailyLimitAmt)){//TODO
//            NotyMsg.errorMsg("Please add a cheque of lesser or equal amount of daily limit.");
            return false;
        }else if(parseInt($scope.depositLimitCount) < 1 ){//TODO
//            NotyMsg.errorMsg("Number of checks you can deposit is exceeding the limit.");
            return false;
        }else if(parseFloat($scope.amt) > parseFloat($scope.depositLimitAmt)){//TODO
//            NotyMsg.errorMsg("Check amount is exceeding your deposit limits.");
            return false;
        }else{
            return true;
        }
    }
	
	$scope.processCheck = function() {
		$scope.checkList.push({
                    'SessionId'     : gConfig.IVSSessionId,
                    'Amount'        : parseFloat($scope.amt).toFixed(2),
                    'FrontImage'    : $scope.Cheque.frontImage,
                    'RearImage'     : $scope.Cheque.backImage,
                    'ReturnImage'   : true
                })
	}
	
	$scope.submitCheck = function() {
		if(!$scope.isCheckCaptured()){
            return false;
        }
        if(!$scope.checkLimit()){
            return false;
        }
        if($scope.checkCounter < 1){
            this.startTrans();
            gConfig.checkInProgress = true;
            return;
        }

        $scope.processCheck();
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

*/})
