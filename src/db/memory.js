const { v4: uuidv4 } = require('uuid')

const neighborhoods = []
const houses = []
const admins = []
const garages = []
const items = []

// ================
// Neighborhood & House
// ================
const createNeighborhood = async ({ id, name, city, zip_codes }) => {
  neighborhoods.push({ id, name, city, zip_codes, created_at: new Date() })
}

const createHouse = async ({ id, neighborhood_id, address, title, latitude, longitude }) => {
  houses.push({ id, neighborhood_id, address, title, latitude, longitude, created_at: new Date() })
}

const markHouseAsAdmin = async (houseId) => {
  admins.push({ house_id: houseId })
}

// ================
// Items / Garages
// ================
const getGarageById = async (garageId) => {
  const garage = garages.find(g => g.id === garageId)
  if (!garage) return null
  const garageItems = items.filter(i => i.garage_id === garageId)
  return { ...garage, items: garageItems }
}

const createGarageItem = async (garageId, item) => {
  const newItem = {
    id: uuidv4(),
    garage_id: garageId,
    title: item.title,
    price: item.price,
    is_sold: false,
    created_at: new Date(),
  }
  items.push(newItem)
  return newItem
}

const updateItem = async (itemId, updates) => {
  const item = items.find(i => i.id === itemId)
  if (!item) return null
  Object.assign(item, updates)
  return item
}

const deleteItem = async (itemId) => {
  const index = items.findIndex(i => i.id === itemId)
  if (index !== -1) items.splice(index, 1)
}

module.exports = {
  createNeighborhood,
  createHouse,
  markHouseAsAdmin,
  getGarageById,
  createGarageItem,
  updateItem,
  deleteItem,
}
