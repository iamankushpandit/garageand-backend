const { v4: uuidv4 } = require('uuid')

// In-memory reservation store
const reservations = {}

const reserveItem = (req, res) => {
  const { itemId } = req.params

  if (reservations[itemId] && reservations[itemId].expiresAt > Date.now()) {
    return res.status(400).json({
      success: false,
      message: 'Item is already reserved',
    })
  }

  const now = Date.now()
  const expiresAt = now + 15 * 60 * 1000
  const ticketId = uuidv4().slice(0, 6).toUpperCase()

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

const getTicketById = (req, res) => {
  const { ticketId } = req.params

  const entry = Object.entries(reservations).find(
    ([, value]) => value.ticketId === ticketId
  )

  if (!entry) {
    return res.status(404).json({ success: false, message: 'Ticket not found' })
  }

  const [itemId, data] = entry

  res.status(200).json({
    success: true,
    itemId,
    ticketId,
    reservedAt: new Date(data.reservedAt).toISOString(),
    expiresAt: new Date(data.expiresAt).toISOString(),
  })
}

const getAllReservations = (req, res) => {
  res.status(200).json({ success: true, reservations })
}

module.exports = {
  reserveItem,
  getTicketById,
  getAllReservations,
}
