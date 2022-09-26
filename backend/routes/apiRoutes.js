const express = require('express')
const router = express.Router()
const { requestContent } = require('../controller/apiController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', requestContent)

module.exports = router