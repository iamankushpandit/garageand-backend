const express = require('express')
const router = express.Router()

const {
  reserveItem,
  getTicketById,
  getAllReservations,
} = require('../controllers/reserveController')

router.post('/:itemId', reserveItem)
router.get('/', getAllReservations)
router.get('/ticket/:ticketId', getTicketById)

module.exports = router
