import React, { useState } from 'react';
import api from '../services/api';

function Configuration({ status, onStart }) {
  const [config, setConfig] = useState({
    portfolioPercentage: 10,
    riskLevel: 'medium',
    apiKey: '',
    apiSecret: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async () => {
    setError('');
    
    if (!config.apiKey || !config.apiSecret) {
      setError('Please provide Binance API credentials');
      return;
    }

    setLoading(true);
    try {
      await api.startTrading(config);
      onStart();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start trading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>⚙️ Configuration</h2>
      
      <div className="form-group">
        <label>Portfolio Percentage to Trade (%)</label>
        <input
          type="number"
          min="1"
          max="100"
          value={config.portfolioPercentage}
          onChange={(e) => setConfig({ ...config, portfolioPercentage: parseInt(e.target.value) })}
          disabled={status?.isRunning}
        />
        <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '5px' }}>
          The bot will trade with {config.portfolioPercentage}% of your USDT balance
        </p>
      </div>

      <div className="form-group">
        <label>Risk Level</label>
        <div className="risk-selector">
          <div
            className={`risk-option ${config.riskLevel === 'safe' ? 'selected' : ''}`}
            onClick={() => !status?.isRunning && setConfig({ ...config, riskLevel: 'safe' })}
          >
            <h3>🛡️ Safe</h3>
            <p>Conservative trading with stable pairs</p>
            <p style={{ marginTop: '10px', fontWeight: '600' }}>0.5% - 3%</p>
          </div>
          <div
            className={`risk-option ${config.riskLevel === 'medium' ? 'selected' : ''}`}
            onClick={() => !status?.isRunning && setConfig({ ...config, riskLevel: 'medium' })}
          >
            <h3>⚖️ Medium</h3>
            <p>Balanced risk and returns</p>
            <p style={{ marginTop: '10px', fontWeight: '600' }}>2% - 7%</p>
          </div>
          <div
            className={`risk-option ${config.riskLevel === 'high' ? 'selected' : ''}`}
            onClick={() => !status?.isRunning && setConfig({ ...config, riskLevel: 'high' })}
          >
            <h3>🚀 High</h3>
            <p>Aggressive trading, high volatility</p>
            <p style={{ marginTop: '10px', fontWeight: '600' }}>5% - 20%</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Binance API Key</label>
        <input
          type="text"
          value={config.apiKey}
          onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
          placeholder="Enter your Binance API key"
          disabled={status?.isRunning}
        />
      </div>

      <div className="form-group">
        <label>Binance API Secret</label>
        <input
          type="password"
          value={config.apiSecret}
          onChange={(e) => setConfig({ ...config, apiSecret: e.target.value })}
          placeholder="Enter your Binance API secret"
          disabled={status?.isRunning}
        />
      </div>

      {error && (
        <div style={{ 
          padding: '12px', 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid #ef4444',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#ef4444'
        }}>
          {error}
        </div>
      )}

      <button
        className="button button-primary"
        onClick={handleStart}
        disabled={status?.isRunning || loading}
      >
        {loading ? 'Starting...' : '🚀 Start Trading'}
      </button>

      {status?.isRunning && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid #10b981',
          borderRadius: '8px',
          color: '#10b981'
        }}>
          ✓ Bot is currently running. Go to Dashboard to monitor trades.
        </div>
      )}
    </div>
  );
}

export default Configuration;
