const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const communityRoutes = require('./routes/community');
const hostRoutes = require('./routes/host');
const garageRoutes = require('./routes/garage')


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GarageAnd backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
app.use('/api/community', communityRoutes);
app.use('/api/host', hostRoutes)
app.use('/api/garage', garageRoutes)

