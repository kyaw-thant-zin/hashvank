
// Scraping Tool
const Signer = require("tiktok-signature")
const axios = require('axios')
const { wrapper } = require('axios-cookiejar-support')
const { config } = require('dotenv')
const { CookieJar } = require('tough-cookie')
const db = require('../models/index')

// Create main Model
const Cookie = db.cookies
const Campaign = db.campaigns

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }))
const signer = new Signer()

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
// const profileURL = 'https://www.tiktok.com/node/share/user/@'
const searchProfileURL = 'https://www.tiktok.com/api/search/user/full/'
const profileURL = 'https://www.tiktok.com/api/user/detail/'
const tagURL = 'https://www.tiktok.com/node/share/tag/'
const challengeURL = 'https://m.tiktok.com/api/challenge/item_list/'
const searchURL = 'https://www.tiktok.com/api/search/general/full/'
const videoURL = 'https://www.tiktok.com/api/post/item_list/'

const baseParamsHashTag = {
    'aid': '1988',
    "app_language": "en",
    "app_name": "tiktok_web",
    "battery_info": 1,
    "browser_language": "en",
    "browser_name": "Mozilla",
    "browser_online": true,
    "browser_platform": "MacIntel",
    "browser_version": '5.0(Macintosh; Intel Mac OS X 10 _15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 105.0 .0 .0 Safari / 537.36',
    "channel": "tiktok_web",
    "cookie_enabled": true,
    "device_id": "7146446193673094657",
    "device_platform": "web_pc",
    "focus_state": true,
    "from_page": "search",
    "history_len": 31,
    "is_fullscreen": false,
    "is_page_visible": true,
    "keyword": "",
    "offset": 0, // increase the offset for more videos - 12, 24, 48
    "os": "mac",
    "priority_region": "",
    "referer": "",
    "region": "MM",
    "screen_height": "1080",
    "screen_width": "1920",
    "tz_name": "Asia/Rangoon",
    "webcast_language": "en",
}

const baseParamsProfile = {
    'aid': '1988',
    "app_language": "en",
    "app_name": "tiktok_web",
    "battery_info": 1,
    "browser_language": "en",
    "browser_name": "Mozilla",
    "browser_online": true,
    "browser_platform": "MacIntel",
    "browser_version": '5.0(Macintosh; Intel Mac OS X 10 _15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 105.0 .0 .0 Safari / 537.36',
    "channel": "tiktok_web",
    "cookie_enabled": true,
    "device_id": "7146446193673094657",
    "device_platform": "web_pc",
    "focus_state": true,
    "from_page": "search",
    "history_len": 31,
    "is_fullscreen": false,
    "is_page_visible": true,
    "keyword": "",
    "cursor": 0, // pagination cursor
    "count": 12, // increase the count for more videos
    "os": "mac",
    "priority_region": "",
    "referer": "",
    "region": "MM",
    "screen_height": "1080",
    "screen_width": "1920",
    "tz_name": "Asia/Rangoon",
    "webcast_language": "en",
}

const profileParams = {
    'aid': '1988',
    "app_language": "en",
    "app_name": "tiktok_web",
    "battery_info": 1,
    "browser_language": "en",
    "browser_name": "Mozilla",
    "browser_online": true,
    "browser_platform": "MacIntel",
    "browser_version": '5.0(Macintosh; Intel Mac OS X 10 _15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 105.0 .0 .0 Safari / 537.36',
    "channel": "tiktok_web",
    "cookie_enabled": true,
    "device_id": "7154229846167668226",
    "device_platform": "web_pc",
    "focus_state": true,
    "from_page": "user",
    "history_len": 14,
    "is_fullscreen": false,
    "is_page_visible": true,
    "language": "en",
    "os": "mac",
    "priority_region": "",
    "referer": "",
    "region": "MM",
    "screen_height": "1080",
    "screen_width": "1920",
    "tz_name": "Asia/Rangoon",
    "webcast_language": "en",
    "secUid": '',
    "msToken": "DYFrhlxnTlZzh0sbMv39Iq_B-OcAIBwqlXvZtisYcV7rRSbTGoub9nlhGkYv7_kEb_ubxzlhrN9uzJDQxmfx2Rth4x_nv56rtTqO3FCi9MhC8YrDid86YVmySyRVHxbo88AJL0M="
}

const secondParams = {
    "app_language": "en",
    "app_name": "tiktok_web",
    "battery_info": 1,
    "browser_language": "en",
    "browser_name": "Mozilla",
    "browser_online": true,
    "browser_platform": "MacIntel",
    "browser_version": '5.0(Macintosh; Intel Mac OS X 10 _15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 105.0 .0 .0 Safari / 537.36',
    "channel": "tiktok_web",
    "cookie_enabled": true,
    "device_id": "7154229846167668226",
    "device_platform": "web_pc",
    "focus_state": true,
    "from_page": "user",
    "history_len": 14,
    "is_fullscreen": false,
    "is_page_visible": true,
    "language": "en",
    "os": "mac",
    "priority_region": "",
    "referer": "",
    "region": "MM",
    "screen_height": "1080",
    "screen_width": "1920",
    "tz_name": "Asia/Rangoon",
    "webcast_language": "en",
}

const cookies = {
    "ttwid": "1%7CgGyKcS6dRMVu4XUfcXkjr3VAQip-BTv8U-wXGr0uDJI%7C1665723957%7C85238a14e13bbde6d8efc37e6f338a4bfac4a3e66ace1fbf043c05db68db1e77; ",
    "msToken": "DYFrhlxnTlZzh0sbMv39Iq_B-OcAIBwqlXvZtisYcV7rRSbTGoub9nlhGkYv7_kEb_ubxzlhrN9uzJDQxmfx2Rth4x_nv56rtTqO3FCi9MhC8YrDid86YVmySyRVHxbo88AJL0M="
}


const headers = {
    'User-Agent': USER_AGENT,
    'Referer': 'https://www.tiktok.com/',
    'Cookie': objToString(cookies),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
}

const scrape = async (url, options) => {

    return new Promise(async (resovle, reject) => {

        try {
            const response = await client({
                method: 'get',
                headers: headers,
                url: url,
                withCredentials: true,
            });
    
            if (options.type === 'hashtag') {
                if('data' in response.data) {
                    resovle(getResponse(response.data, options))
                } else {
                    reject('error')
                }
            } else if (options.type === 'account') {
                if('itemList' in response.data) {
                    resovle(getResponse(response.data, options))
                } else {
                    reject('error')
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getResponse = async (data, options) => {

    const resposne = {
        stats: 200,
        collector: []
    }

    resposne.cursor = data.cursor
    resposne.offset = Number(options.offset) + 1;
    resposne.videoCount = options.videoCount

    if(options.type === 'hashtag') {

        const dataList = data.data

        resposne.collector = dataList.map((d) => {

            const tiktok = d.item
            return {
                id: tiktok.video.id,
                text: tiktok.desc,
                createTime: tiktok.createTime,
                authorId: tiktok.author.id,
                authorName: tiktok.author.uniqueId,
                authorFollowing: tiktok.authorStats.followingCount,
                authorFans: tiktok.authorStats.followerCount,
                authorHeart: tiktok.authorStats.heart,
                authorVideo: tiktok.authorStats.videoCount,
                authorDigg: tiktok.authorStats.diggCount,
                authorVerified: tiktok.author.verified,
                authorPrivate: tiktok.author.privateAccount,
                authorSignature: tiktok.author.signature,
                musicId: tiktok.music.id,
                musicName: tiktok.music.title,
                musicAuthor: tiktok.music.authorName,
                musicOriginal: tiktok.music.original,
                imageUrl: tiktok.video.originCover,
                videoUrl: tiktok.video.playAddr,
                webVideoUrl: `https:www.tiktok.com/@${tiktok.author.uniqueId}/video/${tiktok.video.id}`,
                videoUrlNoWaterMark: '',
                diggCount: tiktok.stats.diggCount,
                shareCount: tiktok.stats.shareCount,
                playCount: tiktok.stats.playCount,
                commentCount: tiktok.stats.commentCount,
                downloaded: false,
            }
    
        })
    } else if(options.type === 'account') {

        const dataList = data.itemList
        
        resposne.collector = dataList.map((tiktok) => {

            return {
                id: tiktok.video.id,
                text: tiktok.desc,
                createTime: tiktok.createTime,
                authorId: tiktok.author.id,
                authorName: tiktok.author.uniqueId,
                authorFollowing: tiktok.authorStats.followingCount,
                authorFans: tiktok.authorStats.followerCount,
                authorHeart: tiktok.authorStats.heart,
                authorVideo: tiktok.authorStats.videoCount,
                authorDigg: tiktok.authorStats.diggCount,
                authorVerified: tiktok.author.verified,
                authorPrivate: tiktok.author.privateAccount,
                authorSignature: tiktok.author.signature,
                musicId: tiktok.music.id,
                musicName: tiktok.music.title,
                musicAuthor: tiktok.music.authorName,
                musicOriginal: tiktok.music.original,
                imageUrl: tiktok.video.originCover,
                videoUrl: tiktok.video.playAddr,
                webVideoUrl: `https:www.tiktok.com/@${tiktok.author.uniqueId}/video/${tiktok.video.id}`,
                videoUrlNoWaterMark: '',
                diggCount: tiktok.stats.diggCount,
                shareCount: tiktok.stats.shareCount,
                playCount: tiktok.stats.playCount,
                commentCount: tiktok.stats.commentCount,
                downloaded: false,
            }
    
        })
    }

    return resposne

}

const getTikTokByHashtag = async (hashtag, options) => {

    return new Promise(async (resovle, reject) => {
        try {
            const tiktok_hashtag = hashtag.replace('#', '')

            if (options.number) {
                options.count = options.number
            }

            const cookie = await Cookie.findOne({ 
                where: {
                    id: 1
                }
            })

            // change the default value to fetch value
            baseParamsHashTag.keyword = tiktok_hashtag
            cookies.msToken = cookie.msToken

            const qsObject = new URLSearchParams(baseParamsHashTag)
            const qs = qsObject.toString()
            const url = searchURL + `?${qs}`

            const scrapeOptions = {
                type: 'hashtag',
                offset: options.offset
            }
            const resposne = await scrape(url, scrapeOptions)
            resovle(resposne)

        } catch (error) {
            console.log(error)
        }
    })

}

const getTikTokByAccount = async (account, options) => {

    return new Promise(async (resovle, reject) => {
        try {
            const tiktokAcc = account.replace('@', '')
            if (options.count) {
                baseParamsProfile.count = options.count
            }

            if(options.cursor) {
                baseParamsProfile.cursor = options.cursor
            }

            const cookie = await Cookie.findOne({ 
                where: {
                    id: 1
                }
            })

            // ----------- Search and get secUid ---------- //
            // change the default value to fetch value
            profileParams.uniqueId = tiktokAcc    
            profileParams.msToken = cookie.msToken
            cookie.msToken = cookie.msToken

            const qsObject = new URLSearchParams(profileParams)
            const qs = qsObject.toString()
            const url = profileURL + `?` + qs

            await signer.init()
            const signature = await signer.sign(url)

            const res = await client({
                method: 'get',
                headers: headers,
                url: signature.signed_url,
                withCredentials: true,
            });

            console.log('search.........')

            console.log('fetch.........')
            secondParams.uniqueId = tiktokAcc 

            const qsObject2 = new URLSearchParams(secondParams)
            const qs2 = qsObject2.toString()
            const url2 = profileURL + `?` + qs2

            const res2 = await client({
                method: 'get',
                headers: headers,
                url: url2,
                withCredentials: true,
            });

            console.log(res2.data.userInfo)



            // generate the msToken 
            if(res2.config?.jar?.toJSON()) {
                const responseCookies = res2.config.jar.toJSON().cookies;
                const msToken = responseCookies.filter((c)=> {
                    return c.key === 'msToken';
                }).map(function(obj) {
                    return obj.value;
                });

                const cookieData = {
                    "msToken": msToken[0]
                }

                // update the msToken for next requests
                await Cookie.update( cookieData, {
                    where: {
                        id: 1,
                    }
                })
            }

            

            // ----------- Search and get secUid ---------- //

            // ----------- get user with secUid ---------- //
            // if(res.data?.user_list) {

            //     const sec_uid = res.data.user_list.filter((u) => {
            //         return u.user_info?.unique_id === tiktokAcc
            //     }).map((u) => {
            //         return u?.user_info?.sec_uid
            //     })

            //     if(sec_uid.length > 0) {

            //         const cookie = await Cookie.findOne({ 
            //             where: {
            //                 id: 1
            //             }
            //         })

            //         profileParams.uniqueId = tiktokAcc    
            //         profileParams.msToken = cookie.msToken
            //         profileParams.secUid = sec_uid[0]
            //         cookies.msToken = cookie.msToken

            //         const qsObject = new URLSearchParams(profileParams)
            //         const qs = qsObject.toString()
            //         const url = profileURL + `?` + qs

            //         const signature = await signer.sign(url)

            //         const resUser = await client({
            //             method: 'get',
            //             headers: headers,
            //             url: signature.signed_url,
            //             withCredentials: true,
            //         });

            //         console.log('fetch.........')

            //         console.log(resUser)

            //     }

            // }

            // ----------- get user with secUid ---------- //

            // generate the msToken 
            // if(res.config?.jar?.toJSON()) {
            //     const responseCookies = res.config.jar.toJSON().cookies;
            //     const msToken = responseCookies.filter((c)=> {
            //         return c.key === 'msToken';
            //     }).map(function(obj) {
            //         return obj.value;
            //     });

            //     const cookieData = {
            //         "msToken": msToken[0]
            //     }

            //     // update the msToken for next requests
            //     await Cookie.update( cookieData, {
            //         where: {
            //             id: 1,
            //         }
            //     })
            // }

            let secUid = ''
            let videoCount = 0

            // if( res.data != '' && 'userInfo' in res.data) {
            //     secUid = res.data.userInfo.user.secUid
            //     videoCount = res.data.userInfo.stats.videoCount

            //     baseParamsProfile.secUid = secUid
            //     baseParamsProfile.count = options.count
            //     baseParamsProfile.cursor = options.cursor

            //     const qsObject2 = new URLSearchParams(baseParamsProfile)
            //     const qs2 = qsObject2.toString()
            //     const url2 = videoURL + `?${qs2}`

            //     const scrapeOptions = {
            //         type: 'account',
            //         offset: options.offset,
            //         videoCount: videoCount
            //     }
            //     const response = await scrape(url2, scrapeOptions)

            //     resovle(response)

            // } else {
            //     resovle('')
            // }
        } catch (error) {
            console.log(error)
        }
    })

}

function objToString (obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${p}=${val}`;
    }, '');
}


module.exports = {
    getTikTokByHashtag,
    getTikTokByAccount
}