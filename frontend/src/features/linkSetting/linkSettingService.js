// PRIVATE API
import { privateApi } from "../../api/Api";  

// fectch cmapigns
const index = async () => {
    const response = await privateApi().get('/link-settings')
    return response.data
}

// fetch tiktoks of selected campaign
const getTiktoksOfCampaign = async (campaignId) => {
    const response = await privateApi().get('/link-settings/get-tiktok-campaign/'+campaignId)
    return response.data
}

// store linkSetting
const store = async (linkSettingData) => {
    const response = await privateApi().post('/link-settings/store', linkSettingData)
    return response.data
}

const linkSettingService = {
    index,
    getTiktoksOfCampaign,
    store
}

export default linkSettingService