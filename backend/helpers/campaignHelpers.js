const asyncHnadler = require('express-async-handler')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const later = require('@breejs/later')

const { getTikTokByHashtag, getTikTokByAccount } = require('../helpers/tiktokScraper')

const Campaign = db.campaigns
const TiktokInfo = db.tiktokInfos
const ApiSetting = db.apiSettings
const LayoutContent = db.layoutContents

const searchByHashtagandUpdateLayoutType = asyncHnadler( async(campaign) => {

    // compare layout type
    const defaultTiktokCount = campaign.tiktokInfos.length
    const newTiktokCount = campaign.apiSetting.layoutType

    if(newTiktokCount > defaultTiktokCount) {
        const tiktoks = await getTikToksWithHastag(campaign.hashtag, campaign.apiSetting.layoutType)
        if(tiktoks.length > 0) {

            let removedOldTikToks = []
            tiktoks.forEach((tiktok, index) => {
                if(index > defaultTiktokCount - 1) {
                    removedOldTikToks.push(tiktok)
                } 
            })

            const tiktokInfoDataBeforeSort = bulkCreateTikToks(removedOldTikToks, 'create', [], campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const created = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort)
                return created
            }
        }
    }
})

const searchByHashtagAndUpdate = async(campaign) => {

    return new Promise( async (resovle, reject) => {
        const tiktokInfoIds = campaign.tiktokInfos.map((tInfo) => {
            console.log(tInfo.campaign)
            // if(tInfo.campaign.collectionTypeId === 2) {
            //     return tInfo.id
            // }
        })
    
        const tiktoks = await getTikToksWithHastag(campaign.hashtag, campaign.apiSetting.layoutType)
        if(tiktoks.length > 0) {
            const tiktokInfoDataBeforeSort = bulkCreateTikToks(tiktoks, 'updateSchedule', tiktokInfoIds, campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const infos = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort, { updateOnDuplicate: [ 'videoId', 'account', 'hashtag', 'views', 'heart', 'comments', 'share', 'videoUrl', 'webVideoUrl', 'expiresIn',  ] })
                                .then(infos => {
                                    console.log('updated')
                                    return infos
                                })
                if(infos) {
                    resovle(true)
                } else {
                    reject(false)
                }
            }
        }
    })

}

const searchByAccountandUpdateLayoutType = asyncHnadler( async(campaign) => {

    // compare layout type
    const defaultTiktokCount = campaign.tiktokInfos.length
    const newTiktokCount = campaign.apiSetting.layoutType

    if(newTiktokCount > defaultTiktokCount) {
        const tiktoks = await getTikToksWithAccount(campaign.account, campaign.apiSetting.layoutType)
        if(tiktoks.length > 0) {

            let removedOldTikToks = []
            tiktoks.forEach((tiktok, index) => {
                if(index > defaultTiktokCount - 1) {
                    removedOldTikToks.push(tiktok)
                } 
            })

            const tiktokInfoDataBeforeSort = bulkCreateTikToks(removedOldTikToks, 'create', [], campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const created = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort)
                return created
            }
        }
    }
})

const searchByAccountAndUpdate = async(campaign) => {

    return new Promise( async (resovle, reject) => {
        const tiktokInfoIds = campaign.tiktokInfos.map((tInfo) => {
            if(tInfo.campaign.collectionTypeId === 1) {
                return tInfo.id
            }
        })
    
        const tiktoks = await getTikToksWithAccount(campaign.account, campaign.apiSetting.layoutType)
        if(tiktoks.length > 0) {
            const tiktokInfoDataBeforeSort = bulkCreateTikToks(tiktoks, 'updateSchedule', tiktokInfoIds, campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const infos = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort, { updateOnDuplicate: [ 'videoId', 'account', 'hashtag', 'views', 'heart', 'comments', 'share', 'videoUrl', 'webVideoUrl', 'expiresIn',  ] })
                                .then(infos => {
                                    console.log('updated')
                                    return infos
                                })
                if(infos) {
                    resovle(true)
                } else {
                    reject(false)
                }
            }
        }
    })

}

const tiktokUpdateOnSchedule = asyncHnadler( async () => {

    // run every minute with schedule
    const campaigns = await Campaign.findAll({
        include: [ TiktokInfo, ApiSetting]
    }).then(campaigns => {
        return campaigns.map( campaign => campaign.get({ plain: true }) );
    })

    if(campaigns.length > 0) {

        campaigns.forEach( async (campaign) => {
            
            if(campaign.collectionTypeId === 1) {
                // search by account and update
                await searchByAccountAndUpdate(campaign)
            } else {
                // search by hashtag and update
                await searchByHashtagAndUpdate(campaign)
            }

        });

    }
    

})

const getTikToksWithHastag = async (hashtag, tiktokCount) => {

    return new Promise( async(resovle, reject) => {
        const tiktok_hashtag = hashtag.replace('#', '');

        try {

            const posts = await getTikTokByHashtag(tiktok_hashtag, {
                number: tiktokCount
            })
            
            if(posts.collector?.length > 0) {
                resovle(posts.collector)

            }else {
                reject(false)
            }
            
        } catch (error) {
            reject(false)
        }

        reject(false)
    })
}

const getTikToksWithAccount = async (account, tiktokCount) => {

    
    return new Promise( async(resovle, reject) => {
        const tiktok_account_name = account.replace('@', '');

        try {

            const posts = await getTikTokByAccount(tiktok_account_name, {
                number: tiktokCount
            })
            
            if(posts.collector?.length > 0) {
                resovle(posts.collector)

            }else {
                reject(false)
            }
            
        } catch (error) {
            reject(false)
        }

        reject(false)
    })
    

}

function sortByViews( a, b ) {
    if ( Number(a.views) < Number(b.views) ){
      return 1;
    }
    if ( Number(a.views) > Number(b.views) ){
      return -1;
    }
    return 0;
}

const storeDataInAllRequiredTables = asyncHnadler( async (tiktoks, campaignId, campaignUUId) => {

    if(tiktoks.length > 0) {

        const tiktokInfoDataBeforeSort = bulkCreateTikToks(tiktoks, 'create', [], campaignId)

        // const tiktokInfoData = tiktokInfoDataBeforeSort.sort(sortByViews)

        if(tiktokInfoDataBeforeSort) {

            // store the tiktok data 
            const infos = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort)

            if(infos) {

                // store the api setting
                const token = generateApiToken(campaignUUId)
                const api = await ApiSetting.create({
                    campaignId: campaignId,
                    accessToken: token,
                    layoutType: process.env.TIKTOK_LAYOUT_COUNT,
                })

                if(api) {
                    
                    // store the layout contents
                    const layoutContent = await LayoutContent.create({
                        showAccount: process.env.TIKTOK_LAYOUTCONTENT_ACCOUNT,
                        showTitle: process.env.TIKTOK_LAYOUTCONTENT_TITLE,
                        showHashtag: process.env.TIKTOK_LAYOUTCONTENT_HASHTAG,
                        apiSettingId: api.id
                    })

                    return true
                    
                }else {
                    return false
                }

            }else {
                return false
            }
        }

    }else {
        return false
    }
})


// create an array for create or update tiktokInfos
const bulkCreateTikToks = (tiktoks, state, tiktokInfoIds, campaignId) => {

    const tiktokBulkCreateRows = tiktoks.map((tiktok, index) => {

        const videoUrl = new URL( tiktok.videoUrl )
        // get expires hexa from URL
        const pathArray = videoUrl.pathname.split('/')
        // hexa to decimal
        const timeStamps = parseInt(pathArray[2], 16)
        // get the expires time from tiktok and subtract 5 minutes
        const actualExpiresIn = moment.unix(timeStamps)
        const expiresIn = moment(actualExpiresIn).subtract(5, 'minutes').format("YYYY/MM/DD HH:mm:ss")

        const createTime = moment.unix(tiktok.createTime).format("YYYY/MM/DD")

        if(state === 'create') {
            const row = {
                videoId: tiktok.id,
                account: '@'+tiktok.authorName,
                hashtag: tiktok.text,
                views: tiktok.playCount,
                heart: tiktok.diggCount,
                comments: tiktok.commentCount,
                share: tiktok.shareCount,
                videoUrl: tiktok.videoUrl,
                webVideoUrl: tiktok.webVideoUrl,
                expiresIn: expiresIn,
                createTime: createTime,
                campaignId: campaignId,
                priority: 0,
                linkUrl: tiktok.webVideoUrl,
                visibility: 1
            }
    
            return row
            
        } else if(state === 'updateSchedule') {
            const row = {
                id: tiktokInfoIds[index],
                videoId: tiktok.id,
                account: '@'+tiktok.authorName,
                hashtag: tiktok.text,
                views: tiktok.playCount,
                heart: tiktok.diggCount,
                comments: tiktok.commentCount,
                share: tiktok.shareCount,
                videoUrl: tiktok.videoUrl,
                webVideoUrl: tiktok.webVideoUrl,
                expiresIn: expiresIn,
                createTime: createTime,
                campaignId: campaignId,
                priority: 0,
                linkUrl: tiktok.webVideoUrl,
                visibility: 1
            }
    
            return row
        }

    });

    return tiktokBulkCreateRows
}


// Generate JWT
const generateApiToken = (uuid) => {
    return jwt.sign({ uuid }, process.env.TIKTOK_API_SECRET, {
        // expiresIn: '15s'
    })
}


const storeTikToksInAllTables = async (campaign) => {

    return new Promise( async(resovle, reject) => {

        let tiktokCount = process.env.TIKTOK_LAYOUT_COUNT || 12
    
        const apiSetting = await ApiSetting.findOne({
            where: {
                campaignId: campaign.id
            }
        })
    
        if(apiSetting !== null) {
            tiktokCount = apiSetting.layoutType
        }
    
        if(campaign.collectionTypeId === 1) { // 1 === account
            const result = await getTikToksWithAccount(campaign.account, tiktokCount)
            const stored = storeDataInAllRequiredTables(result, campaign.id, campaign.uuid)
            if(stored) {
                resovle(true) 
            }
        }else if(campaign.collectionTypeId === 2) { // 2 === hastag
            const result = await getTikToksWithHastag(campaign.hashtag, tiktokCount)
            const stored = storeDataInAllRequiredTables(result, campaign.id, campaign.uuid)
            if(stored) {
                resovle(true) 
            }
        }
    
        reject(false)
    })

}

const updateTiktoksInAllTables = async (campaign) => {

    return new Promise( async(resovle, reject) => {
    
        if(campaign.collectionTypeId === 1) { // 1 === account
            const result = await searchByAccountAndUpdate(campaign)
            if(result) {
                resovle(true) 
            }
        }else if(campaign.collectionTypeId === 2) { // 2 === hastag
            const result = await searchByHashtagAndUpdate(campaign)
            if(result) {
                resovle(true) 
            }
        }
    
        reject(false)
    })
}

// update the tiktoks every 1 hour
const updateTiktoksBySchedule = () => {
    // will fire every 1 hour
    const textSched = later.parse.text(`${process.env.TIKTOK_SCHEDULE_CRON}`)
    const cron = later.setInterval(tiktokUpdateOnSchedule, textSched)
}

module.exports = {
    storeTikToksInAllTables,
    updateTiktoksInAllTables,
    updateTiktoksBySchedule,
    searchByHashtagandUpdateLayoutType,
    searchByAccountandUpdateLayoutType
}