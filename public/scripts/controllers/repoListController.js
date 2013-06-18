gitvis.controller('RepoListController', function($scope, $resource, $location, $routeParams, RepoService) {

	var Repo = $resource('/repos/:id');

	$scope.repos = gitvisData.repos;

	$scope.openRepo = function(id) {
		$location.path( "visualize/" + id );
	};

	$scope.createNewRepo = function(name) {
		if(!name) return;
		alert(name);
	};

	$scope.deleteRepo = function(id) {

	}
});