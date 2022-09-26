const jwt = require('jsonwebtoken')
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')
const { request } = require('express')

// Create user Model
const User = db.users

const protect = asyncHnadler( async (req, res, next) => {

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {


        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if(err) {
                    res.status(400).send({ error: { tokenExpierd: 'The token has been expired.' } })
                }

                if(decoded) {
                    const user = await User.findOne({
                        where: {
                            uuid: decoded.uuid
                        }
                    })
    
                    req.body.userId = user.id
    
                    if(req.params?.id) {
                        req.body.id = req.params.id
                    }
    
    
                    // call next request
                    next()
                }
            })

        } catch (error) {
            return res.status(403)
        }
    } else {
        res.status(401).send({error: 'Not auth'})
    }

    

})

module.exports = { protect }