const express = require('express')
const router = express.Router()
const { index, store, edit, updateVisibility, destroy } = require('../controller/campaignController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, index)
router.post('/store/', protect, store)
router.get('/:id', protect, edit)
router.put('/visibility/update/:id', protect, updateVisibility)
router.delete('/delete/:id', protect, destroy)


module.exports = router