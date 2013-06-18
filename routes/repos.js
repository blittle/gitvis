var repoLoader = require('../repoLoader');

exports.getRepos = function(req, res) {
	res.send(repoLoader.getRepos());
}

exports.getRepo = function(req, res) {
	var id = req.params.id;

	res.send({
		name: repoLoader.getRepoName(id),
		history: repoLoader.getRepoData(id)
	});
}

exports.createRepo = function(req, res) {

}

exports.deleteRepo = function(req, res) {

}