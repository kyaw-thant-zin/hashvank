// PRIVATE API
import { privateApi } from "../../api/Api";  


// fectch cmapigns
const index = async () => {
    const response = await privateApi().get('/link-types')
    return response.data
}

const linkTypeService = {
    index,
}

export default linkTypeService