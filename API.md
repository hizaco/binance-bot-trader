# 📡 Documentation API

Documentation complète de l'API REST du Binance Trading Bot.

## Base URL

```
http://localhost:3001/api
```

## 🔍 Endpoints

### Health Check

Vérifier l'état du serveur.

**GET** `/health`

**Réponse :**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### Démarrer le Trading

Démarre le bot de trading avec la configuration spécifiée.

**POST** `/trading/start`

**Body :**
```json
{
  "portfolioPercentage": 10,
  "riskLevel": "medium",
  "apiKey": "your_binance_api_key",
  "apiSecret": "your_binance_api_secret"
}
```

**Paramètres :**
- `portfolioPercentage` (number, required) : Pourcentage du portfolio USDT à utiliser (1-100)
- `riskLevel` (string, required) : Niveau de risque ("safe", "medium", "high")
- `apiKey` (string, required) : Clé API Binance
- `apiSecret` (string, required) : Secret API Binance

**Réponse Succès (200) :**
```json
{
  "status": "started",
  "config": {
    "portfolioPercentage": 10,
    "riskLevel": "medium"
  }
}
```

**Erreurs :**
```json
// 400 - Paramètres invalides
{
  "error": "Portfolio percentage must be between 1 and 100"
}

// 500 - Erreur serveur
{
  "error": "Failed to initialize Binance client"
}
```

---

### Arrêter le Trading

Arrête le bot de trading.

**POST** `/trading/stop`

**Réponse Succès (200) :**
```json
{
  "status": "stopped"
}
```

**Erreur (500) :**
```json
{
  "error": "Trading is not running"
}
```

---

### Obtenir le Statut

Récupère l'état actuel du bot.

**GET** `/trading/status`

**Réponse :**
```json
{
  "isRunning": true,
  "config": {
    "portfolioPercentage": 10,
    "riskLevel": "medium"
  },
  "activeTrades": 3,
  "totalTrades": 15
}
```

**Champs :**
- `isRunning` (boolean) : Le bot est-il en cours d'exécution
- `config` (object) : Configuration actuelle
- `activeTrades` (number) : Nombre de trades actifs
- `totalTrades` (number) : Nombre total de trades effectués

---

### Obtenir le Portfolio

Récupère les actifs du portfolio et leur valeur.

**GET** `/portfolio`

**Réponse :**
```json
{
  "assets": [
    {
      "asset": "USDT",
      "free": 1000.50,
      "locked": 50.25,
      "total": 1050.75,
      "usdtValue": 1050.75
    },
    {
      "asset": "BTC",
      "free": 0.05,
      "locked": 0,
      "total": 0.05,
      "usdtValue": 2000.00
    }
  ],
  "totalValue": 3050.75,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Champs :**
- `assets` (array) : Liste des actifs
  - `asset` (string) : Symbole de l'actif
  - `free` (number) : Quantité disponible
  - `locked` (number) : Quantité verrouillée
  - `total` (number) : Quantité totale
  - `usdtValue` (number) : Valeur en USDT
- `totalValue` (number) : Valeur totale du portfolio en USDT
- `timestamp` (string) : Horodatage

---

### Obtenir les Trades

Récupère les trades actifs et l'historique.

**GET** `/trades`

**Réponse :**
```json
{
  "active": [
    {
      "symbol": "BTCUSDT",
      "entryPrice": 40000.50,
      "amount": 100.00,
      "timestamp": "2024-01-01T12:00:00.000Z",
      "status": "active",
      "priceChange": 2.5
    }
  ],
  "history": [
    {
      "symbol": "ETHUSDT",
      "type": "BUY",
      "price": 2500.00,
      "amount": 50.00,
      "pnl": 3.2,
      "timestamp": "2024-01-01T11:00:00.000Z"
    }
  ]
}
```

**Champs :**
- `active` (array) : Trades actuellement ouverts
  - `symbol` (string) : Paire de trading
  - `entryPrice` (number) : Prix d'entrée
  - `amount` (number) : Montant en USDT
  - `timestamp` (string) : Date/heure d'ouverture
  - `status` (string) : Statut du trade
  - `priceChange` (number) : Variation de prix en %
- `history` (array) : Historique des trades (50 derniers)
  - `symbol` (string) : Paire de trading
  - `type` (string) : Type ("BUY" ou "SELL")
  - `price` (number) : Prix d'exécution
  - `amount` (number) : Montant en USDT
  - `pnl` (number) : Profit/Loss en %
  - `timestamp` (string) : Date/heure d'exécution

---

## 🔐 Sécurité

### Recommandations

1. **HTTPS** : Utilisez HTTPS en production
2. **API Keys** : Ne jamais exposer les clés API côté client
3. **Rate Limiting** : Implémentez un rate limiting
4. **CORS** : Configurez CORS pour votre domaine uniquement
5. **Validation** : Tous les paramètres sont validés côté serveur

### Variables d'Environnement

```env
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret
PORT=3001
NODE_ENV=production
```

⚠️ Ne JAMAIS commiter le fichier `.env` !

---

## 🧪 Exemples d'Utilisation

### JavaScript (Fetch)

```javascript
// Démarrer le trading
const startTrading = async () => {
  const response = await fetch('http://localhost:3001/api/trading/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      portfolioPercentage: 10,
      riskLevel: 'medium',
      apiKey: 'your_api_key',
      apiSecret: 'your_api_secret'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Obtenir le statut
const getStatus = async () => {
  const response = await fetch('http://localhost:3001/api/trading/status');
  const data = await response.json();
  console.log(data);
};
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Démarrer le trading
const startTrading = async () => {
  try {
    const response = await api.post('/trading/start', {
      portfolioPercentage: 10,
      riskLevel: 'medium',
      apiKey: 'your_api_key',
      apiSecret: 'your_api_secret'
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Obtenir le portfolio
const getPortfolio = async () => {
  const response = await api.get('/portfolio');
  console.log(response.data);
};
```

### cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Démarrer le trading
curl -X POST http://localhost:3001/api/trading/start \
  -H "Content-Type: application/json" \
  -d '{
    "portfolioPercentage": 10,
    "riskLevel": "medium",
    "apiKey": "your_api_key",
    "apiSecret": "your_api_secret"
  }'

# Obtenir le statut
curl http://localhost:3001/api/trading/status

# Arrêter le trading
curl -X POST http://localhost:3001/api/trading/stop

# Obtenir le portfolio
curl http://localhost:3001/api/portfolio

# Obtenir les trades
curl http://localhost:3001/api/trades
```

### Python (requests)

```python
import requests

BASE_URL = 'http://localhost:3001/api'

# Démarrer le trading
response = requests.post(f'{BASE_URL}/trading/start', json={
    'portfolioPercentage': 10,
    'riskLevel': 'medium',
    'apiKey': 'your_api_key',
    'apiSecret': 'your_api_secret'
})
print(response.json())

# Obtenir le statut
response = requests.get(f'{BASE_URL}/trading/status')
print(response.json())

# Obtenir le portfolio
response = requests.get(f'{BASE_URL}/portfolio')
portfolio = response.json()
print(f"Total Value: ${portfolio['totalValue']}")
```

---

## 📊 Codes de Statut HTTP

| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Requête invalide (paramètres manquants ou incorrects) |
| 500 | Erreur serveur |

---

## 🔄 Cycle de Vie du Bot

1. **Configuration** : L'utilisateur configure le bot via `/trading/start`
2. **Initialisation** : Le bot se connecte à Binance API
3. **Analyse** : Récupération des données de marché toutes les minutes
4. **Sélection** : Algorithme sélectionne les meilleures paires
5. **Exécution** : Trades exécutés selon la configuration
6. **Monitoring** : Mise à jour continue du statut via `/trading/status`
7. **Arrêt** : L'utilisateur arrête le bot via `/trading/stop`

---

## 💡 Bonnes Pratiques

1. **Polling** : Interrogez `/trading/status` toutes les 5-10 secondes
2. **Error Handling** : Gérez toujours les erreurs possibles
3. **Timeout** : Définissez des timeouts appropriés (10-30 secondes)
4. **Retry Logic** : Implémentez une logique de retry avec backoff exponentiel
5. **Logging** : Loggez toutes les requêtes importantes

---

## 🐛 Débogage

### Activer les Logs Détaillés

Modifiez `backend/src/server.js` :

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

### Tester l'API

Utilisez [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) pour tester les endpoints.

---

## 📞 Support

Pour toute question concernant l'API :
- Ouvrez une issue sur GitHub
- Consultez la documentation Binance API

---

Dernière mise à jour : 2024