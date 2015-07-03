var controllers = angular.module('starter.controllers', [])

controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

controllers.controller('HistoryCtrl', function($scope, ServerConfig, gConfig, appFactory, $location) {
    $scope.todayDate = null;

    console.log('HistoryCtrl', ServerConfig.institutionId, $location.$$path)
    console.log('historyCtrl')
    var instId = ServerConfig.institutionId;
    appFactory.getDepositHistory(ServerConfig.institutionId, gConfig.UserID, '01022014', gConfig.ApplicationType).then(function(res) {
        console.log('success', res);
    }, function(err) {
        console.log('error', err);
    });
    $scope.depositChecks = [
        {
            TotalAmount: 1233,
            TotalCount: 2,
            DateOfDeposit: 02032014,
            AccountDescription: 'jhgweuryg',
            AccountNumber: 34345345,
            LocationName: 'HYD',
            TransactionStatusDescription: 'Submitted',
            TransactionStatu: 60
        },
        {
            TotalAmount: 1233,
            TotalCount: 2,
            DateOfDeposit: 02032014,
            AccountDescription: 'jhgweuryg',
            AccountNumber: 34345345,
            LocationName: 'HYD',
            TransactionStatu: 1,
            TransactionStatusDescription: 'Submitted'
        },
        {
            TotalAmount: 1233,
            TotalCount: 2,
            DateOfDeposit: 02032014,
            AccountDescription: 'jhgweuryg',
            AccountNumber: 34345345,
            LocationName: 'HYD',
            TransactionStatu: 2,
            TransactionStatusDescription: 'Submitted'
        }
    ]
    $scope.showDates = function(){
        $('#todayTabDate').html(moment().format("MM/DD/YYYY"));
        $('#yestTabDate').html(moment().subtract(1, 'days').format("MM/DD/YYYY"));
    };

    $scope.showDates();
    $scope.getTodayDepositHistory = function(){
        console.log('today')
        $(event.currentTarget).children().children("span.carouselLi").addClass("active");
        /*var depHisModel = Models.getDepositHistoryModel(),
         today = Moment().format("MM/DD/YYYY");

         depHisModel.set({
         'instId'        : ServerConfig.institutionId,
         'userId'        : gConfig.UserID,
         'depositDateMMDDYYYY' : today,

         'renderTarget'  : '#todayHistoryDiv'
         });
         depHisModel.processRequest();*/
    };
    $scope.getYesterdayDepositHistory = function(){
        console.log('getYesterdayDepos')
        /*var depHisModel = Models.getDepositHistoryModel(),
         yesterday = Moment().subtract(1, 'days').format("MM/DD/YYYY");

         depHisModel.set({
         'instId'        : ServerConfig.institutionId,
         'userId'        : gConfig.UserID,
         'depositDateMMDDYYYY' : yesterday,

         'renderTarget'  : '#yesterdayHistoryDiv'
         });
         depHisModel.processRequest();*/
    };

    $scope.renderDepositHistory = function(coll, target){
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

    /*$scope.depositHistory =  function(response, target) {
     var $xml = $(response);
     var $DepositHistoryResults = $xml.find("VSHOGetDepositHistoryResult");

     var singleElem, depositColl=[];
     $($DepositHistoryResults).find("ReceivedDeposit").each(function () {
     singleElem = {
     'DateOfDeposit'    : Moment($(this).find("CreatedOn").text(), "MM/DD/YYYY HH:mm:ss").format("hh.mm a"),
     'AccountNumber'    : Utils.maskAccount($(this).find("AcctNum").text()),
     'DepositId'    : $(this).find("DepositId").text(),
     'TotalCount'    : $(this).find("FinalCount").text(),
     'TotalAmount'    : parseFloat($(this).find("FinalAmount").text()).toFixed(2),
     'ConfirmationId'    : $(this).find("ConfirmationId").text(),
     'SessionId'  : $(this).find("SessionId").text(),
     'LocationName'  : $(this).find("LocationName").text(),
     'TransactionStatus'  : $(this).find("TransactionStatus").text(),
     'TransactionStatusDescription'  : $(this).find("TransactionStatusDescription").text(),
     'AccountDescription'  : $(this).find("AccountDescription").text()
     };
     console.log(singleElem);
     depositColl.push(singleElem);
     });
     */

})

controllers
    .controller(
    'CaptureCtrl',
    function($scope, appFactory, gConfig, ServerConfig,
             $cordovaCamera, $soap, $location,$compile) {// 31191
        console.log(ServerConfig.url, $location.$$path)
        var options = null || {}
        $scope.master = null || {};
        $scope.depositLimitCount = 0;
        $scope.dailyLimitAmt = 0.00;
        $scope.depositLimitAmt = 0.00;
        $scope.getNumber = function(num) {
            return new Array(num);
        }
        /*
         * var NotyMsg = require('../lib/noty_msg');
         * NotyMsg.errorMsg("ad");
         */

        ionic.Platform
            .ready(function() {
                if (ionic.Platform.isAndroid()
                    || ionic.Platform.isIOS()) {
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
                }
            });
        $scope.validCheckColl = null || []
        $scope.locationsResult = null || []
        $scope.accountResult = null || []
        $scope.Cheque = null || {}
        /*
         * getDailyLimit(); getDepositLimit();
         */

        /*$scope.validCheckColl.push({
         'SessionId' : gConfig.IVSSessionId,
         'Amount' : parseFloat("2").toFixed(2),
         'FrontImage' : "data:image/jpeg;base64,",
         'RearImage' : "data:image/jpeg;base64,",
         'ReturnImage' : true,
         'status' : 2
         })
         $scope.validCheckColl.push({
         'SessionId' : gConfig.IVSSessionId,
         'Amount' : parseFloat("3").toFixed(2),
         'FrontImage' : "data:image/jpeg;base64,",
         'RearImage' : "data:image/jpeg;base64,",
         'ReturnImage' : true,
         'status' : 2
         })
         $scope.validCheckColl.push({
         'SessionId' : gConfig.IVSSessionId,
         'Amount' : parseFloat("4").toFixed(2),
         'FrontImage' : "data:image/jpeg;base64,",
         'RearImage' : "data:image/jpeg;base64,",
         'ReturnImage' : true,
         'status' : 2
         })*/

        $scope.scrollRight = function() {

        }

        $scope.scrollLeft = function() {

        }

        $scope.showCapturedCheck = function(pos) {
            $('.amtInputDiv').hide();
            $('.amtPreviewDiv').show();

            $('#amtPreviewSpan').html(
                this.validCheckColl[pos].Amount);

            $('#submitCheck').hide();

            $('.checkImgDiv').hide();
            $('.validCheckImgDiv').show();

            $('#frontImagePreview').prop("src",
                this.validCheckColl[pos].FrontImage);
            $('#backImagePreview').prop("src",
                this.validCheckColl[pos].RearImage);
        }
        $scope.showCarouselCheck = function() {

            var pos = ((parseInt($(event.currentTarget).index())+1)/2)-1;
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

        $scope.previewFrontImg = function() {
            if (!$("#frontImage").is(":hidden")) {
                frontImgSrc = $("#frontImage").prop("src");
                backImgSrc = $("#backImage").prop("src");
            } else {
                frontImgSrc = $("#frontImagePreview").prop("src");
                backImgSrc = $("#backImagePreview").prop("src");
            }
            var data = {
                "frontImgSrc" : frontImgSrc,
                "backImgSrc" : backImgSrc
            };
            $('#HomeViewRegion').hide()
            // $('#FrontPreviewView').show()
        }

        $scope.previewBackImg = function() {
            var frontImgSrc = "", backImgSrc = "";
            if (!$("#frontImage").is(":hidden")) {
                frontImgSrc = $("#frontImage").prop("src");
                backImgSrc = $("#backImage").prop("src");
            } else {
                frontImgSrc = $("#frontImagePreview").prop("src");
                backImgSrc = $("#backImagePreview").prop("src");
            }
            var data = {
                "frontImgSrc" : frontImgSrc,
                "backImgSrc" : backImgSrc
            };
            $('#HomeViewRegion').hide()
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

            if (parseFloat($scope.master.amt) > 0) {
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
                //alert("Please enter missing fields:"+amtMsg+""+frontImgMsg+""+backImgMsg+"")
                // //NotyMsg.errorMsg("Please enter missing
                // fields:"+amtMsg+""+frontImgMsg+""+backImgMsg+"");//TODO
                return false;
            }

            /* } */
        }
        $scope.checkLimit = function() {
            if (parseFloat($scope.master.amt) > parseFloat($scope.dailyLimitAmt)) {// TODO
                // NotyMsg.errorMsg("Please add a cheque of lesser
                // or
                // equal amount of daily limit.");
                return false;
            } else if (parseInt($scope.depositLimitCount) < 1) {// TODO
                // NotyMsg.errorMsg("Number of checks you can
                // deposit is
                // exceeding the limit.");
                return false;
            } else if (parseFloat($scope.master.amt) > parseFloat($scope.depositLimitAmt)) {// TODO
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
        $scope.drawCrousal = function() {
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
            // var remainingLength = limitCount +
            // parseInt(checkCount) ;

            for (var j = checkCount; j < limitCount; j++) {
                remainingStr = remainingStr
                    + "<li></li>"
                    + "<li ng-click='showCarouselCheck()' class='checkLi' data-status='0'><span><span class='carouselLi'>"
                    + (j + 1)
                    + "</span><br><span class='carouselAmt'></span></span></li>";
            }
            var totalStr = carouselAddedStr + remainingStr;
            var temp = $compile(totalStr)($scope, function(clonedElement, scope) {
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

        $scope.processCheck = function() {
            $scope.validCheckColl.push({
                'SessionId' : gConfig.IVSSessionId,
                'Amount' : parseFloat($scope.master.amt).toFixed(2),
                'FrontImage' : $scope.Cheque.frontImage,
                'RearImage' : $scope.Cheque.backImage,
                'ReturnImage' : true,
                'status' : 2
            })
            /*$scope.validCheckColl.push({
             'SessionId' : gConfig.IVSSessionId,
             'Amount' : parseFloat(Math.random()*1000).toFixed(2),
             'FrontImage' : "data:image/jpeg;base64,",
             'RearImage' : "data:image/jpeg;base64,",
             'ReturnImage' : true,
             'status' : 2
             })*/
            $scope.checkCounter = $scope.validCheckColl.length
            $scope.drawCrousal();
            $scope.showUpdatedCarouselCheck();
            $scope.scrollActiveElem();
            $scope.updateDepositCounter();

        }

        $scope.submitCheck = function() {
                        console.log($scope.master.amt)
            if (!$scope.isCheckCaptured()) {
                alert('isCheckCaptured')
                return false;
            }
            if (!$scope.checkLimit()) {
                alert('checkLimit')
                return false;
            }
            /*
             * if($scope.checkCounter < 1){ this.startTrans();
             * gConfig.checkInProgress = true; return; }
             */

            $scope.processCheck();
            $scope.Cheque = null || {
                frontImage : "data:image/jpeg;base64,",
                backImage : "data:image/jpeg;base64,"
            };
            $scope.master.amt = "";
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
            var amtValid = (parseFloat($scope.master.amt) > 0);
            var frontValid = ($("#frontImage").prop("src").length > 30);
            var backValid = ($("#backImage").prop("src").length > 30);

            return (amtValid || frontValid || backValid)
        }

        $scope.deleteCheck = function() {
            var status = $("span.active").parent().parent().attr(
                "data-status");
            if (status == "1" && $scope.isCheckCaptureStarted()) {
                $scope.clearCheck()
                // NotyMsg.confirmMsg("Are you sure you want to
                // remove this check?",$scope.clearCheck());
            }
            if (status == "2") {
                $scope.deleteCheckConfirmed()
                // NotyMsg.confirmMsg("Are you sure you want to
                // remove this check from the deposit
                // list?",$scope.deleteCheckConfirmed());
            }
        }
        $scope.deleteCheckConfirmed = function() {
            var deletePos = $("span.active").parent().index();
            /*
             * var deleteModel = Models.getDeleteCheckModel();
             * deleteModel.set({ 'SessionId' : gConfig.IVSSessionId,
             * 'Amount' :
             * this.validCheckColl[this.deletePos].Amount, 'RawMICR' :
             * this.validCheckColl[this.deletePos].RawMICR });
             * deleteModel.processRequest();
             */
            $scope.validCheckColl.splice(deletePos, 1);
            $scope.checkCounter = $scope.validCheckColl.length;
            $scope.clearCheck();
            $scope.updateDepositCounter();
            $scope.drawCrousal();
            $scope.showUpdatedCarouselCheck();
            $scope.clearCheck();
        }
        $scope.discardChecks = function() {
            if ($scope.validCheckColl.length < 1) {
                $scope.deleteCheck();
            } else {
                $scope.discardConfirmed() // TODO
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
                $scope.validCheckColl.splice(0,
                    $scope.validCheckColl.length)
                $scope.drawCrousal()
                /*
                 * var discardModel = Models.getDiscardModel();
                 * discardModel.set({ 'UserId' : gConfig.UserID,
                 * 'InstId' : ServerConfig.institutionId,
                 * 'ApplicationId' : gConfig.ApplicationType,
                 * 'TransactionId' : gConfig.IVSSessionId });
                 * discardModel.processRequest();
                 */
            } else {
                $scope.clearCheck();
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

            $('#totalChecksDepCounter').html(totalChecks);
            $('#totalValidAmtDepCounter').html(totalAmt);
            // this.updateCheckProgress();

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
            $scope.master.amt = "";
        }
        $scope.disableAccLoc = function() {
            $(".locAccSelectInpGrp").addClass("disabled");
        }
        $scope.enableAccLoc = function() {
            $(".locAccSelectInpGrp").removeClass("disabled");
        }
        // Update Check Capture Status
        $scope.updateCheckProgress = function() {
            gConfig.checkInProgress = ($scope.validCheckColl.length > 0);
        }

        $scope.onBeforeDestroy = function() {
            gConfig.checkInProgress = false;
        }
        $scope.updateAmt = function() {

                        console.log($scope.master.amt)
        }


        $scope.locationsSelected = function() {
            console.log((_.find($scope.locationsResult, { 'Id': $scope.locations})).Accounts)
            $scope.accountResult = null || [];
            $scope.accountResult = (_.find($scope.locationsResult, { 'Id': $scope.locations})).Accounts
        }

        $scope.init = function() {
            $scope.checkCounter = 0;
            if($scope.depositLimitCount > 0){
                $scope.drawCrousal();
            }
            /*
             * $soap.post('http://test15.deposit2day.com/ConsumerService/ConsumerService.asmx','GetMerchantLocationsAndAccounts').then(function(response){
             * //Do Stuff console.log(response) });
             */
            appFactory.getLocations('2', '1', 'dennis', '7').then(function(getLocationsResult) {
                $scope.locationsResult = getLocationsResult;
                console.log('from angular success')
                console.log(getLocationsResult)
                $scope.locations = $scope.locationsResult[0].Id
                $scope.locationsSelected()
            }, function(err) {
                console.log('from angular error')
                console.log(err)
             })


            // HARD-CODED VALUES : START

            /*$scope.locationsResult = [{
                Id : 1,
                Name : 'India',
                Accounts: [{Number:123,Type:'abc',Desc:'abc'},{Number:234,Type:'abc',Desc:'abc'}]
            },{
                Id : 2,
                Name : 'USA',
                Accounts: [{Number:798,Type:'abc',Desc:'abc'},{Number:890,Type:'abc',Desc:'abc'}]
            }]*/
            $scope.depositLimitCount = 5;
            $scope.dailyLimitAmt = 10000.00;
            $scope.depositLimitAmt = 100000.00;
            $scope.drawCrousal();

            // HARD-CODED VALUES : END

            /*
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
    })
