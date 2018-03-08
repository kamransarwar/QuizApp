var app = angular.module('app', []);


app.controller('stTable', ['$scope', '$http','$filter', function (scope, $http, filter) {

	scope.rowCollection = [];
	$http.get('/api/test').success(function(data) {

		for (var i=0; i<data.length; i++){

			scope.rowCollection.push(data[i]);
			
		}

		console.log(scope.rowCollection);

    });

}]);