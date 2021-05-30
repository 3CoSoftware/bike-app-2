const express = require('express')
const Rider = require('../models/rider')
const router = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { get } = require('./riders')

router.post('/', (req, res) => {
    const { username, password } = req.body 

    if(!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    Rider.findOne({ username })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'Rider does not exist'})

        // validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'})

            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                (err, token) => {
                    if(err) throw err 

                    res.json({
                        token,
                        rider: {
                            username: user.username,
                            units: user.units,
                            lang: user.lang
                        }
                    })
                }
            )
        })

    })
})

router.get('/user', auth, (req, res) => {
    Rider.findById(req.user.id)
    .select('-password')
    .then(rider => res.json(rider))
})

module.exports = router 