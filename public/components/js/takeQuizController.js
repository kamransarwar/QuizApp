var quizControllers = angular.module('quizControllers', []);
quizControllers.controller('SelectTestController', ['$scope', '$http','$routeParams','$q', function($scope, $http, $routeParams, $q) {
    $scope.userChoice = {};
    $http.get('/api/test').success(function (data){
        $scope.availabeTest = data;
    });
    $scope.clearStorage = function (){
        localStorage.clear();

    }
    $scope.getQl = function(tname){
        $http.get('/api/questionForTest/'+ tname).success(function(data) {
        $scope.questions = data;
        localStorage.setItem('ql', JSON.stringify($scope.questions));

        });
    }
}]);
quizControllers.controller('StartTest', ['$scope', '$http','$routeParams','$q','$timeout', function($scope, $http, $routeParams) {
      $scope.questions=[];
        $scope.tname = $routeParams.testName;
        $scope.formData = {};
        $scope.formData.urQuestions = [];
        $scope.qh = {};
        $scope.cr = [];
        $scope.selectedRadioChoice = '';
        $scope.selectedRadioChoiceRemark = '';
        if($scope.questions.length === 0){
                var ql = JSON.parse(localStorage.getItem('ql'));
                    for (var i=0; i<ql.length; i++){
                       $scope.questions[i] = ql[i];
                    }

        }
            $scope.whichQuestion = $routeParams.questionId;
            $scope.currentQuestion = (Number($scope.whichQuestion))+1;
            $scope.nextItem = Number($routeParams.questionId)+1;
            $scope.previousItem = Number($routeParams.questionId)-1;
            if ($scope.questions.length === 0){
                alert ("This test don't have questions!. Please try other test");
            }
            if ($scope.previousItem < 0) {
                $scope.previousItem = 0;
            }
            if ($scope.nextItem === $scope.questions.length) {
                $scope.nextItem = $scope.questions.length-1;
            }
            $scope.choiceType = null;
            if($scope.whichQuestion !== undefined) {
                if ($scope.questions[$scope.whichQuestion].questionType == 'singleChoice') {
                    $scope.choiceType = 'radio';
                }

                else {
                    $scope.choiceType = 'checkbox';
                    for (var i = 0; i < $scope.questions[$scope.whichQuestion].questionChoices.length; i++) {
                        $scope.cr[i] = false;
                    }
                }

            }
            $scope.setRadioChoiceAndRemark = function (c){
        $scope.selectedRadioChoice = c;
        $scope.selectedRadioChoiceRemark = true;
    }
            $scope.addValueToResponseArray = function(p) {
                $scope.formData.urQuestions[p] = {
                    QuestionHeader : {
                        questionId : $scope.questions[p]._id,
                        question : $scope.questions[p].question,
                        questionType: $scope.questions[p].questionType,
                        status: 'attempted'
                    }
                }

                $scope.formData.urQuestions[p].QuestionChoices= [];

                    for(var i=0; i< $scope.questions[$scope.whichQuestion].questionChoices.length ; i++) {
                        if ($scope.choiceType == 'checkbox')  {
                            //$scope.formData.urQuestions[p].QuestionChoices=[];
                            $scope.formData.urQuestions[p].QuestionChoices[i] = {
                                choiceDetail : $scope.questions[$scope.whichQuestion].questionChoices[i].choice,
                                choiceRemark : $scope.cr[i]
                            }
                        }
                        else{
                       // $scope.formData.urQuestions[p].QuestionChoices=[];
                        $scope.formData.urQuestions[p].QuestionChoices[0] = {
                            choiceDetail : $scope.selectedRadioChoice,
                            choiceRemark : $scope.selectedRadioChoiceRemark
                        }
                    }
                }

                    localStorage.setItem($scope.whichQuestion, JSON.stringify($scope.formData.urQuestions[p]));
            }
            $scope.attemptLater = function(p) {
                $scope.formData.urQuestions[p] = {
                    QuestionHeader : {
                        questionId : $scope.questions[p]._id,
                        question : $scope.questions[p].question,
                        questionType: $scope.questions[p].questionType,
                        status: 'not attempted'
                    }
                }

                $scope.formData.urQuestions[p].QuestionChoices= [];

                for(var i=0; i< $scope.questions[$scope.whichQuestion].questionChoices.length ; i++) {

                    if ($scope.choiceType == 'checkbox')  {
                        //$scope.formData.urQuestions[p].QuestionChoices=[];
                        $scope.formData.urQuestions[p].QuestionChoices[i] = {
                            choiceDetail : $scope.questions[$scope.whichQuestion].questionChoices[i].choice,
                            choiceRemark : $scope.cr[i]
                        }

                    }
                    else{
                        // $scope.formData.urQuestions[p].QuestionChoices=[];
                        $scope.formData.urQuestions[p].QuestionChoices[0] = {
                            choiceDetail : $scope.selectedRadioChoice,
                            choiceRemark : $scope.selectedRadioChoiceRemark
                        }
                    }
                }

                localStorage.setItem($scope.whichQuestion, JSON.stringify($scope.formData.urQuestions[p]));

                console.log($scope.formData.urQuestions);
            }
            $scope.questionStatus = function(p) {

                var questionStatus = JSON.parse(localStorage.getItem(p));

                if(questionStatus == null){
                    return "not attempted";
                }
                else{

                    return questionStatus.QuestionHeader.status;
                }
            }
}]);
quizControllers.controller('Result', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.tname = $routeParams.testName;
        $scope.formData = {};
        var attemptedQuestion = [];
        for (var i=0; i<15; i++){
            var a = JSON.parse(localStorage.getItem(i.toString()));
            if( a !== null) {
                attemptedQuestion[i] = JSON.parse(localStorage.getItem(i.toString()));
            }
        }
    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
    var myArray =  attemptedQuestion.clean(null);
        if(attemptedQuestion.length === 0){
            alert("No Questions for Result Calculation. Please select test");
        }
        else {
            $scope.formData.aq = myArray;
            $http.post('/api/questionForTest/' + $scope.tname, $scope.formData)
                .success(function (data) {
                    localStorage.clear();
                    $scope.resultDetails = data;
                    $scope.numberOfCorrectAnswers = 0;
                    $scope.percentage = 0;
                    $scope.congratulation = null;
                    for (var i = 0; i < $scope.resultDetails.length; i++) {
                        var correctAnswer = $scope.resultDetails[i].qStat;
                        var per = Number($scope.resultDetails[i].qPer);
                        $scope.congratulation = "Please try any other test";
                        $scope.percentage = $scope.percentage + parseInt(per);
                        if (correctAnswer == "Correct Answer") {
                            $scope.numberOfCorrectAnswers++;
                        }
                    }
                    var ap = parseInt(($scope.percentage/$scope.resultDetails.length).toFixed(0));
                    if (ap  < 59) {
                        $scope.congratulation = "We are sorry, You failed. Better luck next time.";
                    }
                    else
                    {
                        $scope.congratulation = "Congratulations, You are passed!";
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
}]);
