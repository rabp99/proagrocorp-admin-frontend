'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesAddCtrl
 * @description
 * # CategoriesAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesAddCtrl', function ($scope, categoriesService, $rootScope, $uibModalInstance) {
    $scope.category = {};
    $scope.tmpPath = $rootScope.pathLocation + 'tmp';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.getCategoriesParent = function() {
        $scope.loadingCategories = true;
        categoriesService.getTreeList({spacer: '_'}, function(data) {
            $scope.categoriesList = data.categories;
            $scope.loadingCategories = false;
        });
    };
    
    $scope.previewPortada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        categoriesService.previewPortada(fd, function(data) {
            $scope.portadaPreview = data.filename;
            $scope.loading = false;
        }, function(data) {
            $scope.portadaPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getCategoriesParent();
    };
    
    $scope.init();
});