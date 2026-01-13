# 📚 Referência Rápida - Card Game Online

## 🚀 Começar em 3 Passos

### 1. Clone e Configure
```bash
cd seu-projeto
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/cardgame-online.git
git push -u origin main
```

### 2. Deploy Automático
- Render: PostgreSQL + Backend (30 min)
- GitHub: Pages ativado (5 min)

### 3. Teste
```
https://seu-usuario.github.io/cardgame-online
```

---

## 📡 API Rápida

### Criar Jogo
```javascript
const game = await window.API.createGame(playerId, 'aquatico');
console.log(game.roomCode); // 'ABC123'
```

### Entrar em Jogo
```javascript
const game = await window.API.joinGame('ABC123', playerId, 'planta');
```

### Sincronizar Estado
```javascript
await window.API.updateGameState(gameId, playerId, {
  hand: [],
  field: [],
  deck: [],
  banished: [],
  pressureLevel: 0
});
```

### Escutar Oponente
```javascript
window.API.onGameStateUpdate(({playerId, gameState}) => {
  console.log('Oponente atualizou:', gameState);
});
```

### Passar Turno
```javascript
window.API.emitEndTurn(roomCode, opponentId);
```

---

## 📁 Arquivos Principais

| Arquivo | Propósito |
|---------|-----------|
| `index.html` | Estrutura HTML |
| `js/api-handler.js` | Comunicação com backend |
| `js/ui.js` | Renderizar interface |
| `js/game.js` | Lógica do jogo |
| `js/decks.js` | Dados das cartas |
| `backend/src/server.js` | Servidor Node.js |
| `backend/src/routes/games.js` | Rotas API |

---

## 🔄 Fluxo do Jogo

```
Menu
  ↓
Criar/Entrar Sala
  ↓
Aguardar Oponente
  ↓
Pedra, Papel, Tesoura
  ↓
Jogo (Loop de Turnos)
  ↓
Fim do Jogo
  ↓
Menu
```

---

## 🎴 4 Decks Disponíveis

| Deck | Ícone | Cor | Cartas |
|------|-------|-----|--------|
| Aquático | 🌊 | #4A90E2 | 20 |
| Planta | 🌿 | #7CB342 | 20 |
| Fada | 🧚 | #E91E63 | 20 |
| Cavaleiro | 🏹 | #FF6F00 | 20 |

**Acessar:** `DECKS.aquatico.cards[0]`

---

## 🗄️ Banco de Dados

### Tabela: games
```sql
id, room_code, player1_id, player2_id, 
player1_deck, player2_deck, status, current_turn
```

### Tabela: game_states
```sql
id, game_id, player_id, hand (JSON), 
field (JSON), deck (JSON), banished (JSON), pressure_level
```

### Tabela: game_actions
```sql
id, game_id, player_id, action, details (JSON)
```

---

## 🔌 WebSocket Events

### Emitir
```javascript
socket.emit('join-game', {roomCode, playerId})
socket.emit('game-state-update', {roomCode, playerId, gameState})
socket.emit('player-action', {roomCode, playerId, action, details})
socket.emit('end-turn', {roomCode, nextPlayer})
socket.emit('surrender', {roomCode, playerId})
```

### Escutar
```javascript
socket.on('player-joined', (data) => {})
socket.on('game-state-update', (data) => {})
socket.on('player-action', (data) => {})
socket.on('turn-changed', (data) => {})
socket.on('player-disconnected', (data) => {})
socket.on('game-ended', (data) => {})
```

---

## 💾 localStorage

```javascript
// Guardar
localStorage.setItem('gameId', gameId);
localStorage.setItem('playerId', playerId);
localStorage.setItem('roomCode', roomCode);

// Recuperar
const gameId = localStorage.getItem('gameId');
```

---

## 🐛 Debug

### Ver logs
```javascript
// Abrir console (F12)
// Todos os console.log estarão lá
```

### Testar API
```bash
# Terminal
curl https://seu-backend-render.onrender.com/api/health
```

### Erro comum: CORS
Solução: Verificar `CLIENT_URL` em `backend/.env`

---

## 📊 Variáveis de Estado do Jogo

```javascript
const gameState = {
  hand: [],           // Cartas na mão
  field: [],          // Cartas em jogo
  deck: [],           // Cartas restantes
  banished: [],       // Cartas removidas
  pressureLevel: 0    // Nível de pressão
};
```

---

## 🎯 Implementar Drag & Drop (Exemplo)

```javascript
// Em um card elemento
card.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('cardId', card.id);
  e.dataTransfer.setData('fromZone', 'hand');
});

// Em um slot do campo
slot.addEventListener('drop', (e) => {
  const cardId = e.dataTransfer.getData('cardId');
  const fromZone = e.dataTransfer.getData('fromZone');
  
  // Mover carta
  moveCard(cardId, fromZone, 'field');
});
```

---

## 🔐 Segurança (Futuro)

### JWT Token (após implementar)
```javascript
const token = localStorage.getItem('token');
fetch('/api/games', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 📱 Responsividade

HTML já tem viewport configurado:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🌍 URLs de Deployment

```
Frontend: https://seu-usuario.github.io/cardgame-online
Backend:  https://seu-backend-render.onrender.com
Banco:    postgresql://... (interno do Render)
```

---

## ⚡ Performance

- Cache de cartas em `DECKS` (não reclone)
- WebSocket em vez de polling
- Índices no PostgreSQL
- Gzip automático no Render

---

## 🎓 Estrutura de uma Carta

```javascript
{
  id: "arina_sereia_1",           // ID único
  name: "Arina a Sereia",          // Nome
  cost: 1,                         // Custo de mana
  power: 1,                        // Poder de ataque
  type: "Criatura: Aquático",      // Tipo
  effect: "...",                   // Efeito
  image: "arina_sereia.png"        // Imagem
}
```

---

## 📲 Comandos Úteis

```bash
# No backend
npm install          # Instalar dependências
npm run migrate      # Criar tabelas (local)
npm run dev          # Rodar com nodemon
npm start            # Rodar normal

# No git
git add .
git commit -m "mensagem"
git push origin main
git status
git log
```

---

## 🎮 Testar Localmente

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
# Acesso: http://localhost:3000/api/health
```

### Terminal 2: Frontend
```bash
# Abrir index.html em http://localhost:5500
# Usar extensão Live Server do VS Code
```

### Atualizar .env local:
```
DATABASE_URL=postgresql://user:pass@localhost:5432/cardgame_online
CLIENT_URL=http://localhost:5500
```

---

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| CORS Error | Verificar CLIENT_URL |
| WebSocket falha | Aguardar cold start (1min) |
| Banco vazio | npm run migrate |
| Frontend não carrega | Verificar URL em api-handler.js |
| Erro 404 | Verificar nome da rota |

---

## 🏁 Checklist Pré-Deploy

- [ ] Backend commitado no GitHub
- [ ] PostgreSQL criado no Render
- [ ] Web Service configurado no Render
- [ ] Variáveis de ambiente adicionadas
- [ ] index.html com Socket.IO incluído
- [ ] api-handler.js com URLs corretas
- [ ] GitHub Pages ativado
- [ ] Primeiro push feito

---

## 📚 Próxima Leitura

1. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Passo-a-passo
2. **[API_EXAMPLES.md](./API_EXAMPLES.md)** - Exemplos de código
3. **[UI_TEMPLATE.js](./UI_TEMPLATE.js)** - Template pronto para usar

---

**Você tem tudo pronto! Boa sorte! 🚀**
