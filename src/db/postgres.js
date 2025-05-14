const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const query = async (text, params) => {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res.rows
  } finally {
    client.release()
  }
}

// ===============================
// NEIGHBORHOOD & HOUSES
// ===============================
const createNeighborhood = async ({ id, name, city, zip_codes }) => {
  await query(
    `INSERT INTO neighborhoods (id, name, city, zip_codes) VALUES ($1, $2, $3, $4)`,
    [id, name, city, zip_codes]
  )
}

const createHouse = async ({ id, neighborhood_id, address, title, latitude, longitude }) => {
  await query(
    `INSERT INTO houses (id, neighborhood_id, address, title, latitude, longitude) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, neighborhood_id, address, title, latitude, longitude]
  )
}

const markHouseAsAdmin = async (houseId) => {
  await query(`INSERT INTO admins (house_id) VALUES ($1)`, [houseId])
}

// ===============================
// EXISTING FOR ITEMS / GARAGES
// ===============================

const getGarageById = async (garageId) => {
  const garages = await query('SELECT * FROM garages WHERE id = $1', [garageId])
  const items = await query('SELECT * FROM items WHERE garage_id = $1', [garageId])

  if (!garages[0]) return null

  return {
    ...garages[0],
    items,
  }
}

const createGarageItem = async (garageId, item) => {
  const result = await query(
    'INSERT INTO items (garage_id, title, price, is_sold) VALUES ($1, $2, $3, false) RETURNING *',
    [garageId, item.title, item.price]
  )
  return result[0]
}

const updateItem = async (itemId, updates) => {
  const fields = []
  const values = []
  let i = 1

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${i++}`)
    values.push(value)
  }

  values.push(itemId)
  const sql = `UPDATE items SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`
  const result = await query(sql, values)
  return result[0]
}

const deleteItem = async (itemId) => {
  await query('DELETE FROM items WHERE id = $1', [itemId])
}

module.exports = {
  query,
  getGarageById,
  createGarageItem,
  updateItem,
  deleteItem,
  createNeighborhood,
  createHouse,
  markHouseAsAdmin,
}
