# 🎮 Modo Offline - Guia de Uso

## O que é o Modo Offline?

O **Modo Offline** permite que você jogue localmente no seu computador sem precisar de internet. É perfeito para:

- ✅ **Testes** - Testar mecânicas do jogo antes de deployar
- ✅ **Prática** - Aprender as regras do jogo
- ✅ **Desenvolvimento** - Verificar se tudo está funcionando corretamente
- ✅ **Diversão Local** - Jogar com um amigo no mesmo computador

---

## 🎯 Como Usar o Modo Offline

### 1. Na Tela Inicial
- Clique em **"Jogar"** para acessar a seleção de modo
- Escolha **"Modo Offline"** (ícone de desktop)

### 2. Configurar Jogadores

#### Jogador 1
- Digite o **Nome do Jogador 1** (ou deixe "Jogador 1")
- Selecione o **Deck do Jogador 1** 
  - 🌲 Florestal - Proteção e regeneração
  - ❄️ Glacial - Controle e redução de poder
  - 🏜️ Terrana - Ataques diretos

#### Jogador 2
- Digite o **Nome do Jogador 2** (ou deixe "Jogador 2")
- Selecione o **Deck do Jogador 2**

### 3. Iniciar Partida
- Clique em **"Iniciar Partida"**
- O jogo gerará automaticamente um número aleatório para decidir quem começa
- Após 4 cartas iniciais, a partida começa!

---

## 🎲 Sistema de Jogo

### Estrutura Offline
- **Jogador 1** é sempre o jogador **humano**
- **Jogador 2** é controlado pelo **IA básico** (simula um oponente)
- Todos os dados ficam no navegador (sem conexão de internet)

### Fluxo de Jogo
1. **Pedra, Papel, Tesoura** - Decidir quem começa
2. **Distribuição de Cartas** - 4 cartas iniciais para cada um
3. **Turnos Alternados** - Você joga, depois o oponente
4. **Ações** - Mover cartas, passar turno, render-se

---

## 🎴 Mecânicas

### Zonas Disponíveis
- **Mão** - Suas cartas privadas
- **Campo** - 4 espaços para cartas em jogo
- **Deck** - Suas cartas restantes
- **Banido** - Cartas removidas do jogo

### Ações Disponíveis
- **Arrastar Cartas** - Mover cartas entre zonas
- **Ver Detalhes** - Clique em uma carta para ver efeito completo
- **Passar Turno** - Avança para o turno do oponente
- **Render-se** - Termina a partida imediatamente

---

## 🤖 Comportamento da IA

No **Modo Offline**, o Jogador 2 (oponente IA):
- Faz escolhas aleatórias no "Pedra, Papel, Tesoura"
- Compra cartas quando seu turno chega
- No futuro: Será expandido com lógica de jogo mais inteligente

---

## 💾 Dados Locais

Tudo é **armazenado no navegador**:
- ✅ Nomes dos jogadores
- ✅ Decks selecionados
- ✅ Mão de cartas
- ✅ Estado do jogo
- ❌ Não é salvo permanentemente (resete a página = nova partida)

---

## 🔄 Diferenças: Online vs Offline

| Recurso | Online | Offline |
|---------|--------|---------|
| Conexão | Requer Internet | Sem Internet |
| Oponente | Jogador Real | IA Básico |
| Persistência | Servidor | Navegador |
| Código de Sala | Sim | Não |
| WebSocket | Sim | Não |
| API REST | Sim | Não |

---

## 📝 Para Desenvolvedores

### Estrutura de Código Offline

**Game State Global** (em `game.js`):
```javascript
gameState = {
  mode: 'offline',
  isOffline: true,
  currentPlayer: 1,
  currentTurn: 1,
  players: {
    1: { name, deck, hand, field, deckCards, ... },
    2: { name, deck, hand, field, deckCards, ... }
  }
}
```

### Funções Principais
- `showGameModeSelection()` - Selecionar modo (Online/Offline)
- `startOfflineGame()` - Iniciar partida offline
- `handleOfflineRPS()` - Simular Pedra, Papel, Tesoura offline
- `simulateOfflineOpponentTurn()` - IA do oponente

### Fluxo de Jogo Offline
1. Menu → Modo de Jogo → Seleção Offline
2. Configurar Decks → Iniciar Partida
3. Pedra, Papel, Tesoura → Game Screen
4. Turnos alternados → Fim do jogo

---

## 🚀 Próximas Melhorias

- [ ] IA com lógica de jogo inteligente
- [ ] Salvar partidas no IndexedDB
- [ ] Replay de partidas
- [ ] Multiplayer local (2 mouses/teclados)
- [ ] Estatísticas offline

---

## ❓ FAQ

**P: Posso jogar offline com um amigo?**
R: Sim! Use o mesmo computador. Um jogador controla o Jogador 1, outro o Jogador 2. (Suporte melhorado em breve)

**P: Os dados são salvos?**
R: Não, os dados estão apenas na memória do navegador. Se você recarregar a página, perde o jogo.

**P: Posso usar o Modo Offline para testar antes de deployar online?**
R: Sim! Perfeito para isso. A lógica do jogo é a mesma, só muda a comunicação.

**P: A IA é inteligente?**
R: No momento, faz escolhas aleatórias. Será melhorada no futuro.

---

**Desenvolvido para facilitar testes e desenvolvimento do Card Game Online! 🎮**
