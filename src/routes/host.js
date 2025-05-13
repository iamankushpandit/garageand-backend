const express = require('express')
const router = express.Router()
const { registerHost } = require('../controllers/hostController')

router.post('/', registerHost)

module.exports = router
