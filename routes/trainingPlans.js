const express = require('express')
const rider = require('../models/rider')
const TrainingPlan =require('../models/trainingPlan')
const router = express.Router()


// get all training plans
router.get('/', async (req, res) => {
    try {
        const trainingPlans = await TrainingPlan.find()
        res.json(trainingPlans)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

// get a specific training plan by id 
router.get('/:id', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.id)

        if (trainingPlan == null) {
            return res.status(404).json({ message: 'Cannot find training plan' })
        }
        
        res.send(trainingPlan)
    } catch (err) {
        return res.status(404).json({message: err.message})
    }
})


// edit name for a training plan by ID
router.patch('/:id', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.id)

        if (req.body.planName) {
            trainingPlan.planName = req.body.planName
        }

        await trainingPlan.save()
        res.send(trainingPlan)

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Delete a trainingplan by ID 
router.delete('/:id', async (req, res) => {
    try {
        await TrainingPlan.deleteOne({ _id: req.params.id })
        res.json({ message: 'Deleted plan'})
    } catch (err) {
        return res.status(400).json({message: err.message })
    }
})


// add a goal for a training plan 
router.patch('/:id/rides', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findOne({ _id: req.params.id})


        await trainingPlan.rides.push(req.body)
        await trainingPlan.save()
        res.send(trainingPlan)
        
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
})

// edit a goal by training plan id and goal id 
router.patch('/:id/rides/:rideid', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.id)

        const goal = await trainingPlan.rides.id(req.params.rideid)

        if (req.body.date) {
            goal.date = req.body.date
        }
        if (req.body.distance) {
            goal.distance = req.body.distance
        }
        if (req.body.rideType) {
            goal.rideType = req.body.rideType
        }
        if (req.body.status) {
            goal.status = req.body.status
        }

        await trainingPlan.save()
        res.send(trainingPlan)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})


// Delete a goal for a training plan 
router.delete('/:id/goals/:goalid', async (req,res) => {
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.id)


        await trainingPlan.goals.id(req.params.goalid).remove()
        await trainingPlan.save()
        res.send(trainingPlan)


    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router 