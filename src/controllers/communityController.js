const { v4: uuidv4 } = require('uuid');

const createCommunityEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      city,
      zip_codes,
      start_date,
      end_date,
      type = 'garage_sale',
    } = req.body;

    const join_token = uuidv4(); // secure token used in QR codes

    // TODO: Save to DB here later
    const newEvent = {
      id: uuidv4(),
      name,
      description,
      type,
      city,
      zip_codes,
      start_date,
      end_date,
      join_token,
      created_at: new Date(),
    };

    console.log('📌 Community event created:', newEvent);
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { createCommunityEvent };
