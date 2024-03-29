const asyncHnadler = require('express-async-handler')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const later = require('@breejs/later')

const { getTikTokByHashtag, getTikTokByAccount, refreshMsToken, getSingleVideo } = require('../helpers/tiktokScraper')

const Campaign = db.campaigns
const TiktokInfo = db.tiktokInfos
const ApiSetting = db.apiSettings
const LayoutContent = db.layoutContents

// ------------------ HASHTAG ---------------------- //
const getTikToksWithHastag = async (hashtag, options) => {

    console.log('searching with hashtag.....!')
    return new Promise( async(resovle, reject) => {
        const tiktok_hashtag = hashtag.replace('#', '');

        try {

            const posts = await getTikTokByHashtag(tiktok_hashtag, options)
            resovle(posts)
            
        } catch (error) {
            reject(false)
        }

        reject(false)
    })
}
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
            return tInfo.id
        })

        const tiktokOptions = {
            count: process.env.TIKTOK_LAYOUT_COUNT || 12,
            offset: campaign.offset,
            cursor: campaign.cursor,
            hasMore: campaign.hasMore
        }
    
        const data = await getTikToksWithHastag(campaign.hashtag, tiktokOptions)
        const tiktoks = data.collector

        const campaignData = {
            offset: data.offset,
            cursor: data.cursor,
            hasMore: data.hasMore
        }
    
        await Campaign.update( campaignData, {
            where: {
                id: campaign.id,
            }
        })

        if(tiktoks.length > 0) {
            const tiktokInfoDataBeforeSort = bulkCreateTikToks(tiktoks, 'updateSchedule', tiktokInfoIds, campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const infos = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort, { 
                    updateOnDuplicate: [ 'views', 'heart', 'comments', 'share', 'expiresIn',  ] 
                }).then(infos => {
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
const updateVideoURLByAccount = async (campaign) => {
    return new Promise(async (resovle, reject) => {
        const tiktoks = campaign.tiktokInfos
        if(tiktoks.length > 0) {
            tiktoks.forEach( async (tiktok) => {
                
                // get video meta
                const newVideoMeta = await getSingleVideo(tiktok.account, tiktok.videoId)

            })
        }
    })
}
// ------------------ HASHTAG ---------------------- //

// ------------------ ACCOUNT ---------------------- //
const getTikToksWithAccount = async (account, options) => {

    console.log('searching with account.....!')
    return new Promise( async(resovle, reject) => {
        const tiktok_account_name = account.replace('@', '');

        try {

            const posts = await getTikTokByAccount(tiktok_account_name, options)
            resovle(posts)
            
        } catch (error) {
            reject(error)
        }

        resovle(false)
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
            return tInfo.id
        })

        const tiktokOptions = {
            count: process.env.TIKTOK_LAYOUT_COUNT || 12,
            offset: campaign.offset,
            cursor: campaign.cursor
        }
    
        const data = await getTikToksWithAccount(campaign.account, tiktokOptions)
        const tiktoks = data.collector
        
        const campaignData = {
            offset: data.offset,
            cursor: data.cursor,
            hasMore: data.hasMore
        }
    
        await Campaign.update( campaignData, {
            where: {
                id: campaign.id,
            }
        })

        if(tiktoks.length > 0) {
            const tiktokInfoDataBeforeSort = bulkCreateTikToks(tiktoks, 'updateSchedule', tiktokInfoIds, campaign.id)
            if(tiktokInfoDataBeforeSort) {
                const infos = await TiktokInfo.bulkCreate(tiktokInfoDataBeforeSort, { 
                    updateOnDuplicate: [ 'views', 'heart', 'comments', 'share', 'expiresIn',  ] 
                }).then(infos => {
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
const updateVideoURLByHashtag = async (campaign) => {
    return new Promise(async (resovle, reject) => {
        
    })
}
// ------------------ ACCOUNT ---------------------- //

// sort
function sortByViews( a, b ) {
    if ( Number(a.views) < Number(b.views) ){
      return 1;
    }
    if ( Number(a.views) > Number(b.views) ){
      return -1;
    }
    return 0;
}

// ------------------ STORE ---------------------- //
// Store the datas
const storeDataInAllRequiredTables = asyncHnadler( async (result, campaignId, campaignUUId) => {

    const tiktoks = result.collector
    const campaignData = {
        offset: result.offset,
        cursor: result.cursor,
        videoCount: result.videoCount,
        hasMore: result.hasMore
    }

    await Campaign.update( campaignData, {
        where: {
            id: campaignId,
        }
    })

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
// ------------------ STORE ---------------------- //

// ------------------ UPDATE ---------------------- //
// Update by Schedule
const tiktokUpdateOnSchedule = asyncHnadler( async () => {

    console.log('updating.......!')

    // run with schedule
    const campaigns = await Campaign.findAll({
        include: [ TiktokInfo, ApiSetting]
    }).then(campaigns => {
        return campaigns.map( campaign => campaign.get({ plain: true }) );
    })

    if(campaigns.length > 0) {

        campaigns.forEach( async (campaign) => {

            if(campaign.collectionTypeId === 1) {
                // search by account and update, check the video count
                const maxCount = campaign.offset * process.env.TIKTOK_LAYOUT_COUNT
                if(maxCount < campaign.videoCount && campaign.videoCount >= process.env.TIKTOK_MAX_LAYOUT_COUNT) {
                    await searchByAccountAndUpdate(campaign)
                }
            } else if(campaign.collectionTypeId === 2) {
                // search by hashtag and update, check video count
                const videoCount = campaign.offset * process.env.TIKTOK_LAYOUT_COUNT
                if(campaign.hasMore  && videoCount >= process.env.TIKTOK_MAX_LAYOUT_COUNT) {
                    await searchByHashtagAndUpdate(campaign)
                }
            }
        });
    }
})

const tiktokVideoURLUpdateOnSchedule = asyncHnadler( async () => {

    console.log('updating video URL.......!')

    // run with schedule
    const campaigns = await Campaign.findAll({
        include: [TiktokInfo]
    }).then(campaigns => {
        return campaigns.map( campaign => campaign.get({ plain: true }) );
    })

    if(campaigns.length > 0) {

        campaigns.forEach( async (campaign) => {

            if(campaign.collectionTypeId === 1) {
                // search by account and update
                await updateVideoURLByAccount(campaign)
            } else if(campaign.collectionTypeId === 2) {
                // search by hashtag and update
                await updateVideoURLByHashtag(campaign)
            }
        });
    }
})

// update the tiktoks every 1 hour
const updateTiktoksBySchedule = () => {

    console.log('run cron by schedule.....!')

    // will fire every 1 hour - fetch new tiktok videos on every 1 hour later
    const textSched = later.parse.text(`${process.env.TIKTOK_SCHEDULE_CRON}`)
    const cron = later.setInterval(tiktokUpdateOnSchedule, textSched)

    // will fire every 30 minutes - update msToken every 30 minutes 
    const textSchedForMsToken = later.parse.text(`${process.env.TIKTOK_MSTOKEN_CRON}`)
    const cronMsToken = later.setInterval(refreshMsToken, textSchedForMsToken)

    // will fire every 4 hours - update tiktok video URL on every 4 hours | tiktok video URL will expires on 5 hours later
    const textSchedForVideoURL = later.parse.text(`${process.env.TIKTOK_VIDEO_URL_CRON}`)
    const cronVideoURL = later.setInterval(tiktokVideoURLUpdateOnSchedule, textSchedForVideoURL)

}
// ------------------ UPDATE ---------------------- //

// ------------------ CREATE ---------------------- //
const storeTikToksInAllTables = async (campaign) => {

    return new Promise( async(resovle, reject) => {

        let tiktokCount = process.env.TIKTOK_LAYOUT_COUNT || 12
        let result = false
    
        if(campaign.collectionTypeId === 1) { // 1 === account
            const tiktokOptions = {
                count: tiktokCount,
                offset: campaign.offset,
                cursor: campaign.cursor
            }
            try {
                result = await getTikToksWithAccount(campaign.account, tiktokOptions)
            } catch (error) {
                reject(error)
            }
        }else if(campaign.collectionTypeId === 2) { // 2 === hastag
            const tiktokOptions = {
                count: tiktokCount,
                offset: campaign.offset,
                cursor: campaign.cursor
            }
            try {
                result = await getTikToksWithHastag(campaign.hashtag, tiktokOptions)
            } catch (error) {
                reject(error)
            }
        }

        if(result) {
            if(!result?.error) {
                const stored = storeDataInAllRequiredTables(result, campaign.id, campaign.uuid)
                if(stored) {
                    resovle(true) 
                }
            } else {
                resovle(result)
            }
        }

    })

}
// ------------------ CREATE ---------------------- //

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

// ------------------ PREPARE DATA ---------------------- //
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
                // id: tiktokInfoIds[index],
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
// ------------------ PREPARE DATA ---------------------- //

// Generate JWT
const generateApiToken = (uuid) => {
    return jwt.sign({ uuid }, process.env.TIKTOK_API_SECRET, {
        // expiresIn: '15s'
    })
}

module.exports = {
    storeTikToksInAllTables,
    updateTiktoksInAllTables,
    updateTiktoksBySchedule,
    searchByHashtagandUpdateLayoutType,
    searchByAccountandUpdateLayoutType,
    // UPDATE TEST
    tiktokUpdateOnSchedule,
    tiktokVideoURLUpdateOnSchedule
}

/**** ------------- FLOWS --------------- *** 
Creating
Campaign Store -> storeTikToksInAllTables -> getTikToksWithAccount -> storeDataInAllRequiredTables
                                          -> getTikToksWithHastag -> storeDataInAllRequiredTables

Updating by Schedule
Schedule -> updateTiktoksBySchedule -> tiktokUpdateOnSchedule -> searchByAccountAndUpdate
                                                              -> searchByHashtagAndUpdate
*/
