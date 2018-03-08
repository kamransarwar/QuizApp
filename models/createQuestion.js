var mongoose = require('mongoose');

module.exports = mongoose.model('CreateQuestion', {

    testType : String,
    question: String,
    questionType: String,
    questionChoices: [choicesSchema]

});

var choicesSchema = mongoose.model('CreateChoices', {

	choiceDetail : String,
	choiceRemark : Boolean

});

