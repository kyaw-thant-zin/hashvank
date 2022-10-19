
// Scraping Tool
const Signer = require("tiktok-signature")
const axios = require('axios')
const { wrapper } = require('axios-cookiejar-support')
const { config } = require('dotenv')
const { CookieJar } = require('tough-cookie')
const cheerio = require('cheerio')
const db = require('../models/index')

// Create main Model
const Cookie = db.cookies

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }))

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'

// ------------------ REPORT msToken ---------------------- //
const reportURL = 'https://mssdk-sg.tiktok.com/web/report'
// ------------------ REPORT msToken ---------------------- //

// ------------------ NOW USING ---------------------- //
const profileURL = 'https://www.tiktok.com/api/user/detail/' // fetch profile URL
const searchURL = 'https://www.tiktok.com/api/search/general/full/' // search with hashtag
const videoURL = 'https://www.tiktok.com/api/post/item_list/' // profile videos
// ------------------ NOW USING ---------------------- //

// ------------------ SIGNLE VIDEO ---------------------- //
const singleVideoURL = 'https://www.tiktok.com/node/share/video/' // https://www.tiktok.com/node/share/video/${videoUsername}/${videoId}
const singleVideoURL2 = 'https://www.tiktok.com/' // https://www.tiktok.com/${videoUsername}/video/${videoId}
// ------------------ SIGNLE VIDEO ---------------------- //

// const profileURL = 'https://www.tiktok.com/node/share/user/@' // fetch profile old URL
const searchProfileURL = 'https://www.tiktok.com/api/search/user/full/' // search profiles
const tagURL = 'https://www.tiktok.com/node/share/tag/' // search with tag
const challengeURL = 'https://m.tiktok.com/api/challenge/item_list/' // get hashtag videos

// hashtag params
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

// Account params
const baseParamsAccount = {
    fakeParams : {
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
        "region": "JP",
        "screen_height": "1080",
        "screen_width": "1920",
        "tz_name": "Asia/Tokyo",
        "webcast_language": "en",
        "secUid": '',
        // "X-Bogus": 'DFSzsIVOPw0ANx/nSMouTgXCIsrW',
        // "_signature": '_02B4Z6wo00001T3wAPwAAIDDXnrAf.7nK4098QRAACw008',
        "msToken": ""
    },
    profileParams : {
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
        "region": "JP",
        "screen_height": "1080",
        "screen_width": "1920",
        "tz_name": "Asia/Tokyo",
        "webcast_language": "en",
    },
    listParams : {
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
}

// Cookies
const cookies = {
    "ttwid": "1%7CgGyKcS6dRMVu4XUfcXkjr3VAQip-BTv8U-wXGr0uDJI%7C1665723957%7C85238a14e13bbde6d8efc37e6f338a4bfac4a3e66ace1fbf043c05db68db1e77; ",
}

// Headers
const headers = {
    'User-Agent': USER_AGENT,
    'Referer': 'https://www.tiktok.com/',
    'Cookie': objToString(cookies),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
}


const refreshMsToken = async () => {
    return new Promise(async (resovle, reject) => {

        try {

            console.log('run refresh msToken.....!')
            
            // get msToken from cookies table
            const cookie = await Cookie.findOne({ 
                where: {
                    id: 1
                }
            })

            const params = {
                'msToken': cookie.msToken
            }

            const qsObject = new URLSearchParams(params)
            const qs = qsObject.toString()
            let url = reportURL + `?` + qs

            const signer = new Signer()
            await signer.init()
            const signature = await signer.sign(url)
            await signer.close();

            params['X-bogus'] = signature['x-bogus']
            const qsObjectNew = new URLSearchParams(params)
            const qsNew = qsObjectNew.toString()
            url = reportURL + `?` + qsNew

            const response = await client({
                method: 'post',
                headers: headers,
                url: url,
                withCredentials: true,
            });

            // Store the msToken
            if(response.config?.jar?.toJSON()) {
                const responseCookies = response.config.jar.toJSON().cookies;
                const msToken = responseCookies.filter((c)=> {
                    return c.key === 'msToken';
                }).map(function(obj) {
                    return obj.value;
                });

                if(msToken.length > 0) {
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

                resovle(true)
            }

        } catch (error) {
            reject(error)
        }

    })
}

// ------------------ BEAUTIFY DATA ---------------------- //
const getResponse = async (data, options) => {

    const resposne = {
        stats: 200,
        collector: []
    }

    if(options.type === 'hashtag') {

        resposne.cursor = data.cursor
        resposne.offset = Number(options.offset) + 1;
        resposne.videoCount = 0
        resposne.hasMore = data.has_more


        const dataList = data.data

        resposne.collector = dataList.map((d) => {

            const tiktok = d.item
            if(tiktok != undefined) {
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
            }
    
        })

    } else if(options.type === 'account') {

        resposne.cursor = data.cursor
        resposne.offset = Number(options.offset) + 1;
        resposne.videoCount = options.videoCount
        resposne.hasMore = data.has_more

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
// ------------------ BEAUTIFY DATA ---------------------- //

// ------------------ SCRAPE VIDEOS ---------------------- //
const scrape = async (url, options) => {

    return new Promise(async (resovle, reject) => {

        try {
            const response = await client({
                method: 'get',
                headers: headers,
                url: url,
                withCredentials: true,
            });

            // Store the msToken
            // if(response.config?.jar?.toJSON()) {
            //     const responseCookies = response.config.jar.toJSON().cookies;
            //     const msToken = responseCookies.filter((c)=> {
            //         return c.key === 'msToken';
            //     }).map(function(obj) {
            //         return obj.value;
            //     });

            //     if(msToken.length > 0) {
            //         const cookieData = {
            //             "msToken": msToken[0]
            //         }
    
            //         // update the msToken for next requests
            //         await Cookie.update( cookieData, {
            //             where: {
            //                 id: 1,
            //             }
            //         })
            //     }
            // }
    
            if (options.type === 'hashtag') {
                if(response.data != '') {
                    if('data' in response.data) {
                        resovle(getResponse(response.data, options))
                    } else {
                        resovle({
                            'error': "hashtagNotFound"
                        })
                    }
                } else {
                    resovle({
                        'error': "hashtagNotFound"
                    })
                }
            } else if (options.type === 'account') {
                if(response.data != '') {
                    if('itemList' in response.data) {
                        resovle(getResponse(response.data, options))
                    } else {
                        resovle({
                            'error': "userNotFound"
                        })
                    }
                } else {
                    resovle({
                        'error': "userNotFound"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
// ------------------ SCRAPE VIDEOS ---------------------- //

// ------------------ PREPARE HASHTAG UTL ---------------------- //
const getSingleVideo = async (account, videoId) => {
    return new Promise(async (resovle, reject) => {

        // ----------- Request ---------- //

        const tiktok_account = account.replace('@', '')
        const params = {
            "enter_form": "video_detail",
            "is_from_webapp": "v1",
            "item_id": videoId
        }

        const qsObject = new URLSearchParams(params)
        const qs = qsObject.toString()
        const url = singleVideoURL2 + `@${tiktok_account}/video/${videoId}/` + `?` + qs
        const resVideoMeta = await axios({
            method: 'GET',
            headers: headers,
            url: url,
        })

        const $ = cheerio.load(resVideoMeta.data)
        const script = $('#SIGI_STATE').html()
        console.log('Response.....')
        console.log(script)

    })
}
// ------------------ PREPARE HASHTAG UTL ---------------------- //

// ------------------ PREPARE HASHTAG UTL ---------------------- //
const getTikTokByHashtag = async (hashtag, options) => {

    console.log('fetching by hashtag.......')
    return new Promise(async (resovle, reject) => {
        try {
            const tiktok_hashtag = hashtag.replace('#', '')

            // Hashtag not using count and cursor, used with the offset only
            if (options?.offset) {
                baseParamsHashTag.offset = options.offset * options.count
            }

            const cookie = await Cookie.findOne({ 
                where: {
                    id: 1
                }
            })

            // // change the default value to fetch value
            baseParamsHashTag.keyword = tiktok_hashtag

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
// ------------------ PREPARE HASHTAG UTL ---------------------- //

// ------------------ FETCH USER secUid AND PREPARE ACCOUNT URL ---------------------- //
const getTikTokByAccount = async (account, options) => {

    console.log('fetching by account.......')
    return new Promise(async (resovle, reject) => {
        try {

            const tiktokAcc = account.replace('@', '')

            // Account used with count and cursor, not using with offset
            if (options.count) {
                // set post count
                baseParamsAccount.listParams.count = options.count
            }

            if(options.cursor) {
                // set pagination cursor
                baseParamsAccount.listParams.cursor = options.cursor
            }

            // get msToken from cookies table
            const cookie = await Cookie.findOne({ 
                where: {
                    id: 1
                }
            })

            // ----------- Request Fake ---------- //
            // change the default value to fetch value
            baseParamsAccount.fakeParams.uniqueId = tiktokAcc 

            const qsObjectFake = new URLSearchParams(baseParamsAccount.fakeParams)
            const qsFake = qsObjectFake.toString()
            const urlFake = profileURL + `?` + qsFake

            const signer = new Signer()
            await signer.init()
            const signature = await signer.sign(urlFake)
            await signer.close();

            baseParamsAccount.fakeParams.msToken = cookie.msToken
            baseParamsAccount.fakeParams['X-bogus'] = signature['x-bogus']
            baseParamsAccount.fakeParams['_signature'] = signature['signature']

            const qsObjectFake2 = new URLSearchParams(baseParamsAccount.fakeParams)
            const qsFake2 = qsObjectFake2.toString()
            const urlFake2 = profileURL + `?` + qsFake2


            const resFake = await client({
                method: 'get',
                headers: headers,
                url: urlFake2,
                withCredentials: true,
            })

            // check request is not success or not
            if(resFake.data.statusCode < 0) {
                resovle({
                    'error': "userNotFound"
                })
            }

            // ----------- Request Fake ---------- //

            // ----------- Request Profile ---------- //
            baseParamsAccount.profileParams.uniqueId = tiktokAcc 

            const qsObjectProfile = new URLSearchParams(baseParamsAccount.profileParams)
            const qsProfile = qsObjectProfile.toString()
            const urlProfile = profileURL + `?` + qsProfile

            const resProfile = await client({
                method: 'get',
                headers: headers,
                url: urlProfile,
                withCredentials: true,
            });

            // ----------- Request Profile ---------- //

            if(resProfile.data != '' && 'userInfo' in resProfile.data && resProfile?.data?.userInfo?.user ) {
    
                let secUid = ''
                let videoCount = 0
    
                if( resProfile.data != '' && 'userInfo' in resProfile.data) {
                    secUid = resProfile.data.userInfo.user.secUid
                    videoCount = resProfile.data.userInfo.stats.videoCount
    
                    baseParamsAccount.listParams.secUid = secUid
                    baseParamsAccount.listParams.count = options.count
                    baseParamsAccount.listParams.cursor = options.cursor
    
                    const qsObjectList = new URLSearchParams(baseParamsAccount.listParams)
                    const qsList = qsObjectList.toString()
                    const urlList = videoURL + `?${qsList}`
    
                    const scrapeOptions = {
                        type: 'account',
                        offset: options.offset,
                        videoCount: videoCount
                    }
                    const response = await scrape(urlList, scrapeOptions)
                    resovle(response)
    
                } else {
                    resovle({
                        'error': "userNotFound"
                    })
                }
            } else {
                resovle({
                    'error': "userNotFound"
                })
            }

        } catch (error) {
            console.log(error)
        }
    })

}
// ------------------ FETCH USER secUid AND PREPARE ACCOUNT URL ---------------------- //

// object to string
function objToString (obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${p}=${val}`;
    }, '');
}


module.exports = {
    getTikTokByHashtag,
    getTikTokByAccount,
    getSingleVideo
}