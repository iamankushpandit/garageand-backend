const getGarageDetails = async (req, res) => {
    const { id } = req.params
  
    // 🔧 Mock response for now — replace with DB query later
    const garage = {
      id,
      title: 'Main Street Garage',
      address: '123 Main St',
      items: [
        {
          id: 'item1',
          title: 'Mountain Bike',
          price: 120
        },
        {
          id: 'item2',
          title: 'Blender',
          price: 25
        },
        {
          id: 'item3',
          title: 'Coffee Table',
          price: 40
        }
      ]
    }
  
    res.status(200).json({ success: true, garage })
  }
  
  module.exports = { getGarageDetails }
  