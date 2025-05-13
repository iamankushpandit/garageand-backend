const { v4: uuidv4 } = require('uuid')

const registerHost = async (req, res) => {
  try {
    const { join_token, address, title } = req.body

    if (!join_token || !address) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const newHost = {
      id: uuidv4(),
      join_token,
      address,
      title,
      created_at: new Date(),
    }

    console.log('📬 New host registered:', newHost)
    res.status(201).json({ success: true, host: newHost })
  } catch (err) {
    console.error('Error registering host:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = { registerHost }
