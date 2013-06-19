gitvis.directive('heatMap', function() {

	var format = d3.time.format("%Y-%m-%d");

	function formatData(data) {

		var exportData = {};

		_.each(data, function(d) {
			_.each(d, function(dd) {
				var dateString = format(new Date(dd.date));
				exportData[dateString] ? exportData[dateString]++ : exportData[dateString] = 1;
			})
		});

		return _.map(exportData, function(val, key){
			return {date: key, count: val}
		});
	}

	return {
		// Restrict it to be an attribute in this case
		restrict: 'E',
		// responsible for registering DOM listeners as well as updating the DOM
		link: function(scope, element, attrs) {

			scope.$watch('graphData', function(data) {
				if(data) {

					var width = 960,
						height = 136,
						cellSize = 17; // cell size

					var day = d3.time.format("%w"),
						week = d3.time.format("%U"),
						percent = d3.format(".1%");

					var color = d3.scale.quantize()
						.domain([0, 40])
						.range(d3.range(8).map(function(d) { return "q" + d + "-9"; }));

					var svg = d3.select(element.children()[0]).selectAll('svg')
						.data(d3.range(2010, 2014))
						.enter().append("svg")
						.attr("width", width)
						.attr("height", height)
						.attr("class", "RdYlGn")
						.append("g")
						.attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

					svg.append("text")
						.attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
						.style("text-anchor", "middle")
						.text(function(d) { return d; });

					var rect = svg.selectAll(".day")
						.data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
						.enter().append("rect")
						.attr("class", "day")
						.attr("width", cellSize)
						.attr("height", cellSize)
						.attr("x", function(d) { return week(d) * cellSize; })
						.attr("y", function(d) { return day(d) * cellSize; })
						.datum(format);

					rect.append("title")
						.text(function(d) { return d; });

					svg.selectAll(".month")
						.data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
						.enter().append("path")
						.attr("class", "month")
						.attr("d", monthPath);

//					d3.csv("dji.csv", function(error, csv) {
						var days = d3.nest()
							.key(function(d) {
								return d.date;
							})
							.rollup(function(d) {
								return d[0].count;
							})
							.map(formatData(data));
//
						rect.filter(function(d) {
							return d in days;
						})
							.attr("class", function(d) { return "day " + color(days[d]); })
							.select("title")
							.text(function(d) { return d + ": " + days[d] + " commits"; });
//					});

					function monthPath(t0) {
						var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
							d0 = +day(t0), w0 = +week(t0),
							d1 = +day(t1), w1 = +week(t1);
						return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
							+ "H" + w0 * cellSize + "V" + 7 * cellSize
							+ "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
							+ "H" + (w1 + 1) * cellSize + "V" + 0
							+ "H" + (w0 + 1) * cellSize + "Z";
					}

					d3.select(self.frameElement).style("height", "2910px");
				}
			});
		},

		scope: {
			graphData: '=piData'
		}
	};
});