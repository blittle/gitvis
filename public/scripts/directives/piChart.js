gitvis.directive('piChart', function() {
	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

			scope.$watch('graphData', function(data) {
				if(data) {

					nv.addGraph(function() {
						var width = 400,
							height = nv.utils.windowSize().height  - 300;

						height = height > 500 ? 500 : height;

						var chart = nv.models.pieChart()
							.values(function(d) { return d })
							.x(function(d) { return d.name; })
							.y(function(d) { return d.commits; })
							.height(height)
							.width(width)
							.showLabels(true);

						d3.select(element.children()[0])
							.datum([_.filter(data, function(d, i) {return i < 10})])
							.transition().duration(1200)
							.attr('width', width)
							.attr('height', height)
							.call(chart);

						return chart;
					});
				}
			});
		},

		scope: {
			graphData: '=piData'
		}
	};
});