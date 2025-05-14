const path = require('path')
const dotenv = require('dotenv')

// Load env variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// Supported DB drivers
const DRIVERS = {
  postgres: './postgres',
  memory: './memory',
}

const dbDriver = process.env.DB_DRIVER || 'postgres'

if (!DRIVERS[dbDriver]) {
  throw new Error(`❌ Unknown DB_DRIVER "${dbDriver}". Supported: ${Object.keys(DRIVERS).join(', ')}`)
}

const db = require(DRIVERS[dbDriver])

module.exports = db
