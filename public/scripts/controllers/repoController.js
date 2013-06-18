gitvis.controller('RepoController', function($scope, $resource, $routeParams, RepoService) {
	var repo = RepoService.getRepo($routeParams.id);
	repo.$then(function() {
		$scope.title = repo.name;
	})
});