gitvis.directive('stackChart', function() {

	function formatData(data, days) {

		var dates = {};

		var baseDate = new Date(new Date().getTime() - (86400000 * days)); //Get date year ago
		baseDate.setHours(0);
		baseDate.setMinutes(0);
		baseDate.setSeconds(0);
		baseDate.setMilliseconds(0);

		_.times(days, function(i) {
			var dayDate = new Date(baseDate.getTime() + (i * 86400000));
			dayDate.setHours(0);
			dayDate.setMinutes(0);
			dayDate.setSeconds(0);
			dayDate.setMilliseconds(0);

			dates[dayDate.getTime()] = 0;
		})

		var map = _.map(data, function(d, key) {

			var vals = _.clone(dates);

			_.each(d, function(dd) {
				var date = new Date(dd.date);
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0);

				var time = date.getTime();

				if(time > baseDate.getTime()) vals[time]++;
			});

			return {
				key: key,
				values: _.map(vals, function(count, date) {
					return {x: date, y: count }
				})
			}
		})

		return _.filter(map, function(d, i) {
			return i < 6;
		})
	}

	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

			scope.$watch('graphData', function(data) {
				if(data) {
					nv.addGraph(function() {
						var chart = nv.models.stackedAreaChart()
							.clipEdge(true);

						chart.xAxis
							.tickFormat(function(d) {
								return d3.time.format('%x')(new Date(d))
							});

						chart.yAxis
							.tickFormat(d3.format(',.2f'))
							.axisLabel('Commits');

						chart.showControls(false);

						d3.select(element.children()[0])
							.datum(formatData(data, scope.days))
							.transition().duration(500).call(chart);

						nv.utils.windowResize(chart.update);

						return chart;
					});
				}
			});
		},

		scope: {
			graphData: '=piData',
			days: '@'
		}
	};
});
