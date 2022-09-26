const express = require('express')
const router = express.Router()
const { show, signIn, signUp } = require('../controller/authController')

router.get('/show/:id', show)

router.post('/sign-up', signUp )

router.post('/sign-in', signIn )



module.exports = router