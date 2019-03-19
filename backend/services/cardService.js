const mongoService = require('./mongo-service')
const reviewsDb = 'reviews';

const ObjectId = require('mongodb').ObjectId;

function query({ userId = null, toyId = null }) {    
    let criteria = {}
    if (userId) {
        criteria.userId = userId
    }
    if (toyId) {
        criteria.toyId = toyId
    }
    
    return mongoService.connect().then(db => {
        return db.collection(reviewsDb).find({}).filter(criteria).toArray()
            // .aggregate([
            //     {
            //         $match: criteria
            //     },
            //     {
            //         $lookup:
            //         {
            //             from: 'reviews',
            //             localField: 'toyId',
            //             foreignField: 'toyId',
            //             as: 'review'
            //         }
            //     },
            //     {
            //         $unwind: '$review'
            //     },
            //     {
            //         $lookup:
            //         {
            //             from: 'reviews',
            //             localField: 'userId',
            //             foreignField: 'userId',
            //             as: 'review'
            //         }
            //     },
            //     {
            //         $unwind: '$review'
            //     }
            // ]).toArray()
    })
}

function getUserReviews(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db =>
            db.collection(reviewsDb).aggregate([
                {
                    $match: { userId: userId }
                },
                {
                    $lookup:
                    {
                        from: 'reviews',
                        localField: 'userId',
                        foreignField: 'userId',
                        as: 'review'
                    }
                }, {
                    $unwind: '$review'
                }
            ]).toArray()
        )
}

function addReview(review) {
    review.userId = new ObjectId(review.userId)
    review.toyId = new ObjectId(review.toyId)
    return mongoService.connect()
        .then(db => db.collection(reviewsDb).insertOne(review).then(res => {
            return getReviewById(res.insertedId).then(review => review)
        }))
}

function getReviewById(reviewId) {
    const _id = new ObjectId(reviewId)
    return mongoService.connect()
        .then(db => db.collection(reviewsDb).findOne({ _id }))
}

function removeReview(reviewId) {
    const _id = new ObjectId(reviewId);
    return mongoService.connect()
        .then(db => db.collection(reviewsDb).remove({ _id }))
}

function updateReview(review) {
    review._id = new ObjectId(review._id);
    return mongoService.connect()
        .then(db => db.collection(reviewsDb).updateOne({ _id: review._id }, { $set: review }))
}


module.exports = {
    query,
    addReview,
    getReviewById,
    removeReview,
    updateReview,
    getUserReviews,
}