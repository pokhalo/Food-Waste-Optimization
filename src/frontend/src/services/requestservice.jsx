import axios from 'axios'

const dataApi = 'http://127.0.0.1:5000/api/data'

const getDataFromFlask = async () => {
    console.log('GET - request to flask')
    console.log(dataApi)
    const result = await axios.get(dataApi)
    console.log(result)
    return result
}

export default {
    getDataFromFlask
}
