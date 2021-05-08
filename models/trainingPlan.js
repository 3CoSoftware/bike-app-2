const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    date: String,
    distance: String,
    rideType: String,   
    status: String
})

const trainingPlanSchema = new mongoose.Schema({
    planName: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    rides: [rideSchema]

})

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema)