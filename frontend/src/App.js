import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Configuration from './pages/Configuration';
import api from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('config');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await api.getStatus();
      setStatus(response.data);
      if (response.data.isRunning && currentPage === 'config') {
        setCurrentPage('dashboard');
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 Binance Trading Bot</h1>
        <div className="status-indicator">
          <span className={`status-dot ${status?.isRunning ? 'active' : ''}`}></span>
          <span>{status?.isRunning ? 'Running' : 'Stopped'}</span>
        </div>
      </header>

      <nav className="App-nav">
        <button 
          className={currentPage === 'config' ? 'active' : ''}
          onClick={() => setCurrentPage('config')}
        >
          Configuration
        </button>
        <button 
          className={currentPage === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentPage('dashboard')}
          disabled={!status?.isRunning}
        >
          Dashboard
        </button>
      </nav>

      <main className="App-main">
        {currentPage === 'config' && (
          <Configuration 
            status={status} 
            onStart={() => {
              fetchStatus();
              setCurrentPage('dashboard');
            }}
          />
        )}
        {currentPage === 'dashboard' && status?.isRunning && (
          <Dashboard 
            status={status}
            onStop={() => {
              fetchStatus();
              setCurrentPage('config');
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
