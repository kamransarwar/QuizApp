/**
 * Created by Kamran on 11/9/2014.
 */

/**
 * GET /
 * Select Test.
 */

module.exports = {
  index: (req, res, nxt) => {
    return res.render('takeQuiz', {
      title: 'Please select test'
    })
  },

  createQuizMainScreen: (req, res, nxt) => {
    res.render('createQuizMainScreen', {
      title: 'List of Test'
    })
  },

  createQuizCreateTest: (req, res, nxt) => {
    res.render('./quizTemp/detailTest', {
      title: 'Create Test'
    })
  },

  createQuizEditTest: (req, res, nxt) => {
    res.render('./quizTemp/editTest', {
      title: 'Update Test'
    })
  },

  createQuizAddQuestion: (req, res, nxt) => {
    res.render('./quizTemp/detailQuestion', {
      title: 'Add Question'
    })
  },

  createQuizEditQuestion: (req, res, nxt) => {
    res.render('./quizTemp/editQuestion', {
      title: 'Update Question'
    })
  }
}
