import axios from 'axios'

const baseUrl = 'http://127.0.0.1:5000/react'

const getRequestToFlask = async () => {
    console.log('GET - request to flask')
    console.log(baseUrl)
    const result = await axios.get(baseUrl)
    console.log(result)
    return result
}

export default {
    getRequestToFlask
}
