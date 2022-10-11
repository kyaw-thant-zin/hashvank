// PRIVATE API
import { privateApi } from "../../api/Api";  

// fectch cmapigns
const index = async () => {
    const response = await privateApi().get('/campaign-outputs')
    return response.data
}

// update campaign visibility
const updateVisibility = async (camapignData) => {
    const response = await privateApi().put('/campaign-outputs/visibility/update/'+camapignData.id, camapignData.data)
    return response.data
}

// update campaign visibility
const updateLinkUrl = async (camapignData) => {
    const response = await privateApi().put('/campaign-outputs/link-url/update/'+camapignData.id, camapignData.data)
    return response.data
}

// update campaign priority
const updatePriority = async (camapignData) => {
    const response = await privateApi().put('/campaign-outputs/priority/update/'+camapignData.id, camapignData.data)
    return response.data
}

const campaignOutputService = {
    index,
    updateVisibility,
    updateLinkUrl,
    updatePriority
}

export default campaignOutputService