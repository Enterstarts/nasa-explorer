angular.module("app", [])

.controller("MainController", function($scope, $http){
    var apiKey="1GPhmbDVRyme7eZw7T7PwOtdHfImZLt4jyrddSPc";
    // var apiKey="DEMO_KEY";
    var rovers = [];
    $scope.loading = false;
    $scope.cameras = [
        {
            label: "Front Hazard Avoidance Camera",
            name: "FHAZ"
        },
        {
            label: "Rear Hazard Avoidance Camera",
            name: "RHAZ"
        },
        {
            label: "Mast Camera",
            name: "MAST"
        },
        {
            label: "Chemistry and Camera Complex",
            name: "CHEMCAM"
        },
        {
            label: "Mars Hand Lens Imager",
            name: "MAHLI"
        },
        {
            label: "Mars Descent Imager",
            name: "MARDI"
        },
        {
            label: "Navigation Camera",
            name: "NAVCAM"
        },
        {
            label: "Panoramic Camera",
            name: "PANCAM"
        },
        {
            label: "Panoramic Camera",
            name: "PANCAM"
        },
        {
            label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
            name: "MINITES"
        },
    ];

    $scope.camera = false;
    $scope.defaultRobot = 'curiosity';
    $scope.page = 1;
    $scope.listObj = [];
    $scope.date = '2015-6-3';
    $scope.sol = 0;
    $scope.rover = 'curiosity';

    fetchPhotos();

    $scope.next = function () {
        $scope.page += 1;
        fetchPhotos();
    }

    $scope.prev = function () {
        if ($scope.page==1) {            
            return;
        }

        $scope.page -= 1;
        fetchPhotos();
    }

    $scope.submitSearch = function () {
        $scope.page=1;
        fetchPhotos();
    }

    $scope.roverChanged = function(old, new_) {
        console.info("new: ", $scope.rover);
    }

    function fetchPhotos() {
        var url='https://api.nasa.gov/mars-photos/api/v1/'+
                'rovers/'+$scope.rover+
                '/photos?'+
                // 'earth_date='+$scope.date+
                'sol='+$scope.sol+
                '&api_key='+apiKey+
                '&page='+$scope.page;

        if ($scope.camera) {
            url += ('&camera='+$scope.camera);
        }

        $scope.loading = true;
        $scope.listObj = [];

        $http.get(url)
        .then(function (resp) {
            var photos=resp.data.photos;
            var rs = photos.map(function (F){
                return F.rover;
            });
    
            var tmp = rovers.concat(rs);
            rovers = _.uniqBy(tmp, function (R) {
                return R.id;
            });

            $scope.loading = false;
            $scope.listObj=photos;    
        }, function (error){
            console.error(error);
        });
    }
})
;
