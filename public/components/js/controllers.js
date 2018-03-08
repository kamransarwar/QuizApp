// main.js
var app = angular.module('myApp', ['ngGrid']);

app.controller('MyCtrl', function($scope, $http) {

    $scope.formData = {};
    $scope.mySelections = [];
    $scope.myData = [];
    $scope.num = 0;
    $http.get('/api/addQuestionToTest')
        .success(function(data) {

            $scope.testQuestions = data;

            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   
    $http.get('/api/test')
        .success(function(data) {
          $scope.fillTest = data;
          console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.gridOptions = {
        data: 'myData',
        showFilter: false,
        showColumnMenu: false,
        enableCellSelection: false,
        enableCellEdit: false,
        showSelectionCheckbox: true,
        selectWithCheckboxOnly: true,
        selectedItems: $scope.mySelections,
        showFooter: true,
        columnDefs: [{field: 'choice', displayName: 'Choices'}, {field:'remark', displayName:'Remarks'}]
    };


    $scope.addItem = function() {
        if($scope.choiceDetail == undefined || $scope.choiceDetail == null) {
            alert("Please fill choice");
        }
        else if ($scope.choiceRemark == undefined || $scope.choiceDetail == null) {
           alert("Please select choice remark");
        }
        else {
            var choiceDetail = $scope.choiceDetail;
            var choiceRemark = $scope.choiceRemark;
            var w = 0;
            $scope.myData.push({choice: choiceDetail, remark: choiceRemark, weighted: w });
            $scope.choiceDetail = null;
            $scope.choiceRemark = null;
        }
    };


/*    $scope.allItems = function() {
        var dataLength = $scope.myData.length;
        alert($scope.myData[dataLength-1].name);
    };*/
    $scope.remove = function () {
        _.each($scope.mySelections, function (person) {
            //Real remove (i.e from datastore)
            $scope.myData = _.filter($scope.myData, function(element){ return element.name != person.name;});
        });
        $scope.mySelections.splice(0, $scope.mySelections.length);
    };


    $scope.addQuestions = function() {
        for (var i=0; i<$scope.myData.length; i++) {
                var r = $scope.myData[i].remark;
                if (r == true) {
                $scope.num = $scope.num + 1;
            }
        }

        if($scope.formData.questionType == 'singleChoice'){
            if ($scope.num>1){
                alert("You can't add more than one true value choices in single choice question.");
                console.log($scope.myData);
            }
            else if ($scope.num<1){
                alert("You must provide at least one true value");
            }
            else {
                for (var i=0; i<$scope.myData.length; i++) {
                    var r = $scope.myData[i].remark;
                    if (r == true) {
                        $scope.myData[i].weighted = 100;
                    }
                }

/*                if ($scope.formData.selectedTest === "" || $scope.formData.selectedTest === null ){
                    Alert("Please select Test");
                }
                else if ($scope.formData.question === "" || $scope.formData.question === null ){
                    Alert("Please write Question");
                }
                else if ($scope.formData.questionType === "" || $scope.formData.questionTypet === null ){
                    Alert("Please select Question Type");
                }
                else {*/
                    $scope.formData.tName = $scope.formData.selectedTest.testName;
                    $scope.formData.choices = $scope.myData;
                    $http.post('/api/addQuestionToTest', $scope.formData)
                        .success(function(data) {
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            $scope.myData.length = 0;
                            $scope.num = 0;
                            // $scope.test = data;
                            //console.log(data);
                            alert('Question have been added successfully');
                            $scope.testQuestions = data;
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                
            }
        }

        if($scope.formData.questionType == 'multipleChoice'){
            if ($scope.num<1){
                alert("You must provide at least one true value");
            }
            else {
                    var w = (1/$scope.myData.length) * 100 ;
                    for (var i=0; i<$scope.myData.length; i++) {
                        $scope.myData[i].weighted = w;
                }
                    $scope.formData.tName = $scope.formData.selectedTest.testName;
                    $scope.formData.choices = $scope.myData;
                    $http.post('/api/addQuestionToTest', $scope.formData)
                        .success(function(data) {
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            // $scope.test = data;
                            //console.log(data);
                            alert('Question have been added to selected test');
                            $scope.myData.length = 0;
                            $scope.num = 0;
                            $scope.testQuestions = data;
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
            }
        }


    };

    $scope.deleteQuestion = function(id) {
        if (confirm("Are you sure, You want to delete this Question?")) {
            $http.delete('/api/addQuestionToTest/' + id)
                .success(function (data) {
                    $scope.testQuestions = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };


});