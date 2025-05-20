// src/routes/garageSale.js

const express = require('express')
const { v4: uuidv4 } = require('uuid')
const db = require('../db')

const router = express.Router()

// POST /api/garage-sale
router.post('/', async (req, res) => {
  try {
    const { neighborhood_id, house_id, name, start_date, end_date } = req.body

    if (!neighborhood_id || !house_id || !name || !start_date || !end_date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const join_token = uuidv4()

    const garage = await db.createGarage({
      neighborhood_id,
      house_id,
      name,
      start_date,
      end_date,
      join_token,
    })

    return res.status(201).json({ success: true, garage })
  } catch (err) {
    console.error('❌ Error creating garage:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
