const express = require('express')
const router = express.Router()

const QuizController = require('../controllers/takeQuiz')

router.get('/test', QuizController.index)

module.exports = router
