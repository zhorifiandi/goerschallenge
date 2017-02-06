var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope, $http) {
	$scope.graph1 = "";
	$scope.trend = 5;	
    $http.get("fetch.php")
    .then(function (response) {
    	$scope.events = response.data.records; 
    	$scope.countevent = function (lastday) {
    		console.log("masuk");
    		var threshold;
	        threshold = new Date();
	        threshold.setDate(threshold.getDate() - lastday);
	        var count = 0;
    		for (var i=0; i<$scope.events.length; i++){
    			var from = $scope.events[i].date.split("-");
				var month = parseInt(from[1]) -1;
				var f = new Date(from[0], month , from[2]);
				console.log("masuk hem");
    			if (f >= threshold){
    				count++;
    			}
    		}
    		return count;
    	}

    	$scope.update = function() {
    		$scope.numevents = $scope.countevent(document.getElementById('selection').value);
    	}

    	$scope.numevents = $scope.countevent(document.getElementById('selection').value); 
    	$scope.numdays = response.data.count1; 
    	$scope.graph1 = response.data.graph1; 
    	$scope.goldenday = response.data.goldenday;
    	var arr = $scope.goldenday.split("-");
    	console.log("arr " + arr[1]);
    	$scope.goldenmonth = arr[1];

    	$scope.customfunc = function() {
    		$scope.numevents = $scope.countevent(document.getElementById('custom').value);
    	}

    	$scope.custom2func = function() {
    		drawTimeline(document.getElementById('orgtl').value,document.getElementById('custom2').value);
    	}
    });
});

// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart','line','timeline']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      google.charts.setOnLoadCallback(drawLine);
      google.charts.setOnLoadCallback(drawTimeline);


      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
      	var graph1 = angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().graph1;
      console.log(graph1);
      console.log(graph1.length);
      console.log(graph1[0].name);
      //var arrayLength = angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().trend;
      
      var array = [["Name", "Total Events", { role: "style" } ]];
      var arrayLength = document.getElementById("trend").value;
      console.log(arrayLength + "naha");
      if (arrayLength == 1){
      	for (var i = graph1.length-1; i >=graph1.length-5 ; i--) {
      		console.log(i);
	     	array.push([graph1[i].name,graph1[i].sum+0,"green"]);
	      }
      }
      else if (arrayLength == 2){
      	for (var i = 0; i<5; i++) {
	     	array.push([graph1[i].name,graph1[i].sum+0,"green"]);
	      }
      }
      else if (arrayLength == 3){
      	var len = 10;
      	if (graph1.length < len)
      		len = graph1.length;
      	for (var i = 0; i<len; i++) {
	     	array.push([graph1[i].name,graph1[i].sum+0,"green"]);
	      }
      } else
      {
      	console.log("error");
      }
      
      var data = google.visualization.arrayToDataTable(array);
      /*
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" } ],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.30, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"]
      ]);*/

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        //title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
      chart.draw(view, options);
  }

    function drawLine(val) {
      val = (typeof val !== 'undefined') ?  val : document.getElementById("organization").value;
      var data = new google.visualization.DataTable();
      var graph1 = angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().graph1;
      console.log(graph1);
      console.log(graph1.length);
      console.log(graph1[0].name);
      data.addColumn('date', 'Day');
     for (var i = 0; i<graph1.length; i++) {
     	if (graph1[i].name == val){
     		data.addColumn('number', graph1[i].name);
     		console.log("x.name"+graph1[i].name);	
     	}
      }
     /*
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');

		*/
		var events = angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().events;
		var array = [];
		var max = 0;
		var datemax = events[0].date;
		var counter = 0;
		var date;
		for (var i =0; i<events.length; i++){
			if (events[i].organization_name== val){
				if (date != null){
					if (date != events[i].date){
						var from = events[i].date.split("-");
						var f = new Date(from[0], from[1] , from[2]);
						array.push([f,counter]);
						if (counter > max){
							datemax = date;
							max = counter;
						}
						date = events[i].date;
						counter = 0;
					}
					else{
						counter++;
					}
				}
				else{
					date = events[i].date;
					counter++;
				}
			}
		}
		angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().goldenday = datemax;

      data.addRows(array);

      var options = {
        /*chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },*/
        width: 600,
        height: 300
      };

      var chart = new google.charts.Line(document.getElementById('chart_div1'));

      chart.draw(data, options);
    }

    function drawTimeline(val,trend) {
    	val = (typeof val !== 'undefined') ?  val : document.getElementById("orgtl").value;
    	trend = (typeof trend !== 'undefined') ?  trend : document.getElementById("trend1").value;
    	console.log("trend "+trend);
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        var events = angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().events;
        dataTable.addColumn({ type: 'string', id: 'Events' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });

        var date;
        var array = [];

        var len = events.length;
        var threshold;
        if (trend == 8)
        	trend = document.getElementById("custom2").value;
        threshold = new Date();
        threshold.setDate(threshold.getDate() - trend);


        for (var i =0; i<len; i++){
			if (events[i].organization_name== val){
				if (date != null){
					if (date != events[i].date){
						var from = events[i].date.split("-");
						var month = parseInt(from[1]) -1;
						var f = new Date(from[0], month , from[2]);
						if (f >= threshold){
							var f1 = new Date(from[0], month , from[2]);
							f1.setDate(f1.getDate() + (i % 7) + 3);
							array.push([events[i].name,f,f1]);
							date = events[i].date;
						}
					}
				}
				else{
					date = events[i].date;
				}
			}
		}
		dataTable.addRows(array);
/*
        dataTable.addRows([
          [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
          [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
          [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);
*/
        chart.draw(dataTable);
      }

