angular.module('gitvis', ['ngResource']);

function ReposController($scope, $resource) {
    $scope.repos = [
        {
            name: "sf2_services",
            id: 1
        },
        {
            name: "bower-installer",
            id: 2
        }
    ];

    $scope.openRepo = function(id) {
        alert(id);
    };

    $scope.createNewRepo = function(name) {
        if(!name) return;
        alert(name); 
    };
}
