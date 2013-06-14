var repoLoader = require('../repoLoader');

exports.getRepos = function(req, res) {
    res.send(repoLoader.getRepos());
}

exports.getRepo = function(req, res) {
    res.send({
        history: repoLoader.getRepoData(req.params.id)
    });
}

exports.createRepo = function(req, res) {

}

exports.deleteRepo = function(req, res) {

}