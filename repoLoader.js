var _ = require('lodash')
    , fs = require('fs')
    , ParseGit = require('parse-git')
    , GitStructures = require('git-structures')
    , exec = require('child_process').exec;

var repos, repoLoadInterval;

var repoData = {};

function loadRepos() {
    console.log("Loading repos");
    _.each(repos, function(repo) {
        console.log("git pulling ", repo.name);
        exec('cd cachedRepos/'+repo.name +';git pull', function(error, response) {
            if(error) console.error('Cannot pull repo', repo.name);

            console.log('Logging ', repo.name);
            exec('cd cachedRepos/'+repo.name +';git log --name-status > temp.txt', function(error) {
                if(error) console.error('Cannot log repo', repo.name);

                console.log('Loading and parsing repo ', repo.name);
                fs.readFile('cachedRepos/'+repo.name+'/temp.txt', 'utf8', function(error, file) {
                    if(error) console.error('Cannot read temporary git log output', repo.name);

                    repoData[repo.id] = {
                        history: ParseGit.parseGit(file)
                    }
                })


            } );
        });
    });
}

function scanRepos() {
    console.log("Scanning cachedRepos directory");

    fs.readdir('cachedRepos', function(err, files) {
        if(err) callback(err);

//        files = _.filter(files, function(file) {
//            return fs.lstatSync('cachedRepos/' + file).isDirectory(); });

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

        loadRepos();
    });
}

exports.startRepoScanning = function() {
    scanRepos();
    repoLoadInterval = setInterval(scanRepos, 60000);
}

exports.stopRepoScanning = function() {
    clearInterval(repoLoadInterval);
}

exports.getRepos = function() {
    return repos;
};

exports.getRepoData = function(id) {
    return repoData[id] ? repoData[id].history : {};
}

exports.createRepo = function(name) {

};
