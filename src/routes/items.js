const express = require('express')
const router = express.Router()
const db = require('../db') // Uses src/db/index.js to load postgres or memory

// ✅ Create a new item in a garage
router.post('/:garageId', async (req, res) => {
  const { garageId } = req.params
  const { title, price, family_id, description, photos } = req.body

  try {
    const item = await db.createGarageItem(garageId, {
      title,
      price,
      family_id,
      description,
      photos,
    })
    res.status(201).json({ success: true, item })
  } catch (err) {
    console.error('❌ Failed to create item:', err)
    res.status(500).json({ success: false, message: 'Failed to create item' })
  }
})

// ✏️ Update an item (e.g., mark as sold or update title/price)
router.patch('/:itemId', async (req, res) => {
  const { itemId } = req.params
  const updates = req.body

  try {
    const updated = await db.updateItem(itemId, updates)
    res.json({ success: true, item: updated })
  } catch (err) {
    console.error('❌ Failed to update item:', err)
    res.status(500).json({ success: false, message: 'Failed to update item' })
  }
})

// ❌ Delete an item
router.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params

  try {
    await db.deleteItem(itemId)
    res.json({ success: true })
  } catch (err) {
    console.error('❌ Failed to delete item:', err)
    res.status(500).json({ success: false, message: 'Failed to delete item' })
  }
})

module.exports = router
