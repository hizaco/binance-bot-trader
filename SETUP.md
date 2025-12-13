# 📚 Guide de Configuration Détaillé

Ce guide vous accompagne étape par étape dans la configuration du Binance Trading Bot.

## 🎯 Prérequis

### 1. Compte Binance
- Créez un compte sur [Binance.com](https://www.binance.com)
- Complétez la vérification KYC
- Déposez des fonds (USDT recommandé)

### 2. Environnement de Développement
- **Node.js** : Version 18 ou supérieure
  - Vérifier : `node --version`
  - Télécharger : [nodejs.org](https://nodejs.org)
- **npm** : Inclus avec Node.js
  - Vérifier : `npm --version`
- **Git** : Pour cloner le repository
  - Vérifier : `git --version`
  - Télécharger : [git-scm.com](https://git-scm.com)

### 3. Docker (Optionnel mais Recommandé)
- **Docker Desktop** : Pour une installation simplifiée
  - Télécharger : [docker.com](https://www.docker.com/products/docker-desktop)

## 🔐 Configuration des Clés API Binance

### Étape 1 : Créer une API Key

1. Connectez-vous à Binance
2. Allez dans **Profile** → **API Management**
3. Cliquez sur **Create API**
4. Choisissez un nom (ex: "TradingBot")
5. Vérifiez votre identité (2FA, email, etc.)

### Étape 2 : Configurer les Permissions

⚠️ **IMPORTANT** : Pour la sécurité, activez UNIQUEMENT :
- ✅ **Enable Spot & Margin Trading**
- ❌ Désactivez "Enable Withdrawals" (retraits)
- ❌ Désactivez "Enable Futures"

### Étape 3 : Restriction IP (Fortement Recommandé)

1. Trouvez votre IP publique : [whatismyip.com](https://www.whatismyip.com)
2. Dans Binance API Management, cliquez sur **Edit restrictions**
3. Sélectionnez **Restrict access to trusted IPs only**
4. Ajoutez votre IP

### Étape 4 : Sauvegarder les Clés

⚠️ **ATTENTION** : La Secret Key ne s'affiche qu'UNE SEULE FOIS !

```
API Key: xxxxxxxxxxxxxxxxxxx
Secret Key: yyyyyyyyyyyyyyyyyyy
```

Sauvegardez-les dans un endroit sûr (gestionnaire de mots de passe).

## 🚀 Installation

### Option A : Avec Docker (Recommandé)

#### 1. Cloner le Repository
```bash
git clone https://github.com/hizaco/binance-bot-trader.git
cd binance-bot-trader
```

#### 2. Configurer l'Environnement (Optionnel)

**Note** : Cette étape est optionnelle. Vous pouvez démarrer l'application sans configuration et entrer vos clés API via l'interface web.

Pour configurer vos clés API avant le démarrage :
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer avec vos clés
nano .env  # ou vim, code, etc.
```

Contenu du `.env` :
```env
BINANCE_API_KEY=votre_api_key_ici
BINANCE_API_SECRET=votre_api_secret_ici
PORT=3001
NODE_ENV=production
```

#### 3. Lancer avec Docker
```bash
docker-compose up --build
```

Attendez que les conteneurs démarrent...

#### 4. Accéder à l'Application
- Frontend : http://localhost:3000
- Backend API : http://localhost:3001/api/health

### Option B : Installation Manuelle

#### 1. Cloner et Configurer
```bash
git clone https://github.com/hizaco/binance-bot-trader.git
cd binance-bot-trader
```

#### 2. Backend
```bash
cd backend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
nano .env  # Éditer avec vos clés

# Lancer le serveur
npm run dev
```

Dans un nouveau terminal :

#### 3. Frontend
```bash
cd frontend

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

## ✅ Vérification de l'Installation

### 1. Backend
Vérifiez que le backend fonctionne :
```bash
curl http://localhost:3001/api/health
```

Réponse attendue :
```json
{"status":"ok","timestamp":"2024-01-01T12:00:00.000Z"}
```

### 2. Frontend
Ouvrez votre navigateur : http://localhost:3000

Vous devriez voir l'interface du bot avec :
- En-tête "🤖 Binance Trading Bot"
- Indicateur de statut (rouge si arrêté)
- Page de configuration

## 🎮 Premier Lancement

### 1. Configuration Initiale

Dans la page **Configuration** :

1. **Portfolio Percentage** : Commencez avec 5-10%
   - ⚠️ Ne commencez JAMAIS avec 100% !
   - Testez d'abord avec un petit montant

2. **Risk Level** : Commencez avec "Safe"
   - Vous pourrez augmenter plus tard

3. **API Credentials** : 
   - Entrez votre API Key
   - Entrez votre API Secret

### 2. Démarrer le Bot

1. Cliquez sur **🚀 Start Trading**
2. Le bot vérifie vos clés API
3. Si tout est OK, vous êtes redirigé vers le Dashboard

### 3. Surveiller le Bot

Dans le **Dashboard**, vous verrez :
- Vos statistiques en temps réel
- Votre portfolio
- Les trades actifs
- L'historique des trades

## 🐛 Dépannage

### Problème : "Failed to initialize Binance client"

**Causes possibles :**
- Clés API incorrectes
- Restrictions IP mal configurées
- Permissions insuffisantes

**Solution :**
1. Vérifiez vos clés dans `.env`
2. Vérifiez votre IP sur Binance
3. Vérifiez les permissions de l'API

### Problème : "No USDT balance available"

**Cause :** Pas de USDT dans votre compte

**Solution :**
1. Déposez ou achetez des USDT sur Binance
2. Attendez la confirmation
3. Relancez le bot

### Problème : Frontend ne se connecte pas au Backend

**Causes possibles :**
- Backend non démarré
- Port 3001 occupé
- CORS issues

**Solution :**
1. Vérifiez que le backend tourne : `curl http://localhost:3001/api/health`
2. Vérifiez les logs du backend
3. Vérifiez le fichier `frontend/src/services/api.js`

### Problème : Docker ne démarre pas

**Solution :**
```bash
# Nettoyer les conteneurs
docker-compose down

# Reconstruire
docker-compose up --build --force-recreate
```

## 📊 Monitoring et Logs

### Logs du Backend
```bash
# Avec Docker
docker-compose logs -f backend

# Sans Docker
cd backend && npm run dev
```

### Logs du Frontend
```bash
# Avec Docker
docker-compose logs -f frontend

# Sans Docker
cd frontend && npm start
```

## 🔄 Mise à Jour

```bash
# Arrêter l'application
docker-compose down  # ou Ctrl+C

# Mettre à jour le code
git pull origin main

# Relancer
docker-compose up --build
```

## 🛑 Arrêter l'Application

### Avec Docker
```bash
docker-compose down
```

### Sans Docker
- Appuyez sur `Ctrl+C` dans chaque terminal (backend et frontend)

## 💡 Conseils pour Débutants

1. **Commencez Petit** : 5-10% du portfolio, niveau Safe
2. **Surveillez** : Consultez le dashboard régulièrement les premiers jours
3. **Testez** : Laissez tourner quelques heures pour observer
4. **Ajustez** : Modifiez le niveau de risque progressivement
5. **Documentation** : Lisez la doc Binance API

## 📞 Besoin d'Aide ?

- Consultez le [README.md](README.md) principal
- Ouvrez une issue sur GitHub
- Consultez la [documentation Binance](https://binance-docs.github.io/apidocs/)

## 🎓 Ressources Supplémentaires

- [Binance API Documentation](https://binance-docs.github.io/apidocs/spot/en/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)

---

Bon trading ! 🚀📈