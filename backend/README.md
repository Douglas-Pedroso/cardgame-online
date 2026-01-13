# 🎮 Card Game Online - Backend

Backend REST API com WebSocket para o Card Game Online multiplayer.

## 📋 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **Socket.IO** - Comunicação em tempo real
- **Render.com** - Hospedagem (gratuita)

## 🚀 Instalação Local

### 1. Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando

### 2. Clonar e instalar dependências

```bash
cd backend
npm install
```

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite `.env`:

```env
# Banco de dados PostgreSQL local
DATABASE_URL=postgresql://usuario:senha@localhost:5432/cardgame_online

PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5500  # ou sua porta do frontend
```

### 4. Criar banco de dados

```bash
# Com psql
createdb cardgame_online
```

### 5. Inicializar tabelas

```bash
npm run migrate
```

### 6. Iniciar servidor em desenvolvimento

```bash
npm run dev
```

O servidor estará em `http://localhost:3000`

## 🌐 Deployment no Render

### 1. Criar conta no Render

Acesse [render.com](https://render.com) e crie uma conta gratuita.

### 2. Criar banco de dados PostgreSQL

1. No dashboard do Render, clique em **"New +"**
2. Selecione **"PostgreSQL"**
3. Configurações:
   - **Name**: `cardgame-db`
   - **Region**: Selecione a mais próxima
   - **PostgreSQL Version**: 16
   - **User**: Render atribui automaticamente
4. Clique **"Create Database"**

Copie a **URL da conexão interna** (usará depois).

### 3. Criar Web Service para backend

1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configurações:
   - **Name**: `cardgame-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Clique em **"Environment"** e adicione variáveis:

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | Cole a URL do PostgreSQL |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `CLIENT_URL` | `https://seu-usuario.github.io/cardgame-online` |

5. Clique **"Create Web Service"**

Aguarde o deploy. Sua URL será: `https://cardgame-backend.render.com`

### 4. Atualize a URL no frontend

Em `js/api-handler.js`, atualize:

```javascript
const API_BASE_URL = 'https://seu-backend-render.onrender.com/api';
```

## 📡 API Endpoints

### Criar Sala

```http
POST /api/games/create
Content-Type: application/json

{
  "playerId": "player123",
  "playerDeck": "aquatico"
}
```

**Resposta (201):**
```json
{
  "success": true,
  "game": {
    "gameId": "uuid",
    "roomCode": "ABC123",
    "playerId": "player123",
    "playerDeck": "aquatico",
    "status": "waiting"
  }
}
```

### Entrar em Sala

```http
GET /api/games/ABC123/join?playerId=player456&playerDeck=planta
```

**Resposta (200):**
```json
{
  "success": true,
  "game": {
    "gameId": "uuid",
    "roomCode": "ABC123",
    "player1Id": "player123",
    "player1Deck": "aquatico",
    "player2Id": "player456",
    "player2Deck": "planta",
    "status": "waiting"
  }
}
```

### Obter Estado do Jogo

```http
GET /api/games/{gameId}/state
```

### Atualizar Estado do Jogo

```http
PUT /api/games/{gameId}/state
Content-Type: application/json

{
  "playerId": "player123",
  "hand": [...],
  "field": [...],
  "deck": [...],
  "banished": [...],
  "pressureLevel": 0
}
```

### Registrar Ação

```http
POST /api/games/{gameId}/action
Content-Type: application/json

{
  "playerId": "player123",
  "action": "play_card",
  "details": {
    "cardId": "arina_sereia_1",
    "fromZone": "hand",
    "toZone": "field"
  }
}
```

### Deletar Jogo

```http
DELETE /api/games/{gameId}
```

## 🔄 WebSocket Events

### Emitir

- **`join-game`**: Entrar em uma sala
  ```javascript
  socket.emit('join-game', { roomCode, playerId })
  ```

- **`game-state-update`**: Atualizar estado
  ```javascript
  socket.emit('game-state-update', { roomCode, playerId, gameState })
  ```

- **`player-action`**: Registrar ação
  ```javascript
  socket.emit('player-action', { roomCode, playerId, action, details })
  ```

- **`end-turn`**: Passar turno
  ```javascript
  socket.emit('end-turn', { roomCode, nextPlayer })
  ```

- **`surrender`**: Render-se
  ```javascript
  socket.emit('surrender', { roomCode, playerId })
  ```

### Escutar

- **`player-joined`**: Um jogador entrou
- **`game-state-update`**: Estado foi atualizado
- **`player-action`**: Ação foi executada
- **`turn-changed`**: Turno mudou
- **`player-disconnected`**: Um jogador desconectou
- **`game-ended`**: Jogo terminou

## 📝 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do PostgreSQL
│   ├── controllers/             # Lógica de negócio (futuro)
│   ├── middleware/              # Middlewares customizados
│   ├── migrations/
│   │   └── init.js              # Inicializar banco de dados
│   ├── models/                  # Modelos de dados (futuro)
│   ├── routes/
│   │   └── games.js             # Rotas de jogo
│   ├── utils/                   # Funções utilitárias
│   └── server.js                # Servidor principal
├── package.json
├── .env.example
└── README.md
```

## 🔒 Segurança

⚠️ **Para produção, implemente:**

1. Autenticação (JWT)
2. Rate limiting
3. Input validation
4. HTTPS (automático no Render)
5. Validação de CORS restritiva

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

Verifique a `DATABASE_URL` em `.env`:

```bash
# Teste a conexão
psql $DATABASE_URL
```

### WebSocket não conecta

Certifique-se de que:
- A URL do backend está correta em `api-handler.js`
- CORS está configurado para sua URL de frontend
- O backend está rodando e acessível

### Porta 3000 já em uso

```bash
# Mude em .env
PORT=3001
```

## 📞 Suporte

Para erros, verifique os logs do Render:

1. Dashboard do Render
2. Selecione seu Web Service
3. Abra a aba **"Logs"**

## 📄 Licença

MIT
