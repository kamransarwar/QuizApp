const csrfExclude = ['/url1', '/url2']
const csrf = require('lusca').csrf()

module.exports = (req, res, nxt) => {
  // CSRF protection.
  if (csrfExclude.includes(req.path)) return nxt()
  csrf(req, res, nxt)
}
