var appModule = angular.module('app', ['ngWidgets']);

appModule.controller('MapQuestController', ['$scope',
    function ($scope) {
        $scope.mapConfig = {
            latitude: 37.3711,
            longitude: 122.0375,
            width: '450',
            height: '500'
        };
    }]);