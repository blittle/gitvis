gitvis.directive('fileTree', function() {

	var getChildren = function(json) {
		var children = [];
		if (json.language) return children;
		for (var key in json) {
			var child = { name: key };
			if (json[key].size) {
				// value node
				child.size = json[key].size;
				child.language = json[key].language;
			} else {
				// children node
				var childChildren = getChildren(json[key]);
				if (childChildren) child.children = childChildren;
			}
			children.push(child);
			delete json[key];
		}
		return children;
	};

    function render(scope, mappedFiles, element, attrs, index) {

        if(scope.treeData) {

            if(index > scope.treeData.length - 1) return;

            var data = scope.treeData;

            var myFlower = new CodeFlower(element.children()[0], 2800, 2800);
            $(element).find('svg').css("zoom", $(window).height() / 2800);

            var files = GitStruct.fileTree.codeFlower(
                GitStruct.fileTree.fileTreeIndex(data, mappedFiles, index, {size: 0}), {size: 0}
            )

            myFlower.update(files);

        }
    }

	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

            var index = 0;
            var mappedFiles = {name: "root", c: {}}

            render(scope, mappedFiles, element, attrs, index);

            $(document).keyup(function(e) {
                if(e.which == 39) {
                    render(scope, mappedFiles, element, attrs, ++index);
                }
            })

//			scope.$watch('index', function(index) {

//			});
		},

		scope: {
			treeData: '=',
            index: '@'
		}
	};
});