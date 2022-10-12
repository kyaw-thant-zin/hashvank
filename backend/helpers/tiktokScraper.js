
// Scraping Tool

const axios = require('axios')

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'
// const profileURL = 'https://www.tiktok.com/node/share/user/@'
const profileURL = 'https://www.tiktok.com/api/user/detail/'
const tagURL = 'https://www.tiktok.com/node/share/tag/'
const challengeURL = 'https://m.tiktok.com/api/challenge/item_list/'
const searchURL = 'https://www.tiktok.com/api/search/general/full/'
const videoURL = 'https://www.tiktok.com/api/post/item_list/'

const baseParams = {
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
    "offset": 0,
    "cursor": 12,
    "count": 12,
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
    "device_id": "7153125753357747714",
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
    "msToken": "1BryaEhw6wUzEjGIqicKSX8SwmQmibTCUCd4abZTwaHNaOVKSWBlAlsU1rKeNOFKnwdcOeU0XuQULYJKEhYj7Nt7t64xDHqid5hZShL3R0ziTBWl6NCa6mBB0GjN1u4Vvc-BS8s=",
}

const cookies = {
    "ttwid": "1|SKruGNyl0VDzXp7EMZoTFhX1V3bsfQ4oVk2P56ZU3tw|1664249066|6a88a3427d163859bce5a6b7861dbfa496c9fdd04f5833efdb98afe355785537; ",
    "msToken": "1BryaEhw6wUzEjGIqicKSX8SwmQmibTCUCd4abZTwaHNaOVKSWBlAlsU1rKeNOFKnwdcOeU0XuQULYJKEhYj7Nt7t64xDHqid5hZShL3R0ziTBWl6NCa6mBB0GjN1u4Vvc-BS8s="
}


const headers = {
    'user-agent': USER_AGENT,
    'referer': 'https://www.tiktok.com/',
    'Cookie': objToString(cookies)
}

const scrape = async (url, type) => {

    return new Promise(async (resovle, reject) => {

        const response = await axios({
            method: 'get',
            headers: headers,
            url: url,
            withCredentials: true,
        });

        console.log(response.data)

        if (type === 'hashtag') {
            if('data' in response.data) {
                resovle(getResponse(response.data.data, 'hashtag'))
            } else {
                reject('error')
            }
        } else if (type === 'account') {
            if('itemList' in response.data) {
                resovle(getResponse(response.data.itemList, 'account'))
            } else {
                reject('error')
            }
        }
    })
}

const getResponse = async (data, type) => {

    const resposne = {
        stats: 200,
        collector: []
    }

    if(type === 'hashtag') {
        resposne.collector = data.map((d) => {

            const tiktok = d.item
            console.log(tiktok)
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
    } else if(type === 'account') {
        resposne.collector = data.map((tiktok) => {

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

            baseParams.keyword = tiktok_hashtag

            const qsObject = new URLSearchParams(baseParams)
            const qs = qsObject.toString()
            const url = searchURL + `?${qs}`

            const resposne = await scrape(url, 'hashtag')
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
            if (options.number) {
                options.count = options.number
            }

            profileParams.uniqueId = account

            const qsObject = new URLSearchParams(profileParams)
            const qs = qsObject.toString()
            const url = profileURL + `?` + qs


            const res = await axios({
                method: 'get',
                headers: headers,
                url: url,
                withCredentials: true,
            });

            let secUid = ''
            if('userInfo' in res.data) {
                secUid = res.data.userInfo.user.secUid
            } else {
                reject('error')
            }

            baseParams.secUid = secUid
            const qsObject2 = new URLSearchParams(baseParams)
            const qs2 = qsObject2.toString()
            const url2 = videoURL + `?${qs2}`

            const response = await scrape(url2, 'account')
            resovle(response)

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