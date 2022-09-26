
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')

// Create main Model
const User = db.users
const LinkSetting = db.linkSettings
const TiktokInfo = db.tiktokInfos
const Campaign = db.campaigns

// @desc GET linkSetting
// @route GET /link-settings/
// @access Private
const index = asyncHnadler( async (req, res) => {

    const { userId } = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    let linkSettings = await LinkSetting.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: TiktokInfo,
                include: [
                    {
                        model: Campaign
                    }
                ]
            }

        ],
        order: [
            ['id', 'DESC'],
        ],
    }).then(linkSettings => {
        return linkSettings.map( linkSetting => linkSetting.get({ plain: true }) );
    })
    res.send(linkSettings)
})

// @desc GET linkSetting
// @route GET /link-settings/get-tiktok-campaign/:id
// @access Private
const getTiktoksOfCampaign = asyncHnadler( async (req, res) => {

    const { id } = req.body

    let tiktoks = await TiktokInfo.findAll({
        where: {
            campaignId: id,
        }
    })
    res.send(tiktoks)
})

// @desc POST linkSetting
// @route POST /link-settings/store
// @access Private
const store = asyncHnadler( async (req, res) => {

    const { tiktokId, hashtag, imageUrl, title, pageUrl, userId } = req.body

    if(!tiktokId || !userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const linkSettingData = {
        hashtag: hashtag,
        imageUrl: imageUrl,
        title: title,
        pageUrl: pageUrl,
        tiktokInfoId: tiktokId,
        userId: userId
    }

    const linkSetting = await LinkSetting.create(linkSettingData)

    if(linkSetting) {
        res.status(201).send({success: {
            stored: `The Link Setting was successfully created!`
        }})

    } else {
        res.status(400).send({ error: { invalid: 'Invalid Link Setting data.' } })
        throw new Error('Invalid Link Setting data.')
    }
})

module.exports = {
    index,
    getTiktoksOfCampaign,
    store
}