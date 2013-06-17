var gitvis = angular.module('gitvis', ['ngResource'], function($routeProvider, $locationProvider) {
	$routeProvider.when('bret', {
		templateUrl: '/partials/repoList.html',
		controller: RepoListController
	});

	$routeProvider.when('/visualize/:id', {
		templateUrl: '/partials/visualize.html',
		controller: RepoController
	})

    $routeProvider
        .otherwise('/bret');
}).run();

gitvis.factory('RepoService', function($resource) {

	var Repo = $resource('/repos/:id'),
		loadedRepo;

	return {
		getRepo: function(id) {
			var repo = loadedRepo = new Repo();
			repo.id = id;
			repo.$get({id: id});

			return repo;
		},

		getLoadedRepo: function() {
			return loadedRepo;
		}
	}
});

function RepoListController($scope, $resource, $routeParams, RepoService) {

	var Repo = $resource('/repos/:id');

	$scope.repos = gitvisData.repos;

	$scope.openRepo = function(id) {
		window.location = "#/visualize/" + id
	};

	$scope.createNewRepo = function(name) {
		if(!name) return;
		alert(name);
	};

	$scope.deleteRepo = function(id) {

	}
}

function RepoController($scope, $resource, $RepoService, $routeParams) {
	console.log("");
}
