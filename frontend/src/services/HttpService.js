import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

async function get(...args) {
    const res = await axios.get(...args)
    return await res.data
}
async function post(...args) {
    const res = await axios.post(...args)
    return await res.data
}
async function put(...args) {
    const res = await axios.put(...args)
    return await res.data
}
async function remove(...args) {
    return await axios.delete(...args)
}

function getUrl(entityName) {
    return (process.env.NODE_ENV !== 'development')
    ? `/api/${entityName}`
    : `//localhost:3000/api/${entityName}`
}

export default {
    get,
    post,
    put,
    delete : remove,
    getUrl
}