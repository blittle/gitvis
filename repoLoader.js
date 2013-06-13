var _ = require('lodash')
    , fs = require('fs')
    , ParseGit = require('parse-git')
    , GitStructures = require('git-structures')
    , exec = require('child_process').exec;

var repos;

var repoData = {};

function loadRepos() {
    _.each(repos, function(repo) {
        exec('cd cachedRepos/'+repo.name +';git pull', function(error, response) {
            if(error) console.error('Cannot pull repo');
            exec('cd cachedRepos/'+repo.name +';git log --name-status > temp.txt', function(error) {
                if(error) console.error('Cannot log repo', repo);

                fs.readFile('cachedRepos/'+repo.name+'/temp.txt', 'utf8', function(error, file) {
                    if(error) console.error('Cannot read temporary git log output');

                    repoData[repo.id] = {
                        history: ParseGit.parseGit(file)
                    }
                })


            } );
        });
    });
}

exports.getRepos = function(callback) {

    fs.readdir('cachedRepos', function(err, files) {
        if(err) callback(err);

        files = _.filter(files, function(file) {
            return fs.lstatSync('cachedRepos/' + file).isDirectory();
        });

        files = _.map(files, function(file) {
            return {
                name: file,
                id:_.uniqueId('repo-')
            }
        });

        files = _.each(files, function(file) {

            var oldRepo = _.find(repos, function(repo) {
                return repo.name === file.name;
            });

            if(oldRepo) {
                file.id = oldRepo.id;
            }
        });

        repos = files;

        callback(null, repos);

        loadRepos();
    });

};

exports.getRepoData = function(id) {
    return repoData[id] ? repoData[id].history : {};
}

exports.createRepo = function(name) {

};
