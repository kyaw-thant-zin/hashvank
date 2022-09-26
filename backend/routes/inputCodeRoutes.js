const express = require('express')
const router = express.Router()
const { index, updateLayoutType, updateLayoutContent } = require('../controller/inputCodeController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, index)
router.put('/update/layout-type/:id', protect, updateLayoutType)
router.put('/update/layout-content/:id', protect, updateLayoutContent)

module.exports = router