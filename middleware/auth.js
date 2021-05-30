require('dotenv').config()
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    // check for token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // add user from payload 
        req.user = decoded
        next( )
    } catch {
        res.status(400).json({ msg: 'Token is not valid' })
    }
    
    
}

module.exports = auth 