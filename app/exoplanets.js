angular.module("app")
.controller("ExoCtrl", function ($http, $scope) {
    $scope.lat = "14.920518";
    $scope.lng = "-23.510153";
    $scope.dim = '0.100';
    var apiKey="1GPhmbDVRyme7eZw7T7PwOtdHfImZLt4jyrddSPc";
    // var apiKey="DEMO_KEY";

    fetchImagery();
    $scope.load = function() {
    }

    function fetchImagery() {
        console.info("Exoplanets");
    }
});


