/**
 * Modules
 */

// Express init.
const express = require('express')
const app = express()

// Secrets / Config
const secrets = require('./config/secrets')

// Path
const path = require('path')

// App configurations
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // For JSON
app.use(bodyParser.urlencoded({ extended: false })) // For URL encoded data

// Logger
const logger = require('morgan')
app.use(logger('dev'))

// DB ORM
const mongoose = require('mongoose')

// Session for express / mongodb
const Session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(Session)

// Configure Mongo Store
const store = new MongoDBStore({
  uri: secrets.db
})
// If store has any error
store.on('error', error => {
  console.log(error)
})

// Init. DB session
app.use(Session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: store
}))

// MiddleWares
app.use((req, res, nxt) => {
  // This will load all the middle-wares dynamically that are mentioned in the below file
  const middlewares = require('./middlewares')

  if (Object.keys(middlewares).length > 0) {
    Object.keys(middlewares).forEach(key => {
      // Init. the mentioned middlewares one by one
      const currentMiddleWare = middlewares[key]
      app.use(currentMiddleWare)
    })
  }
  nxt()
})

// ------- NOT SURE, WHAT THESE ARE DOING. SO, I HAVE THEM SEPARATE FROM DYNAMIC MIDDLEWARE FILE

// ---- Remember original destination before login.
// app.use((req, res, nxt) => {
//   const path = req.path.split('/')[1]
//   if (/auth|login|logout|signup|fonts|favicon/i.test(path)) {
//     return nxt()
//   }
//   req.session.returnTo = req.path
//   nxt()
// })

// ----  Make user available
// app.use((req, res, nxt) => {
//   if (req.hasOwnProperty('user')) res.locals.user = req.user
//   nxt()
// })
// -------------------------------------------------------------------------------------------

// Connect assets together
const connectAssets = require('connect-assets')
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}))

// All the available routes
const routes = require('./routes')
app.use(routes)

// Error Handler
const errorHandler = require('errorhandler')
app.use(errorHandler())

// Create connection to DB
mongoose.connect(secrets.db, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
  console.log('Db connected')

  const port = process.env.PORT || 3000
  app.listen(port)

  console.log(`App is listening on port ${port}`)
}).catch(err => {
  console.log(err)
})

// app.get('/', homeController.index); ---- Implemented
// app.get('/test', quizController.index); ---- Implemented
// app.get('/login', userController.getLogin);
// app.post('/login', userController.postLogin);
// app.get('/logout', userController.logout);
// app.get('/forgot', userController.getForgot);
// app.post('/forgot', userController.postForgot);
// app.get('/reset/:token', userController.getReset);
// app.post('/reset/:token', userController.postReset);
// app.get('/signup', userController.getSignup);
// app.post('/signup', userController.postSignup);
// app.get('/contact', contactController.getContact);
// app.post('/contact', contactController.postContact);
// app.get('/account', passportConf.isAuthenticated, userController.getAccount);
// app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
// app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
// app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
// app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

// app.get('/mainscreen', passportConf.isAuthenticated, quizController.createQuizMainScreen);
// app.get('/createtest', passportConf.isAuthenticated, quizController.createQuizCreateTest);
// app.get('/updatetest', passportConf.isAuthenticated, quizController.createQuizEditTest);
// app.get('/createquestion', passportConf.isAuthenticated, quizController.createQuizAddQuestion);
// app.get('/updatequestion', passportConf.isAuthenticated, quizController.createQuizEditQuestion);
