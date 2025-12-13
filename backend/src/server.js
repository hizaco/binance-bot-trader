require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tradingController = require('./controllers/tradingController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/trading/start', tradingController.startTrading);
app.post('/api/trading/stop', tradingController.stopTrading);
app.get('/api/trading/status', tradingController.getStatus);
app.get('/api/portfolio', tradingController.getPortfolio);
app.get('/api/trades', tradingController.getTrades);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
