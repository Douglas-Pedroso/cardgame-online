# ✅ Checklist de Deployment - Card Game Online

## 📋 Pré-Requisitos
- [ ] Conta GitHub criada
- [ ] Conta Render.com criada (gratuita)
- [ ] Git instalado localmente
- [ ] Node.js 18+ instalado (para testes locais)

## 🔧 Etapa 1: Preparar Repositório GitHub

### 1.1 Inicializar Git
```bash
cd c:\Users\tragi\Desktop\cardgame-online
git init
git add .
git commit -m "Initial commit - Card Game Online with Render backend"
```

- [ ] Git inicializado com sucesso

### 1.2 Criar Repositório no GitHub
- [ ] Acesse [github.com/new](https://github.com/new)
- [ ] Nome do repositório: `cardgame-online`
- [ ] Descrição: `Online multiplayer card game with real-time gameplay`
- [ ] Público (para GitHub Pages)
- [ ] Criar repositório

### 1.3 Conectar Repositório Local
```bash
git remote add origin https://github.com/SEU_USUARIO/cardgame-online.git
git branch -M main
git push -u origin main
```

- [ ] Push para GitHub realizado
- [ ] Verificar em github.com/seu-usuario/cardgame-online

## 🗄️ Etapa 2: Criar PostgreSQL no Render

### 2.1 Acessar Render Dashboard
- [ ] Fazer login em [render.com](https://render.com)
- [ ] Clicar em **"New +"** no dashboard

### 2.2 Criar Banco de Dados
- [ ] Selecionar **"PostgreSQL"**
- [ ] Preencher:
  - [ ] **Name**: `cardgame-db`
  - [ ] **Database**: `cardgame_online`
  - [ ] **User**: Deixar automático
  - [ ] **Region**: Selecionar a mais próxima
  - [ ] **PostgreSQL Version**: 16
- [ ] Clicar **"Create Database"**

### 2.3 Copiar Credenciais
- [ ] Aguardar banco ser criado (~3-5 min)
- [ ] Copiar **"Internal Database URL"** (não usar a externa)
- [ ] Guardar a URL em um lugar seguro

```
postgresql://user:password@dpg-xxxx.render.com/cardgame_online
```

- [ ] URL do PostgreSQL copiada

## 🚀 Etapa 3: Fazer Deploy do Backend

### 3.1 Acessar Render
- [ ] Dashboard do Render
- [ ] Clicar em **"New +"**

### 3.2 Criar Web Service
- [ ] Selecionar **"Web Service"**
- [ ] Selecionar **"Build and deploy from a Git repository"**
- [ ] Conectar GitHub (autorizar acesso)
- [ ] Selecionar repositório: `cardgame-online`

### 3.3 Configurar Deployment
- [ ] **Name**: `cardgame-backend`
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `npm install && cd backend && npm install`
- [ ] **Start Command**: `cd backend && npm start`
- [ ] **Region**: Mesmo do PostgreSQL
- [ ] **Plan**: Free

### 3.4 Adicionar Variáveis de Ambiente
- [ ] Clicar em **"Environment"**
- [ ] Adicionar variáveis:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | Cole a URL copiada do PostgreSQL |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://seu-usuario.github.io/cardgame-online` |
| `PORT` | `3000` |

- [ ] Todas as variáveis adicionadas

### 3.5 Deploy
- [ ] Clicar **"Create Web Service"**
- [ ] Aguardar deploy completar (~5-10 min)
- [ ] Copiar URL do serviço: `https://seu-backend-render.onrender.com`

- [ ] Backend rodando e acessível

## 📝 Etapa 4: Atualizar Configurações Frontend

### 4.1 Atualizar api-handler.js
- [ ] Abrir `js/api-handler.js`
- [ ] Atualizar linhas 3 e 14:

```javascript
// Linha 3
const API_BASE_URL = 'https://seu-backend-render.onrender.com/api';

// Linha 14
const socketURL = 'https://seu-backend-render.onrender.com';
```

- [ ] API_BASE_URL atualizada
- [ ] socketURL atualizado

### 4.2 Verificar index.html
- [ ] Confirmar que está incluindo:
  - [ ] Socket.IO: `<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>`
  - [ ] api-handler.js: `<script src="js/api-handler.js"></script>`

## 📤 Etapa 5: Fazer Push das Mudanças

### 5.1 Commit e Push
```bash
git add .
git commit -m "Configure API endpoints and GitHub Pages deployment"
git push origin main
```

- [ ] Mudanças enviadas para GitHub

### 5.2 Aguardar Auto-Deployment
- [ ] Render detecta novo push automaticamente
- [ ] Backend redeploy iniciado (~2-5 min)
- [ ] Verificar **"Deployments"** no Render

- [ ] Deploy do backend concluído

## 🌐 Etapa 6: Ativar GitHub Pages

### 6.1 Acessar Repositório GitHub
- [ ] Ir para Settings do repositório
- [ ] Menu esquerdo → **"Pages"**

### 6.2 Configurar GitHub Pages
- [ ] **Source**: `Deploy from a branch`
- [ ] **Branch**: `main` com pasta `/root`
- [ ] Clicar **"Save"**

- [ ] GitHub Pages ativado
- [ ] URL disponível em: `https://seu-usuario.github.io/cardgame-online`

## ✅ Etapa 7: Testes

### 7.1 Testar Backend
```
https://seu-backend-render.onrender.com/api/health
```

- [ ] Resposta: `{"status":"OK",...}`
- [ ] Backend está rodando

### 7.2 Testar Frontend
```
https://seu-usuario.github.io/cardgame-online
```

- [ ] Tela de menu aparece
- [ ] Nenhum erro de console (F12)

### 7.3 Testar Criar Sala
- [ ] Clique em "Criar Sala"
- [ ] Escolha um deck
- [ ] [ ] Código da sala aparece
- [ ] [ ] Página aguarda oponente

### 7.4 Testar Entrar Sala (2 abas)
- [ ] Abra em nova aba/navegador
- [ ] Clique em "Entrar na Sala"
- [ ] Insira código da sala
- [ ] Escolha outro deck
- [ ] [ ] Ambos conectam com sucesso
- [ ] [ ] WebSocket conecta (verificar console)

### 7.5 Verificar Comunicação em Tempo Real
- [ ] Player 1 e Player 2 podem ver um ao outro
- [ ] Mensagens WebSocket aparecem no console
- [ ] Nenhum erro de CORS

- [ ] Todos os testes passaram

## 🔒 Etapa 8: Segurança (Opcional Agora)

### 8.1 Verificar Variáveis de Ambiente
- [ ] `.env` **NÃO** está commitado (verificar `.gitignore`)
- [ ] Senhas/tokens nunca aparecem em código

### 8.2 Configuração de CORS
- [ ] Render está configurado para aceitar apenas seu domínio
- [ ] Verificar em `backend/src/server.js` linha ~16

```javascript
origin: process.env.CLIENT_URL || 'http://localhost:5500'
```

- [ ] CORS configurado corretamente

## 📊 Etapa 9: Monitoramento

### 9.1 Verificar Logs do Backend
- [ ] Render Dashboard → seu Web Service
- [ ] Aba **"Logs"**
- [ ] Verificar se há erros

### 9.2 Verificar Banco de Dados
- [ ] No Render, ir ao serviço PostgreSQL
- [ ] Copiar URL externa
- [ ] Testar conexão (se souber usar psql)

- [ ] Sem erros nos logs

## 🎉 Checklist Final

- [ ] Repositório GitHub criado e configurado
- [ ] PostgreSQL no Render criado e rodando
- [ ] Backend Node.js deployado no Render
- [ ] GitHub Pages ativado
- [ ] Variáveis de ambiente configuradas
- [ ] Frontend atualizado com URLs corretas
- [ ] Testes de comunicação passando
- [ ] Sem erros no console
- [ ] 2 jogadores conseguem entrar na mesma sala
- [ ] WebSocket conecta e comunica em tempo real

## 🚀 Você está pronto!

Agora pode:
- [ ] Implementar a lógica do jogo em `game.js`
- [ ] Implementar a interface em `ui.js`
- [ ] Adicionar mais funcionalidades
- [ ] Convidar amigos para jogar!

## 📞 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Erro 404 no backend | Verificar URL em api-handler.js |
| CORS Error | Verificar CLIENT_URL no Render |
| WebSocket timeout | Pode ser cold start do Render (aguarde 1min) |
| Banco de dados vazio | Execute `npm run migrate` no Render |
| GitHub Pages não carrega | Verifique Settings → Pages no GitHub |

---

**Tempo estimado: 30-45 minutos**

Após completar este checklist, sua aplicação estará 100% online e pronta para implementação da lógica do jogo! 🎮
