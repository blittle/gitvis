gitvis.directive('barChart', function() {

	var dayOfWeekMap = {
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday"
	};

	var types = {
		dayOfWeek: function(data) {
			var modified = _.map(data, function(d, key) {

				var mapped = _.map(d, function(sd) {
					return {
						x: dayOfWeekMap[new Date(sd.date).getDay()],
						y: sd.count + 1
					}
				});

				return {
					key: key,
					values: _.filter(mapped, function(d, i) {
						return (i < 10 && d.y < 100);
					})
				}
			});

			return _.filter(modified, function(d, i) {
				return i < 5;
			});
		},
		timeOfDay: function(data) {
			var modified = _.map(data, function(d, key) {

				var mapped = _.map(d, function(sd) {
					return {
						x: new Date(sd.date).getHours(),
						y: sd.count
					}
				});

				return {
					key: key,
					values: _.filter(mapped, function(d, i) {
						return (i < 10 && d.y < 100);
					})
				}
			});

			return _.filter(modified, function(d, i) {
				return i < 5;
			});
		}
	}

	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

			scope.$watch('graphData', function(data) {
				if(data) {

					nv.addGraph(function() {
						chart = nv.models.multiBarChart()
							.barColor(d3.scale.category20().range());

						chart.multibar
							.hideable(true);

						chart.reduceXTicks(false).staggerLabels(true);

						chart.xAxis
							.showMaxMin(true);
						//  .tickFormat(d3.format(',f'));

						chart.yAxis
							.tickFormat(d3.format(',.1f'));

						d3.select(element.children()[0])
							.datum(types[scope.type](data))
							.transition().duration(500).call(chart);

						nv.utils.windowResize(chart.update);

						chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

						return chart;
					});
				}
			});
		},

		scope: {
			graphData: '=piData',
			type: '@type'
		}
	};
});

var negative_test_data = new d3.range(0,3).map(function(d,i) { return {
	key: 'Stream' + i,
	values: new d3.range(0,11).map( function(f,j) {
		return {
			y: 10 + Math.random()*100 * (Math.floor(Math.random()*100)%2 ? 1 : -1),
			x: j
		}
	})
};
});