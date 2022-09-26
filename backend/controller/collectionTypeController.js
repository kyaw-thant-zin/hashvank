
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')

// Create main Model
const CollectionType = db.collectionTypes

// @desc GET collectionTypes
// @route GET /collectionTypes/
// @access Private
const index = asyncHnadler( async (req, res) => {
    let collectionTypes = await CollectionType.findAll({attributes: ['id', 'type']})
    res.send(collectionTypes)
})

// @desc GET collectionTypes
// @route GET /collectionTypes/:id
// @access Private
const show = asyncHnadler( async (req, res) => {
    let collectionType = await CollectionType.findOne({ where: { id: req.params.id } })
    res.send(collectionType)
})

module.exports = {
    index,
    show
}