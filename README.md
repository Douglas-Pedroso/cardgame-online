# 🎴 Card Game Online - Multiplayer

Jogo de cartas online estratégico para 2 jogadores com sincronização em tempo real. Sistema completo com backend Node.js, PostgreSQL e comunicação via WebSocket.

## 🎮 Características

### ✅ Funcionalidades Principais
- **Multiplayer em tempo real** via Socket.IO (Modo Online)
- **Modo Offline** para testes e prática local
- **3 decks únicos** (Florestal 🌲, Glacial ❄️, Terrana 🏜️)
- **Sistema de turnos** com pedra, papel, tesoura para decidir início
- **Movimentação livre** de cartas entre zonas (Mão, Campo, Deck, Banido)
- **Visualização completa** dos decks de ambos jogadores
- **Sistema de pressão** e mecânicas de combate
- **Persistência de dados** em PostgreSQL (Online)
- **API REST** + **WebSocket** para comunicação (Online)

### 🏗️ Arquitetura

```
Frontend (GitHub Pages)
    ↕ REST API + WebSocket
Backend (Node.js + Express + Socket.IO)
    ↕ SQL Queries
PostgreSQL Database
```

### 💰 Hospedagem 100% Gratuita
- **Frontend**: GitHub Pages
- **Backend**: Render.com (Free Tier)
- **Banco de Dados**: Render PostgreSQL (Free Tier)

---

## 🎮 Modos de Jogo

### 🌐 Modo Online
- **Jogar com amigos** via internet
- Requer backend rodando no Render
- Usa WebSocket para sincronização em tempo real
- Dados salvos em PostgreSQL

**Fluxo**:
1. Menu Principal → "Jogar" → "Modo Online"
2. Escolher: "Criar Sala" ou "Entrar na Sala"
3. Configurar nome e deck
4. Compartilhar código com amigo
5. Jogar multiplayer

### 💻 Modo Offline
- **Jogar localmente** no seu computador
- Perfeito para testes e prática
- Não requer internet
- IA básico controla o Jogador 2

**Fluxo**:
1. Menu Principal → "Jogar" → "Modo Offline"
2. Configurar nomes de ambos os jogadores
3. Selecionar decks
4. Iniciar partida
5. Jogar localmente

**Para mais detalhes, veja [OFFLINE_MODE.md](OFFLINE_MODE.md)**

---

## 🚀 Configuração e Deploy

### Pré-requisitos
- Node.js 18.x ou superior
- Git
- Conta no [GitHub](https://github.com)
- Conta no [Render](https://render.com)

### 1️⃣ Configurar Backend

#### 1.1 Criar Banco de Dados no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `cardgame-db` (ou outro nome)
   - **Database**: `cardgame`
   - **User**: (deixe automático)
   - **Region**: `Oregon (US West)`
   - **Plan**: **Free**
4. Clique em **"Create Database"**
5. Aguarde a criação (1-2 minutos)
6. Copie a **Internal Database URL** (será algo como: `postgresql://user:pass@host/database`)

#### 1.2 Deploy do Backend no Render

1. No [Render Dashboard](https://dashboard.render.com), clique **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `cardgame-backend`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**
4. Em **"Environment Variables"**, adicione:
   ```
   DATABASE_URL=<sua-internal-database-url-copiada-acima>
   PORT=10000
   NODE_ENV=production
   ```
5. Clique em **"Create Web Service"**
6. Aguarde o deploy (3-5 minutos)
7. Copie a URL do serviço (ex: `https://cardgame-backend.onrender.com`)

#### 1.3 Executar Migrations

1. No Render Dashboard, vá em seu Web Service
2. Vá para a aba **"Shell"**
3. Execute:
   ```bash
   npm run migrate
   ```
4. Verifique se as tabelas foram criadas com sucesso

### 2️⃣ Configurar Frontend

#### 2.1 Atualizar URL do Backend

1. Abra o arquivo `js/api-handler.js`
2. Localize a linha com `API_BASE_URL`
3. Substitua pela URL do seu backend Render:
   ```javascript
   const API_BASE_URL = 'https://cardgame-backend.onrender.com/api';
   ```

#### 2.2 Deploy no GitHub Pages

1. Crie um repositório no GitHub
2. No terminal, execute:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Card Game Online"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cardgame-online.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings** → **Pages**
4. Em **Source**, selecione **"Deploy from a branch"**
5. Em **Branch**, selecione **"main"** e **"/ (root)"**
6. Clique em **"Save"**
7. Aguarde 2-3 minutos
8. Acesse: `https://SEU_USUARIO.github.io/cardgame-online/`

#### 2.3 Atualizar CORS no Backend

1. Abra `backend/src/server.js`
2. Adicione seu domínio GitHub Pages nas origens permitidas:
   ```javascript
   origin: [
     'https://SEU_USUARIO.github.io',
     'http://localhost:5500',
     'http://localhost:3000'
   ]
   ```
3. Commit e push:
   ```bash
   git add .
   git commit -m "Update CORS settings"
   git push
   ```
4. O Render fará deploy automático em ~2 minutos

---

## 🎯 Como Jogar

### Início do Jogo

1. **Jogador 1**: 
   - Clica em **"Criar Sala"**
   - Escolhe um dos 4 decks
   - Compartilha o **código da sala** com o oponente

2. **Jogador 2**:
   - Clica em **"Entrar na Sala"**
   - Insere o código recebido
   - Escolhe um deck

3. **Pedra, Papel, Tesoura**:
   - Ambos jogadores jogam
   - O vencedor começa com 4 cartas na mão

### Zonas do Jogo

| Zona | Descrição | Visibilidade |
|------|-----------|--------------|
| **Mão** | Cartas privadas do jogador | Apenas o dono |
| **Campo** | 4 espaços para cartas em jogo | Ambos jogadores |
| **Deck** | Pilha de cartas disponíveis | Ambos jogadores |
| **Banido** | Cartas removidas permanentemente | Ambos jogadores |

### Ações no Turno

- **Arrastar cartas** entre zonas livremente
- **Ver deck do oponente** clicando nele
- **Passar turno**: O adversário compra 1 carta aleatória
- **Render-se**: Encerra a partida imediatamente

### Movimentos Permitidos

- Mão → Campo
- Campo → Mão
- Campo → Banido
- Deck → Mão (compra de carta)

### 🏆 Condições de Vitória

- Reduzir a vida/pressão do oponente a 0
- Oponente sem cartas no deck e campo vazio
- Adversário se render

---

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18.x ou superior
- PostgreSQL (ou usar banco Render)

### Configurar Backend Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/cardgame-online.git
   cd cardgame-online/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie arquivo `.env` na pasta `backend/`:
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/cardgame
   PORT=3000
   NODE_ENV=development
   ```

4. Execute as migrations:
   ```bash
   npm run migrate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

6. Backend estará rodando em `http://localhost:3000`

### Configurar Frontend Localmente

1. Abra `js/api-handler.js`
2. Altere a URL para o backend local:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

3. Abra `index.html` com Live Server ou similar

---

## 🎨 Decks Disponíveis

### � Florestal
- **Especialidade**: Proteção e regeneração
- **Cartas principais**: 
  - Broto Protetor (poder 2, imunidade a efeitos)
  - Cavaleiro Verde (poder 3, reação defensiva)
  - Verdanox, o Tríplice Caule (poder 4, múltiplos ataques)
- **Estratégia**: Defesa resiliente com contra-ataques controlados

### ❄️ Glacial
- **Especialidade**: Controle e redução de poder
- **Cartas principais**:
  - Urso Centurião (poder 4, causa pressão ao derrubar)
  - Rainha do Vento (poder 4, buff para glaciais)
  - Behemoth o Calamitoso (poder 4, pressão ao cair)
- **Estratégia**: Freezar ataques e enfraquecer oponentes

### 🏜️ Terrana
- **Especialidade**: Ataques diretos e tutoria
- **Cartas principais**:
  - Valquíria do Sul (poder 4, preparação poderosa)
  - Centauro de Bronze (poder 3-5, escalonado)
  - Falcão Arqueiro (poder 3, debuff contínuo)
- **Estratégia**: Pressão agressiva com suporte constante

---

## 📡 API REST Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/health` | Verifica status do servidor |
| `POST` | `/api/games/create` | Cria nova sala de jogo |
| `GET` | `/api/games/:code/join` | Entra em sala existente |
| `GET` | `/api/games/:id/state` | Obtém estado atual do jogo |
| `PUT` | `/api/games/:id/state` | Atualiza estado do jogo |
| `POST` | `/api/games/:id/action` | Registra ação do jogador |

### WebSocket Events

| Event | Direção | Descrição |
|-------|---------|-----------|
| `join-game` | Cliente → Servidor | Jogador entra na sala |
| `player-joined` | Servidor → Cliente | Notifica entrada de jogador |
| `game-state-update` | Bidirecional | Sincroniza estado do jogo |
| `player-action` | Bidirecional | Transmite ações dos jogadores |
| `disconnect` | Cliente → Servidor | Jogador desconecta |

---

## 🐛 Troubleshooting

### Backend não conecta
- Verifique se o serviço Render está ativo (pode demorar 50s para "acordar" no free tier)
- Confirme que `DATABASE_URL` está configurada corretamente
- Teste o health check: `https://seu-backend.onrender.com/api/health`

### Erro de CORS
- Verifique se seu domínio GitHub Pages está nas origens permitidas em `backend/src/server.js`
- Redeploy do backend após mudanças no CORS

### Cartas não aparecem
- Confirme que as imagens estão em `assets/cards/[tipo]/[nome-carta].png`
- Limpe o cache do navegador (Ctrl + Shift + Delete)

### WebSocket desconecta
- Render Free Tier desliga após 15 minutos de inatividade
- Primeira conexão pode demorar 30-50 segundos
- Implemente reconexão automática no cliente

---

## 📁 Estrutura do Projeto

```
cardgame-online/
├── index.html              # Interface principal do jogo
├── package.json            # Scripts de build/deploy
├── README.md               # Este arquivo
│
├── css/
│   ├── style.css           # Estilos gerais da interface
│   └── cards.css           # Estilos específicos das cartas
│
├── js/
│   ├── api-handler.js      # Comunicação com backend (REST + WebSocket)
│   ├── decks.js            # Base de dados dos 4 decks (80 cartas)
│   ├── game.js             # Lógica do jogo (a implementar)
│   └── ui.js               # Manipulação da interface (a implementar)
│
├── assets/
│   └── cards/              # Imagens das cartas (PNG)
│       ├── florestal/
│       ├── glacial/
│       └── terrana/
│
└── backend/
    ├── package.json        # Dependências Node.js
    ├── .env.example        # Template de variáveis de ambiente
    │
    └── src/
        ├── server.js       # Servidor Express + Socket.IO
        │
        ├── config/
        │   └── database.js # Configuração PostgreSQL
        │
        ├── routes/
        │   └── games.js    # Rotas da API REST
        │
        └── migrations/
            └── init.js     # Script de criação das tabelas
```

---

## 🗄️ Schema do Banco de Dados

### Tabela: `games`
```sql
id SERIAL PRIMARY KEY
code VARCHAR(6) UNIQUE NOT NULL
player1_id VARCHAR(50)
player2_id VARCHAR(50)
player1_deck VARCHAR(20)
player2_deck VARCHAR(20)
current_turn INT DEFAULT 1
status VARCHAR(20) DEFAULT 'waiting'
winner INT
created_at TIMESTAMP DEFAULT NOW()
```

### Tabela: `game_states`
```sql
id SERIAL PRIMARY KEY
game_id INT REFERENCES games(id)
player_id VARCHAR(50) NOT NULL
hand JSONB DEFAULT '[]'
field JSONB DEFAULT '[]'
banished JSONB DEFAULT '[]'
pressure INT DEFAULT 0
updated_at TIMESTAMP DEFAULT NOW()
```

### Tabela: `game_actions`
```sql
id SERIAL PRIMARY KEY
game_id INT REFERENCES games(id)
player_id VARCHAR(50) NOT NULL
action_type VARCHAR(50) NOT NULL
details JSONB
created_at TIMESTAMP DEFAULT NOW()
```

---

## 📚 Documentação Adicional

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura detalhada do sistema
- **[API_EXAMPLES.md](API_EXAMPLES.md)** - Exemplos de uso da API
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guia completo de deployment
- **[backend/README.md](backend/README.md)** - Documentação do backend

---

## 🚧 Status do Projeto

| Componente | Status |
|------------|--------|
| Backend API | ✅ Completo |
| WebSocket | ✅ Completo |
| Banco de Dados | ✅ Completo |
| Interface HTML | ✅ Completo |
| Lógica do Jogo | 🔄 Em desenvolvimento |
| UI Interactions | 🔄 Em desenvolvimento |

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5/CSS3/JavaScript** - Interface do usuário
- **Socket.IO Client** - Comunicação em tempo real
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia

### Backend
- **Node.js 18.x** - Runtime
- **Express.js** - Framework web
- **Socket.IO** - WebSocket
- **PostgreSQL** - Banco de dados
- **Helmet** - Segurança HTTP
- **CORS** - Controle de acesso

### DevOps
- **GitHub Pages** - Hospedagem frontend (gratuito)
- **Render** - Hospedagem backend (gratuito)
- **Git** - Controle de versão

---

## 📜 Licença

Este projeto é um jogo educacional de código aberto. Livre para uso e modificação.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

- **Issues**: Abra uma issue no GitHub para reportar bugs
- **Discussões**: Use a aba Discussions para perguntas gerais
- **Documentação**: Consulte os arquivos `.md` na raiz do projeto

---

**Desenvolvido com ❤️ para amantes de jogos de cartas estratégicos**

🎮 **Bom jogo!**

