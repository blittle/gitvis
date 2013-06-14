
var RepoLoader = require('../repoLoader');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Git Visify', repos: RepoLoader.getRepos() });
};
