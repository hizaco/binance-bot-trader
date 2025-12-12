import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard({ status, onStop }) {
  const TRADE_HISTORY_DISPLAY_LIMIT = 10;
  const [portfolio, setPortfolio] = useState(null);
  const [trades, setTrades] = useState({ active: [], history: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, tradesRes] = await Promise.all([
        api.getPortfolio(),
        api.getTrades(),
      ]);
      setPortfolio(portfolioRes.data);
      setTrades(tradesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await api.stopTrading();
      onStop();
    } catch (error) {
      console.error('Error stopping trading:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>📊 Dashboard</h2>
          <button
            className="button button-danger"
            onClick={handleStop}
            disabled={loading}
          >
            {loading ? 'Stopping...' : '⏹️ Stop Trading'}
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Risk Level</h3>
          <p style={{ textTransform: 'capitalize' }}>
            {status?.config?.riskLevel || 'N/A'}
          </p>
        </div>
        <div className="stat-card">
          <h3>Portfolio %</h3>
          <p>{status?.config?.portfolioPercentage || 0}%</p>
        </div>
        <div className="stat-card">
          <h3>Active Trades</h3>
          <p>{trades.active.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p>
            {portfolio?.totalValue ? `$${portfolio.totalValue.toFixed(2)}` : 'Loading...'}
          </p>
        </div>
      </div>

      <div className="card">
        <h2>💼 Portfolio</h2>
        {portfolio && portfolio.assets && portfolio.assets.length > 0 ? (
          <table className="trades-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Free</th>
                <th>Locked</th>
                <th>Total</th>
                <th>USDT Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.assets
                .filter(asset => asset.total > 0.001)
                .map((asset, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: '600' }}>{asset.asset}</td>
                    <td>{asset.free.toFixed(8)}</td>
                    <td>{asset.locked.toFixed(8)}</td>
                    <td>{asset.total.toFixed(8)}</td>
                    <td>${asset.usdtValue.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>
            Loading portfolio data...
          </p>
        )}
      </div>

      <div className="card">
        <h2>📈 Active Trades</h2>
        {trades.active.length > 0 ? (
          <table className="trades-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Entry Price</th>
                <th>Amount</th>
                <th>Price Change</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.active.map((trade, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{trade.symbol}</td>
                  <td>${trade.entryPrice.toFixed(4)}</td>
                  <td>${trade.amount.toFixed(2)}</td>
                  <td className={trade.priceChange >= 0 ? 'positive' : 'negative'}>
                    {trade.priceChange >= 0 ? '+' : ''}{trade.priceChange.toFixed(2)}%
                  </td>
                  <td>{trade.status}</td>
                  <td>{new Date(trade.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>
            No active trades. The bot is analyzing market conditions...
          </p>
        )}
      </div>

      <div className="card">
        <h2>📜 Recent Trade History</h2>
        {trades.history.length > 0 ? (
          <table className="trades-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Price</th>
                <th>Amount</th>
                <th>P&L</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.history.slice(-TRADE_HISTORY_DISPLAY_LIMIT).reverse().map((trade, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{trade.symbol}</td>
                  <td>{trade.type}</td>
                  <td>${trade.price.toFixed(4)}</td>
                  <td>${trade.amount.toFixed(2)}</td>
                  <td className={trade.pnl >= 0 ? 'positive' : 'negative'}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}%
                  </td>
                  <td>{new Date(trade.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>
            No trade history yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
