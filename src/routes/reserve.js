const express = require('express')
const router = express.Router()
const { reserveItem } = require('../controllers/reserveController')

router.post('/:itemId', reserveItem)
router.get('/', (req, res) => {
    res.status(200).json({ success: true, reservations })
  })
  

module.exports = router
