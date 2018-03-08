var myApp = angular.module('myApp', [
    'ngRoute',
    'quizControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
       when('/test/:testName/:questionId', {
            templateUrl: 'partials/startTest.html',
            controller: 'StartTest'
        }).
        when('/questionList/:testName', {
            templateUrl: 'partials/questionsList.html',
            controller: 'StartTest'
        }).
        when('/test', {
            templateUrl: 'partials/selectTest.html',
            controller: 'SelectTestController'
        }).
        when('/result/:testName', {
            templateUrl: 'partials/result.html',
            controller: 'Result'
        }).
/*        when('/questionsList', {
            templateUrl: 'partials/questionList.html',
            controller: 'QuestionDetails'
        }).*/
        otherwise({
            redirectTo: '/test'
        });
}]);