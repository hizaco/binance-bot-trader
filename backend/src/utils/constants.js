// Trading configuration constants
const TRADING_CONSTANTS = {
  // Maximum number of concurrent trades
  MAX_CONCURRENT_TRADES: 3,
  
  // Maximum number of pairs to analyze and select from
  MAX_SELECTED_PAIRS: 10,
  
  // Trading cycle interval in milliseconds (1 minute)
  TRADING_CYCLE_INTERVAL: 60000,
  
  // Minimum trade amount in USDT to avoid dust trades
  MIN_TRADE_AMOUNT: 10,
};

module.exports = TRADING_CONSTANTS;
