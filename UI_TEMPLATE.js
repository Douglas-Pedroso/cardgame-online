// EXEMPLO PRÁTICO: Implementação Inicial de ui.js
// Este é um exemplo básico para começar a implementar a interface

// ========== VARIÁVEIS GLOBAIS ==========

let currentGame = {
  gameId: null,
  roomCode: null,
  playerId: null,
  opponentId: null,
  currentTurn: null
};

let gameState = {
  hand: [],
  field: [],
  deck: [],
  banished: [],
  pressureLevel: 0
};

// ========== MENU INICIAL ==========

function showMenu() {
  document.getElementById('menuScreen').classList.add('active');
  document.getElementById('createGameScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.remove('active');
}

function showCreateGame() {
  document.getElementById('menuScreen').classList.remove('active');
  document.getElementById('createGameScreen').classList.add('active');
}

function showJoinGame() {
  document.getElementById('menuScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.add('active');
}

// ========== CRIAR SALA ==========

async function criarSala(selectedDeck) {
  try {
    const playerId = 'player_' + Date.now();
    
    console.log('🎮 Criando sala com deck:', selectedDeck);
    
    // Chamar API
    const game = await window.API.createGame(playerId, selectedDeck);
    
    // Armazenar informações
    currentGame.gameId = game.gameId;
    currentGame.roomCode = game.roomCode;
    currentGame.playerId = playerId;
    
    // Guardar no localStorage
    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('roomCode', game.roomCode);
    localStorage.setItem('playerId', playerId);
    
    // Preparar listeners de WebSocket
    prepararListenersWebSocket();
    
    // Mostrar tela de espera
    mostrarTelaAguardandoOponente(game.roomCode);
    
  } catch (error) {
    alert('Erro ao criar sala: ' + error.message);
  }
}

async function entrarSala(roomCode, selectedDeck) {
  try {
    const playerId = 'player_' + Date.now();
    
    console.log('🎮 Entrando na sala:', roomCode);
    
    // Chamar API
    const game = await window.API.joinGame(roomCode, playerId, selectedDeck);
    
    // Armazenar informações
    currentGame.gameId = game.gameId;
    currentGame.roomCode = game.roomCode;
    currentGame.playerId = playerId;
    currentGame.opponentId = game.player1Id; // Jogador que criou a sala
    
    // Guardar no localStorage
    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('roomCode', game.roomCode);
    localStorage.setItem('playerId', playerId);
    
    // Preparar listeners de WebSocket
    prepararListenersWebSocket();
    
    // Ambos os jogadores devem estar prontos, mostrar Pedra, Papel, Tesoura
    mostrarTelaPedraoPapelTesoura();
    
  } catch (error) {
    alert('Erro ao entrar na sala: ' + error.message);
  }
}

// ========== TELAS ==========

function mostrarTelaAguardandoOponente(roomCode) {
  document.getElementById('createGameScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.remove('active');
  document.getElementById('waitingScreen').classList.add('active');
  
  // Mostrar código da sala
  document.getElementById('roomCodeDisplay').textContent = roomCode;
}

function mostrarTelaPedraoPapelTesoura() {
  document.getElementById('waitingScreen').classList.remove('active');
  document.getElementById('rpsScreen').classList.add('active');
  document.getElementById('rpsWaiting').classList.add('hidden');
}

function mostrarTelaJogo() {
  document.getElementById('rpsScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.add('active');
  
  // Renderizar o jogo
  renderizarJogo();
}

// ========== ROCK, PAPER, SCISSORS ==========

async function fazerEscolhaRPS(escolha) {
  try {
    // Mostrar "aguardando"
    document.getElementById('rpsWaiting').classList.remove('hidden');
    document.getElementById('rpsChoices').classList.add('hidden');
    
    // Simular decisão do vencedor (em um cenário real, seria via WebSocket)
    const opcoes = ['rock', 'paper', 'scissors'];
    const oponentEscolha = opcoes[Math.floor(Math.random() * 3)];
    
    // Determinar vencedor
    const resultado = determinarVencedorRPS(escolha, oponentEscolha);
    const vencedor = resultado === 1 ? currentGame.playerId : currentGame.opponentId || 'opponent';
    
    // Mostrar resultado
    mostrarResultadoRPS(escolha, oponentEscolha, resultado);
    
    // Após 2 segundos, iniciar jogo
    setTimeout(() => {
      inicializarJogo(vencedor);
      mostrarTelaJogo();
    }, 2000);
    
  } catch (error) {
    console.error('Erro ao fazer escolha RPS:', error);
  }
}

function determinarVencedorRPS(p1, p2) {
  if (p1 === p2) return 0; // Empate
  if (p1 === 'rock' && p2 === 'scissors') return 1; // p1 vence
  if (p1 === 'paper' && p2 === 'rock') return 1;
  if (p1 === 'scissors' && p2 === 'paper') return 1;
  return -1; // p2 vence
}

function mostrarResultadoRPS(sua, oponente, resultado) {
  const textos = {
    'rock': '✊ Pedra',
    'paper': '✋ Papel',
    'scissors': '✌️ Tesoura'
  };
  
  const resultadoTexto = resultado === 1 
    ? '🎉 Você venceu! Você começa!'
    : resultado === 0
    ? '🤝 Empate! Revanche!'
    : '😔 Você perdeu. Oponente começa!';
  
  document.getElementById('rpsResult').innerHTML = `
    <div class="rps-choices">
      <div class="rps-choice">
        <span>Sua escolha</span>
        <div class="rps-large">${textos[sua]}</div>
      </div>
      <div class="rps-vs">VS</div>
      <div class="rps-choice">
        <span>Oponente</span>
        <div class="rps-large">${textos[oponente]}</div>
      </div>
    </div>
    <p class="rps-result-text">${resultadoTexto}</p>
  `;
  document.getElementById('rpsResult').classList.remove('hidden');
}

// ========== INICIALIZAR JOGO ==========

function inicializarJogo(vencedorRPS) {
  // Inicializar estado do jogo
  gameState = {
    hand: [
      DECKS[getCurrentDeck()].cards[0],
      DECKS[getCurrentDeck()].cards[1],
      DECKS[getCurrentDeck()].cards[2],
      DECKS[getCurrentDeck()].cards[3]
    ],
    field: [],
    deck: DECKS[getCurrentDeck()].cards.slice(4),
    banished: [],
    pressureLevel: 0
  };
  
  // Definir quem começa
  currentGame.currentTurn = vencedorRPS;
  
  console.log('🎮 Jogo iniciado!');
  console.log('Começa:', vencedorRPS);
}

// ========== RENDERIZAR JOGO ==========

function renderizarJogo() {
  // Renderizar mão do jogador
  renderizarMaoJogador();
  
  // Renderizar campo do jogador
  renderizarCampoJogador();
  
  // Renderizar informações
  atualizarInfoJogador();
  
  console.log('🎮 Jogo renderizado');
}

function renderizarMaoJogador() {
  const container = document.getElementById('playerHand');
  container.innerHTML = '';
  
  gameState.hand.forEach((card, index) => {
    const cardElement = criarElementoCarta(card, 'hand', index);
    container.appendChild(cardElement);
  });
}

function renderizarCampoJogador() {
  const container = document.getElementById('playerField');
  const slots = container.querySelectorAll('.field-slot');
  
  slots.forEach((slot, index) => {
    slot.innerHTML = '';
    if (gameState.field[index]) {
      const card = gameState.field[index];
      const cardElement = criarElementoCarta(card, 'field', index);
      slot.appendChild(cardElement);
    }
  });
}

function criarElementoCarta(card, zone, index) {
  const div = document.createElement('div');
  div.className = 'card-in-game';
  div.draggable = true;
  div.innerHTML = `
    <div class="card-content">
      <div class="card-name">${card.name}</div>
      <div class="card-cost">💜 ${card.cost}</div>
      <div class="card-power">⚔️ ${card.power}</div>
      <div class="card-type">${card.type}</div>
    </div>
  `;
  
  // Listeners para drag & drop (futura implementação)
  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cardIndex', index);
    e.dataTransfer.setData('fromZone', zone);
  });
  
  return div;
}

function atualizarInfoJogador() {
  document.getElementById('playerNameDisplay').textContent = currentGame.playerId || 'Você';
  document.getElementById('playerDeckCount').textContent = gameState.deck.length;
  document.getElementById('opponentName').textContent = currentGame.opponentId || 'Oponente';
  
  // Atualizar turno
  if (currentGame.currentTurn === currentGame.playerId) {
    document.getElementById('turnText').textContent = '🎯 Seu Turno';
    document.getElementById('turnIndicator').style.color = '#4CAF50';
  } else {
    document.getElementById('turnText').textContent = '⏳ Aguardando...';
    document.getElementById('turnIndicator').style.color = '#FF9800';
  }
}

// ========== LISTENERS DE WEBSOCKET ==========

function prepararListenersWebSocket() {
  // Jogador entrou
  window.API.onPlayerJoined((data) => {
    console.log('👤 Novo jogador entrou:', data.playerId);
    currentGame.opponentId = data.playerId;
    localStorage.setItem('opponentId', data.playerId);
    
    // Se estava aguardando, agora pode ir para RPS
    if (document.getElementById('waitingScreen').classList.contains('active')) {
      mostrarTelaPedraoPapelTesoura();
    }
  });
  
  // Estado atualizado
  window.API.onGameStateUpdate((data) => {
    console.log('🔄 Estado atualizado por:', data.playerId);
    
    if (data.playerId !== currentGame.playerId) {
      // É do oponente, atualizar visualização
      atualizarCampoOponente(data.gameState);
    }
  });
  
  // Ação do oponente
  window.API.onPlayerAction((data) => {
    console.log('🎯 Ação:', data.action, data.details);
    
    if (data.playerId === currentGame.opponentId) {
      processarAcaoOponente(data.action, data.details);
    }
  });
  
  // Turno mudou
  window.API.onTurnChanged((data) => {
    console.log('⏱️ Próximo turno:', data.nextPlayer);
    currentGame.currentTurn = data.nextPlayer;
    atualizarInfoJogador();
  });
}

function atualizarCampoOponente(estado) {
  // Renderizar cartas do oponente no campo
  const container = document.getElementById('opponentField');
  const slots = container.querySelectorAll('.field-slot');
  
  slots.forEach((slot, index) => {
    slot.innerHTML = '';
    if (estado.field[index]) {
      const card = estado.field[index];
      slot.innerHTML = `
        <div class="card-in-game">
          <div class="card-content">
            <div class="card-name">${card.name}</div>
            <div class="card-power">⚔️ ${card.power}</div>
          </div>
        </div>
      `;
    }
  });
}

function processarAcaoOponente(action, details) {
  // Processar diferentes tipos de ações
  switch(action) {
    case 'play_card':
      console.log('Oponente jogou:', details.cardName);
      break;
    case 'declare_attack':
      console.log('Oponente atacou!', details);
      break;
    case 'end_turn':
      console.log('Oponente passou o turno');
      break;
  }
}

// ========== CONTROLES DO JOGO ==========

function endTurn() {
  if (currentGame.currentTurn !== currentGame.playerId) {
    alert('Não é seu turno!');
    return;
  }
  
  // Atualizar estado no servidor
  atualizarEstadoNoServidor();
  
  // Passar turno
  window.API.emitEndTurn(currentGame.roomCode, currentGame.opponentId);
  
  // Compra 1 carta
  if (gameState.deck.length > 0) {
    gameState.hand.push(gameState.deck.shift());
    renderizarMaoJogador();
  }
  
  console.log('⏱️ Turno passado');
}

function surrender() {
  if (confirm('Tem certeza que quer se render?')) {
    window.API.emitSurrender(currentGame.roomCode, currentGame.playerId);
    mostrarTelaDerrota();
  }
}

async function atualizarEstadoNoServidor() {
  try {
    await window.API.updateGameState(currentGame.gameId, currentGame.playerId, gameState);
    window.API.emitGameStateUpdate(currentGame.roomCode, currentGame.playerId, gameState);
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
  }
}

// ========== TELAS FINAIS ==========

function mostrarTelaVitoria(ganhou) {
  const titulo = ganhou ? '🎉 Você Venceu!' : '😔 Você Perdeu!';
  const mensagem = ganhou 
    ? 'Parabéns! Você é o melhor!' 
    : 'Tente novamente!';
  
  alert(`${titulo}\n${mensagem}`);
  showMenu();
}

function mostrarTelaDerrota() {
  alert('😔 Você se rendeu!');
  showMenu();
}

// ========== UTILIDADES ==========

function copyRoomCode() {
  const code = document.getElementById('roomCodeDisplay').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert('Código copiado: ' + code);
  });
}

function getCurrentDeck() {
  // Retornar o deck selecionado (implementar conforme necessário)
  return 'aquatico';
}

// ========== INICIALIZAR ==========

console.log('✅ ui.js carregado e pronto para usar!');
console.log('Funções disponíveis: showMenu(), criarSala(), entrarSala(), etc.');
