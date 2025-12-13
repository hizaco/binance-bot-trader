const binanceService = require('./binanceService');
const pairSelectionService = require('./pairSelectionService');
const { MAX_CONCURRENT_TRADES, TRADING_CYCLE_INTERVAL, MIN_TRADE_AMOUNT } = require('../utils/constants');

class TradingService {
  constructor() {
    this.isRunning = false;
    this.config = null;
    this.activeTrades = [];
    this.tradeHistory = [];
    this.interval = null;
  }

  async start(config) {
    if (this.isRunning) {
      throw new Error('Trading is already running');
    }

    this.config = {
      portfolioPercentage: config.portfolioPercentage || 10,
      riskLevel: config.riskLevel || 'medium',
      apiKey: config.apiKey,
      apiSecret: config.apiSecret,
    };

    binanceService.initialize(this.config.apiKey, this.config.apiSecret);
    this.isRunning = true;

    await this.executeTradingCycle();
    
    this.interval = setInterval(async () => {
      if (this.isRunning) {
        await this.executeTradingCycle();
      }
    }, TRADING_CYCLE_INTERVAL);

    return { status: 'started', config: this.config };
  }

  stop() {
    if (!this.isRunning) {
      throw new Error('Trading is not running');
    }

    this.isRunning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    return { status: 'stopped' };
  }

  async executeTradingCycle() {
    try {
      console.log('Executing trading cycle...');
      
      const stats = await binanceService.get24hrStats();
      const selectedPairs = await pairSelectionService.selectTradingPairs(
        stats,
        this.config.riskLevel
      );

      console.log(`Selected ${selectedPairs.length} pairs for ${this.config.riskLevel} risk level`);
      
      const balance = await binanceService.getBalance();
      const usdtBalance = balance.find(b => b.asset === 'USDT');
      
      if (!usdtBalance) {
        console.log('No USDT balance available');
        return;
      }

      const availableAmount = parseFloat(usdtBalance.free);
      const tradingAmount = (availableAmount * this.config.portfolioPercentage) / 100;
      const amountPerTrade = tradingAmount / MAX_CONCURRENT_TRADES;

      console.log(`Available: ${availableAmount} USDT, Trading: ${tradingAmount} USDT`);

      if (amountPerTrade < MIN_TRADE_AMOUNT) {
        console.log(`Trade amount ${amountPerTrade} USDT is below minimum ${MIN_TRADE_AMOUNT} USDT`);
        return;
      }

      const maxNewTrades = Math.min(
        MAX_CONCURRENT_TRADES - this.activeTrades.length,
        selectedPairs.length
      );

      for (let i = 0; i < maxNewTrades; i++) {
        const pair = selectedPairs[i];
        this.activeTrades.push({
          symbol: pair.symbol,
          entryPrice: pair.lastPrice,
          amount: amountPerTrade,
          timestamp: new Date().toISOString(),
          status: 'active',
          priceChange: pair.priceChange,
        });
      }

    } catch (error) {
      console.error('Error in trading cycle:', error.message);
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      activeTrades: this.activeTrades.length,
      totalTrades: this.tradeHistory.length,
    };
  }

  async getPortfolio() {
    try {
      const balance = await binanceService.getBalance();
      const prices = await binanceService.getPrices();
      
      const portfolio = balance.map(b => ({
        asset: b.asset,
        free: parseFloat(b.free),
        locked: parseFloat(b.locked),
        total: parseFloat(b.free) + parseFloat(b.locked),
        usdtValue: this.calculateUSDTValue(b, prices),
      }));

      const totalValue = portfolio.reduce((sum, item) => sum + item.usdtValue, 0);

      return {
        assets: portfolio,
        totalValue,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting portfolio:', error);
      return null;
    }
  }

  calculateUSDTValue(balance, prices) {
    const total = parseFloat(balance.free) + parseFloat(balance.locked);
    
    if (balance.asset === 'USDT') {
      return total;
    }

    const symbol = `${balance.asset}USDT`;
    const price = prices[symbol];
    
    if (price) {
      return total * parseFloat(price);
    }

    return 0;
  }

  getTrades() {
    return {
      active: this.activeTrades,
      history: this.tradeHistory.slice(-50),
    };
  }
}

module.exports = new TradingService();
