var mongoose = require('mongoose');

module.exports = mongoose.model('Test', {

    testName : String,
    testDescription : String,
    testCategory : String,
    testInstructions : String,
    tagsOrKeywords : String,
    targetAudience : String,
    createDate : Date,
    modifiedDate : Date,
    userID : String

});

