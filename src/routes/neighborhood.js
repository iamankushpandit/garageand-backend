const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const db = require('../db')

// POST /api/neighborhood
router.post('/', async (req, res) => {
  try {
    const { name, city, zip_codes, admin_houses } = req.body
    const neighborhoodId = uuidv4()

    // Insert neighborhood
    await db.query(
      `INSERT INTO neighborhoods (id, name, city, zip_codes)
       VALUES ($1, $2, $3, $4)`,
      [neighborhoodId, name, city, zip_codes]
    )

    for (const house of admin_houses) {
      const houseId = uuidv4()

      // Insert house
      await db.query(
        `INSERT INTO houses (id, address, title, neighborhood_id)
         VALUES ($1, $2, $3, $4)`,
        [houseId, house.address, house.title || null, neighborhoodId]
      )

      // Mark as admin
      await db.query(
        `INSERT INTO admins (house_id, neighborhood_id)
         VALUES ($1, $2)`,
        [houseId, neighborhoodId]
      )
    }

    res.status(201).json({ success: true, id: neighborhoodId })
  } catch (err) {
    console.error('❌ Error creating neighborhood:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router