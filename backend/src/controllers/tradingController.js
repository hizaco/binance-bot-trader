const tradingService = require('../services/tradingService');

async function startTrading(req, res) {
  try {
    const { portfolioPercentage, riskLevel, apiKey, apiSecret } = req.body;

    if (!portfolioPercentage || portfolioPercentage < 1 || portfolioPercentage > 100) {
      return res.status(400).json({ 
        error: 'Portfolio percentage must be between 1 and 100' 
      });
    }

    if (!['safe', 'medium', 'high'].includes(riskLevel)) {
      return res.status(400).json({ 
        error: 'Risk level must be safe, medium, or high' 
      });
    }

    if (!apiKey || !apiSecret) {
      return res.status(400).json({ 
        error: 'API key and secret are required' 
      });
    }

    const result = await tradingService.start({
      portfolioPercentage,
      riskLevel,
      apiKey,
      apiSecret,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function stopTrading(req, res) {
  try {
    const result = tradingService.stop();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getStatus(req, res) {
  try {
    const status = tradingService.getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPortfolio(req, res) {
  try {
    const portfolio = await tradingService.getPortfolio();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getTrades(req, res) {
  try {
    const trades = tradingService.getTrades();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  startTrading,
  stopTrading,
  getStatus,
  getPortfolio,
  getTrades,
};
