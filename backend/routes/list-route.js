const reviewService = require('../services/reviewService')


function addReviewRoutes(app) {
    // reviews REST API:

    // LIST
    app.get('/api/review', (req, res) => {
        reviewService.query(req.data)
            .then(reviews => res.json(reviews))
            
    })

    // SINGLE - GET Full details including reviews
    app.get('/api/review/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        reviewService.getReviewById(reviewId)
            .then(review => res.json(review))
    })

    // DELETE
    app.delete('/api/review/:reviewId', (req, res) => {
        const reviewId = req.params.reviewId;
        reviewService.removeToy(reviewId)
            .then(() => res.end(`The Review ${reviewId} Was Deleted `))
    })

    // CREATE
    app.post('/api/review', (req, res) => {
        const review = req.body;
        reviewService.addToy(review)
            .then(review => res.json(review))
    })

    // UPDATE
    app.put('/api/review/:reviewId', (req, res) => {
        const review = req.body;
        reviewService.update(review)
            .then(review => res.json(review))
    })

}


module.exports = addReviewRoutes;