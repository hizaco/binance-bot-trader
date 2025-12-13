# ⚡ Quick Start Guide

Lancez votre bot de trading Binance en 5 minutes !

## 🎯 Prérequis Rapide

- ✅ Node.js 18+ installé
- ✅ Compte Binance avec des fonds USDT
- ✅ Clés API Binance (voir ci-dessous)

## 🔑 Étape 1 : Obtenir les Clés API (2 min)

1. Connectez-vous à [Binance.com](https://www.binance.com)
2. **Profile** → **API Management** → **Create API**
3. ⚠️ **Important** : Cochez SEULEMENT "Enable Spot & Margin Trading"
4. Copiez votre **API Key** et **Secret Key**

## 🚀 Étape 2 : Installation Rapide avec Docker (2 min)

```bash
# Cloner
git clone https://github.com/hizaco/binance-bot-trader.git
cd binance-bot-trader

# Configurer
cp backend/.env.example backend/.env
nano backend/.env  # Coller vos clés API

# Lancer
docker-compose up
```

Ouvrez http://localhost:3000 🎉

## 💻 Étape 2 Alternative : Sans Docker (3 min)

### Backend
```bash
cd backend
npm install
cp .env.example .env
nano .env  # Coller vos clés API
npm start
```

### Frontend (nouveau terminal)
```bash
cd frontend
npm install
npm start
```

Ouvrez http://localhost:3000 🎉

## 🎮 Étape 3 : Configurer le Bot (1 min)

Dans l'interface web :

1. **Portfolio %** : Commencez avec **5-10%** ⚠️
2. **Risk Level** : Choisissez **Safe** 🛡️
3. **API Key** : Collez votre clé
4. **API Secret** : Collez votre secret
5. Cliquez **🚀 Start Trading**

## ✅ Vérification

Le Dashboard devrait afficher :
- ✅ Status : Running (vert)
- ✅ Votre portfolio en USDT
- ✅ Trades actifs (peut prendre quelques minutes)

## ⚠️ Conseils de Sécurité

- 🔒 Commencez TOUJOURS avec un petit % (5-10%)
- 🔒 Testez d'abord en mode Safe
- 🔒 Surveillez les premières heures
- 🔒 Ne partagez JAMAIS vos clés API

## 🐛 Problèmes ?

### "Failed to initialize Binance client"
→ Vérifiez vos clés API dans `.env`

### "No USDT balance"
→ Déposez des USDT sur Binance

### Backend ne répond pas
```bash
curl http://localhost:3001/api/health
```
Si erreur, vérifiez les logs : `docker-compose logs backend`

## 📚 Documentation Complète

- [README.md](README.md) - Documentation complète
- [SETUP.md](SETUP.md) - Guide d'installation détaillé
- [API.md](API.md) - Documentation API

## 🎯 Prochaines Étapes

1. Surveillez votre bot pendant 1-2 heures
2. Si tout va bien, augmentez progressivement le %
3. Essayez le niveau "Medium" après quelques trades
4. Consultez régulièrement le Dashboard

## 💡 Astuces

- Le bot analyse le marché toutes les **60 secondes**
- Il sélectionne les **10 meilleures paires** selon votre profil de risque
- Maximum **3 trades actifs** simultanément
- Les trades sont exécutés en **MARKET** orders

## 📊 Comprendre les Niveaux de Risque

| Niveau | Volatilité | Gains Potentiels | Pour Qui |
|--------|-----------|------------------|----------|
| 🛡️ **Safe** | 0.5-3% | Faibles mais stables | Débutants |
| ⚖️ **Medium** | 2-7% | Moyens | Intermédiaires |
| 🚀 **High** | 5-20% | Élevés mais risqués | Expérimentés |

## 🛑 Arrêter le Bot

Dans le Dashboard, cliquez sur **⏹️ Stop Trading**

Ou arrêtez les serveurs :
```bash
docker-compose down  # Avec Docker
# ou Ctrl+C dans les terminaux
```

## ❓ Besoin d'Aide ?

- 📖 Lisez [SETUP.md](SETUP.md) pour plus de détails
- 🐛 Ouvrez une issue sur GitHub
- 💬 Consultez la documentation Binance

---

**Bon trading ! 🚀📈**

⚠️ Rappel : Le trading comporte des risques. Ne tradez que ce que vous pouvez perdre.