const { MAX_SELECTED_PAIRS } = require('../utils/constants');

class PairSelectionService {
  constructor() {
    this.riskProfiles = {
      safe: {
        minVolume: 10000000,
        minPriceChange: 0.5,
        maxPriceChange: 3,
        volatilityThreshold: 2,
      },
      medium: {
        minVolume: 5000000,
        minPriceChange: 2,
        maxPriceChange: 7,
        volatilityThreshold: 5,
      },
      high: {
        minVolume: 1000000,
        minPriceChange: 5,
        maxPriceChange: 20,
        volatilityThreshold: 10,
      }
    };
  }

  async selectTradingPairs(stats, riskLevel = 'medium', baseAsset = 'USDT') {
    const profile = this.riskProfiles[riskLevel] || this.riskProfiles.medium;
    
    const filteredPairs = stats
      .filter(pair => {
        if (!pair.symbol.endsWith(baseAsset)) return false;
        
        const priceChange = Math.abs(parseFloat(pair.priceChangePercent));
        const volume = parseFloat(pair.quoteVolume);
        
        return (
          volume >= profile.minVolume &&
          priceChange >= profile.minPriceChange &&
          priceChange <= profile.maxPriceChange
        );
      })
      .map(pair => ({
        symbol: pair.symbol,
        priceChange: parseFloat(pair.priceChangePercent),
        volume: parseFloat(pair.quoteVolume),
        highPrice: parseFloat(pair.highPrice),
        lowPrice: parseFloat(pair.lowPrice),
        lastPrice: parseFloat(pair.lastPrice),
        volatility: this.calculateVolatility(pair),
        score: this.calculateScore(pair, profile)
      }))
      .filter(pair => pair.volatility <= profile.volatilityThreshold)
      .sort((a, b) => b.score - a.score);

    return filteredPairs.slice(0, MAX_SELECTED_PAIRS);
  }

  calculateVolatility(pair) {
    const high = parseFloat(pair.highPrice);
    const low = parseFloat(pair.lowPrice);
    const avg = (high + low) / 2;
    return ((high - low) / avg) * 100;
  }

  calculateScore(pair, profile) {
    const priceChange = Math.abs(parseFloat(pair.priceChangePercent));
    const volume = parseFloat(pair.quoteVolume);
    const volatility = this.calculateVolatility(pair);
    
    const priceScore = (priceChange / profile.maxPriceChange) * 40;
    const volumeScore = Math.min((volume / profile.minVolume), 3) * 30;
    const volatilityScore = (1 - (volatility / profile.volatilityThreshold)) * 30;
    
    return priceScore + volumeScore + volatilityScore;
  }

  getRiskLevelDescription(riskLevel) {
    const descriptions = {
      safe: 'Conservative trading with stable, high-volume pairs',
      medium: 'Balanced approach with moderate risk and returns',
      high: 'Aggressive trading targeting high volatility pairs'
    };
    return descriptions[riskLevel] || descriptions.medium;
  }
}

module.exports = new PairSelectionService();
