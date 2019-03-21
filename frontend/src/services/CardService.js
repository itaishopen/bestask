// import axios from 'axios';
import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

export default {
    query,
    getById,
    removeItem,
    addItem,
    updateItem,
    getEmpty
}
var cards = [];
const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/card'
    : '//localhost:3003/card';

function query(filterQuery = '') {
    console.log(filterQuery);
    var api = `${BASE_URL}?${filterQuery}`;
    return axios.get(api)
        .then(res => res.data)
        .then(loadedCards => {
            cards = loadedCards;
            // console.log(cards);
            return cards;
        });
}

function getById(itemId) {
    // console.log(itemId);
    var api = `${BASE_URL}/${itemId}`;
    return axios.get(api)
        .then(res => {
            // console.log(res.data);
            return res.data;
        });
}

function removeItem(itemId) {
    var api = `${BASE_URL}/${itemId}`;
    return axios.delete(api)
        .then(res => res.data);
}

function addItem(item) {
    var api = `${BASE_URL}`;
    return axios.post(api, item)
        .then(res => res.data)
        .then(addedCard => {
            console.log(addedCard);
            // cards.push(addedCard);
            return addedCard;
        });
}

function updateItem(item) {
    // console.log(item._id);
    var api = `${BASE_URL}/${item._id}`;
    return axios.put(api, item)
        .then(res => res.data)
        .then(updatedCard => {
            return updatedCard;
        });
}

function getEmpty() {
    return {
        title: '',
        description: '',
        comments: [],
        activity: [],
        membres: [],
        labels: [],
        checklist: [],
        dueDate: '',
        attachments: [],
        order: 1,
        archived: false,
        emt: '',
        amt: ''
    }
}