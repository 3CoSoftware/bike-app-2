const express = require('express')
const Rider = require('../models/rider')
const TrainingPlan = require('../models/trainingPlan')
const router = express.Router()

// Get all riders
router.get('/', async (req, res) => {
    try {
        const riders = await Rider.find()
            .populate('trainingPlans')
        res.json(riders)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})

// Get one rider by username 
router.get('/:username', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })
            .populate('trainingPlans')

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        res.json(rider)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Create rider
router.post('/', async (req, res) => {
    const rider = new Rider({
        username: req.body.username,
        units: req.body.units,
        lang: req.body.lang,
    })
    try {
        const newRider = await rider.save()
        res.status(201).json(newRider)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Update one rider by username 
router.patch('/:username', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider === null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

        if (req.body.units) {
            rider.units = req.body.units
        }
        if (req.body.lang) {
            rider.lang = req.body.lang
        }

        await rider.save()
        res.json(rider)


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// Delete a rider by ID 
router.delete('/:id', async (req, res) => {
    try {
        await Rider.deleteOne({ _id: req.params.id })
        res.json({ message: 'Deleted rider'})
    } catch (err) {
        return res.status(400).json({message: err.message })
    }
})

// Getting a riders ride notes 
router.get('/:username/ridenotes', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        res.json(rider.rideNotes)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Add a ride note for a rider by username 
router.patch('/:username/ridenotes', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

        await rider.rideNotes.push(req.body)
        await rider.save()
        res.json(rider.rideNotes[rider.rideNotes.length - 1])
        

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Find a specific rideNote by ride name and riders username 
router.get('/:username/ridenotes/:ridename', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
        
        const rideNote = await rider.rideNotes.filter((rideNote) => rideNote.rideName === req.params.ridename )
        res.send(rideNote)


    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Edit a rideNote by rider username and rideNote ID
router.patch('/:username/ridenotes/:id', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        } 
        
        const rideNote = await rider.rideNotes.id(req.params.id)

        if (rideNote == null) {
            return res.status(404).json({ message: 'Cannot find ride note' })
        } 
        
        if (req.body.notes) {
            rideNote.notes = req.body.notes
        }
        if (req.body.weather) {
            rideNote.weather = req.body.weather
        }
        if (req.body.weight) {
            rideNote.weight = req.body.weight
        }
        if (req.body.restingBP) {
            rideNote.restingBP = req.body.restingBP
        }

        await rider.save()
        res.send(rider)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.delete('/:username/ridenotes/:id', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        await rider.rideNotes.id(req.params.id).remove()
        await rider.save()
        res.send(rider.rideNotes)

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})


// Add a training plan for a rider 
router.post('/:username/trainingplans', async (req, res) => {
    const trainingPlan = new TrainingPlan(req.body)

    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        } 

        await trainingPlan.save()
        await rider.trainingPlans.push(trainingPlan)
        await rider.save()

        res.send(trainingPlan)


    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})


// get only a users prefernces (units and lang)
router.get('/:username/prefs', async (req, res) => {
    try {
        const rider = await Rider.findOne({ username: req.params.username })

        if (rider == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

        res.json({ units: rider.units, lang: rider.lang })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router 