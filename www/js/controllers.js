var controllers = angular.module('starter.controllers', [])

controllers.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    // $scope.$on('$ionicView.enter', function(e) {
    // });

    // Create the login modal that we will use later
    /*$ionicModal.fromTemplateUrl('templates/login.html', {
     scope : $scope
     }).then(function(modal) {
     $scope.modal = modal;
     });*/

})

controllers.controller('HistoryCtrl', function ($scope, ServerConfig, gConfig, appFactory, $location) {
    $scope.todayDate = null;
    $scope.SessionId = gConfig.SessionId;
    var instId = ServerConfig.institutionId;
    $scope.showDates = function () {
        $('#todayTabDate').html(moment().format("MM/DD/YYYY"));
        $('#yestTabDate').html(moment().subtract(1, 'days').format("MM/DD/YYYY"));
    };

    $scope.showDates();

    $scope.getTodayDepositHistory = function () {
        $(event.currentTarget).children().children("span.carouselLi").addClass("active");
        var today = moment().format("MM/DD/YYYY");
        appFactory.getDepositHistory(ServerConfig.institutionId, gConfig.UserID, today, gConfig.ApplicationType).then(function (res) {
            $scope.depositChecks = res;
            for(var i = 0 ; i< $scope.depositChecks.length; i++){
                $scope.depositChecks[i].DateOfDeposit = moment($scope.depositChecks[i].CreatedOn, "MM/DD/YYYY HH:mm:ss").format("hh.mm a")
            }
        }, function (err) {
        });
    };
    $scope.getTodayDepositHistory();

    $scope.getYesterdayDepositHistory = function () {
        var yesterday = moment().subtract(1, 'days').format("MM/DD/YYYY");
        appFactory.getDepositHistory(ServerConfig.institutionId, gConfig.UserID, yesterday, gConfig.ApplicationType).then(function (res) {
            $scope.depositChecks = res;
            for(var i = 0 ; i< $scope.depositChecks.length; i++){
                $scope.depositChecks[i].DateOfDeposit = moment($scope.depositChecks[i].CreatedOn, "MM/DD/YYYY HH:mm:ss").format("hh.mm a")
            }
        }, function (err) {
        });
    };
    $scope.renderDepositHistory = function (coll, target) {
        /*var AppViewInitializer = require('../../js/app/app_view_initializer');
         console.log(coll);
         console.log(target);

         for(var i = 0; i < coll.length; i++){
         var depLogModel = Models.getDepositLogModel().set(coll[i]);
         var depLogView = AppViewInitializer.depositLogView(depLogModel);
         var appendRegion = "<div id='"+depLogModel.cid+"'></div>";
         $(target).append(appendRegion);
         var depLogRegion = new Backbone.Marionette.Region({
         el : "#"+depLogModel.cid+""
         });
         depLogRegion.show(depLogView);
         }*/

    };



})

controllers
    .controller(
    'CaptureCtrl',
    function (sessionCheck,$scope, appFactory, gConfig, ServerConfig, dConfig, $cordovaCamera, $soap, $location, $compile, $rootScope, $timeout, NotyMsg) {// 31191
        var options = null || {}
        $scope.master = null || {};
        $scope.depositLimitCount = 0;
        $scope.dailyLimitAmt = 0.00;
        $scope.depositLimitAmt = 0.00;
        $scope.getNumber = function (num) {
            return new Array(num);
        }

        ionic.Platform
            .ready(function () {
                if (ionic.Platform.isAndroid()
                    || ionic.Platform.isIOS()) {
                    options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 800,
                        targetHeight: 600,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false
                    };
                }
            });
        $scope.validCheckColl = null || []
        $scope.locationsResult = null || []
        $scope.accountResult = null || []
        $scope.Cheque = null || {}

        $scope.scrollRight = function () {
            //TODO : No Functionality
        }

        $scope.scrollLeft = function () {
            //TODO : No Functionality
        }

        $scope.showCapturedCheck = function (pos) {
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
        }
        $scope.showCarouselCheck = function () {

            var pos = ((parseInt($(event.currentTarget).index()) + 1) / 2) - 1;
            var status = $(event.currentTarget).attr("data-status");
            switch (status) {
                case "0":
                    break;
                case "1":
                    $scope.showCurrentCheck();
                    $(".carouselLi").removeClass("active");
                    $(event.currentTarget).children().children(
                        "span.carouselLi").addClass("active");
                    break;
                case "2":
                    $scope.showCapturedCheck(pos);
                    $(".carouselLi").removeClass("active");
                    $(event.currentTarget).children().children(
                        "span.carouselLi").addClass("active");
                    break;
                default:
                    break;
            }
        }

        $scope.previewFrontImg = function () {
            screen.lockOrientation('landscape');
            $('#HomeViewRegion').hide()
            $('#FrontPreviewView').show()
        }
        $scope.previewBackImg = function () {
            screen.lockOrientation('landscape');
            $('#HomeViewRegion').hide()
            $('#BackPreviewView').show()

        }
        $scope.backToDep = function () {
            if (gConfig.isIos) {
                window.ChangeOrientation.change(gConfig.origOrientation,
                    function success() {
                    },
                    function error() {
                    }
                );
            } else {
                screen.unlockOrientation();
            }
            //screen.unlockOrientation(); TODO CHECK
            $("#HomeViewRegion").show();
            $('#FrontPreviewView').hide();
            $('#BackPreviewView').hide()

            gConfig.isCheckViewed = false;
        }

        $scope.captureFront = function (retake) {
            if (retake != "retake") {
                if (screen.orientation == "portrait" || screen.orientation == "portrait-primary" || screen.orientation == "portrait-secondary") {
                    gConfig.origOrientation = "portrait";
                } else {
                    gConfig.origOrientation = "landscape";
                }
            }

            if (gConfig.isIos) {
                window.ChangeOrientation.change("portrait",
                    function success() {
                    },
                    function error() {
                    }
                );
            }

            $cordovaCamera
                .getPicture(options)
                .then(
                function (imageData) {
                    $scope.Cheque.frontImage = "data:image/jpeg;base64,"
                        + imageData;
                    $scope.Cheque.frontImageData = imageData;
                    $("#frontImageDiv").hide();
                    $("#frontValidImageDiv").show()
                }, function (err) {
                    // error
                });

        }

        $scope.captureBack = function (retake) {
            if (retake != "retake") {
                if (screen.orientation == "portrait" || screen.orientation == "portrait-primary" || screen.orientation == "portrait-secondary") {
                    gConfig.origOrientation = "portrait";
                } else {
                    gConfig.origOrientation = "landscape";
                }
            }

            if (gConfig.isIos) {
                window.ChangeOrientation.change("portrait",
                    function success() {
                    },
                    function error() {
                    }
                );
            }
            $cordovaCamera
                .getPicture(options)
                .then(
                function (imageData) {
                    $scope.Cheque.backImage = "data:image/jpeg;base64,"
                        + imageData;
                    $scope.Cheque.backImageData = imageData;
                    $("#backImageDiv").hide();
                    $("#backValidImageDiv").show()
                }, function (err) {
                    // error
                });
        }

        $scope.isCheckCaptured = function () {

            var amtMsg = "", frontImgMsg = "", backImgMsg = "";
            var amtValid = false, frontValid = false, backValid = false;

            if (parseFloat($scope.master.amt) > 0) {
                amtMsg = "";
                amtValid = true;
            } else {
                amtMsg = "<br> -> Check Amount";
                amtValid = false;
            }
            if ($("#frontImagePreview").prop("src").length > 30) {
                frontImgMsg = "";
                frontValid = true;
            } else {
                frontImgMsg = "<br> -> Front Check";
                frontValid = false;
            }
            if ($("#backImagePreview").prop("src").length > 30) {
                backImgMsg = "";
                backValid = true;
            } else {
                backImgMsg = "<br> -> Back Check";
                backValid = false;
            }
            if (amtValid && frontValid && backValid) {
                return true;
            } else {
                NotyMsg.errorMsg("Please enter missing fields:" + amtMsg + "" + frontImgMsg + "" + backImgMsg + "");
                return false;
            }

        }
        $scope.checkLimit = function () {
            if (parseFloat($scope.master.amt) > parseFloat($scope.dailyLimitAmt)) {
                NotyMsg.errorMsg("Please add a cheque of lesser or equal amount of daily limit.");
                return false;
            } else if (parseInt($scope.depositLimitCount) < 1) {
                NotyMsg.errorMsg("Number of checks you can deposit is exceeding the limit.");
                return false;
            } else if (parseFloat($scope.master.amt) > parseFloat($scope.depositLimitAmt)) {// TODO
                NotyMsg.errorMsg("Check amount is exceeding your deposit limits.");
                return false;
            } else {
                return true;
            }
        }
        $scope.showUpdatedCarouselCheck = function () {
            $checkLi = $(".carouselLi.active").parent().parent();
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

        $scope.scrollActiveElem = function () {
            if ($scope.checkCounter < 2) {
                $(".horizontalScroll").css("overflow-x", "hidden");
            } else {
                $(".horizontalScroll").css("overflow-x", "scroll");
                var checkLi = $(".carouselLi.active").parent()
                    .parent();
                if ($scope.depositLimitCount < $scope.validCheckColl.length) {
                    $(".horizontalScroll").scrollLeft(
                        checkLi.position().left
                        - $(".horizontalScroll")
                            .width()
                        / $("#checkListCarousel")
                            .children().length);
                }
            }
        }
        $scope.drawCrousal = function () {
            var checkCount = $scope.validCheckColl.length;
            var carouselAddedStr = "";
            for (var i = 0; i < checkCount; i++) {
                carouselAddedStr = carouselAddedStr
                    + "<li></li>"
                    + "<li ng-click='showCarouselCheck()' class='checkLi' data-status='2'><span><span class='carouselLi'>"
                    + (i + 1)
                    + "</span><br><span class='carouselAmt'>"
                    + $scope.validCheckColl[i].Amount
                    + "</span></span></li>";
            }
            var remainingStr = "";
            var limitCount = $scope.depositLimitCount;

            for (var j = checkCount; j < limitCount; j++) {
                remainingStr = remainingStr
                    + "<li></li>"
                    + "<li ng-click='showCarouselCheck()' class='checkLi' data-status='0'><span><span class='carouselLi'>"
                    + (j + 1)
                    + "</span><br><span class='carouselAmt'></span></span></li>";
            }
            var totalStr = carouselAddedStr + remainingStr;
            var temp = $compile(totalStr)($scope, function (clonedElement, scope) {
                $('#checkListCarousel').html(clonedElement);
            })
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
        }

        $scope.processCheck = function () {
            appFactory.Process(gConfig.IVSSessionId, parseFloat($scope.master.amt).toFixed(2), $scope.Cheque.frontImageData, $scope.Cheque.backImageData, true).then(function (ProcessResult) {
                var $IQResult = ProcessResult.IQResult;
                if ($IQResult == undefined || $IQResult == null) {
                    $IQResult = {}
                }
                var $IUResult = ProcessResult.IUResult;
                if ($IUResult == undefined || $IUResult == null) {
                    $IUResult = {}
                }
                var $Amount = ProcessResult.Amount
                if ($Amount == undefined || $Amount == null) {
                    $Amount = {}
                }
                var $Duplicate = ProcessResult.Duplicate;
                if ($Duplicate == undefined || $Duplicate == null) {
                    $Duplicate = {}
                }
                var $Threshold = ProcessResult.Threshold;
                if ($Threshold == undefined || $Threshold == null) {
                    $Threshold = {}
                }
                var $MICR = ProcessResult.MICR
                if ($MICR == undefined || $MICR == null) {
                    $MICR = {}
                }

                var validationResult = {

                    ReturnValue: ProcessResult.ReturnValue,
                    ErrorCode: ProcessResult.ErrorCode,
                    ErrorDesc: ProcessResult.ErrorDesc,
                    RequestDuration: ProcessResult.RequestDuration,
                    ReturnedImage: ProcessResult.Image,

                    FrontImage: ProcessResult.FrontImage,
                    BackImage: ProcessResult.BackImage,

                    IQResultValue: $IQResult.Value,
                    IQResultReason: $IQResult.Reason,

                    IUResultValue: $IUResult.Value,
                    IUResultReason: $IUResult.Reason,

                    AmountValue: $Amount.Value,
                    AmountResult: $Amount.Result,
                    AmountConfidence: $Amount.AmountConfidence,

                    DuplicateValue: $Duplicate.Value,
                    DuplicateReason: $Duplicate.Reason,

                    ThresholdValue: $Threshold.Value,
                    ThresholdReason: $Threshold.Reason,

                    MICRValue: $MICR.Value,
                    MICRReason: $MICR.Reason,
                    MICREligible: $MICR.Eligible,
                    MICRFlipped: $MICR.Flipped,
                    MICRRotated: $MICR.Rotated,
                    MICRField1: $MICR.Field1,
                    MICRField2: $MICR.Field2,
                    MICRField3: $MICR.Field3,
                    MICRField4: $MICR.Field4,
                    MICRField5: $MICR.Field5,
                    MICRField6: $MICR.Field6,
                    RawMICR: $MICR.RawMICR,
                    MICRConfidence: $MICR.MICRConfidence
                };

                if (validationResult.ErrorCode == '0') {
                    var checkItem = {
                        'Amount': validationResult.MICRField1,
                        'FrontImage': $scope.Cheque.frontImage,
                        'RearImage': $scope.Cheque.backImage,
                        'RawMICR': validationResult.RawMICR
                    };
                    $scope.validCheckColl.push(checkItem);
                    $scope.checkCounter = $scope.validCheckColl.length;
                    $scope.updateCheckProgress();
                    $scope.onSuccessfulValidation();

                    NotyMsg.successMsg("Your Check has been added successfully");
                } else {
                    NotyMsg.errorMsg(validationResult.ErrorDesc);
                    $scope.clearCheck();

                }
            })
        }
        $scope.onSuccessfulValidation = function () {
            $scope.disableAccLoc();
            $scope.updateCheckCarousel();
            $scope.updateDepositCounter();
            $scope.clearCheck();
            $scope.updateThresholdLimits();
        }
        $scope.updateCheckCarousel = function () {

            var checkCount = $scope.validCheckColl.length;
            var carouselAddedStr = "";
            for (var i = 0; i < checkCount; i++) {
                carouselAddedStr = carouselAddedStr + "<li></li><li class='checkLi' data-status='2'><span><span class='carouselLi'>" + (i + 1) + "</span><br><span class='carouselAmt'>" + $scope.validCheckColl[i].Amount + "</span></span></li>";
            }
            var remainingStr = "";
            var limitCount = parseInt($scope.depositLimitCount);
            var remainingLength = limitCount + parseInt(checkCount) - 1;
            for (var j = checkCount; j < remainingLength; j++) {
                remainingStr = remainingStr + "<li></li><li class='checkLi' data-status='0'><span><span class='carouselLi'>" + (j + 1) + "</span><br><span class='carouselAmt'></span></span></li>";
            }
            var totalStr = carouselAddedStr + remainingStr;
            var temp = $compile(totalStr)($scope, function (clonedElement, scope) {
                $('#checkListCarousel').html(clonedElement);
            })
            var activePos;
            if (limitCount == 1) {
                activePos = checkCount - 1;
                $(".carouselLi:eq(" + activePos + ")").addClass("active");
            } else {
                activePos = checkCount;
                $(".carouselLi:eq(" + activePos + ")").addClass("active");
                $(".checkLi:eq(" + activePos + ")").attr("data-status", "1");
            }
            $scope.showUpdatedCarouselCheck();
            $scope.scrollActiveElem();
        }
        $scope.updateAfterDeleteCheckCarousel = function () {
            var checkCount = $scope.validCheckColl.length;
            var carouselAddedStr = "";
            for (var i = 0; i < checkCount; i++) {
                carouselAddedStr = carouselAddedStr + "<li></li><li class='checkLi' data-status='2'><span><span class='carouselLi'>" + (i + 1) + "</span><br><span class='carouselAmt'>" + $scope.validCheckColl[i].Amount + "</span></span></li>";
            }
            var remainingStr = "";
            var limitCount = parseInt($scope.depositLimitCount);
            var remainingLength = limitCount + parseInt(checkCount);
            for (var j = checkCount; j < remainingLength; j++) {
                remainingStr = remainingStr + "<li></li><li class='checkLi' data-status='0'><span><span class='carouselLi'>" + (j + 1) + "</span><br><span class='carouselAmt'></span></span></li>";
            }
            var totalStr = carouselAddedStr + remainingStr;
            var temp = $compile(totalStr)($scope, function (clonedElement, scope) {
                $('#checkListCarousel').html(clonedElement);
            })
            var activePos = checkCount;
            $(".carouselLi:eq(" + activePos + ")").addClass("active");
            $(".checkLi:eq(" + activePos + ")").attr("data-status", "1");

            $scope.showUpdatedCarouselCheck();
            $scope.scrollActiveElem();
        }
        $scope.scrollActiveElem = function () {
            if ($scope.checkCounter < 2) {
                $(".horizontalScroll").css("overflow-x", "hidden");
            } else {
                $(".horizontalScroll").css("overflow-x", "scroll");
                var checkLi = $(".carouselLi.active").parent().parent();
                $(".horizontalScroll").scrollLeft(checkLi.position().left - $(".horizontalScroll").width() / $("#checkListCarousel").children().length);
            }
        }
        $scope.updateDepositCounter = function () {
            var totalChecks = $scope.validCheckColl.length;
            var totalAmt = 0.00;
            for (var i = 0; i < totalChecks; i++) {
                totalAmt = parseFloat(totalAmt) + parseFloat($scope.validCheckColl[i].Amount);
            }
            totalAmt = parseFloat(totalAmt).toFixed(2);
            $('#totalChecksDepCounter').html(totalChecks);
            $('#totalValidAmtDepCounter').html(totalAmt);
            $scope.updateCheckProgress();
        }
        $scope.clearCheck = function () {
            $("#frontImageDiv").show();
            $("#frontValidImageDiv").hide()
            $("#backImageDiv").show();
            $("#backValidImageDiv").hide()
            $scope.Cheque = null || {}
            $scope.master.amt = "";
            $('#amt').val('')
        }


        $scope.submitCheck = function () {
            if (!$scope.isCheckCaptured()) {
                return false;
            }
            if (!$scope.checkLimit()) {
                return false;
            }
            if ($scope.checkCounter < 1) {
                $scope.StartTran();
                gConfig.checkInProgress = true;
                return;
            }
            $scope.processCheck();

        }

        $scope.StartTran = function () {
            appFactory.StartTran(ServerConfig.institutionId, '7', gConfig.UserID, '', $("#accounts").val(), $("#accounts option:selected").attr("class"), gConfig.IVSProfileID, '1', '0', true, device.model, device.model, device.platform, device.version, gConfig.MerchantID, $scope.locations).then(function (StartTranResult) {
                var SessionId = StartTranResult.SessionId;
                var ReturnValue = StartTranResult.ReturnValue;
                var ErrorCode = StartTranResult.ErrorCode;
                var ErrorDesc = StartTranResult.ErrorDesc;

                if (ErrorCode == '0') {
                    gConfig.IVSSessionId = SessionId;
                    $scope.processCheck();
                } else {
                    NotyMsg.errorMsg('Start Transaction Error : ' + ErrorDesc);
                }
            })
        }

        $scope.depositChecks = function () {

            if ($scope.validCheckColl.length < 1) {
                NotyMsg.errorMsg("Please add at least one check to the deposit list before depositing.");
                return false;
            }
            appFactory.Acknowledgment(gConfig.IVSSessionId, true).then(function (AcknowledgmentResult) {
                var SessionId = AcknowledgmentResult.SessionId;
                var ReturnValue = AcknowledgmentResult.ReturnValue;
                var ConfirmationNo = AcknowledgmentResult.ConfirmationId;
                var ErrorCode = AcknowledgmentResult.ErrorCode;
                var ErrorDesc = AcknowledgmentResult.ErrorDesc;
                if (ErrorCode == '0') {
                    $scope.depositSuccess(ConfirmationNo);
                } else {
                    NotyMsg.errorMsg(ErrorDesc);
                }
            })
        }
        $scope.depositSuccess = function (no) {
            var totalAmt = 0.00;
            for (var i = 0; i < $scope.validCheckColl.length; i++) {
                totalAmt = parseFloat(totalAmt) + parseFloat($scope.validCheckColl[i].Amount);
            }
            totalAmt = parseFloat(totalAmt).toFixed(2);
            $scope.depositSuccessModal = null || {};
            $scope.depositSuccessModal.no = no;
            $scope.depositSuccessModal.totalAmt = totalAmt;
            $scope.depositSuccessModal.depCount = $scope.validCheckColl.length
            $("#depositSuccessModal").modal("show");
            $scope.onSuccessfulDeposit();
        }
        $scope.onSuccessfulDeposit = function () {
            $scope.enableAccLoc();
            $scope.updateThresholdLimits();
            $scope.clearDepositChecks()

        }
        $scope.isCheckCaptureStarted = function () {
            var amtValid = (parseFloat($scope.master.amt) > 0);
            var frontValid = ($("#frontImagePreview").prop("src").length > 30);
            var backValid = ($("#backImagePreview").prop("src").length > 30);

            return (amtValid || frontValid || backValid)
        }

        $scope.deleteCheck = function () {
            var status = $("span.active").parent().parent().attr(
                "data-status");
            if (status == "1" && $scope.isCheckCaptureStarted()) {
                NotyMsg.confirmMsg("Are you sure you want to remove this check?", $scope.clearCheck);//TODO
            }
            if (status == "2") {
                NotyMsg.confirmMsg("Are you sure you want to  remove this check from the deposit list?", $scope.deleteCheckConfirmed);//TODO
            }
        }
        $scope.deleteCheckConfirmed = function () {
            $scope.deletePos = $("span.active").parent().parent().index();
            appFactory.PurgeTransaction(gConfig.IVSSessionId,
                $scope.validCheckColl[$scope.deletePos].Amount,
                $scope.validCheckColl[$scope.deletePos].RawMICR
            ).then(function (PurgeTransactionResult) {
                    var ReturnValue = PurgeTransactionResult.ReturnValue
                    var ErrorCode = PurgeTransactionResult.ErrorCode
                    var ErrorDesc = PurgeTransactionResult.ErrorDesc

                    if (ErrorCode == "0" || ErrorCode == 0) {
                        $scope.deleteCheckSuccess();
                    } else {
                        NotyMsg.errorMsg('Delete Check Error : ' + ErrorDesc);
                    }
                });
        }
        $scope.deleteCheckSuccess = function () {
            $scope.validCheckColl.splice($scope.deletePos, 1);
            $scope.checkCounter = $scope.validCheckColl.length;
            $scope.depositLimitCount = parseInt($scope.depositLimitCount) + 1;
            $scope.updateAfterDeleteCheckCarousel();
            $scope.onDeleteCheckSuccess();
        }
        $scope.onDeleteCheckSuccess = function () {
            $scope.updateDepositCounter();
            $scope.updateThresholdLimits()
        }
        $scope.discardChecks = function () {
            if ($scope.validCheckColl.length < 1) {
                $scope.deleteCheck();
            } else {
                NotyMsg.confirmMsg("This will delete all the checks in deposit list and cancel this transaction.<br>Are you sure you want to discard this deposit?", $scope.discardConfirmed);// TODO
            }
        }
        $scope.discardConfirmed = function () {
            $scope.enableAccLoc();
            $scope.discardAll();
        }
        $scope.discardAll = function () {
            if ($scope.validCheckColl.length > 0) {
                appFactory.DiscardAllOpenItems(gConfig.UserID, ServerConfig.institutionId, gConfig.ApplicationId, gConfig.IVSSessionId).then(function (DiscardAllOpenItemsResult) {

                    var TransactionId = DiscardAllOpenItemsResult.TransactionId;
                    var ReturnValue = DiscardAllOpenItemsResult.ReturnValue;
                    var ConfirmationId = DiscardAllOpenItemsResult.ConfirmationId;
                    var ErrorCode = DiscardAllOpenItemsResult.ErrorCode;
                    var ErrorDesc = DiscardAllOpenItemsResult.ErrorDesc;

                    if (ErrorCode == "0" || ErrorCode == 0) {
                        if (!gConfig.isLogout) {
                            $scope.clearDepositChecks();
                        } else {
                            Utils.logout();
                        }
                    } else {
                        NotyMsg.errorMsg(ErrorDesc);
                    }

                })
            } else {
                $scope.clearDepositChecks();
            }
        }
        $scope.clearDepositChecks = function () {
            $scope.clearCheck();
            $scope.showCurrentCheck();
            $scope.initCollection();
            $scope.updateDepositCounter();
            $scope.resetLimits();

        }
        $scope.resetLimits = function () {
            $scope.updateThresholdLimits();
        }
        $scope.updateDepositCounter = function () {
            var totalChecks = $scope.validCheckColl.length;
            var totalAmt = 0.00;
            for (var i = 0; i < totalChecks; i++) {
                totalAmt = parseFloat(totalAmt)
                    + parseFloat($scope.validCheckColl[i].Amount);
            }
            totalAmt = parseFloat(totalAmt).toFixed(2);

            $('#totalChecksDepCounter').html(totalChecks);
            $('#totalValidAmtDepCounter').html(totalAmt);
            $scope.updateCheckProgress();

        }
        $scope.initCollection = function () {
            $scope.checkCounter = 0;
            $scope.validCheckColl.splice(0, $scope.validCheckColl.length);
            $scope.updateCheckProgress();
        }
        $scope.showCurrentCheck = function () {
            $('.amtPreviewDiv').hide();
            $('.amtInputDiv').show();

            $('#submitCheck').show();

            $('.validCheckImgDiv').hide();
            $('.checkImgDiv').show();
        }
        $scope.disableAccLoc = function () {
            $(".locAccSelectInpGrp").addClass("disabled");
        }
        $scope.enableAccLoc = function () {
            $(".locAccSelectInpGrp").removeClass("disabled");
        }
        $scope.updateCheckProgress = function () {
            gConfig.checkInProgress = ($scope.validCheckColl.length > 0);
        }

        $scope.onBeforeDestroy = function () {
            gConfig.checkInProgress = false;
        }
        $scope.updateAmt = function (event) {
            $('#amt').val(parseFloat(event.currentTarget.value).toFixed(2));
        }


        $scope.locationsSelected = function () {
            $scope.accountResult = null || [];
            $scope.accountResult = (_.find($scope.locationsResult, {'Id': $scope.locations})).Accounts
        }
        $scope.updateThresholdLimits = function () {
            appFactory.GetCurrentDayAvailableThresholdLimits(gConfig.ApplicationType, gConfig.BusDate, ServerConfig.institutionId, gConfig.MerchantID).then(function (GetCurrentDayAvailableThresholdLimitsResult) {
                $scope.dailyLimitAmt = GetCurrentDayAvailableThresholdLimitsResult.AvailableAmount;
                appFactory.GetDepositThresholdLimits(gConfig.ApplicationType, ServerConfig.institutionId, gConfig.MerchantID, gConfig.BusDate).then(function (GetDepositThresholdLimitsResult) {
                    $scope.depositLimitCount = GetDepositThresholdLimitsResult.ItemCount;
                    $scope.depositLimitAmt = GetDepositThresholdLimitsResult.ItemAmount;
                    $scope.drawCrousal()
                })
            })
        }
        $scope.init = function () {
            appFactory.VSHOCreateSession().then(function (VSHOCreateSessionResult) {

                gConfig.SessionId = VSHOCreateSessionResult;
                appFactory.VSHOGetClientIPAddress().then(function (VSHOGetClientIPAddressResult) {
                    gConfig.IpAddress = VSHOGetClientIPAddressResult;
                    appFactory.GetConsumerDescriptionEx(gConfig.SessionId, ServerConfig.institutionId, gConfig.UserID, $rootScope.password, false, gConfig.IpAddress, gConfig.ApplicationType).then(function (GetConsumerDescriptionExResult) {
                        var ConsumerID = GetConsumerDescriptionExResult.ConsumerID;
                        var ConsumerName = GetConsumerDescriptionExResult.ConsumerName;
                        var LocationID = GetConsumerDescriptionExResult.LocationID;
                        var IsLocked = GetConsumerDescriptionExResult.IsLocked;
                        var Change_Pwd = GetConsumerDescriptionExResult.Change_Pwd;
                        var Role_ID = GetConsumerDescriptionExResult.Role_ID;
                        var All_Grp_Ind = GetConsumerDescriptionExResult.All_Grp_Ind;
                        var Inst_Grp_Ind = GetConsumerDescriptionExResult.Inst_Grp_Ind;
                        var Error_Code = GetConsumerDescriptionExResult.Error_Code;
                        var Error_Message = GetConsumerDescriptionExResult.Error_Message;
                        var IVSProfileID = GetConsumerDescriptionExResult.IVSProfileID;
                        var MobileAgreementStatus = GetConsumerDescriptionExResult.MobileAgreementStatus;
                        var MobileAgreementId = GetConsumerDescriptionExResult.MobileAgreementId;
                        var AgreementFileName = GetConsumerDescriptionExResult.AgreementFileName;
                        var FirstTimeLogin = GetConsumerDescriptionExResult.FirstTimeLogin;
                        var BusDate = GetConsumerDescriptionExResult.BusDate;

                        function isAccLocked(status) {
                            return (status == "true" || status == true)
                        }

                        function isChangePass(status) {
                            return (status == "true" || status == true)
                        }

                        function isShowAgreement(status) {
                            return (status == "false" || status == false)
                        }

                        function isFirstTimeLogin(status) {
                            return (status == "true" || status == true)
                        }

                        //If Error = 0 : user authentication success
                        if (Error_Code == 0) {
                            dConfig.AppInState = true;
                            sessionCheck.startSession();

                            gConfig.ConsumerID = ConsumerID;
                            gConfig.MerchantID = ConsumerID;
                            gConfig.ConsumerName = ConsumerName;
                            gConfig.LocationID = LocationID;
                            gConfig.IVSProfileID = IVSProfileID;
                            gConfig.BusDate = BusDate;
                            gConfig.ErrorCode = Error_Code;
                            gConfig.isChangePass = isChangePass(Change_Pwd);
                            gConfig.isShowAgreement = isShowAgreement(MobileAgreementStatus);
                            gConfig.isFirstTimeLogin = isFirstTimeLogin(FirstTimeLogin);

                            appFactory.VSHOStartSession(gConfig.SessionId, ServerConfig.institutionId, gConfig.MerchantID, gConfig.LocationID, gConfig.UserID, gConfig.Flag).then(function (VSHOStartSessionResult) {
                                var VSHOStartSessionResult = VSHOStartSessionResult;
                                appFactory.GetMerchantLocationsAndAccounts(ServerConfig.institutionId, gConfig.MerchantID, gConfig.UserID, ServerConfig.ApplicationType).then(function (GetMerchantLocationsAndAccountsResult) {
                                    gConfig.Locations = GetMerchantLocationsAndAccountsResult;
                                    $timeout(function () {
                                        navigator.splashscreen.hide();
                                        $scope.checkCounter = 0;
                                        if ($scope.depositLimitCount > 0) {
                                            $scope.drawCrousal();
                                        }
                                        $scope.locationsResult = gConfig.Locations;
                                        $scope.locations = $scope.locationsResult[0].Id;
                                        $scope.locationsSelected();
                                        $scope.updateThresholdLimits()

                                    }, 100);

                                })
                            });

                        } else if (isAccLocked(IsLocked)) {
                            NotyMsg.errorMsg("Your account is locked. Please contact bank administrator for further queries.");
                        } else {
//                            gConfig.ErrorCode = 1;
                            NotyMsg.errorMsg(Error_Message);
                        }
                    })
                })

            })

        }
        sessionCheck.initSession();
        $scope.init();
    })
