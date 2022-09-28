// PRIVATE API
import { privateApi } from "../../api/Api";  

// fectch cmapigns
const index = async () => {
    const response = await privateApi().get('/campaigns')
    return response.data
}

// store campaign
const store = async (campaignData) => {
    const response = await privateApi().post('/campaigns/store', campaignData)
    return response.data
}

// fetch campaign
const edit = async (id) => {
    const response = await privateApi().get('/campaigns/'+id, id)
    return response.data
}

// update campaign
const update = async (camapignData) => {
    const response = await privateApi().put('/campaigns/update/'+camapignData.id, camapignData.data)
    return response.data
}

// update campaign visibility
const updateVisibility = async (camapignData) => {
    const response = await privateApi().put('/campaigns/visibility/update/'+camapignData.id, camapignData.data)
    return response.data
}

// destroy campaign
const destroy = async (campaignId) => {
    const response = await privateApi().delete('/campaigns/delete/'+campaignId)
    return response.data
}

const campaignService = {
    index,
    store,
    edit,
    update,
    destroy,
    updateVisibility
}

export default campaignService