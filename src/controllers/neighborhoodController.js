const { v4: uuidv4 } = require('uuid')
const db = require('../db')

const createNeighborhood = async (req, res) => {
  try {
    const {
      name,
      city,
      zip_codes,
      latitude,
      longitude,
      admin_house,
    } = req.body

    if (!name || !admin_house?.address) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const neighborhoodId = uuidv4()
    const houseId = uuidv4()

    // Create neighborhood
    await db.createNeighborhood({
      id: neighborhoodId,
      name,
      city,
      zip_codes,
      latitude,
      longitude,
    })

    // Create admin house
    await db.createHouse({
      id: houseId,
      neighborhood_id: neighborhoodId,
      address: admin_house.address,
      title: admin_house.title || null,
      is_admin: true,
      latitude: admin_house.latitude,
      longitude: admin_house.longitude,
    })

    return res.status(201).json({
      success: true,
      neighborhood: {
        id: neighborhoodId,
        name,
        city,
        zip_codes,
      },
      admin_house: {
        id: houseId,
        address: admin_house.address,
      }
    })
  } catch (err) {
    console.error('Error creating neighborhood:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createNeighborhood,
}
