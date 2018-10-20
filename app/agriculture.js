angular.module("app")
.controller("AgricultureCtrl", function ($http, $scope) {
    $scope.lat = "14.920518";
    $scope.lng = "-23.510153";
    $scope.dim = '0.100';
    var apiKey="1GPhmbDVRyme7eZw7T7PwOtdHfImZLt4jyrddSPc";
    // var apiKey="DEMO_KEY";

    fetchImagery();
    $scope.load = function() {
        $scope.obj = undefined;
        fetchImagery();        
    }

    function fetchImagery() {
        var url='https://api.nasa.gov/planetary/earth/imagery'+
            '?lat='+$scope.lat+
            '&lon='+$scope.lng+
            '&cloud_score=true'+
            '&dim='+$scope.dim+
            '&api_key='+apiKey;
        ;

        $scope.loading = true;

        $http.get(url)
        .then(function (Resp){
            var data=Resp.data;
            $scope.obj = {
                img_src: data.url,
                cloud_score: data.cloud_score,
                date: data.date
            };

            $scope.loading = false;
        }, function (Error) {
            $scope.loading = false;
        });
    }
});


