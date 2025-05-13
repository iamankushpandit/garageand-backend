const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const communityRoutes = require('./routes/community');
const hostRoutes = require('./routes/host');
const garageRoutes = require('./routes/garage');
const reserveRoutes = require('./routes/reserve');
const aiRoutes = require('./routes/ai');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GarageAnd backend is running 🚀');
});

app.use('/api/community', communityRoutes);
app.use('/api/host', hostRoutes);
app.use('/api/garage', garageRoutes);
app.use('/api/reserve', reserveRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Start server after all routes are mounted
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
