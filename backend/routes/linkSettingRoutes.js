const express = require('express')
const router = express.Router()
const { index, getTiktoksOfCampaign, store } = require('../controller/linkSettingController')
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, index)
router.get('/get-tiktok-campaign/:id', protect, getTiktoksOfCampaign)
router.post('/store/', protect, store)


module.exports = router