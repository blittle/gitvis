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

	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

			scope.$watch('treeData', function(data) {
				if(data) {
					var myFlower = new CodeFlower(element.children()[0], 2800, 2800);
					myFlower.update(data);
				}
			});
		},

		scope: {
			treeData: '='
		}
	};
});