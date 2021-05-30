const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    date: String,
    distance: String,
    rideType: {
        type: String,
        enum: ['Brisk', 'Pace', 'Easy', 'Off']
    },   
    status: {
        type: String, 
        enum: ['Missed', 'Underachieved', 'Achieved', 'In Progress'],
        default: 'In Progress'
    }
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