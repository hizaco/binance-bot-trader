const Binance = require('binance-api-node').default;

class BinanceService {
  constructor() {
    this.client = null;
    this.isInitialized = false;
  }

  initialize(apiKey, apiSecret) {
    try {
      this.client = Binance({
        apiKey: apiKey || process.env.BINANCE_API_KEY,
        apiSecret: apiSecret || process.env.BINANCE_API_SECRET,
      });
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Binance client:', error);
      return false;
    }
  }

  async getAccountInfo() {
    if (!this.isInitialized) {
      throw new Error('Binance client not initialized');
    }
    return await this.client.accountInfo();
  }

  async getBalance() {
    const account = await this.getAccountInfo();
    return account.balances.filter(b => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0);
  }

  async get24hrStats() {
    if (!this.isInitialized) {
      throw new Error('Binance client not initialized');
    }
    return await this.client.dailyStats();
  }

  async getPrices() {
    if (!this.isInitialized) {
      throw new Error('Binance client not initialized');
    }
    return await this.client.prices();
  }

  async executeTrade(symbol, side, quantity) {
    if (!this.isInitialized) {
      throw new Error('Binance client not initialized');
    }
    
    return await this.client.order({
      symbol,
      side,
      type: 'MARKET',
      quantity,
    });
  }

  async getSymbolPrice(symbol) {
    if (!this.isInitialized) {
      throw new Error('Binance client not initialized');
    }
    const prices = await this.client.prices();
    return prices[symbol];
  }
}

module.exports = new BinanceService();
