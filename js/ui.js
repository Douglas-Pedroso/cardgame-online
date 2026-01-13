// ui.js - Interface do usuário do Card Game Online

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

let selectedDeck = null;

// ========== MENU INICIAL ==========

function showMenu() {
  document.getElementById('menuScreen').classList.add('active');
  document.getElementById('createGameScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.remove('active');
  document.getElementById('waitingScreen').classList.remove('active');
  document.getElementById('rpsScreen').classList.remove('active');
}

function showCreateGame() {
  document.getElementById('menuScreen').classList.remove('active');
  document.getElementById('createGameScreen').classList.add('active');
  
  // Mostrar seleção de deck
  mostrarSelecaoDeck('create');
}

function showJoinGame() {
  document.getElementById('menuScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.add('active');
  
  // Mostrar seleção de deck
  mostrarSelecaoDeck('join');
}

function joinGameButton() {
  executarEntrarSala();
}

// ========== SELEÇÃO DE DECK ==========

function mostrarSelecaoDeck(tipo) {
  const decks = [
    { id: 'aquatico', nome: 'Aquático', emoji: '🌊', cor: '#4A90E2' },
    { id: 'planta', nome: 'Planta', emoji: '🌿', cor: '#7CB342' },
    { id: 'fada', nome: 'Fada', emoji: '🧚', cor: '#E91E63' },
    { id: 'cavaleiro', nome: 'Cavaleiro', emoji: '🏹', cor: '#FF6F00' }
  ];

  let targetElement;
  if (tipo === 'create') {
    targetElement = document.querySelector('#deckGridCreate') || document.querySelector('#createGameScreen .deck-grid');
  } else {
    targetElement = document.querySelector('#deckGridJoin') || document.querySelector('#joinGameScreen .deck-grid');
  }

  if (!targetElement) {
    console.error('Elemento de deck grid não encontrado para tipo:', tipo);
    return;
  }

  targetElement.innerHTML = decks.map(deck => `
    <button class="btn deck-btn" style="border-left: 4px solid ${deck.cor};" onclick="selecionarDeck('${deck.id}', '${tipo}')">
      ${deck.emoji} ${deck.nome}
    </button>
  `).join('');
}


function selecionarDeck(deckId, tipo) {
  selectedDeck = deckId;
  console.log('✅ Deck selecionado:', deckId);

  if (tipo === 'create') {
    executarCriarSala();
  } else {
    executarEntrarSala();
  }
}

// ========== CRIAR SALA ==========

async function executarCriarSala() {
  if (!selectedDeck) {
    alert('Selecione um deck!');
    return;
  }

  try {
    const playerId = 'player_' + Date.now();
    console.log('🎮 Criando sala com deck:', selectedDeck);

    // Inicializa o WebSocket ANTES de criar a sala
    window.API.initSocket();

    const game = await window.API.createGame(playerId, selectedDeck);

    currentGame.gameId = game.gameId;
    currentGame.roomCode = game.roomCode;
    currentGame.playerId = playerId;

    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('roomCode', game.roomCode);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('playerDeck', selectedDeck);

    prepararListenersWebSocket();
    mostrarTelaAguardandoOponente(game.roomCode);

    console.log('✅ Sala criada:', game.roomCode);
  } catch (error) {
    alert('❌ Erro ao criar sala: ' + error.message);
    console.error(error);
  }
}

// ========== ENTRAR EM SALA ==========

async function executarEntrarSala() {
  const roomCodeInput = document.querySelector('#roomCode');
  const roomCode = roomCodeInput ? roomCodeInput.value.trim().toUpperCase() : null;

  if (!roomCode) {
    alert('Digite o código da sala!');
    return;
  }

  if (!selectedDeck) {
    alert('Selecione um deck!');
    return;
  }

  try {
    const playerId = 'player_' + Date.now();
    console.log('🎮 Entrando na sala:', roomCode);

    // Inicializa o WebSocket ANTES de fazer o join
    window.API.initSocket();
    
    const game = await window.API.joinGame(roomCode, playerId, selectedDeck);

    currentGame.gameId = game.gameId;
    currentGame.roomCode = game.roomCode;
    currentGame.playerId = playerId;
    currentGame.opponentId = game.player1Id;

    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('roomCode', game.roomCode);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('opponentId', game.player1Id);
    localStorage.setItem('playerDeck', selectedDeck);

    prepararListenersWebSocket();
    
    // Mostra tela de RPS imediatamente
    mostrarTelaPedraoPapelTesoura();

    console.log('✅ Entrou na sala:', roomCode);
  } catch (error) {
    alert('❌ Erro: ' + error.message);
    console.error(error);
  }
}

// ========== TELAS ==========

function mostrarTelaAguardandoOponente(roomCode) {
  document.getElementById('createGameScreen').classList.remove('active');
  document.getElementById('joinGameScreen').classList.remove('active');
  document.getElementById('waitingScreen').classList.add('active');

  document.getElementById('roomCodeDisplay').textContent = roomCode;
}

function mostrarTelaPedraoPapelTesoura() {
  document.getElementById('waitingScreen').classList.remove('active');
  document.getElementById('rpsScreen').classList.add('active');
  document.getElementById('rpsWaiting').classList.add('hidden');
  document.getElementById('rpsResult').classList.add('hidden');
}

function mostrarTelaJogo() {
  document.getElementById('rpsScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.add('active');

  renderizarJogo();
}

// ========== ROCK, PAPER, SCISSORS ==========

function makeRPSChoice(escolha) {
  try {
    document.getElementById('rpsWaiting').classList.remove('hidden');
    document.getElementById('rpsChoices').classList.add('hidden');

    const opcoes = ['rock', 'paper', 'scissors'];
    const oponentEscolha = opcoes[Math.floor(Math.random() * 3)];

    const resultado = determinarVencedorRPS(escolha, oponentEscolha);
    const vencedor = resultado === 1 ? currentGame.playerId : (currentGame.opponentId || 'opponent');

    mostrarResultadoRPS(escolha, oponentEscolha, resultado);

    setTimeout(() => {
      inicializarJogo(vencedor);
      mostrarTelaJogo();
    }, 2000);
  } catch (error) {
    console.error('Erro ao fazer escolha RPS:', error);
  }
}

function determinarVencedorRPS(p1, p2) {
  if (p1 === p2) return 0;
  if (p1 === 'rock' && p2 === 'scissors') return 1;
  if (p1 === 'paper' && p2 === 'rock') return 1;
  if (p1 === 'scissors' && p2 === 'paper') return 1;
  return -1;
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

  const rpsResult = document.getElementById('rpsResult');
  rpsResult.innerHTML = `
    <div class="rps-result-display">
      <div class="rps-choice-result">
        <span>Sua escolha</span>
        <div class="rps-large">${textos[sua]}</div>
      </div>
      <div class="rps-vs">VS</div>
      <div class="rps-choice-result">
        <span>Oponente</span>
        <div class="rps-large">${textos[oponente]}</div>
      </div>
    </div>
    <p class="rps-result-text">${resultadoTexto}</p>
  `;
  rpsResult.classList.remove('hidden');
}

// ========== INICIALIZAR JOGO ==========

function inicializarJogo(vencedorRPS) {
  const deckSelecionado = localStorage.getItem('playerDeck') || 'aquatico';

  gameState = {
    hand: [
      DECKS[deckSelecionado].cards[0],
      DECKS[deckSelecionado].cards[1],
      DECKS[deckSelecionado].cards[2],
      DECKS[deckSelecionado].cards[3]
    ],
    field: [],
    deck: DECKS[deckSelecionado].cards.slice(4),
    banished: [],
    pressureLevel: 0
  };

  currentGame.currentTurn = vencedorRPS;
  console.log('🎮 Jogo iniciado! Começa:', vencedorRPS);
}

// ========== RENDERIZAR JOGO ==========

function renderizarJogo() {
  renderizarMaoJogador();
  renderizarCampoJogador();
  renderizarCartasBanidas();
  atualizarInfoJogador();
  configurarDropZones();

  console.log('🎮 Jogo renderizado');
}

function configurarDropZones() {
  const zonas = [
    { id: 'playerField', zone: 'field' },
    { id: 'playerHand', zone: 'hand' },
    { id: 'playerBanished', zone: 'banished' }
  ];
  
  zonas.forEach(zona => {
    const elemento = document.getElementById(zona.id);
    if (elemento) {
      elemento.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        elemento.style.backgroundColor = 'rgba(100, 200, 100, 0.3)';
        elemento.style.borderRadius = '8px';
      });
      
      elemento.addEventListener('dragleave', (e) => {
        elemento.style.backgroundColor = '';
      });
      
      elemento.addEventListener('drop', (e) => {
        e.preventDefault();
        elemento.style.backgroundColor = '';
        
        const cardIndex = parseInt(e.dataTransfer.getData('cardIndex'));
        const fromZone = e.dataTransfer.getData('fromZone');
        
        moverCarta(cardIndex, fromZone, zona.zone);
      });
    }
  });
}

function moverCarta(cardIndex, fromZone, toZone) {
  if (fromZone === toZone) return;
  
  console.log(`📍 Movendo carta ${cardIndex} de ${fromZone} para ${toZone}`);
  
  // Pegar a carta
  let carta = null;
  if (fromZone === 'hand') {
    carta = gameState.hand[cardIndex];
    gameState.hand.splice(cardIndex, 1);
  } else if (fromZone === 'field') {
    carta = gameState.field[cardIndex];
    gameState.field.splice(cardIndex, 1);
  } else if (fromZone === 'banished') {
    carta = gameState.banished[cardIndex];
    gameState.banished.splice(cardIndex, 1);
  } else if (fromZone === 'deck') {
    carta = gameState.deck[cardIndex];
    gameState.deck.splice(cardIndex, 1);
  }
  
  if (!carta) return;
  
  // Adicionar para nova zona
  if (toZone === 'hand') {
    gameState.hand.push(carta);
  } else if (toZone === 'field') {
    gameState.field.push(carta);
  } else if (toZone === 'banished') {
    gameState.banished.push(carta);
  }
  
  // Re-renderizar
  renderizarMaoJogador();
  renderizarCampoJogador();
  atualizarInfoJogador();
  
  // Emitir para o oponente
  window.API.emitGameStateUpdate(currentGame.roomCode, currentGame.playerId, gameState);
}

function renderizarMaoJogador() {
  const container = document.getElementById('playerHand');
  if (!container) return;

  container.innerHTML = '';

  gameState.hand.forEach((card, index) => {
    const cardElement = criarElementoCarta(card, 'hand', index);
    container.appendChild(cardElement);
  });
  
  configurarDropZones();
}

function renderizarCampoJogador() {
  const container = document.getElementById('playerField');
  if (!container) return;

  const slots = container.querySelectorAll('.field-slot');

  slots.forEach((slot, index) => {
    slot.innerHTML = '';
    if (gameState.field[index]) {
      const card = gameState.field[index];
      const cardElement = criarElementoCarta(card, 'field', index);
      slot.appendChild(cardElement);
    }
  });
  
  configurarDropZones();
}

function renderizarCartasBanidas() {
  const container = document.getElementById('playerBanished');
  if (!container) return;

  container.innerHTML = '';

  gameState.banished.forEach((card, index) => {
    const cardElement = criarElementoCarta(card, 'banished', index);
    cardElement.style.width = '80px';
    cardElement.style.height = '110px';
    container.appendChild(cardElement);
  });
  
  const countElement = document.getElementById('playerBanishedCount');
  if (countElement) {
    countElement.textContent = gameState.banished.length;
  }
}

function criarElementoCarta(card, zone, index) {
  const div = document.createElement('div');
  div.className = 'card-in-game';
  
  // Determinar qual deck a carta vem (baseado no gameState ou décks conhecidos)
  let deckName = 'aquatico'; // padrão
  for (let d in DECKS) {
    if (DECKS[d].cards.some(c => c.id === card.id)) {
      deckName = d;
      break;
    }
  }
  
  const imagePath = `assets/cards/${deckName}/${card.image.replace('.png', '')}.PNG`;
  
  div.style.cssText = `
    position: relative;
    width: 120px;
    height: 160px;
    border: 2px solid #333;
    border-radius: 8px;
    overflow: hidden;
    cursor: move;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  `;
  
  div.onmouseover = () => div.style.transform = 'scale(1.05)';
  div.onmouseout = () => div.style.transform = 'scale(1)';
  
  div.draggable = true;
  
  // Criar imagem da carta
  const img = document.createElement('img');
  img.src = imagePath;
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  `;
  img.onerror = () => {
    // Se a imagem não carregar, mostrar texto
    img.style.display = 'none';
    div.innerHTML = `
      <div style="padding: 8px; text-align: center; font-weight: bold; font-size: 11px;">
        <div>${card.name}</div>
        <div>💜${card.cost}</div>
        <div>⚔️${card.power}</div>
      </div>
    `;
  };
  
  // Info da carta sobre a imagem
  const info = document.createElement('div');
  info.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 4px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
  `;
  info.innerHTML = `💜${card.cost} ⚔️${card.power}`;
  
  div.appendChild(img);
  div.appendChild(info);

  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cardIndex', index);
    e.dataTransfer.setData('fromZone', zone);
  });

  return div;
}

function atualizarInfoJogador() {
  const playerNameDisplay = document.getElementById('playerNameDisplay');
  const playerDeckCount = document.getElementById('playerDeckCount');
  const opponentName = document.getElementById('opponentName');
  const turnText = document.getElementById('turnText');

  if (playerNameDisplay) playerNameDisplay.textContent = currentGame.playerId?.slice(7, 12) || 'Você';
  if (playerDeckCount) playerDeckCount.textContent = gameState.deck.length;
  if (opponentName) opponentName.textContent = currentGame.opponentId?.slice(7, 12) || 'Oponente';

  if (turnText) {
    if (currentGame.currentTurn === currentGame.playerId) {
      turnText.textContent = '🎯 Seu Turno';
    } else {
      turnText.textContent = '⏳ Aguardando...';
    }
  }
}

// ========== WEBSOCKET LISTENERS ==========

function prepararListenersWebSocket() {
  window.API.onPlayerJoined((data) => {
    console.log('👤 Novo jogador entrou:', data.playerId);
    currentGame.opponentId = data.playerId;
    localStorage.setItem('opponentId', data.playerId);

    if (document.getElementById('waitingScreen').classList.contains('active')) {
      mostrarTelaPedraoPapelTesoura();
    }
  });

  window.API.onGameStateUpdate((data) => {
    console.log('🔄 Estado atualizado');
  });

  window.API.onPlayerAction((data) => {
    console.log('🎯 Ação do oponente:', data.action);
  });

  window.API.onTurnChanged((data) => {
    console.log('⏱️ Próximo turno:', data.nextPlayer);
    currentGame.currentTurn = data.nextPlayer;
    atualizarInfoJogador();
  });
}

// ========== CONTROLES DO JOGO ==========

function endTurn() {
  if (currentGame.currentTurn !== currentGame.playerId) {
    alert('Não é seu turno!');
    return;
  }

  if (gameState.deck.length > 0) {
    gameState.hand.push(gameState.deck.shift());
    renderizarMaoJogador();
  }

  window.API.emitEndTurn(currentGame.roomCode, currentGame.opponentId);
  console.log('⏱️ Turno passado');
}

function surrender() {
  if (confirm('Tem certeza que quer se render?')) {
    window.API.emitSurrender(currentGame.roomCode, currentGame.playerId);
    alert('😔 Você se rendeu!');
    showMenu();
  }
}

function copyRoomCode() {
  const code = document.getElementById('roomCodeDisplay')?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      alert('✅ Código copiado: ' + code);
    });
  }
}

function viewPlayerDeck() {
  alert('Você tem ' + gameState.deck.length + ' cartas no deck');
}

function viewOpponentDeck() {
  alert('Oponente tem cartas no deck');
}

function viewPlayerBanished() {
  alert('Você tem ' + gameState.banished.length + ' cartas banidas');
}

function viewOpponentBanished() {
  alert('Oponente tem cartas banidas');
}

console.log('✅ ui.js carregado com sucesso!');
