
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')
const path = require('path')
const jwt = require('jsonwebtoken')

// api js
const {getJSCode} = require('../api/Hushvank')

// Create main Model
const User = db.users
const Campaign = db.campaigns
const ApiSetting = db.apiSettings
const LayoutContent = db.layoutContents
const TiktokInfo = db.tiktokInfos
const LinkSetting = db.linkSettings

// @desc GET api
// @route GET /js
// @access Private
const requestContent = asyncHnadler( async (req, res) => {

    const key = req.query?.key
    const callBack = req.query?.function

    if(!key) {
        res.status(400).send({ error: { tokenExpierd: 'Invalid' } })
    }
    
    // Verify token
    const decoded = jwt.verify( key, process.env.TIKTOK_API_SECRET, async (err, decoded) => {
        if(err) {
            res.status(400).send({ error: 'The token is invalid.' })
        }

        if(decoded !== undefined) {

            const campaign = await Campaign.findOne({
                where: {
                    uuid: decoded.uuid
                },
                include: [
                    {
                        model: TiktokInfo,
                        required: true,
                        where: {
                            visibility: true
                        },
                        include: [
                            {
                                model: LinkSetting,
                            }
                        ]
                    },
                    {
                        model: ApiSetting,
                        required: true,
                        include: [
                            {
                                model: LayoutContent,
                                required: true,
                            }
                        ]
                    }
                ],
                order: [
                    ['tiktokInfos', 'priority', 'DESC'],
                ],
                
            }).then(campaigns => {
                return campaigns.get({ plain: true })
            })
    
            if(campaign) {

                let jsCode

                if(callBack) {
                    jsCode = getJSCode(campaign, callBack)
                } else {
                    jsCode = getJSCode(campaign, false)
                }

                // send JS code to client
                res.send(jsCode)
                
            }else {
                res.status(400).send({ error: 'The token is invalid.' })
            }
        }

    })
    
})


module.exports = {
    requestContent,
}