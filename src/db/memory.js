// src/db/memory.js

const garages = {}
const items = {}
const neighborhoods = {}
const houses = {}
const admins = new Set()

// ===============================
// NEIGHBORHOOD & HOUSES
// ===============================
const createNeighborhood = async ({ id, name, city, zip_codes }) => {
  neighborhoods[id] = { id, name, city, zip_codes, created_at: new Date().toISOString() }
}

const createHouse = async ({ id, neighborhood_id, address, title, latitude, longitude }) => {
  houses[id] = { id, neighborhood_id, address, title, latitude, longitude }
}

const markHouseAsAdmin = async (houseId) => {
  admins.add(houseId)
}

// ===============================
// ITEMS & GARAGES
// ===============================
const getGarageById = async (garageId) => {
  const garage = garages[garageId]
  if (!garage) return null

  const garageItems = Object.values(items).filter(item => item.garage_id === garageId)
  return { ...garage, items: garageItems }
}

const createGarageItem = async (garageId, item) => {
  const id = `item_${Math.random().toString(36).slice(2)}`
  items[id] = { id, garage_id: garageId, title: item.title, price: item.price, is_sold: false }
  return items[id]
}

const updateItem = async (itemId, updates) => {
  if (!items[itemId]) return null
  items[itemId] = { ...items[itemId], ...updates }
  return items[itemId]
}

const deleteItem = async (itemId) => {
  delete items[itemId]
}

// ✅ NEW: Create a garage
const createGarage = async ({ neighborhood_id, house_id, name, start_date, end_date, join_token }) => {
  const id = `garage_${Math.random().toString(36).slice(2)}`
  garages[id] = {
    id,
    neighborhood_id,
    house_id,
    name,
    start_date,
    end_date,
    join_token,
    created_at: new Date().toISOString(),
  }
  return garages[id]
}

module.exports = {
  createNeighborhood,
  createHouse,
  markHouseAsAdmin,
  getGarageById,
  createGarageItem,
  updateItem,
  deleteItem,
  createGarage,
}
