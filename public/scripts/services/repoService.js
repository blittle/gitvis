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