angular.module('gitvis', ['ngResource']);

function ReposController($scope, $resource) {

	var Repo = $resource('/repos/:id');

	$scope.repos = gitvis.repos;

	$scope.openRepo = function(id) {
		var repo = $scope.loadedRepo = new Repo();
		repo.id = id;
		repo.$get({id: id});
	};

	$scope.createNewRepo = function(name) {
		if(!name) return;
		alert(name);
	};

	$scope.deleteRepo = function(id) {

	}
}
