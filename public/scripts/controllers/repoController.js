gitvis.controller('RepoController', function($scope, $resource, $routeParams, RepoService) {
	var repo = RepoService.getRepo($routeParams.id);
	$scope.title = "";
	$scope.graphData = {};
	$scope.index = 0;

	repo.$then(function() {
		$scope.title = repo.name;
		$scope.graphData = repo.history;
		console.log(repo);
	});

	$scope.changeIndex = function() {
		$scope.index = $scope.index === 2 ? 0 : $scope.index + 1;
	}
});