const activityService = require('../services/activityService')
const ACTIVITY_URL = '/api/activity'

function addActivityRoutes(app) {
    // Users REST API:

    // LIST
    app.get(ACTIVITY_URL, (req, res) => {
        const data = req.data       
        activityService.query({ data })
            .then(activities => res.json(activities))
    })

    // CREATE
    app.post(ACTIVITY_URL, (req, res) => {
        const newActivity = req.body;
        activityService.addActivity(newActivity)
            .then(activity => res.json(activity))
    })

}

module.exports = addActivityRoutes;