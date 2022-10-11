const asyncHnadler = require('express-async-handler')
const db = require('../models/index')


// Create main Model
const Campaign = db.campaigns
const TiktokInfo = db.tiktokInfos

// @desc GET campaignOutput
// @route GET /campaignOutput/
// @access Private
const index = asyncHnadler( async (req, res) => {

    const { userId } = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }
    
    const campaigns = await Campaign.findAll({ 
        where: {
            userId: userId
        },
        include: [ TiktokInfo ],
        order: [
            // [ TiktokInfo, 'id', 'DESC'],
            [ 'id', 'DESC'],
        ],
    })
    res.send(campaigns)

})

// @desc PUT campaignOutput
// @route PUT /campaign-outputs/visibility/update
// @access Private
const updateVisibility = asyncHnadler( async (req, res) => {

    const { id, visibility } = req.body

    if(!id || visibility === '') {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const campaign = await TiktokInfo.update({ visibility: !visibility }, {
        where: {
            id: id,
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

// @desc PUT campaignOutput
// @route PUT /campaign-outputs/link-url/update
// @access Private
const updateLinkUrl = asyncHnadler( async (req, res) => {

    const { id, linkUrl } = req.body

    if(!id || linkUrl === '') {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const campaign = await TiktokInfo.update({ linkUrl: linkUrl }, {
        where: {
            id: id,
        }
    })

    if(campaign) {
        res.status(201).send({success: {
            updatedVisibility: `The video is updated!`
        }})
    } else {
        res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
        throw new Error('Invalid campaign data')
    }
})

// @desc PUT campaignOutput
// @route PUT /campaign-outputs/priority/update
// @access Private
const updatePriority = asyncHnadler( async (req, res) => {

    const { id, priority } = req.body

    if(!id || priority === '') {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const campaign = await TiktokInfo.update({ priority: priority }, {
        where: {
            id: id
        }
    })

    if(campaign) {
        res.status(201).send({success: {
            updatedPriority: `The priority setting of this video is updated!`
        }})
    } else {
        res.status(400).send({ error: { invalid: 'Invalid campaign data.' } })
        throw new Error('Invalid campaign data')
    }
})

module.exports = {
    index,
    updateVisibility,
    updateLinkUrl,
    updatePriority
}