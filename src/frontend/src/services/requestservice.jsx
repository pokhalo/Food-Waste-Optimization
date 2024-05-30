import axios from 'axios'

const baseUrl = 'http://127.0.0.1:5000/react'
const dataApi = 'http://127.0.0.1:5000/api/data'

const getRequestToFlask = async () => {
    console.log('GET - request to flask')
    console.log(baseUrl)
    const result = await axios.get(baseUrl)
    console.log(result)
    return result
}

const getDataFromFlask = async () => {
    console.log('GET - request to flask')
    console.log(dataApi)
    const result = await axios.get(dataApi)
    console.log(result)
    return result
}

export default {
    getRequestToFlask,
    getDataFromFlask
}
