/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('takeQuiz', {
    title: 'Home'
  });
};
