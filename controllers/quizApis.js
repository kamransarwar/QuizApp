/**
 * Created by Kamran on 11/9/2014.
 */

var Test = require('../models/createTest');
var AddQuestion = require('../models/createQuestion');


module.exports = function(app, passport) {

    app.get('/api/test', function(req, res) {

        // use mongoose to get all tests
        Test.find(function(err, tests) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tests); // return all test in json
        });
    });

    app.post('/api/createTest', function(req, res, next) {

        console.log(req.body.testCategory);
        req.assert('testName', 'Please write valid test Name').notEmpty();
       // req.assert('testCategory', 'Please select test Category').isInt().gte(0);
        req.assert('testDescription', 'Please describe your test').notEmpty();
        req.assert('tagsOrKeywords', 'Please write some tags or keywords for test').notEmpty();


        var errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/createtest');
        }

        // create a test, information comes from AJAX request from Angular
        Test.create({
            testName : req.body.testName,
            testDescription : req.body.testDescription,
            testCategory : req.body.testCategory,
            testInstructions : req.body.testInstructions,
            tagsOrKeywords : req.body.tagsOrKeywords,
            targetAudience : req.body.targetAudience,
            createDate : Date.now(),
            modifiedDate : '',
            userID : req.user.id,
            done : false
        }, function(err, tests) {
            if (err)
                res.send(err);

        });

    });

    app.delete('/api/test/:test_id', function(req, res) {

        Test.remove({
            _id : req.params.test_id
        }, function(err, test) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Test.find(function(err, test) {
                if (err)
                    res.send(err)
                res.json(test);
            });
        });
    });

    app.get('/api/addQuestionToTest', function(req, res) {

        // use mongoose to get all tests
        AddQuestion.find(function(err, tests) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tests); // return all test in json
        });
    });

    app.post('/api/addQuestionToTest', function(req, res) {

        // create a test, information comes from AJAX request from Angular
        AddQuestion.create({

            testType : req.body.tName,
            question: req.body.question,
            questionType: req.body.questionType,
            questionChoices: req.body.choices
            // testType : req.body.selectedTest.testName
        }, function(err, question) {
            if (err)
                res.send(err);

            // get and return all the test after you create another
            AddQuestion.find(function(err, question) {
                if (err)
                    res.send(err)
                res.json(question);
            });
        });

    });

    app.delete('/api/addQuestionToTest/:question_id', function(req, res) {

        // create a test, information comes from AJAX request from Angular
        AddQuestion.remove({
            _id : req.params.question_id
        }, function(err, test) {
            if (err)
                res.send(err);

            // get and return all the test after you create another
            AddQuestion.find(function(err, question) {
                if (err)
                    res.send(err)
                res.json(question);
            });
        });

    });

    app.get('/api/questionForTest/:testName', function(req, res) {


        var tn = req.params.testName;
        var query = AddQuestion.find({'testType': tn});

        query.select('-questionChoices.remark');

        query.skip(Math.round(Math.random()*5));

        query.limit(15);

        query.exec(function(err, tests) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tests); // return all test in json
        });

        console.log('Hello from api')
    });

    app.post('/api/questionForTest/:testName', function(req, res) {
        var tn = req.params.testName;
        var userResponse = req.body.aq;
        var tn = req.params.testName;
        AddQuestion.find({'testType': tn}, function(err, question) {
            if (err)
                res.send(err)
            var questionInDb = question;
            var result = [];
            for (var i = 0; i < (userResponse.length-1); i++) {
                if (userResponse[i] !== null) {
                    var urId;
                    if (JSON.stringify(userResponse[i].QuestionHeader.questionId) != null) {
                        urId = userResponse[i].QuestionHeader.questionId;
                    }
                    else {
                        urId = 'kamran';
                        console.log(urId);
                    }
                    result[i] = {
                        qid: urId,
                        choices: [],
                        qPer: null,
                        qStat: null
                    }
                    for (var j = 0; j < questionInDb.length; j++) {
                        var dbId = questionInDb[j]._id;
                        if (dbId == urId) {
                            for (var k = 0; k < userResponse[i].QuestionChoices.length; k++) {
                                var urChoice = userResponse[i].QuestionChoices[k].choiceDetail;
                                var urRemark = userResponse[i].QuestionChoices[k].choiceRemark;
                                result[i].choices[k] = {
                                    choice: urChoice,
                                    remark: urRemark,
                                    percentage: null
                                }
                                result[i].choices[k].choice = urChoice;
                                result[i].choices[k].remark = urRemark;
                                //console.log(result[i].choices[k]);

                                for (var l = 0; l < questionInDb[j].questionChoices.length; l++) {
                                    var dbChoice = questionInDb[j].questionChoices[l].choice;
                                    var dbRemark = questionInDb[j].questionChoices[l].remark;
                                    if (urChoice == dbChoice) {
                                        if (urRemark == dbRemark) {
                                            result[i].choices[k].percentage = questionInDb[j].questionChoices[l].weighted;
                                            //  console.log(result[i].choices[k].percentage);
                                        }

                                    }

                                }

                            }
                        }

                    }
                }
            }

            var p;
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var p = 0;
                if (result[i] !== null) {
                    for (var j = 0; j < result[i].choices.length; j++) {

                        p = p + result[i].choices[j].percentage;
                    }
                    result[i].qPer = p.toFixed(0);
                    console.log(result[i].qPer);
                }
            }

            for (var i = 0; i < result.length; i++) {

                if (result[i].qPer == 100) {
                    result[i].qStat = "Correct Answer";
                }
                else {
                    result[i].qStat = "Wrong Answer";
                }
            }
            console.log(result);
            res.json(result);

        });
    });

};

