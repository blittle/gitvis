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

	var monthsMap = {
		0: "January",
		1: "Febuary",
		2: "March",
		3: "April",
		4: "May",
		5: "June",
		6: "July",
		7: "August",
		8: "September",
		9: "October",
		10: "November",
		11: "December"
	}

	var types = {

		dayOfWeek: function(data) {

			var modified = _.map(data, function(d, key) {

				var days = {"Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0};

				_.each(d, function(sd) {
					days[dayOfWeekMap[new Date(sd.date).getDay()]]++;
				});

				return {
					key: key,
					values: _.map(days, function(count, day) {
						return {
							x: day,
							y: count
						}
					})
				}
			});

			return _.filter(modified, function(d, i) {
				return i < 7;
			});
		},

		timeOfDay: function(data) {
			var modified = _.map(data, function(d, key) {

				var hoursMap = {
					"12 AM": 0,
					"1 AM" : 0,
					"2 AM" : 0,
					"3 AM" : 0,
					"4 AM" : 0,
					"5 AM" : 0,
					"6 AM" : 0,
					"7 AM" : 0,
					"8 AM" : 0,
					"9 AM" : 0,
					"10 AM": 0,
					"11 AM": 0,
					"12 PM": 0,
					"1 PM" : 0,
					"2 PM" : 0,
					"3 PM" : 0,
					"4 PM" : 0,
					"5 PM" : 0,
					"6 PM" : 0,
					"7 PM" : 0,
					"8 PM" : 0,
					"9 PM" : 0,
					"10 PM": 0,
					"11 PM": 0
				};

				_.each(d, function(sd) {
					var hours = new Date(sd.date).getHours(),
						actHours = (hours > 12) ? hours - 12 : (hours === 0) ? 12 : hours,
						suf = (hours > 11) ? " PM" : " AM";

					hoursMap[actHours+suf]++;
				});

				return {
					key: key,
					values: _.map(hoursMap, function(count, hour) {
						return {
							x: hour,
							y: count
						}
					})
				}
			});

			return _.filter(modified, function(d, i) {
				return i < 7;
			});
		},

		monthOfYear: function(data) {
			var modified = _.map(data, function(d, key) {

				var months = {
					"January": 0, "Febuary": 0, "March": 0, "April": 0, "May": 0, "June": 0,
					"July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0
				};

				_.each(d, function(sd) {
					months[monthsMap[new Date(sd.date).getMonth()]]++;
				});

				return {
					key: key,
					values: _.map(months, function(count, month) {
						return {
							x: month,
							y: count
						}
					})
				}
			});

			return _.filter(modified, function(d, i) {
				return i < 7;
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