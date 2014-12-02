(function (angular) {
    'use strict';
    angular.module('ngWidgets.mapQuest', [])
        .directive('ngMapQuest', [
            function () {
                return {
                    restrict: 'A',
                    scope: {
                        configs: '='
                    },
                    templateUrl: 'template/map-quest.html',
                    controller: mapQuestController
                };
        }]);
})(angular);

function mapQuestController($scope, $timeout) {

    var configs = $scope.configs;

    $scope.mapId = configs.mapId || 'mapQuestContainer';
    $scope.latitude = configs.latitude;
    $scope.longitude = configs.longitude;
    $scope.mapStyle = {
        width: configs.width || '400',
        height: configs.height || '350'
    };

    function initMap (params) {

        var latitude = params.latitude,
            longitude = params.longitude,
            mapId = params.mapId,
            options = {
                elt: $('#' + mapId).get(0),
                zoom: 10,
                latLng: {
                    lat: latitude,
                    lng: longitude
                },
                mtype: 'map',
                bestFitMargin: 0,
                zoomOnDoubleClick: true
            };

        var mapObject = new MQA.TileMap(options);

        MQA.withModule('largezoom', 'viewoptions', 'geolocationcontrol', 'insetmapcontrol', 'mousewheel', function () {

            var map = mapObject;

            /* Add Map Controls */
            map.addControl(
                new MQA.LargeZoom(),
                new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(15, 45))
            );
            map.enableMouseWheelZoom();
            map.addControl(new MQA.ViewOptions());
            map.addControl(
                new MQA.InsetMapControl({
                    size: {
                        width: 150,
                        height: 125
                    },
                    zoom: 3,
                    mapType: 'map',
                    minimized: true
                }),
                new MQA.MapCornerPlacement(MQA.MapCorner.BOTTOM_RIGHT)
            );

            /*Add PIN at given location*/
            var custom = new MQA.Poi({
                lat: latitude,
                lng: longitude
            });            
            map.addShape(custom);
            
        });
    };


    $scope.mapError = false;
    function showMapError() {
        $scope.mapError = true;
    };

    function showMap() {
        try {
            initMap({
                mapId: $scope.mapId,
                latitude: $scope.latitude,
                longitude: $scope.longitude
            });
        } catch (e) {
            showMapError(e);
        }
    };

    $timeout(function () {
        showMap();
    }, 100);


}

mapQuestController.$inject = ['$scope', '$timeout'];