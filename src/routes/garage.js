const express = require('express')
const router = express.Router()
const { getGarageDetails } = require('../controllers/garageController')

router.get('/:id', getGarageDetails)

module.exports = router
