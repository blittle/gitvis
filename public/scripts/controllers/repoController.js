gitvis.controller('RepoController', function($scope, $resource, $routeParams, RepoService) {
	var repo = RepoService.getRepo($routeParams.id);
	$scope.title = "";
	$scope.graphData = {};

	repo.$then(function() {
		$scope.title = repo.name;
		$scope.graphData = repo.history;
		console.log(repo);
	})
});