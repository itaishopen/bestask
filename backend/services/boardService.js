const mongoService = require('./mongo-service')
const TOYS_COLLECTION = 'toys';

const ObjectId = require('mongodb').ObjectId;

function query(query) {
    var sortToMongo = {}
    switch (query.sortBy) {
        case 'name':
            sortToMongo.name = +query.order;
            break;
        case 'price':
            sortToMongo.price = +query.order;
            break;
    }
    let filterToMongo = {}
    let types = {};
    let names = {};
    if (query.byType) {
        types.$or = query.byType.split(',').map(type =>  type = { type });
        filterToMongo = types
    }
    if(query.searchName) {
        names.$or = query.searchName.split(',').map(name =>  name = { name });
        filterToMongo = names
    }
    if (query.byType && query.searchName) {
        filterToMongo = {};
        filterToMongo.$and = [types, names];
    }
    if (query.byStock && query.byStock !== 'false') filterToMongo.inStock = true;
    return mongoService.connect()
        .then(db => {
            return db.collection(TOYS_COLLECTION).find({}).filter(filterToMongo).sort(sortToMongo).toArray()
        })
    //     return db.collection(toysDb).aggregate([
    //         {
    //             $match: {
    //                 $and: [
    //                     { name: filter.searchName },
    //                     { inStock: filter.byStock },
    //                     { type: filter.byType },
    //                 ]
    //             }
    //         },
    //         {
    //             $sort: { post: filter.order}
    //         }
    //     ]).toArray()
    // })
}

function addToy(toy) {
    if (toy._id) toy._id = new ObjectId(toy._id);
    return mongoService.connect()
        .then(db => db.collection(TOYS_COLLECTION).insertOne(toy).then(res => {
            return getToyById(res.insertedId).then(toy => toy)
        }))
}

function getToyById(toyId) {
    const _id = new ObjectId(toyId)
    return mongoService.connect()
        .then(db => db.collection(TOYS_COLLECTION).findOne({ _id }))
}

function removeToy(toyId) {
    const _id = new ObjectId(toyId);
    return mongoService.connect()
        .then(db => db.collection(TOYS_COLLECTION).deleteOne({ _id }))
}

function updateToy(toy) {
    toy._id = new ObjectId(toy._id);
    return mongoService.connect()
        .then(db => db.collection(TOYS_COLLECTION).updateOne({ _id: toy._id }, { $set: toy }))
}


module.exports = {
    query,
    addToy,
    getToyById,
    removeToy,
    updateToy
}