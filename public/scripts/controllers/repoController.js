gitvis.controller('RepoController', function($scope, $resource, $routeParams, RepoService) {
	var repo = RepoService.getRepo($routeParams.id);
	$scope.title = "";
	$scope.graphData = {};
	$scope.index = 0;

	repo.$then(function() {
		$scope.title = repo.name;
		$scope.graphData = {
            commiterTotals: GitStruct.commiterHistory.commitTotals(repo.history, {toArray: true}),
            totals: GitStruct.commiterHistory.allCommitsHistory(repo.history),
            files: {}
        }

//					commiterTotals: GitStructures.commiterHistory.totals(rawHistory, {toArray: true}),
//					totals: GitStructures.commiterHistory.history(rawHistory),
//					files: totalFileHistory

        // enable if you want to sort by the most commits through history, otherwise it will be the 10 most recent commiters
//        $scope.graphData.commiterTotals.sort(sortByCommits);

//        $scope.graphData.fileTypes = getTypes(repo.history.files.children, []).sort(sortByCommits);
	});

	$scope.changeIndex = function() {
		$scope.index = $scope.index === 2 ? 0 : $scope.index + 1;
	}

    $scope.filter = function(data) {
        if(!data) return;

        var fileTypes = [];

        return getTypes(data.children, fileTypes);
    }

    function sortByCommits(a, b) {
        return a.commits < b.commits ? 1 : a.commits > b.commits ? -1 : 0;
    }

    function getTypes(data, fileTypes) {
        _.each(data, function(d) {
            if(d.children) return getTypes(d.children, fileTypes);

            var dataType = _.find(fileTypes, function(ft) {
                return ft.name === d.language;
            });

            if(dataType) dataType.commits++;
            else fileTypes.push({
                name: d.language,
                commits: 1
            });
        });

        return fileTypes;
    }
});