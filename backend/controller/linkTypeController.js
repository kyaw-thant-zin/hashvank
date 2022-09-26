
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')

// Create main Model
const LinkType = db.linkTypes

// @desc GET collectionTypes
// @route GET /collectionTypes/
// @access Private
const index = asyncHnadler( async (req, res) => {
    let linkTypes = await LinkType.findAll({attributes: ['id', 'type']})
    res.send(linkTypes)
})

// @desc GET collectionTypes
// @route GET /collectionTypes/:id
// @access Private
const show = asyncHnadler( async (req, res) => {
    let linkType = await LinkType.findOne({ where: { id: req.params.id } })
    res.send(linkType)
})

module.exports = {
    index,
    show
}