const mongoose = require('mongoose')

const rideNoteSchema = new mongoose.Schema({
    rideName: {
        type: String,
        required: true
    },
    notes: String,
    weather: String,
    weight: String,
    restingBP: String,
    heartrate: String,
    sleep: String,
    dietYesterday: String,
    enthusiasm: String,
    rideType: String, 
    descriptiveName: String 
})


const riderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    }, 
    units: {
        type: String, 
        required: true,
        enum: ['imperial', 'metric']
    },
    lang: {
        type: String, 
        default: 'en'
    },
    rideNotes: [rideNoteSchema],
    trainingPlans: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "TrainingPlan"
    }],
    hr_zones: {
        zn1_min: String,
        zn1_max: String, 
        zn2_min: String,
        zn2_max: String,
        zn3_min: String,
        zn3_max: String,
        zn4_min: String,
        zn4_max: String,
    }

})

module.exports = mongoose.model('Rider', riderSchema)