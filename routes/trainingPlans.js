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


// add a goal for a training plan 
router.patch('/:id/goals', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findOne({ _id: req.params.id})


        await trainingPlan.goals.push(req.body)
        await trainingPlan.save()
        res.send(trainingPlan)
        
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
})

// edit a goal by training plan id and goal id 
router.patch('/:id/goals/:goalid', async (req, res) => {
    try {
        const trainingPlan = await TrainingPlan.findById(req.params.id)

        const goal = await trainingPlan.goals.id(req.params.goalid)

        if (req.body.description) {
            goal.description = req.body.description
        }
        if (req.body.completed) {
            goal.completed = req.body.completed
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