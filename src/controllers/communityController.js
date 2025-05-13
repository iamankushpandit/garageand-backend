const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

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

    const join_token = uuidv4();
    const id = uuidv4();

    // For development, use localhost link; update to production URL later
    const joinUrl = `https://garageand.com/join/${join_token}`;

    // Generate QR Code as a base64 image
    const qrCode = await QRCode.toDataURL(joinUrl);

    const newEvent = {
      id,
      name,
      description,
      type,
      city,
      zip_codes,
      start_date,
      end_date,
      join_token,
      created_at: new Date(),
      qr_code: qrCode,
    };

    // TODO: Persist newEvent to your database here

    console.log('📌 Community event created:', newEvent);
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error('Error creating community event:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  createCommunityEvent,
};
