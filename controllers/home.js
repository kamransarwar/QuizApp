/**
 * GET /
 * Home page.
 */

module.exports = {
  // Returns Index page
  index: (req, res, nxt) => {
    return res.render('takeQuiz', {
      title: 'Home'
    })
  }
}
