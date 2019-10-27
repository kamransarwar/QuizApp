const express = require('express')
const router = express.Router()

// Quiz routes
const QuizRoutes = require('./takeQuiz')
router.use(QuizRoutes)

// Main routes
const mainRoutes = require('./main')
router.use(mainRoutes)

module.exports = router
