// PRIVATE API
import { privateApi } from "../../api/Api";  


// fectch cmapigns
const index = async () => {
    const response = await privateApi().get('/collection-types')
    return response.data
}

const collectionTypeService = {
    index,
}

export default collectionTypeService