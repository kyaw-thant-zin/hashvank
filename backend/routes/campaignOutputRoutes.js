const express = require('express')
const router = express.Router()
const { index, updateVisibility, updateLinkUrl, updatePriority } = require('../controller/campaignOutputController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, index)
router.put('/visibility/update/:id', protect, updateVisibility)
router.put('/link-url/update/:id', protect, updateLinkUrl)
router.put('/priority/update/:id', protect, updatePriority)


module.exports = router