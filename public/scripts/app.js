var gitvis = angular.module('gitvis', ['ngResource'], function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/partials/repoList.html',
		controller: 'RepoListController'
	});

	$routeProvider.when('/visualize/:id', {
		templateUrl: '/partials/visualize.html',
		controller: 'RepoController'
	});

}).run();