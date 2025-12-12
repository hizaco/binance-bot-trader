import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = {
  startTrading: (config) => axios.post(`${API_BASE_URL}/trading/start`, config),
  stopTrading: () => axios.post(`${API_BASE_URL}/trading/stop`),
  getStatus: () => axios.get(`${API_BASE_URL}/trading/status`),
  getPortfolio: () => axios.get(`${API_BASE_URL}/portfolio`),
  getTrades: () => axios.get(`${API_BASE_URL}/trades`),
  checkHealth: () => axios.get(`${API_BASE_URL}/health`),
};

export default api;
