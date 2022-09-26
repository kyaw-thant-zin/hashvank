// index.js

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const Signer = require('tiktok-signature')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentialsMiddleware');
const dotenv = require('dotenv').config({
    path: __dirname + '/.env'
})
const {
    errorHandler
} = require('./middleware/errorMiddleware')
const path = require('path')

// import cron
const {
    updateTiktoksBySchedule
} = require('./helpers/campaignHelpers')

// CONFIG
const app = express()
const port = process.env.PORT || 8000

// MIDDLEWAR
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(errorHandler)
//middleware for cookies
app.use(cookieParser());

const baseParams = {
    // 'uniqueId': 'mei._.asami',
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
    "keyword": "tgc",
    "offset": 0,
    "os": "mac",
    "priority_region": "",
    "referer": "",
    "region": "MM",
    "screen_height": "1080",
    "screen_width": "1920",
    "tz_name": "Asia/Rangoon",
    "webcast_language": "en",
    // "id": "7087859590616204289",
    // "secUid": 'MS4wLjABAAAAtSZY7tuo791IhHAL8nh97znPt1rBo81SMcWby7EhQIC4cj8c_pmhfGJTaq_OXhR3',
    // "verifyFp": "verify_5b161567bda98b6a50c0414d99909d4b",
    // "msToken": "F2wJ7Eq5Gq6P9dSvH_CFV9mPJQj_JnMUvBlWccItN67Io_Rjqkq_MCt2mYysTgf2GNFY1iRawaSmcj93cOatYmLoKNjEBXLJYumdbn24uKzO2e0Pw9PLgcvKs6lmxpALwd1C1d0=",
    // "X-Bogus": "DFSzswVOWdTANGA/SsTMyFm4pIdT",
    // "_signature": "_02B4Z6wo00001UOx82wAAIDB29pkHypMX6lDsffAADPG8c"
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

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'
const profileURL = 'https://www.tiktok.com/node/share/user/@mei._.asami'
const videoURL = 'https://www.tiktok.com/api/post/item_list/'
const TT_REQ_PERM_URL =
  "https://www.tiktok.com/api/post/item_list/";
  const searchURL = 'https://www.tiktok.com/api/search/general/full/'

const PARAMS = {
  aid: "1988",
  count: 30,
  secUid: "MS4wLjABAAAAtSZY7tuo791IhHAL8nh97znPt1rBo81SMcWby7EhQIC4cj8c_pmhfGJTaq_OXhR3",
  cursor: 0,
  cookie_enabled: true,
  screen_width: 0,
  screen_height: 0,
  browser_language: "",
  browser_platform: "",
  browser_name: "",
  browser_version: "",
  browser_online: "",
  "tz_name": "Asia/Rangoon",
};



app.get('/', async (req, res) => {

    const signer = new Signer(null, USER_AGENT)

    await signer.init()

    const qsObject = new URLSearchParams(baseParams)
    const qs = qsObject.toString()
    const url = searchURL + `?${qs}`

    const signature = await signer.sign(url)
    await signer.close()

    console.log(signature)

    console.log('home')
    res.send('test')
})


// AUTH ROUTES
app.use('/api/users', require('./routes/authRoutes')) // auth

// APP ROUTES
app.use('/api/dashboard/', require('./routes/dashboardRoutes')) // dashboard
app.use('/api/campaigns/', require('./routes/campaignRoutes')) // campaign
app.use('/api/campaign-outputs/', require('./routes/campaignOutputRoutes')) // campaign output
app.use('/api/link-settings/', require('./routes/linkSettingRoutes')) // link setting
app.use('/api/input-codes/', require('./routes/inputCodeRoutes')) // inputCode

app.use('/api/collection-types/', require('./routes/collectionTypeRoutes')) // collectionType
app.use('/api/link-types/', require('./routes/linkTypeRoutes')) // linkType

// API Routes
app.use('/tiktok/api/js', require('./routes/apiRoutes'))

// serve the static
// const root = require('path').join(__dirname, '../frontend', 'build')
// app.use(express.static(root))
// app.get('*', (req, res) => {
//     res.sendFile('index.html', { root })
// })


// SERVER
const server = app.listen(port, () => {
    const host = server.address().address
    const port = server.address().port

    // run cron
    updateTiktoksBySchedule()

    console.log("App listening at http://%s:%s", host, port)
})