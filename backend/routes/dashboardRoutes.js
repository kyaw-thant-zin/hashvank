const express = require('express')
const router = express.Router()
const { index, show } = require('../controller/dashboardController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, index)
router.get('/show/:id', protect, show)

module.exports = router