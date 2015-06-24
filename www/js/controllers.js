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

controllers
		.controller(
				'CaptureCtrl',
				function($scope, appFactory, gConfig, ServerConfig,
						$cordovaCamera) {// 31191
					// console.log(ServerConfig.url)
					var options = null || {}
					$scope.depositLimitCount = 5
					$scope.getNumber = function(num) {
						return new Array(num);
					}
					/*
					 * var NotyMsg = require('../lib/noty_msg');
					 * NotyMsg.errorMsg("ad");
					 */
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
					$scope.validCheckColl = null || []
					$scope.locationsResult = null || []
					$scope.accountResult = null || []
					$scope.Cheque = null || {}
					/*
					 * getDailyLimit(); getDepositLimit();
					 */
					$scope.init = function() {
						$scope.checkCounter = 0;
						/*
						 * appFactory.getLocations({}).$promise.then(function(getLocationsResult) {
						 * console.log(getLocationsResult)
						 * $scope.locationsResult = getLocationsResult;
						 * 
						 * if ($scope.locationsResult.length == 1) {
						 * $($(".icon-select-drop-down")[0]).hide();
						 * $('#multipleLocDiv').addClass("disabled"); } else {
						 * $($(".icon-select-drop-down")[0]).show();
						 * $('#multipleLocDiv').removeClass("disabled"); }
						 * $('.selectpicker').selectpicker('render');
						 * $('.selectpicker').selectpicker('refresh'); },
						 * function(getLocationsError) { })
						 * appFactory.getAccounts({}).$promise.then(function(getAccountsResult) {
						 * $scope.accountResult = getAccountsResult;
						 * 
						 * if ($scope.accountResult.length == 1) {
						 * $($(".icon-select-drop-down")[1]).hide();
						 * $('#multipleAccDiv').addClass("disabled"); } else {
						 * $($(".icon-select-drop-down")[1]).show();
						 * $('#multipleAccDiv').removeClass("disabled"); }
						 * 
						 * $('.selectpicker').selectpicker('render');
						 * $('.selectpicker').selectpicker('refresh'); },
						 * function(getLocationsError) { })
						 * 
						 * appFactory.getDailyLimit({ 'BusDate' :
						 * gConfig.BusDate, 'InstitutionId' :
						 * ServerConfig.institutionId, 'MerchantId' :
						 * gConfig.MerchantID
						 * }).$promise.then(function(getDailyLimitResult) { //
						 * TODO appFactory.getDepositLimit({ 'InstitutionId' :
						 * ServerConfig.institutionId, 'MerchantId' :
						 * gConfig.MerchantID, 'BusDate' : gConfig.BusDate
						 * }).$promise.then(function(getDepositLimitResult) { //
						 * TODO }, function(getDepositLimitError) { }) },
						 * function(getDailyLimitError) { })
						 * 
						 * $('.selectpicker').selectpicker()
						 */

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

					$scope.previewBackImg = function() {

					}

					$scope.captureFront = function(retake) {
						/*
						 * if (retake != "retake") { if
						 * (screen.orientation.indexOf("portrait") != -1) {
						 * gConfig.origOrientation = "portrait"; } else {
						 * gConfig.origOrientation = "landscape"; } }
						 */
						$cordovaCamera
								.getPicture(options)
								.then(
										function(imageData) {
											$scope.Cheque.frontImage = "data:image/jpeg;base64,"
													+ imageData;
											$("#frontImageDiv").hide();
											$("#frontValidImageDiv").show()
										}, function(err) {
											// error
										});

					}

					$scope.captureBack = function() {
						$cordovaCamera
								.getPicture(options)
								.then(
										function(imageData) {
											$scope.Cheque.backImage = "data:image/jpeg;base64,"
													+ imageData;
											$("#backImageDiv").hide();
											$("#backValidImageDiv").show()
										}, function(err) {
											// error
										});
					}

					$scope.isCheckCaptured = function() {

						var amtMsg = "", frontImgMsg = "", backImgMsg = "";
						var amtValid = false, frontValid = false, backValid = false;
						// ***$GeoLocation$***:adding if condition for checking
						// the boolean response of server

						/*
						 * if(gConfig.geoAllow=="false"){
						 * NotyMsg.errorMsg("Sorry you are not allowed to
						 * deposit the check from the current location"); return
						 * false; } else{
						 */

						if (parseFloat($scope.amt) > 0) {
							amtMsg = "";
							amtValid = true;
						} else {
							amtMsg = "<br> -> Check Amount";
							amtValid = false;
						}
						if ($("#frontImage").prop("src").length > 30) {
							frontImgMsg = "";
							frontValid = true;
						} else {
							frontImgMsg = "<br> -> Front Check";
							frontValid = false;
						}
						if ($("#backImage").prop("src").length > 30) {
							backImgMsg = "";
							backValid = true;
						} else {
							backImgMsg = "<br> -> Back Check";
							backValid = false;
						}
						if (amtValid && frontValid && backValid) {
							return true;
						} else {
							// //NotyMsg.errorMsg("Please enter missing
							// fields:"+amtMsg+""+frontImgMsg+""+backImgMsg+"");//TODO
							return false;
						}

						/* } */
					}
					$scope.checkLimit = function() {
						if (parseFloat($scope.amt) > parseFloat($scope.dailyLimitAmt)) {// TODO
							// NotyMsg.errorMsg("Please add a cheque of lesser
							// or
							// equal amount of daily limit.");
							return false;
						} else if (parseInt($scope.depositLimitCount) < 1) {// TODO
							// NotyMsg.errorMsg("Number of checks you can
							// deposit is
							// exceeding the limit.");
							return false;
						} else if (parseFloat($scope.amt) > parseFloat($scope.depositLimitAmt)) {// TODO
							// NotyMsg.errorMsg("Check amount is exceeding your
							// deposit limits.");
							return false;
						} else {
							return true;
						}
					}
					$scope.showUpdatedCarouselCheck = function() {
						$checkLi = $(".carouselLi.active").parent().parent();
						console.log($checkLi.index());
						var pos = $checkLi.index();
						var status = $checkLi.attr("data-status");
						switch (status) {
						case "0":
							break;
						case "1":
							$('.amtPreviewDiv').hide();
							$('.amtInputDiv').show();

							$('#submitCheck').show();

							$('.validCheckImgDiv').hide();
							$('.checkImgDiv').show();
							break;
						case "2":
							$('.amtInputDiv').hide();
							$('.amtPreviewDiv').show();

							$('#amtPreviewSpan').html(
									$scope.validCheckColl[pos].Amount);
							$('#submitCheck').hide();

							$('.checkImgDiv').hide();
							$('.validCheckImgDiv').show();

							$('#frontImagePreview').prop("src",
									$scope.validCheckColl[pos].FrontImage);
							$('#backImagePreview').prop("src",
									$scope.validCheckColl[pos].RearImage);

							break;
						default:
							break;
						}
					}

					$scope.scrollActiveElem = function() {
						if ($scope.checkCounter < 2) {
							$(".horizontalScroll").css("overflow-x", "hidden");
						} else {
							$(".horizontalScroll").css("overflow-x", "scroll");
							var checkLi = $(".carouselLi.active").parent()
									.parent();
							$(".horizontalScroll").scrollLeft(
									checkLi.position().left
											- $(".horizontalScroll").width()
											/ $("#checkListCarousel")
													.children().length);
						}
					}
					$scope.processCheck = function() {
						$scope.validCheckColl.push({
							'SessionId' : gConfig.IVSSessionId,
							'Amount' : parseFloat($scope.amt).toFixed(2),
							'FrontImage' : $scope.Cheque.frontImage,
							'RearImage' : $scope.Cheque.backImage,
							'ReturnImage' : true,
							'status' : 2
						})
						$scope.checkCounter = $scope.validCheckColl.length
						var checkCount = $scope.validCheckColl.length;
						var carouselAddedStr = "";
						for (var i = 0; i < checkCount; i++) {
							carouselAddedStr = carouselAddedStr
									+ "<li class='checkLi' data-status='2'><span><span class='carouselLi'>"
									+ (i + 1)
									+ "</span><br><span class='carouselAmt'>"
									+ $scope.validCheckColl[i].Amount
									+ "</span></span></li>";
						}
						var remainingStr = "";
						var limitCount = $scope.depositLimitCount;
						var remainingLength = limitCount + parseInt(checkCount)
								- 1;

						for (var j = checkCount; j < remainingLength; j++) {
							remainingStr = remainingStr
									+ "<li class='checkLi' data-status='0'><span><span class='carouselLi'>"
									+ (j + 1)
									+ "</span><br><span class='carouselAmt'></span></span></li>";
						}
						var totalStr = carouselAddedStr + remainingStr;
						$('#checkListCarousel').html(totalStr);

						var activePos;
						if (limitCount == 1) {
							activePos = checkCount - 1;
							$(".carouselLi:eq(" + activePos + ")").addClass(
									"active");
						} else {
							activePos = checkCount;
							$(".carouselLi:eq(" + activePos + ")").addClass(
									"active");
							$(".checkLi:eq(" + activePos + ")").attr(
									"data-status", "1");
						}
						$scope.showUpdatedCarouselCheck();

						$scope.scrollActiveElem();

					}

					$scope.submitCheck = function() {
						if (!$scope.isCheckCaptured()) {
							return false;
						}
						if (!$scope.checkLimit()) {
							return false;
						}
						/*
						 * if($scope.checkCounter < 1){ this.startTrans();
						 * gConfig.checkInProgress = true; return; }
						 */

						$scope.processCheck();
						$scope.Cheque = null || {};
						$scope.amt = null;
						$("#backImageDiv").show();
						$("#backValidImageDiv").hide()
						$("#frontImageDiv").show();
						$("#frontValidImageDiv").hide()
					}

					$scope.depositChecks = function() {

						if ($scope.validCheckColl.length < 1) {
							// NotyMsg.errorMsg("Please add at least one check
							// to the deposit list before depositing.");
							return false;
						}
						/*
						 * proccess { 'SessionId' : gConfig.IVSSessionId,
						 * 'ReturnValue' : true, //***$GeoLocation$***: adding
						 * one parameter "strSessionId" : gConfig.SessionID }
						 */

						// this.depositSuccess(54321);
					}
					$scope.isCheckCaptureStarted = function() {
						var amtValid = ($scope.amt.length > 0 || parseFloat($scope.amt) > 0);
						var frontValid = ($("#frontImage").prop("src").length > 30);
						var backValid = ($("#backImage").prop("src").length > 30);

						return (amtValid || frontValid || backValid)
					}

					$scope.deleteCheck = function() {
						var status = $("span.active").parent().parent().attr(
								"data-status");
						if (status == "1" && $scope.isCheckCaptureStarted()) {
							// NotyMsg.confirmMsg("Are you sure you want to
							// remove this check?",$scope.clearCheck());
						}
						if (status == "2") {
							// NotyMsg.confirmMsg("Are you sure you want to
							// remove this check from the deposit
							// list?",$scope.deleteCheckConfirmed());
						}
					}

					$scope.discardChecks = function() {
						if ($scope.validCheckColl.length < 1) {
							$scope.deleteCheck();
						} else {
							// NotyMsg.confirmMsg("This will delete all the
							// checks in deposit list and cancel this
							// transaction.<br>Are you sure you want to discard
							// this deposit?", $scope.discardConfirmed);
						}
					}
					$scope.discardConfirmed = function() {
						$scope.enableAccLoc();
						$scope.discardAll();
					}
					$scope.discardAll = function() {
						if ($scope.validCheckColl.length > 0) {
							/*
							 * var discardModel = Models.getDiscardModel();
							 * discardModel.set({ 'UserId' : gConfig.UserID,
							 * 'InstId' : ServerConfig.institutionId,
							 * 'ApplicationId' : gConfig.ApplicationType,
							 * 'TransactionId' : gConfig.IVSSessionId });
							 * discardModel.processRequest();
							 */
						} else {
							$scope.clearDepositChecks();
						}
					}
					$scope.clearDepositChecks = function() {
						$scope.clearCheck();
						$scope.showCurrentCheck();
						$scope.initCollection();
						$scope.updateDepositCounter();
						$scope.resetLimits();

					}
					$scope.resetLimits = function() {
						$scope.getDailyLimit();
						$scope.getDepositLimit();
					}
					$scope.updateDepositCounter = function() {
						var totalChecks = $scope.validCheckColl.length;
						var totalAmt = 0.00;
						for (var i = 0; i < totalChecks; i++) {
							totalAmt = parseFloat(totalAmt)
									+ parseFloat($scope.validCheckColl[i].Amount);
						}
						totalAmt = parseFloat(totalAmt).toFixed(2);
						/*
						 * this.ui.totalChecksDepCounter.html(totalChecks);
						 * this.ui.totalValidAmtDepCounter.html(totalAmt);
						 * this.updateCheckProgress();
						 */
					}
					$scope.initCollection = function() {
						$scope.checkCounter = 0;
						/*
						 * this.validCheckColl = Models.getCheckColl();
						 * this.updateCheckProgress();
						 */
					}
					$scope.showCurrentCheck = function() {
						$('.amtPreviewDiv').hide();
						$('.amtInputDiv').show();

						$('#submitCheck').show();

						$('.validCheckImgDiv').hide();
						$('.checkImgDiv').show();
					}
					$scope.clearCheck = function() {

						$("#frontImage").hide().prop("src",
								"data:image/jpeg;base64,");
						$(".frontCameraIcon").show();
						$("#backImage").hide().prop("src",
								"data:image/jpeg;base64,");
						$(".backCameraIcon").show();
						$scope.amt = "";
					}
					$scope.disableAccLoc = function() {
						$(".locAccSelectInpGrp").addClass("disabled");
					}
					$scope.enableAccLoc = function() {
						$(".locAccSelectInpGrp").removeClass("disabled");
					}
					// Update Check Capture Status
					$scope.updateCheckProgress = function() {
						gConfig.checkInProgress = (this.validCheckColl.length > 0);
					}

					$scope.onBeforeDestroy = function() {
						gConfig.checkInProgress = false;
					}
					$scope.updateAmt = function() {

					}

					$scope.locationsSelected = function() {

					}

				})
