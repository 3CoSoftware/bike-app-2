const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    day: String,
    distance: String,
    type: String,
    avgSpeed: String,   
    status: String
})

const trainingPlanSchema = new mongoose.Schema({
    planName: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    goals: [goalSchema]

})

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema)