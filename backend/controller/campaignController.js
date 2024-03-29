const asyncHnadler = require('express-async-handler')
const { storeTikToksInAllTables, updateTiktoksInAllTables, tiktokVideoURLUpdateOnSchedule } = require('../helpers/campaignHelpers')
const db = require('../models/index')

// Create main Model
const Campaign = db.campaigns
const CollectionType = db.collectionTypes
const LinkType = db.linkTypes
const ApiSetting = db.apiSettings
const LayoutContent = db.layoutContents

// @desc GET campaigns
// @route GET /campaigns/
// @access Private
const index = asyncHnadler( async (req, res) => {

    const {userId} = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    let campaigns = await Campaign.findAll({ 
        where: {
            userId: userId
        },
        include: [ CollectionType, LinkType ],
        order: [
            ['id', 'DESC'],
        ],
    }).catch((error) => {
        console.log(error)
    })

    res.send(campaigns)
})

// @desc POST campaigns
// @route POST /campaigns/store
// @access Private
const store = asyncHnadler( async (req, res) => {

    // const { campaignName, collectionType, account, hashtag, linkType, userId } = req.body

    // if(!campaignName || !collectionType || !linkType || !userId) {
    //     res.status(400).send({ error: { required: 'Please add all fields' } })
    //     throw new Error('Please add all fields')
    // }

    // // Check campaign exists
    // const camapignExists = await Campaign.findOne({ where: { campaignName: campaignName, userId: userId } })
    // if(camapignExists) {
    //     res.status(400).send({ error: { camapignExists: 'The campaign name has already been taken.' } })
    //     throw new Error('The campaign name has already been taken.')
    // }

    // const campaignData = {
    //     campaignName: campaignName,
    //     account: account !== '' ? '@'+account.replace('@', '') : '',
    //     hashtag: hashtag !== '' ? '#'+hashtag.replace('#', '') : '',
    //     videoCount: 0,
    //     offset: 0,
    //     cursor: 0,
    //     hasMore: 0,
    //     collectionTypeId: collectionType,
    //     linkTypeId: linkType,
    //     visibility: 1,
    //     userId: userId
    // }

    // const campaign = await Campaign.create(campaignData).then(campaigns => {
    //     return campaigns.get({ plain: true })
    // })

    // if(campaign) {

    //     const result = await storeTikToksInAllTables(campaign)

    //     if(result === true) {
    //         res.status(201).send({success: {
    //             stored: `The ${campaign.campaignName} was successfully created!`
    //         }})
    //     } else if(result?.error && result.error === 'userNotFound') {

    //         // got error and delete campaign
    //         Campaign.destroy({
    //             where: {
    //               id: campaign.id
    //             }
    //         });

    //         res.status(400).send({ error: { userNotFound: 'The user does not exist!' } })
    //         throw new Error('The user does not exist!')

    //     } else if(result?.error && result.error === 'hashtagNotFound') {

    //         // got error and delete campaign
    //         Campaign.destroy({
    //             where: {
    //               id: campaign.id
    //             }
    //         });

    //         res.status(400).send({ error: { hashtagNotFound: 'No videos in this hashtag!' } })
    //         throw new Error('No videos in this hashtag!')
    //     }

    // } else {
    //     res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
    //     throw new Error('Invalid campaign data')
    // }

    tiktokVideoURLUpdateOnSchedule()

})

// @desc GET campaign
// @route GET /campaign/:id
// @access Private
const edit = asyncHnadler( async (req, res) => {

    const {userId, id} = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    let campaign = await Campaign.findAll({ 
        where: {
            userId: userId,
            id: id
        },
        include: [ CollectionType, LinkType ],
        order: [
            ['id', 'DESC'],
        ],
    })

    res.send(campaign)
})

// @desc PUT campaign
// @route PUT /campaign/update/:id
// @access Private
const update = asyncHnadler( async (req, res) => {

    const {userId, id, campaignName, account, hashtag, linkType, } = req.body

    if(!campaignName || !linkType || !userId || !id) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    // Check campaign exists
    const camapignExists = await Campaign.findOne({ where: { campaignName: campaignName, userId: userId } })
    if(camapignExists) {
        res.status(400).send({ error: { camapignExists: 'The campaign name has already been taken.' } })
        throw new Error('The campaign name has already been taken.')
    }

    const campaignData = {
        campaignName: campaignName,
        account: account !== '' ? '@'+account.replace('@', '') : '',
        hashtag: hashtag !== '' ? '#'+hashtag.replace('#', '') : '',
        linkTypeId: linkType,
        userId: userId
    }

    const campaign = await Campaign.update( campaignData, {
        where: {
            id: id,
            userId: userId
        }
    }).then(campaign => {
        return campaign.get({ plain: true })
    })

    if(campaign) {

        const result = await updateTiktoksInAllTables(campaign)

        if(result) {
            res.status(201).send({success: {
                stored: `The ${campaign.campaignName} was successfully created!`
            }})
        } else {
            res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
            throw new Error('Invalid campaign data')
        }

    } else {
        res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
        throw new Error('Invalid campaign data')
    }

    res.send(campaign)
})

// @desc PUT campaigns
// @route PUT /campaigns/visibility/update
// @access Private
const updateVisibility = asyncHnadler( async (req, res) => {

    const { id, visibility, userId } = req.body

    if(!id || visibility === '' || !userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const campaign = await Campaign.update({ visibility: !visibility }, {
        where: {
            id: id,
            userId: userId
        }
    })

    if(campaign) {
        res.status(201).send({success: {
            updatedVisibility: `${ visibility === true ? 'Private':'Public' }`
        }})
    } else {
        res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
        throw new Error('Invalid campaign data')
    }
})

// @desc DELETE campaigns
// @route DELETE /campaigns/delete/:id
// @access Private
const destroy = asyncHnadler( async (req, res) => {

    const { userId, id } = req.body

    if(!userId || !id ) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const result = await Campaign.destroy({
        where: {
            id: id,
            userId: userId
        }
    })

    

    if(result) {
        res.status(201).send({success: {
            deleted: `The campaign was successfully deleted!`
        }})
    }else {
        res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
        throw new Error('Invalid campaign data')
    }

})

module.exports = {
    index,
    store,
    edit,
    update,
    updateVisibility,
    destroy
}