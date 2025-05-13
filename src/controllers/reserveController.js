const { v4: uuidv4 } = require('uuid')

// In-memory store (can be swapped with DB later)
const reservations = {}

const reserveItem = (req, res) => {
  const { itemId } = req.params

  // Check if item is already reserved
  if (
    reservations[itemId] &&
    reservations[itemId].expiresAt > Date.now()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Item is already reserved',
    })
  }

  const now = Date.now()
  const expiresAt = now + 15 * 60 * 1000 // 15 mins from now
  const ticketId = uuidv4().slice(0, 6).toUpperCase() // short + unique

  reservations[itemId] = {
    reservedAt: now,
    expiresAt,
    ticketId,
  }

  console.log(`🔐 Reserved ${itemId} with ticket ID ${ticketId} until ${new Date(expiresAt).toISOString()}`)

  res.status(200).json({
    success: true,
    itemId,
    ticketId,
    reservedAt: new Date(now).toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
  })
}

module.exports = { reserveItem }
