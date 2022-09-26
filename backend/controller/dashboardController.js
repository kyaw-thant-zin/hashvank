
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')

// Create main Model
const User = db.users
const Campaign = db.campaigns

// @desc GET dashboard
// @route GET /dashboard/
// @access Private
const index = asyncHnadler( async (req, res) => {

    const { userId } = req.body

    if(!userId) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    const users = await User.findOne({
        where: {
            id: userId
        },
        include:[Campaign],
        order: [
            ['campaigns', 'id', 'DESC']
        ]
    })
    
    res.send(users)
})

// @desc GET dashboard
// @route GET /dashboard/:id
// @access Private
const show = asyncHnadler( async (req, res) => {
    console.log(req.params);
    let users = await User.findOne({ where: { id: req.params.id } })
    res.send(users)
})

module.exports = {
    index,
    show
}