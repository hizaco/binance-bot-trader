# 🤖 Binance Trading Bot

Un bot de trading automatique pour Binance qui sélectionne intelligemment les paires de trading à fort potentiel et exécute des trades selon votre tolérance au risque.

## 📋 Fonctionnalités

- **Trading Automatique** : Le bot surveille le marché et exécute des trades automatiquement
- **Gestion des Risques** : Trois niveaux de risque (Safe, Medium, High)
- **Sélection Intelligente** : Algorithme de sélection basé sur le volume, la volatilité et les changements de prix
- **Interface Web** : Dashboard moderne pour configurer et monitorer le bot
- **Portfolio Management** : Contrôle du pourcentage du portefeuille à trader
- **Temps Réel** : Mise à jour en temps réel des trades et du portfolio

## 🏗️ Architecture

### Backend (Node.js + Express)
- API REST pour la gestion du bot
- Intégration avec Binance API
- Algorithme de sélection de paires
- Gestion des trades et du portfolio

### Frontend (React)
- Interface de configuration
- Dashboard de monitoring
- Affichage en temps réel des trades
- Visualisation du portfolio

## 🚀 Installation et Configuration

### Prérequis

- Node.js 18+ et npm
- Compte Binance avec API Key
- Docker et Docker Compose (optionnel)

### Option 1 : Installation avec Docker (Recommandé)

1. **Cloner le repository**
```bash
git clone https://github.com/hizaco/binance-bot-trader.git
cd binance-bot-trader
```

2. **Configurer les variables d'environnement (Optionnel)**

Pour utiliser vos propres clés API, créez un fichier `.env` à la racine :
```bash
cp .env.example .env
```

Éditer `.env` avec vos clés API :
```
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
PORT=3001
NODE_ENV=production
```

**Note** : Si vous ne créez pas de fichier `.env`, l'application démarrera avec des valeurs par défaut. Vous devrez ensuite configurer vos clés API via l'interface web.

3. **Lancer l'application avec Docker**
```bash
docker-compose up --build
```

4. **Accéder à l'application**
- Frontend : http://localhost:3000
- Backend API : http://localhost:3001

### Option 2 : Installation Manuelle

#### Backend

1. **Installer les dépendances**
```bash
cd backend
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer `.env` avec vos clés API Binance.

3. **Lancer le backend**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le backend sera accessible sur http://localhost:3001

#### Frontend

1. **Installer les dépendances**
```bash
cd frontend
npm install
```

2. **Lancer le frontend**
```bash
npm start
```

Le frontend sera accessible sur http://localhost:3000

## 🔑 Obtenir les Clés API Binance

1. Connectez-vous à votre compte [Binance](https://www.binance.com)
2. Allez dans **API Management** dans les paramètres
3. Créez une nouvelle API Key
4. **Important** : Activez uniquement les permissions de trading spot
5. Ajoutez votre IP à la whitelist pour plus de sécurité
6. Copiez votre API Key et Secret

⚠️ **Sécurité** : Ne partagez jamais vos clés API et utilisez des restrictions IP.

## 📖 Guide d'Utilisation

### 1. Configuration

Dans la page **Configuration** :

1. **Pourcentage du Portfolio** : Définissez quel pourcentage de votre balance USDT le bot peut utiliser (1-100%)
   - Exemple : 10% signifie que si vous avez 1000 USDT, le bot utilisera 100 USDT

2. **Niveau de Risque** : Choisissez parmi trois options
   - **🛡️ Safe** : Trading conservateur avec des paires stables (0.5% - 3% de variation)
   - **⚖️ Medium** : Approche équilibrée (2% - 7% de variation)
   - **🚀 High** : Trading agressif sur des paires volatiles (5% - 20% de variation)

3. **Clés API** : Entrez vos clés Binance API

4. Cliquez sur **🚀 Start Trading**

### 2. Monitoring

Dans le **Dashboard** :

- **Stats en Temps Réel** : Visualisez vos trades actifs, le niveau de risque et la valeur totale
- **Portfolio** : Consultez tous vos actifs et leur valeur en USDT
- **Trades Actifs** : Suivez vos positions ouvertes
- **Historique** : Consultez l'historique de vos trades

### 3. Arrêter le Bot

Cliquez sur **⏹️ Stop Trading** dans le Dashboard pour arrêter le bot proprement.

## 🧮 Algorithme de Sélection

Le bot utilise un algorithme sophistiqué pour sélectionner les meilleures paires :

### Critères par Niveau de Risque

| Critère | Safe | Medium | High |
|---------|------|--------|------|
| Volume Min | 10M USDT | 5M USDT | 1M USDT |
| Variation Prix | 0.5% - 3% | 2% - 7% | 5% - 20% |
| Volatilité Max | 2% | 5% | 10% |

### Score de Sélection

Le bot calcule un score pour chaque paire basé sur :
- **40%** : Changement de prix (momentum)
- **30%** : Volume de trading (liquidité)
- **30%** : Volatilité (stabilité)

Les 10 meilleures paires sont sélectionnées selon leur score.

## 📡 API Endpoints

### Trading
- `POST /api/trading/start` - Démarrer le bot
- `POST /api/trading/stop` - Arrêter le bot
- `GET /api/trading/status` - Statut du bot

### Portfolio & Trades
- `GET /api/portfolio` - Obtenir le portfolio
- `GET /api/trades` - Obtenir les trades actifs et l'historique

### Health
- `GET /api/health` - Vérifier l'état du serveur

## 🔒 Sécurité

- ✅ Ne jamais commiter les clés API dans le code
- ✅ Utiliser des variables d'environnement
- ✅ Activer la whitelist IP sur Binance
- ✅ Limiter les permissions de l'API (trading spot uniquement)
- ✅ Commencer avec un petit pourcentage du portfolio
- ✅ Tester d'abord sur Binance Testnet

## ⚠️ Avertissement

- Ce bot est fourni à des fins éducatives
- Le trading de cryptomonnaies comporte des risques
- Ne tradez jamais plus que ce que vous pouvez vous permettre de perdre
- Testez toujours avec de petits montants d'abord
- Les performances passées ne garantissent pas les résultats futurs

## 🛠️ Technologies Utilisées

### Backend
- Node.js & Express
- binance-api-node
- WebSockets pour le temps réel

### Frontend
- React 18
- Axios pour les requêtes HTTP
- CSS3 avec design moderne

### DevOps
- Docker & Docker Compose
- Environment variables pour la configuration

## 📝 Structure du Projet

```
binance-bot-trader/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── tradingController.js
│   │   ├── services/
│   │   │   ├── binanceService.js
│   │   │   ├── pairSelectionService.js
│   │   │   └── tradingService.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Configuration.js
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation de l'API Binance

## 🎯 Roadmap

- [ ] Backtesting avec données historiques
- [ ] Stop-loss et take-profit automatiques
- [ ] Notifications par email/Telegram
- [ ] Support de plus d'exchanges
- [ ] Machine Learning pour la prédiction
- [ ] Mode paper trading (simulation)

---

Made with ❤️ for crypto traders