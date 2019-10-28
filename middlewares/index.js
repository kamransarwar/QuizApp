const CsrfMiddleWare = require('./csrf')
const CookieParser = require('./cookie-parser')
const Compress = require('./compress')
const MethodOverride = require('./method-overide')
const FlashMsg = require('./flash')

module.exports = {
  // CSRF protection middleware
  CsrfMiddleWare,

  // Cookie parser
  CookieParser,

  // Compress requests
  Compress,

  // Override methods
  MethodOverride,

  // Session / Flash messages
  FlashMsg
}
