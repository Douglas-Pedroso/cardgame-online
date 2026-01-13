# 🚀 Guia Completo de Deployment

## Arquitetura Final

```
┌─────────────────────────────────────────────────────────────┐
│  GitHub Pages (Frontend - Seu domínio .github.io)           │
│  - index.html, CSS, JS, Assets                              │
│  - Conecta via API ao backend                               │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP + WebSocket
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  Render (Backend - cardgame-backend.render.com)             │
│  - Node.js + Express                                        │
│  - Socket.IO para tempo real                                │
│  - REST API                                                 │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL Queries
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  Render PostgreSQL (Banco de Dados)                         │
│  - Tabelas: games, game_states, game_actions               │
│  - Gratuito (500 MB de armazenamento)                      │
└─────────────────────────────────────────────────────────────┘
```

## ⚡ Passo 1: Deploy Backend no Render

### 1.1 Criar repositório no GitHub

Se ainda não tem, faça:

```bash
cd cardgame-online
git init
git add .
git commit -m "Initial commit - Card Game Online"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cardgame-online.git
git push -u origin main
```

### 1.2 Criar PostgreSQL no Render

1. Acesse [render.com](https://render.com) e faça login
2. No dashboard, clique em **"New +"** → **"PostgreSQL"**
3. Preencha:
   - **Name**: `cardgame-db`
   - **Database**: `cardgame_online`
   - **User**: `cardgame` (Render atribui automaticamente)
   - **Region**: Escolha a mais próxima
4. Clique **"Create Database"**
5. **Copie a URL "Internal Database URL"** - você usará em breve

```
postgresql://user:password@dpg-xxx.render.com/cardgame_online
```

### 1.3 Deploy do Backend

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Selecione **"Build and deploy from a Git repository"**
3. Conecte seu GitHub (autorize)
4. Selecione `cardgame-online`
5. Configure:
   - **Name**: `cardgame-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Mesmo do PostgreSQL
6. Clique em **"Advanced"** e em **"Environment"**
7. Adicione as variáveis:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | Cole a URL do PostgreSQL |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `CLIENT_URL` | `https://seu-usuario.github.io/cardgame-online` |

8. Clique **"Create Web Service"**
9. Aguarde o deploy (pode levar 5-10 min)
10. Copie a URL: `https://seu-backend-render.onrender.com`

### 1.4 Atualizar api-handler.js

Em `js/api-handler.js`, atualize:

```javascript
const API_BASE_URL = 'https://seu-backend-render.onrender.com/api';

const socketURL = 'https://seu-backend-render.onrender.com';
```

## 📁 Passo 2: Deploy Frontend no GitHub Pages

### 2.1 Ativar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. Sidebar esquerdo → **Pages**
4. **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` e `/root`
5. Clique **Save**
6. Aguarde alguns minutos

Seu site estará em: `https://seu-usuario.github.io/cardgame-online`

### 2.2 Fazer push das mudanças

```bash
git add .
git commit -m "Configure backend API and GitHub Pages deployment"
git push origin main
```

## ✅ Passo 3: Testes

### 3.1 Testar API

Abra seu navegador e teste:

```
https://seu-backend-render.onrender.com/api/health
```

Você verá:
```json
{"status":"OK","message":"Servidor está funcionando"}
```

### 3.2 Testar Frontend

Acesse:

```
https://seu-usuario.github.io/cardgame-online
```

Você deve ver a tela de menu do jogo.

### 3.3 Testar Jogo Completo

1. Abra em dois abas diferentes (ou navegadores)
2. Na primeira aba: Clique em **"Criar Sala"**
3. Escolha um deck
4. Copie o código da sala
5. Na segunda aba: Clique em **"Entrar na Sala"**
6. Cole o código e escolha outro deck
7. Ambos devem conectar e jogar

## 🔧 Troubleshooting

### Backend não conecta ao banco de dados

1. Verifique a `DATABASE_URL` no Render
2. Teste no terminal:
   ```bash
   psql DATABASE_URL
   ```

### Frontend mostra erro de CORS

1. Verifique se `CLIENT_URL` está correto no backend
2. Reinicie o serviço no Render

### WebSocket desconecta constantemente

1. Pode ser "cold start" do Render (gratuito)
2. Implemente reconexão automática (já existe em `api-handler.js`)

### Banco de dados vazio

Execute a migração:

No Render, vá em **Console** do Web Service e execute:

```bash
npm run migrate
```

## 💰 Custos (Gratuitos!)

- ✅ Render Web Service (Node.js): **Gratuito com limitações**
  - Parado após 15 min sem requisições
  - ~750 horas/mês (sempre ativo)
  
- ✅ Render PostgreSQL: **Gratuito com limitações**
  - 500 MB de armazenamento
  - 90 dias sem acesso = deleção
  
- ✅ GitHub Pages: **Completamente gratuito**

## 🎯 Próximas Otimizações (Futuro)

1. **Implementar UI completa** (`ui.js`)
2. **Implementar lógica de jogo** (`game.js`)
3. **Adicionar autenticação** (JWT)
4. **Rate limiting** para segurança
5. **Caching** (Redis)
6. **Upload de avatar** (Armazenamento)

## 📞 Referências Rápidas

- [Render Docs](https://render.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [PostgreSQL Free Tier](https://www.postgresql.org)
- [Socket.IO](https://socket.io/docs)

---

**Pronto! Seu card game online está no ar! 🎉**
