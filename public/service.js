//    A little bit of data needed to get jsfiddle to fake an ajax request


var app = angular.module('app', []);

app.factory('NameService', function($http, $q) {

    //    Create a class that represents our name service.
    function NameService() {
    
        var self = this;
        
        //    Initially the name is unknown....
        self.questions = null;
          
        //    getName returns a promise which when fulfilled returns the name.
        self.getName = function() {
            
            //    Create a deferred operation.
            var deferred = $q.defer();
            
            //    If we already have the name, we can resolve the promise.
            if(self.questions !== null) {
                deferred.resolve(self.questions);
                console.log("From Cache");
            } else {
                //    Get the name from the server.
                $http.get('/api/questionForTest/HTML')
                .success(function(response) {
                    self.questions = response;
					console.log("From Server");
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });
            }
            
            //    Now return the promise.
			//console.log(deferred.promise);
            return deferred.promise;
        };
    }
    
    return new NameService();
});

app.controller('MainController', function ($scope, NameService) {

    //    We have a name on the code, but it's initially empty...
    $scope.name = "";
    
    //    We have a function on the scope that can update the name.
    $scope.updateName = function() {
            NameService.getName()
                .then(
                    /* success function */
                    function(name) {
                        $scope.name = name;
                    },
                    /* error function */
                    function(result) {
                        console.log("Failed to get the name, result is " + result); 
    					console.log(result);
                });
        };

});