﻿var directivesModule = angular.module("jlg.common.directives");
directivesModule.directive("filesUpload", function () {
    return {
        restrict: "E",
        templateUrl: window.urlGetter("ClientSide/Directives/filesUpload.html"),
        scope: {            
            textDescription: "=",
            urlDestination: "=",
            serverUploadResponse: "=",            
            uploadProgress: "=",
            uploadedFileName: "="
        },
        controller: ["$scope", "FileUploader", "sharedDataAndPopupSrv",
            function ($scope, FileUploader, sharedDataAndPopupSrv) {

                $scope.apfSharedData = sharedDataAndPopupSrv.sharedData;
                $scope.$watch("apfSharedData.loggedInContext", function (newValue) {
                    if (newValue) {
                        $scope.translatedText = newValue.translatedText;
                    }
                });
                
                $scope.uploader = new FileUploader({
                    url: $scope.urlDestination
                });                                                 
                
                // CALLBACKS
                $scope.uploader.onAfterAddingAll = function (addedFileItems) {
                    $scope.apfSharedData.waitPopup.isOpen = true;
                    for (var i = 0; i < addedFileItems.length; i++) {
                        addedFileItems[i].upload();
                    }                    
                };
                $scope.uploader.onProgressAll = function (progress) {
                    $scope.uploadProgress = progress;
                };
                $scope.uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    $scope.serverUploadResponse = response;
                    $scope.uploadedFileName = fileItem.file.name;
                };

                $scope.uploader.onCompleteAll = function () {
                    $scope.apfSharedData.waitPopup.isOpen = false;
                };

                $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
                    $scope.apfSharedData.waitPopup.isOpen = false;
                };

                //$scope.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                //    console.info('onWhenAddingFileFailed', item, filter, options);
                //};             
               
                //$scope.uploader.onBeforeUploadItem = function (item) {
                //    console.info('onBeforeUploadItem', item);
                //};
                //$scope.uploader.onAfterAddingFile = function (fileItem) {
                //    fileItem.upload();
                //};
                //$scope.uploader.onProgressItem = function (fileItem, progress) {
                //    console.info('onProgressItem', fileItem, progress);
                //};            
                //$scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                //    console.info('onSuccessItem', fileItem, response, status, headers);
                //};                
                //$scope.uploader.onCancelItem = function (fileItem, response, status, headers) {
                //    console.info('onCancelItem', fileItem, response, status, headers);
                //};                

            }]
    };
});

