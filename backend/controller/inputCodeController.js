
const asyncHnadler = require('express-async-handler')
const { searchByHashtagandUpdateLayoutType } = require('../helpers/campaignHelpers')
const { Op } = require('sequelize')
const db = require('../models/index')

// Create main Model
const User = db.users
const Campaign = db.campaigns
const ApiSetting = db.apiSettings
const LayoutContent = db.layoutContents
const TiktokInfo = db.tiktokInfos

// @desc GET inputCode
// @route GET /input-codes/
// @access Private
const index = asyncHnadler( async (req, res) => {

    const { userId } = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    let inputCodes = await ApiSetting.findAll({ 
        include: [ 
            {
                model: Campaign,
                required: true,
                where: {
                    userId: userId
                },
            }, 
            {
                model: LayoutContent,
                required: true
            } 
        ],
        order: [
            ['id', 'DESC'],
        ],
    })

    res.send(inputCodes)
})

// @desc PUT inputCode
// @route PUT /input-codes/update/layout-type/:id
// @access Private
const updateLayoutType = asyncHnadler( async (req, res) => {

    const { id, layoutType } = req.body

    if(!id || layoutType === '') {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const apiSetting = await ApiSetting.update({ layoutType: layoutType }, {
        where: {
            id: id,
        }
    })

    if(apiSetting) {

        // const apiSettingCId = await ApiSetting.findOne({
        //     where: {
        //         id: id
        //     },
        //     attributes: ['campaignId']
        // }).then(apiSettings => {
        //     return apiSettings.get({ plain: true }) 
        // })

        // const campaign = await Campaign.findOne({
        //     where: {
        //         id: apiSettingCId.campaignId
        //     },
        //     include: [ TiktokInfo, ApiSetting]
        // }).then(campaign => {
        //     return campaign.get({ plain: true })
        // })

        // const result = searchByHashtagandUpdateLayoutType(campaign)

        // if(result) {
        //     res.status(201).send({success: {
        //         updatedLayoutType: `The layout type is updated!`
        //     }})
        // }

            res.status(201).send({success: {
                updatedLayoutType: `The layout type is updated!`
            }})

    } else {
        res.status(400).send({ error: { invalid: 'Invalid data.' } })
        throw new Error('Invalid data')
    }
})

// @desc PUT inputCode
// @route PUT /input-codes/update/layout-content/:id
// @access Private
const updateLayoutContent = asyncHnadler( async (req, res) => {

    const { id, showAccount, showTitle, showHashtag } = req.body
    let response = ''

    if(!id || (showAccount === undefined && showTitle === undefined && showHashtag === undefined)) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    if(showAccount !== undefined) {
        response = await LayoutContent.update({ showAccount: showAccount === false ? 0:1 }, {
            where: {
                apiSettingId: id,
            }
        })
    }

    if(showTitle !== undefined) {
        response = await LayoutContent.update({ showTitle: showTitle }, {
            where: {
                apiSettingId: id,
            }
        })
    }

    if(showHashtag !== undefined) {
        response = await LayoutContent.update({ showHashtag: showHashtag }, {
            where: {
                apiSettingId: id,
            }
        })
    }

    if(response) {
        res.status(201).send({success: {
            updatedLayoutContent: `The layout content is updated!`
        }})

    } else {
        res.status(400).send({ error: { invalid: 'Invalid data.' } })
        throw new Error('Invalid data')
    }

})

module.exports = {
    index,
    updateLayoutType,
    updateLayoutContent
}