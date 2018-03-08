var quizApp = angular.module('quizApp', []);

  function mainController($scope, $http){

    $scope.formData = {};


    $http.get('/api/test')
        .success(function(data) {
            $scope.test = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });



    // when submitting the add form, send the text to the node API
    $scope.createTest = function() {
        $http.post('/api/test', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.test = data;
                console.log(data);
                alert('Test have been added successfully');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.deleteTest = function(id) {
        if (confirm("Are you sure, You want to delete this Test?")) {
            $http.delete('/api/test/' + id)
                .success(function (data) {
                    $scope.test = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };

};


