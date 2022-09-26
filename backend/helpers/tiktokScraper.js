
// Scraping Tool
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const Signer = require('tiktok-signature')

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'
const profileURL = 'https://www.tiktok.com/node/share/user/@'
const tagURL = 'https://www.tiktok.com/node/share/tag/'
const challengeURL = 'https://m.tiktok.com/api/challenge/item_list/'
const searchURL = 'https://www.tiktok.com/api/search/general/full/'
const videoURL = 'https://m.tiktok.com/api/post/item_list/'

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
    {
        name: 'ttwid',
        value: '1%7CTxqKHWGWxmjlbskL3HmeMnKYoFnkcJ9VWQeaMNxwheM%7C1663840618%7C8fa025720276cda9bc95fa7a92d78ce791797e4118dbfce6c013c6f0a8759404',
        domain: 'www.tiktok.com/',
        path: '/',
        httpOnly: false,
    },
    {
        name: 'sid_tt',
        value: '644ca91899ca233d1b0db189134a40ab',
        domain: 'www.tiktok.com/',
        path: '/',
        httpOnly: false,
    },
    {
        name: 'tt_csrf_token',
        value: 'oVjx5ujE-m0pf3rkaWsi2I9ptPBVU3Wq3CkU',
        domain: 'www.tiktok.com/',
        path: '/',
        httpOnly: false,
    },
]

const options = {
    count: 30
}

const signer = new Signer(null, USER_AGENT)

const getProfileInfo = async (url) => {


}

const getTikToks = async (obj, type) => {

    return new Promise(async (resovle, reject) => {
        let qsObject = ''
        let url = ''

        if (type === 'hashtag') {

            // set params
            challengeParams.challengeID = obj.id
            challengeParams.verifyFp = obj.verifyFp
            challengeParams.count = options.count

            qsObject = new URLSearchParams(challengeParams)
            const qs = qsObject.toString()
            url = challengeURL + `?${qs}`

        } else if (type === 'account') {
            qsObject = new URLSearchParams(profileParams)
        }

        const signature = await signer.sign(url)
        const response = await scrape(signature.signed_url, 'challenge')
        // if(type === 'hashtag') {
        //     resovle(getResponse(response))
        // }
    })

}

const scrape = async (url, type) => {

    return new Promise(async (resovle, reject) => {

        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()

        // clear cookies
        const client = await page.target().createCDPSession()
        await client.send('Network.clearBrowserCookies')

        // set cookies
        await page.setCookie(...cookies)

        await page.setViewport({
            width: 1920,
            height: 1080
        })

        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
            'referer': 'https://www.tiktok.com/',
        })

        await page.goto(url)

        let content = await (await page.$('body>pre')).evaluate(node => node.innerText)
        let jsonContent = JSON.parse(content)

        console.log(jsonContent.data)

        // close everything
        await page.close()
        await browser.close()
        if (type === 'hashtag') {
            resovle(getResponse(jsonContent.data))
        } else if (type === 'challenge') {
            resovle(jsonContent.itemList)
        }
    })
}

const getResponse = async (data) => {

    const resposne = {
        stats: 200,
        collector: []
    }

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

    return resposne

}

const getTikTokByHashtag = async (hashtag, options) => {

    return new Promise(async (resovle, reject) => {
        try {

            console.log(hashtag)

            const tiktok_hashtag = hashtag.replace('#', '')
            if (options.number) {
                options.count = options.number
            }

            await signer.init()

            // insert keyword
            baseParams.keyword = tiktok_hashtag

            const qsObject = new URLSearchParams(baseParams)
            const qs = qsObject.toString()
            const url = searchURL + `?${qs}`

            const signature = await signer.sign(url)
            await signer.close()

            console.log(signature)

            const tiktoks = await scrape(signature.signed_url, 'hashtag')
            console.log(tiktoks)
            resovle(tiktoks)

        } catch (error) {
            console.log(error)
        }
    })

}


module.exports = {
    getTikTokByHashtag
}