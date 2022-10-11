
// Scraping Tool

const axios = require('axios')

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'
const profileURL = 'https://www.tiktok.com/node/share/user/@'
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

const cookies = [
    
]

const headers = {
    'user-agent': USER_AGENT,
    'referer': 'https://www.tiktok.com/',
    'Cookie': 'tt_csrf_token=oVjx5ujE-m0pf3rkaWsi2I9ptPBVU3Wq3CkU; cookie-consent={"ga":true,"af":true,"fbp":true,"lip":true,"bing":true,"ttads":true,"reddit":true,"version":"v8"}; tiktok_webapp_theme=dark; __tea_cache_tokens_1988={"user_unique_id":"7146454663906182657","timestamp":1663913651936,"_type_":"default"}; _ttp=2F9rg7gKJtY98sLQtHXaLf37M0T; _abck=8D5A396F3103ADF2CD3722EAF31A30F3~-1~YAAQnKg7F62ynFmDAQAAhlX3fAjCHf36B7dPxJqsrVdh/p+UfXZMMADQc+M3WyQveDcDFtlnhZ3xUzRDox3KvqCHO04Rsi5BoeAKcI9+Qvial6gCFKFl88SmkbadUv9lzP6ds22XbaL2XdBWxIBazjAK5KoJVbMcdjcATHt5f6RdBqq7uHYu1jB5gOlf4WYj/g35zkk6hpuMN1Qh9SKGg/5SV5ldgdb8ysjGMvIK7IeYvW+OGaqCy4QDMgt+XsOHLw/zcaIYPW8EmqGIZT32op+S7Jf8oiQ1j+lQZWR98WCr7DC82jp80cXQ3DtgrOhnnktq4FyH+TFii9Y3ZclEAs8j4LIdxiSCBmjvAR6UWmBhCpQrJ1JxaHpj33fiIyxanow0nvTkFg==~-1~-1~-1; ak_bmsc=50AFB1B22E2CFA59451F013FB783C6DB~000000000000000000000000000000~YAAQnKg7F66ynFmDAQAAhlX3fBGiW6R2W96/sLT8HpDaCr+DeMyIvZZwC0q/AcccaRizC1k9k/zSbq7VP8qlirHFSpgCHfeV4fpFUw+XohD41exw5ERVn9jvslbsOgxzplO5blC2lpdyJyydKhD2D1sFEXmgXZRBSEQhA03h9IZtFRwBcHnQBNpwo4IVpTsV6Rcl3aCDFwQCFGeWPlaTIVb2gTUHIMiP3mcbApRuVZ15ssedZZSK2behqWeANBAbmryVsfb1+s/egROkK8W3yQ7WB09pabisscdlA4f33wb2U2cvuxizfvJbO2RwHLbZPr29mBJubIXRWBsbSlCEvM0+4YLMeomRIGVKp+jbSEX40xJyHbB+FTV2cd67v8qx2oOAQx8iyebV; bm_sz=C94F6C2D7025285F0AE128F9D0C00ACB~YAAQnKg7F7CynFmDAQAAhlX3fBEfCe12pZ1PF6MBbdGthopmp/9PvtSUiI6flufVd7Ek9dJMjh8jW1tx6c2djlOFcFbDertdsYSwnref55WAUDyqyEYD8978lrjZhtivXk+wANC0u4BYvMyTDFIPJusJf+BSGvPKfTv0dQbO8VxtsHzZKnWySyrC3fHnwoE9ImKVBR2MWkca6X+CJPadRUAeb0ehdilNqr1BwFcSCgEwioMkCV4QKsF5dzohVLgZGPHAbhzOD3mxRjtXjR915gX/cZO5MMsukV5bT4N7sYtnQ3M=~3425846~3553073; bm_mi=0703A966F5F87AD4A44BBCF56D923FB8~YAAQnKg7F8mynFmDAQAAe2D3fBEvuyMYm+QLvepZsNB4IoUQt/kVql0HeW4W6DrjjIYIJhr0Cj+hRHVAF+Kb5e4k2ykICVoH4nlAM9dgXa7jAHZG0+pbrqAgk20V8KOxV53R0OhPsiK7lLmvK3K6p2548v/fNNieKX5dB0goPH2sPtkKo48W/hMOKiCtoNA8NTlnzmXAk59Wh2x0rbVOTiIFGBMgNz/CE7ERLArf+5v9gOwFysPlEASijXJsetX96XjtwD+/yxB7sM3QYGSPxmoUdVgbvreSZ62T+w6OqONQYjbb2es48cQ293YR~1; ttwid=1|SKruGNyl0VDzXp7EMZoTFhX1V3bsfQ4oVk2P56ZU3tw|1664249066|6a88a3427d163859bce5a6b7861dbfa496c9fdd04f5833efdb98afe355785537; bm_sv=AB306D277837678D3316833FBACA732B~YAAQnKg7F+O8nFmDAQAALHP5fBGB5KkEAoIc4tRC4KpUmJmEKGD3qUvl0j3aTw5WDw26350XITc21EWDWai7Mu/8zO2w4J/1M0HBCdH7fId8eq/2CVIbIeTC0C7ufPVZMOEwWf4nWSS5bpKYaA+kCW1mIfra+vJOL6P6Lyu2m643gnEGbgpEmLEytRubzM8DlDeixTVWo4vWjnRPwjeVJjIBlKSU+a+ATW2zlQmi8UJDu1+2oF948WXdrH3piLaJ~1; msToken=Z5hEAk6LKoFW1rGvoEfLCMAVeBW_i2uJOPSqWW4yeD83_Cv7p3q613uaQpA1rOVV-Rhj0oZwHvt8KQhqY_kQbarAUJZLC45heWXtbv0ShKxNc_UWq7VgnMuJ7cxBcaGFwRJJJrU=; msToken=Z5hEAk6LKoFW1rGvoEfLCMAVeBW_i2uJOPSqWW4yeD83_Cv7p3q613uaQpA1rOVV-Rhj0oZwHvt8KQhqY_kQbarAUJZLC45heWXtbv0ShKxNc_UWq7VgnMuJ7cxBcaGFwRJJJrU='
}

const scrape = async (url, type) => {

    return new Promise(async (resovle, reject) => {

        const response = await axios({
            method: 'get',
            headers: headers,
            url: url,
            withCredentials: true,
        });

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

            const qsObject = new URLSearchParams(baseParams)
            const qs = qsObject.toString()
            const url = profileURL + tiktokAcc + `?aid=1988`

            const res = await axios({
                method: 'get',
                headers: headers,
                url: url,
                withCredentials: true,
            });

            console.log(res.data)

            // let secUid = ''
            // if('userInfo' in res.data) {
            //     secUid = res.data.userInfo.user.secUid
            // } else {
            //     reject('error')
            // }

            // baseParams.secUid = secUid
            // const qsObject2 = new URLSearchParams(baseParams)
            // const qs2 = qsObject2.toString()
            // const url2 = videoURL + `?${qs2}`

            // const response = await scrape(url2, 'account')
            // resovle(response)

        } catch (error) {
            console.log(error)
        }
    })

}


module.exports = {
    getTikTokByHashtag,
    getTikTokByAccount
}