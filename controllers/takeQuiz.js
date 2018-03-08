/**
 * Created by Kamran on 11/9/2014.
 */

/**
 * GET /
 * Select Test.
 */

exports.index = function(req, res) {
    res.render('takeQuiz', {
        title: 'Please select test'
    });
};

exports.createQuizMainScreen = function(req, res) {
    res.render('createQuizMainScreen', {
        title: 'List of Test'
    });
};

exports.createQuizCreateTest = function(req, res) {
    res.render('./quizTemp/detailTest', {
        title: 'Create Test'
    });
};

exports.createQuizEditTest = function(req, res) {
    res.render('./quizTemp/editTest', {
        title: 'Update Test'
    });
};

exports.createQuizAddQuestion = function(req, res) {
    res.render('./quizTemp/detailQuestion', {
        title: 'Add Question'
    });
};

exports.createQuizEditQuestion = function(req, res) {
    res.render('./quizTemp/editQuestion', {
        title: 'Update Question'
    });
};