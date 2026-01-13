# 📊 Estrutura do Projeto - Visão Geral

## 📁 Árvore de Pastas

```
cardgame-online/
│
├── 📄 index.html                 # Página principal do jogo
├── 📄 README.md                  # Documentação principal
├── 📄 DEPLOYMENT.md              # Guia de deployment
├── 📄 API_EXAMPLES.md            # Exemplos de uso da API
│
├── 📁 css/
│   ├── style.css                 # Estilos gerais
│   └── cards.css                 # Estilos das cartas
│
├── 📁 js/
│   ├── decks.js                  # ✅ Base de dados das cartas (4 decks)
│   ├── api-handler.js            # ✅ NOVO: Comunicação com API/WebSocket
│   ├── config.js                 # ❌ DESCARTADO (era Firebase)
│   ├── firebase-handler.js       # ❌ DESCARTADO (substituído)
│   ├── ui.js                     # 🔄 A IMPLEMENTAR: Interface do usuário
│   └── game.js                   # 🔄 A IMPLEMENTAR: Lógica do jogo
│
├── 📁 assets/
│   └── cards/
│       ├── aquatico/
│       ├── cavaleiro/
│       ├── fada/
│       └── planta/
│
└── 📁 backend/                   # ✅ NOVO: Servidor Node.js
    │
    ├── 📄 package.json           # Dependências Node.js
    ├── 📄 .env.example           # Variáveis de ambiente
    ├── 📄 .gitignore
    ├── 📄 README.md              # Documentação do backend
    │
    └── 📁 src/
        │
        ├── 📁 config/
        │   └── database.js       # Configuração PostgreSQL
        │
        ├── 📁 migrations/
        │   └── init.js           # Script de inicialização do BD
        │
        ├── 📁 routes/
        │   └── games.js          # ✅ Rotas da API REST
        │
        ├── 📁 controllers/       # 📁 Vazio (para futuro)
        ├── 📁 models/            # 📁 Vazio (para futuro)
        ├── 📁 middleware/        # 📁 Vazio (para futuro)
        ├── 📁 utils/             # 📁 Vazio (para futuro)
        │
        └── server.js             # ✅ Servidor principal com Socket.IO
```

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (GitHub Pages)                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ index.html                                           │   │
│  │  ├── decks.js (dados das cartas)                     │   │
│  │  ├── api-handler.js (comunicação)                    │   │
│  │  ├── ui.js (interface) 🔄                            │   │
│  │  └── game.js (lógica) 🔄                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│         ↓ HTTP Requests                                     │
│         ↑ JSON Responses                                    │
│         ↕ WebSocket Events                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Backend (Render)                                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ server.js (Express + Socket.IO)                      │   │
│  │  ├── /api/games/create (POST)                        │   │
│  │  ├── /api/games/:code/join (GET)                     │   │
│  │  ├── /api/games/:id/state (GET/PUT)                 │   │
│  │  ├── /api/games/:id/action (POST)                   │   │
│  │  └── WebSocket Listeners/Emitters                    │   │
│  │                                                       │   │
│  │ routes/games.js (Lógica das rotas)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│         ↓ SQL Queries                                       │
│         ↑ Resultados                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Banco de Dados (Render PostgreSQL)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ games (tabela principal)                             │   │
│  │ game_states (estado de cada jogador)                 │   │
│  │ game_actions (log de ações)                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎮 Estados do Jogo

```
Início
  ↓
┌─────────────────────┐
│  Menu Principal     │  ← Player vê opções: Criar/Entrar
└────────────┬────────┘
             ↓
    ┌────────────────────┐
    │  Criar Sala        │
    │  ou               │
    │  Entrar em Sala   │
    └────────┬───────────┘
             ↓
┌─────────────────────┐
│ Aguardando Oponente │  ← WebSocket: player-joined
└────────────┬────────┘
             ↓
┌──────────────────────┐
│ Pedra, Papel, Tesoura│  ← Define quem começa
└────────────┬─────────┘
             ↓
┌──────────────────────┐
│   Jogo em Andamento  │  ← Loop: turno → ações → estado
└────────────┬─────────┘
             ↓
┌──────────────────────┐
│   Jogo Finalizado    │  ← Mostrar vencedor
└──────────────────────┘
```

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/games/create` | Criar nova sala |
| GET | `/api/games/:code/join` | Entrar em sala |
| GET | `/api/games/:id/state` | Obter estado |
| PUT | `/api/games/:id/state` | Atualizar estado |
| POST | `/api/games/:id/action` | Registrar ação |
| DELETE | `/api/games/:id` | Deletar jogo |
| GET | `/api/health` | Verificar servidor |

## 🔌 Eventos WebSocket

**Cliente → Servidor (Emitir):**
- `join-game`
- `game-state-update`
- `player-action`
- `end-turn`
- `surrender`

**Servidor → Cliente (Escutar):**
- `player-joined`
- `game-state-update`
- `player-action`
- `turn-changed`
- `player-disconnected`
- `game-ended`

## 📦 Dependências

### Backend (Node.js)
```json
{
  "express": "REST framework",
  "cors": "Comunicação cross-origin",
  "dotenv": "Variáveis de ambiente",
  "pg": "Conexão PostgreSQL",
  "uuid": "IDs únicos",
  "socket.io": "WebSocket",
  "helmet": "Segurança"
}
```

### Frontend
```
- Socket.IO Client (CDN)
- Sem outras dependências (vanilla JS)
```

## ✅ Status de Implementação

| Componente | Status | Descrição |
|-----------|--------|-----------|
| Estrutura de pastas | ✅ Completo | Backend + Frontend estruturado |
| Banco de dados | ✅ Completo | Schema SQL pronto |
| API REST | ✅ Completo | 6 endpoints implementados |
| WebSocket | ✅ Completo | 5 eventos configurados |
| api-handler.js | ✅ Completo | Toda comunicação pronta |
| decks.js | ✅ Completo | 4 decks com 20 cartas cada |
| index.html | ✅ Completo | UI com todas as telas |
| ui.js | 🔄 A FAZER | Renderizar componentes |
| game.js | 🔄 A FAZER | Lógica de turnos e regras |
| Deployment | ✅ Completo | Guia e configuração prontos |

## 🚀 Próximos Passos

### Imediato (Estrutura)
1. ✅ Criar backend Node.js
2. ✅ Configurar PostgreSQL
3. ✅ Implementar API REST
4. ✅ Configurar WebSocket
5. ✅ Criar api-handler.js

### Curto Prazo (Implementação)
6. 🔄 Implementar `ui.js` (renderizar jogo)
7. 🔄 Implementar `game.js` (lógica de turnos)
8. 🔄 Testar comunicação em tempo real

### Médio Prazo (Otimização)
9. Adicionar autenticação (JWT)
10. Implementar rate limiting
11. Melhorar validações
12. Adicionar testes automatizados

## 📚 Documentação

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Como fazer deploy
- **[API_EXAMPLES.md](./API_EXAMPLES.md)** - Exemplos de código
- **[backend/README.md](./backend/README.md)** - Docs do backend
- **[README.md](./README.md)** - Docs gerais

## 💡 Pontos-Chave

1. **Sem custo**: Tudo rodando em planos gratuitos (Render + PostgreSQL + GitHub Pages)
2. **Escalável**: Arquitetura preparada para crescer
3. **Segura**: CORS, validações e WebSocket configurados
4. **Modular**: Frontend e backend completamente separados
5. **Documentado**: Exemplos e guias completos

---

**Você tem a infraestrutura pronta para implementar a lógica do jogo! 🎯**
