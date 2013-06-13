var repoLoader = require('../repoLoader');

exports.getRepos = function(req, res) {
    repoLoader.getRepos(function(error, repos) {
        if(error) res.error(error);

        res.send(repos);

    });
}

exports.getRepo = function(req, res) {
    res.send({
        fileTree: repoLoader.getRepoData(req.params.id)
    });
}

exports.createRepo = function(req, res) {

}

exports.deleteRepo = function(req, res) {

}