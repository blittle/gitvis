var gitvis = angular.module('gitvis', ['ngResource'], function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/partials/repoList.html',
		controller: RepoListController
	});

	$routeProvider.when('/visualize/:id', {
		templateUrl: '/partials/visualize.html',
		controller: RepoController
	});

//	$locationProvider.html5Mode(true);

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

function RepoListController($scope, $resource, $location, $routeParams, RepoService) {

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
}

function RepoController($scope, $resource, $routeParams, RepoService) {
	console.log($routeParams)
}
