// game.js - Gerenciador de jogo (Online e Offline)

// Estado do jogo global
let gameState = {
  mode: null, // 'online' ou 'offline'
  isOffline: false,
  currentPlayer: 1, // 1 ou 2
  currentTurn: 1, // Jogador que começa (1 ou 2)
  players: {
    1: {
      id: null,
      name: 'Jogador 1',
      deck: null,
      deckName: 'florestal',
      hand: [],
      field: [null, null, null, null],
      banished: [],
      deckCards: [],
      pressure: 0
    },
    2: {
      id: null,
      name: 'Jogador 2',
      deck: null,
      deckName: 'glacial',
      hand: [],
      field: [null, null, null, null],
      banished: [],
      deckCards: [],
      pressure: 0
    }
  },
  roomCode: null
};

// ============ NAVEGAÇÃO DE TELAS ============

function showGameModeSelection() {
  hideAllScreens();
  document.getElementById('gameModeScreen').classList.add('active');
}

function showOfflineGame() {
  hideAllScreens();
  document.getElementById('offlineGameScreen').classList.add('active');
  renderDeckSelectionOffline();
}

function hideAllScreens() {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
}

// ============ SELEÇÃO DE DECKS OFFLINE ============

function renderDeckSelectionOffline() {
  const deckNames = Object.keys(DECKS);
  
  // Renderizar para Jogador 1
  const grid1 = document.getElementById('deckGridOffline1');
  grid1.innerHTML = '';
  deckNames.forEach(deckName => {
    const deck = DECKS[deckName];
    const deckButton = document.createElement('div');
    deckButton.className = 'deck-card';
    deckButton.innerHTML = `
      <div class="deck-icon">${deck.icon}</div>
      <div class="deck-name">${deck.name}</div>
    `;
    deckButton.style.borderColor = deck.color;
    deckButton.onclick = () => selectOfflineDeck(1, deckName, deckButton);
    deckButton.id = `offlineDeck1-${deckName}`;
    grid1.appendChild(deckButton);
  });
  
  // Renderizar para Jogador 2
  const grid2 = document.getElementById('deckGridOffline2');
  grid2.innerHTML = '';
  deckNames.forEach(deckName => {
    const deck = DECKS[deckName];
    const deckButton = document.createElement('div');
    deckButton.className = 'deck-card';
    deckButton.innerHTML = `
      <div class="deck-icon">${deck.icon}</div>
      <div class="deck-name">${deck.name}</div>
    `;
    deckButton.style.borderColor = deck.color;
    deckButton.onclick = () => selectOfflineDeck(2, deckName, deckButton);
    deckButton.id = `offlineDeck2-${deckName}`;
    grid2.appendChild(deckButton);
  });
  
  // Selecionar decks padrão
  document.getElementById('offlineDeck1-florestal')?.click();
  document.getElementById('offlineDeck2-glacial')?.click();
}

function selectOfflineDeck(playerNum, deckName, element) {
  // Remove seleção anterior
  const grid = playerNum === 1 ? 
    document.getElementById('deckGridOffline1') : 
    document.getElementById('deckGridOffline2');
  grid.querySelectorAll('.deck-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Marca como selecionado
  element.classList.add('selected');
  gameState.players[playerNum].deckName = deckName;
}

// ============ INICIAR JOGO OFFLINE ============

function startOfflineGame() {
  // Obter dados dos inputs
  gameState.players[1].name = document.getElementById('offlinePlayer1Name').value || 'Jogador 1';
  gameState.players[2].name = document.getElementById('offlinePlayer2Name').value || 'Jogador 2';
  
  // Validar seleção de decks
  if (!gameState.players[1].deckName || !gameState.players[2].deckName) {
    alert('Por favor, selecione um deck para cada jogador!');
    return;
  }
  
  // Carregar decks com validação
  const deck1 = getDeck(gameState.players[1].deckName);
  const deck2 = getDeck(gameState.players[2].deckName);
  
  if (!deck1 || !deck1.cards || !deck2 || !deck2.cards) {
    alert('❌ Erro ao carregar decks!');
    gameState.players[1].deck = getDeck('florestal');
    gameState.players[2].deck = getDeck('glacial');
    return;
  }
  
  gameState.players[1].deck = deck1;
  gameState.players[2].deck = deck2;
  
  // Embaralhar decks
  gameState.players[1].deckCards = shuffleDeck([...gameState.players[1].deck.cards]);
  gameState.players[2].deckCards = shuffleDeck([...gameState.players[2].deck.cards]);
  
  // Iniciar com mão vazia (será preenchida no RPS)
  gameState.players[1].hand = [];
  gameState.players[2].hand = [];
  gameState.players[1].pressure = 0;
  gameState.players[2].pressure = 0;
  
  gameState.mode = 'offline';
  gameState.isOffline = true;
  gameState.currentPlayer = 1; // Jogador 1 começa
  
  // Ir para tela de Pedra, Papel, Tesoura
  showRPSScreen();
}

// ============ TELA DE PEDRA, PAPEL, TESOURA ============

let rpsPlayer1Choice = null;
let rpsPlayer2Choice = null;

function showRPSScreen() {
  hideAllScreens();
  rpsPlayer1Choice = null;
  rpsPlayer2Choice = null;
  document.getElementById('rpsScreen').classList.add('active');
  document.getElementById('rpsWaiting').classList.add('hidden');
  document.getElementById('rpsResult').classList.add('hidden');
  document.getElementById('rpsChoices').classList.remove('hidden');
  document.querySelector('#rpsScreen h2').textContent = `${gameState.players[1].name}: Escolha sua opção`;
}

function makeRPSChoice(choice) {
  if (gameState.isOffline) {
    handleOfflineRPS(choice);
  } else {
    handleOnlineRPS(choice);
  }
}

function handleOfflineRPS(choice) {
  if (!rpsPlayer1Choice) {
    // Primeira escolha - Jogador 1
    rpsPlayer1Choice = choice;
    console.log(`🎮 ${gameState.players[1].name} escolheu: ${choice}`);
    
    // Esconder escolhas e pedir para jogador 2
    document.getElementById('rpsChoices').classList.add('hidden');
    document.getElementById('rpsWaiting').classList.remove('hidden');
    document.getElementById('rpsWaiting').textContent = 'Aguarde...';
    
    setTimeout(() => {
      document.getElementById('rpsWaiting').classList.add('hidden');
      document.getElementById('rpsChoices').classList.remove('hidden');
      document.querySelector('#rpsScreen h2').textContent = `${gameState.players[2].name}: Escolha sua opção`;
    }, 800);
    
  } else {
    // Segunda escolha - Jogador 2
    rpsPlayer2Choice = choice;
    console.log(`🎮 ${gameState.players[2].name} escolheu: ${choice}`);
    
    // Esconder escolhas
    document.getElementById('rpsChoices').classList.add('hidden');
    document.getElementById('rpsWaiting').classList.remove('hidden');
    document.getElementById('rpsWaiting').textContent = 'Calculando resultado...';
    
    // Determinar vencedor após delay
    setTimeout(() => {
      let winner = determineRPSWinner(rpsPlayer1Choice, rpsPlayer2Choice);
      
      if (winner === 0) {
        // Empate, jogar novamente
        showRPSResult('Empate! Tentem novamente!', 'tie');
        setTimeout(() => {
          showRPSScreen();
        }, 1500);
      } else {
        // Alguém venceu
        gameState.currentTurn = winner;
        gameState.currentPlayer = winner;
        
        // Dar 4 cartas iniciais
        drawInitialCards();
        
        // Mostrar resultado e ir para jogo
        showRPSResult(
          `${gameState.players[winner].name} venceu e começa!`,
          'win'
        );
        
        setTimeout(() => {
          startGameScreen();
        }, 2000);
      }
    }, 1000);
  }
}

function determineRPSWinner(choice1, choice2) {
  if (choice1 === choice2) return 0; // Empate
  
  if (choice1 === 'rock' && choice2 === 'scissors') return 1;
  if (choice1 === 'paper' && choice2 === 'rock') return 1;
  if (choice1 === 'scissors' && choice2 === 'paper') return 1;
  
  return 2; // Oponente (Jogador 2) vence
}

function showRPSResult(message, type) {
  const resultDiv = document.getElementById('rpsResult');
  resultDiv.textContent = message;
  resultDiv.className = 'rps-result ' + type;
  resultDiv.classList.remove('hidden');
}

function drawInitialCards() {
  // Dar 4 cartas iniciais para cada jogador
  for (let player of [1, 2]) {
    for (let i = 0; i < 4; i++) {
      if (gameState.players[player].deckCards.length > 0) {
        const card = gameState.players[player].deckCards.shift();
        gameState.players[player].hand.push(card);
      }
    }
  }
}

// ============ TELA DE JOGO ============

function startGameScreen() {
  hideAllScreens();
  document.getElementById('gameScreen').classList.add('active');
  updateGameUI();
  configureDropZones(); // Ativar drag and drop
}

function updateGameUI() {
  // No modo offline, alternar perspectiva baseado no turno
  // No modo online, sempre mostrar jogador 1 em baixo
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const opponentNum = currentPlayerNum === 1 ? 2 : 1;
  
  const currentPlayer = gameState.players[currentPlayerNum];
  const opponent = gameState.players[opponentNum];
  
  // Nome e deck do jogador atual (sempre em baixo)
  document.getElementById('playerNameDisplay').textContent = currentPlayer.name;
  document.getElementById('playerDeckDisplay').innerHTML = `
    <span style="color: ${currentPlayer.deck.color};">${currentPlayer.deck.icon} ${currentPlayer.deck.name}</span>
  `;
  
  // Nome e deck do oponente (sempre em cima)
  document.getElementById('opponentName').textContent = opponent.name;
  document.getElementById('opponentDeck').innerHTML = `
    <span style="color: ${opponent.deck.color};">${opponent.deck.icon} ${opponent.deck.name}</span>
  `;
  
  // Código da sala (offline não tem código)
  document.getElementById('currentRoomCode').textContent = gameState.isOffline ? 'Offline' : gameState.roomCode;
  
  // Atualizar contadores
  document.getElementById('playerDeckCount').textContent = currentPlayer.deckCards.length;
  document.getElementById('opponentDeckCount').textContent = opponent.deckCards.length;
  
  // Renderizar mão do jogador atual
  renderPlayerHand();
  
  // Renderizar campo
  renderGameField();
  
  // Renderizar cartas banidas
  renderBanishedCards();
  
  // Atualizar turno
  updateTurnIndicator();
  
  // Re-configurar drop zones após atualizar
  configureDropZones();
}

function renderPlayerHand() {
  // No modo offline, mostra mão do jogador atual
  // No modo online, sempre mostra mão do jogador 1
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const currentPlayerHand = gameState.players[currentPlayerNum].hand;
  const handZone = document.getElementById('playerHand');
  handZone.innerHTML = '';
  
  currentPlayerHand.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    // Encontrar o deck da carta
    let deckName = 'florestal';
    for (let d in DECKS) {
      if (DECKS[d].cards.some(c => c.id === card.id)) {
        deckName = d;
        break;
      }
    }
    
    // Caminho da imagem
    const imagePath = `assets/cards/${deckName}/${card.image}`;
    
    cardDiv.innerHTML = `
      <div class="card-image" style="background-image: url('${imagePath}'); background-size: cover; background-position: center; height: 100%;"></div>
    `;
    cardDiv.style.borderColor = gameState.players[currentPlayerNum].deck.color;
    cardDiv.title = `${card.name} - Custo: ${card.cost}, Poder: ${card.power}`;
    cardDiv.draggable = true;
    cardDiv.ondragstart = (e) => startDragCard(e, currentPlayerNum, index, 'hand');
    cardDiv.onclick = () => showCardDetails(card);
    handZone.appendChild(cardDiv);
  });
}

function renderGameField() {
  // No modo offline, mostra campo do jogador atual
  // No modo online, sempre mostra campo do jogador 1
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const opponentNum = currentPlayerNum === 1 ? 2 : 1;
  
  // Renderizar campo do jogador atual (em baixo) e oponente (em cima)
  const playerFieldSlots = document.querySelectorAll('#playerField .field-slot');
  const opponentFieldSlots = document.querySelectorAll('#opponentField .field-slot');
  
  for (let i = 0; i < 4; i++) {
    // Jogador atual
    playerFieldSlots[i].innerHTML = '';
    if (gameState.players[currentPlayerNum].field[i]) {
      const card = gameState.players[currentPlayerNum].field[i];
      const cardDiv = createCardElement(card, currentPlayerNum, i);
      playerFieldSlots[i].appendChild(cardDiv);
    }
    
    // Oponente
    opponentFieldSlots[i].innerHTML = '';
    if (gameState.players[opponentNum].field[i]) {
      const card = gameState.players[opponentNum].field[i];
      const cardDiv = createCardElement(card, opponentNum, i);
      opponentFieldSlots[i].appendChild(cardDiv);
    }
  }
}

function renderBanishedCards() {
  // No modo offline, mostra banidas do jogador atual
  // No modo online, sempre mostra banidas do jogador 1
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const currentPlayer = gameState.players[currentPlayerNum];
  const banishedZone = document.getElementById('playerBanished');
  
  if (!banishedZone) return;
  
  banishedZone.innerHTML = '';
  
  if (currentPlayer.banished.length === 0) {
    banishedZone.innerHTML = '<div style="color: #888; font-size: 12px;">Nenhuma carta banida</div>';
    return;
  }
  
  currentPlayer.banished.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card card-small';
    cardDiv.style.width = '60px';
    cardDiv.style.height = '84px';
    cardDiv.style.margin = '2px';
    cardDiv.style.display = 'inline-block';
    
    // Encontrar o deck da carta
    let deckName = 'florestal';
    for (let d in DECKS) {
      if (DECKS[d].cards.some(c => c.id === card.id)) {
        deckName = d;
        break;
      }
    }
    
    const imagePath = `assets/cards/${deckName}/${card.image}`;
    
    cardDiv.innerHTML = `
      <div class="card-image" style="background-image: url('${imagePath}'); background-size: cover; background-position: center; height: 100%;"></div>
    `;
    cardDiv.style.borderColor = currentPlayer.deck.color;
    cardDiv.title = `${card.name} (Banida)`;
    cardDiv.draggable = true;
    cardDiv.ondragstart = (e) => startDragCard(e, currentPlayerNum, index, 'banished');
    cardDiv.onclick = () => showCardDetails(card);
    
    banishedZone.appendChild(cardDiv);
  });
}

function createCardElement(card, player, fieldSlot) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  
  // Encontrar o deck da carta
  let deckName = 'florestal';
  for (let d in DECKS) {
    if (DECKS[d].cards.some(c => c.id === card.id)) {
      deckName = d;
      break;
    }
  }
  
  // Caminho da imagem
  const imagePath = `assets/cards/${deckName}/${card.image}`;
  
  cardDiv.innerHTML = `
    <div class="card-image" style="background-image: url('${imagePath}'); background-size: cover; background-position: center; height: 100%;"></div>
  `;
  cardDiv.style.borderColor = gameState.players[player].deck.color;
  cardDiv.title = `${card.name} - Custo: ${card.cost}, Poder: ${card.power}`;
  cardDiv.draggable = true;
  cardDiv.ondragstart = (e) => startDragCard(e, player, fieldSlot, 'field');
  cardDiv.onclick = () => showCardDetails(card);
  return cardDiv;
}

function startDragCard(e, player, index, zone = 'hand') {
  console.log(`🎴 Iniciando drag - Player: ${player}, Index: ${index}, Zone: ${zone}`);
  
  e.dataTransfer.effectAllowed = 'move';
  const data = {
    player,
    index,
    zone // 'hand', 'field', 'banished', 'deck'
  };
  e.dataTransfer.setData('application/json', JSON.stringify(data));
  console.log(`📦 Dados transferidos:`, data);
  
  // Adicionar efeito visual ao arrastar
  e.target.classList.add('dragging');
  e.target.style.opacity = '0.5';
  
  // Remover efeito ao terminar o arrasto
  e.target.ondragend = () => {
    console.log('🛑 Drag finalizado');
    e.target.classList.remove('dragging');
    e.target.style.opacity = '1';
  };
}

// ============ CONFIGURAR DROP ZONES ============

function configureDropZones() {
  console.log('🔧 Configurando drop zones...');
  
  // Drop zones para campo do jogador (4 slots)
  const playerFieldSlots = document.querySelectorAll('#playerField .field-slot');
  console.log(`📦 ${playerFieldSlots.length} slots encontrados`);
  playerFieldSlots.forEach((slot, index) => {
    setupDropZone(slot, 'field', index);
  });
  
  // Drop zone para mão do jogador
  const playerHandZone = document.getElementById('playerHand');
  if (playerHandZone) {
    setupDropZone(playerHandZone, 'hand');
  }
  
  // Drop zone para banimento do jogador
  const playerBanishedZone = document.getElementById('playerBanished');
  if (playerBanishedZone) {
    setupDropZone(playerBanishedZone, 'banished');
  }
  
  // Drop zone para deck do jogador
  const playerDeckZone = document.getElementById('playerDeckZone');
  if (playerDeckZone) {
    setupDropZone(playerDeckZone, 'deck');
  }
}

function setupDropZone(element, targetZone, targetIndex = null) {
  element.ondragover = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    element.style.backgroundColor = 'rgba(100, 200, 100, 0.3)';
  };
  
  element.ondragleave = () => {
    element.style.backgroundColor = '';
  };
  
  element.ondrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    element.style.backgroundColor = '';
    
    console.log(`🎴 Drop detectado em ${targetZone}${targetIndex !== null ? ` slot ${targetIndex}` : ''}`);
    
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      const data = JSON.parse(dataStr);
      
      console.log(`📋 Movendo de ${data.zone} para ${targetZone}`);
      
      // Movimento livre - sem restrição de turno
      moveCard(data.zone, data.index, targetZone, targetIndex);
    } catch (err) {
      console.error('❌ Erro drop:', err);
    }
  };
}

// ============ MOVIMENTO GENÉRICO DE CARTAS ============

function moveCard(fromZone, fromIndex, toZone, toIndex = null) {
  // No modo offline, move cartas do jogador atual
  // No modo online, sempre move cartas do jogador 1
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const player = gameState.players[currentPlayerNum];
  let card = null;
  
  console.log(`🔧 moveCard: Jogador ${currentPlayerNum}, ${fromZone}[${fromIndex}] → ${toZone}${toIndex !== null ? `[${toIndex}]` : ''}`);
  
  // Pegar carta da zona de origem
  switch(fromZone) {
    case 'hand':
      if (fromIndex >= player.hand.length) return;
      card = player.hand.splice(fromIndex, 1)[0];
      break;
    case 'field':
      if (!player.field[fromIndex]) return;
      card = player.field[fromIndex];
      player.field[fromIndex] = null;
      break;
    case 'banished':
      if (fromIndex >= player.banished.length) return;
      card = player.banished.splice(fromIndex, 1)[0];
      break;
    case 'deck':
      if (fromIndex >= player.deckCards.length) return;
      card = player.deckCards.splice(fromIndex, 1)[0];
      break;
  }
  
  if (!card) return;
  
  // Colocar carta na zona de destino
  switch(toZone) {
    case 'hand':
      player.hand.push(card);
      console.log(`✅ ${card.name} → Mão`);
      break;
    case 'field':
      if (toIndex !== null) {
        if (player.field[toIndex]) {
          // Se slot ocupado, troca
          player.hand.push(player.field[toIndex]);
        }
        player.field[toIndex] = card;
        console.log(`✅ ${card.name} → Campo slot ${toIndex}`);
      }
      break;
    case 'banished':
      player.banished.push(card);
      console.log(`✅ ${card.name} → Banimento`);
      break;
    case 'deck':
      player.deckCards.push(card);
      console.log(`✅ ${card.name} → Deck`);
      break;
  }
  
  updateGameUI();
}

function moveCardToField(handIndex, fieldSlot) {
  moveCard('hand', handIndex, 'field', fieldSlot);
}

function banishCard(handIndex) {
  moveCard('hand', handIndex, 'banished');
}

function updateTurnIndicator() {
  const indicator = document.getElementById('turnIndicator');
  const isPlayerTurn = gameState.currentPlayer === 1;
  
  if (isPlayerTurn) {
    indicator.innerHTML = '<i class="fas fa-play"></i><span id="turnText">Seu Turno</span>';
    indicator.style.color = 'green';
  } else {
    indicator.innerHTML = '<i class="fas fa-pause"></i><span id="turnText">Turno do Oponente</span>';
    indicator.style.color = '#ff6600';
  }
}

function endTurn() {
  if (!gameState.isOffline) {
    console.log('Modo online - sistema de turnos diferente');
    return;
  }
  
  if (gameState.currentPlayer === 1) {
    // Turno do jogador 1 terminou, passa para jogador 2
    console.log('🔄 Passando turno: Jogador 1 → Jogador 2');
    
    // Jogador 2 compra 1 carta
    if (gameState.players[2].deckCards.length > 0) {
      const card = gameState.players[2].deckCards.shift();
      gameState.players[2].hand.push(card);
      console.log(`📥 Jogador 2 comprou: ${card.name}`);
    }
    
    gameState.currentPlayer = 2;
    updateGameUI();
    
  } else if (gameState.currentPlayer === 2) {
    // Turno do jogador 2 terminou, passa para jogador 1
    console.log('🔄 Passando turno: Jogador 2 → Jogador 1');
    
    gameState.currentPlayer = 1;
    
    // Jogador 1 compra 1 carta
    if (gameState.players[1].deckCards.length > 0) {
      const card = gameState.players[1].deckCards.shift();
      gameState.players[1].hand.push(card);
      console.log(`📥 Jogador 1 comprou: ${card.name}`);
    }
    
    updateGameUI();
  }
}

function simulateOfflineOpponentTurn() {
  // Simular ações aleatórias do oponente (por enquanto, só passa o turno)
  console.log('Turno do oponente...');
  
  // Passar turno
  gameState.currentPlayer = 1;
  
  // Jogador 1 compra 1 carta
  if (gameState.players[1].deckCards.length > 0) {
    const card = gameState.players[1].deckCards.shift();
    gameState.players[1].hand.push(card);
  }
  
  updateGameUI();
}

function surrender() {
  if (confirm('Tem certeza que quer se render?')) {
    const loser = gameState.players[gameState.currentPlayer].name;
    const winner = gameState.players[gameState.currentPlayer === 1 ? 2 : 1].name;
    
    alert(`${loser} se rendeu!\n\n${winner} venceu!`);
    
    // Voltar ao menu
    gameState = {
      mode: null,
      isOffline: false,
      currentPlayer: 1,
      currentTurn: 1,
      players: {
        1: { id: null, name: 'Jogador 1', deck: null, deckName: 'florestal', hand: [], field: [null, null, null, null], banished: [], deckCards: [], pressure: 0 },
        2: { id: null, name: 'Jogador 2', deck: null, deckName: 'glacial', hand: [], field: [null, null, null, null], banished: [], deckCards: [], pressure: 0 }
      },
      roomCode: null
    };
    
    showMenu();
  }
}

function showCardDetails(card) {
  const modal = document.getElementById('cardViewModal');
  document.getElementById('modalTitle').textContent = card.name;
  document.getElementById('modalCardList').innerHTML = `
    <div class="card-details">
      <p><strong>Tipo:</strong> ${card.type}</p>
      <p><strong>Custo:</strong> ${card.cost}</p>
      <p><strong>Poder:</strong> ${card.power}</p>
      <p><strong>Efeito:</strong> ${card.effect}</p>
    </div>
  `;
  modal.classList.add('active');
}

function closeCardModal() {
  document.getElementById('cardViewModal').classList.remove('active');
}

function viewOpponentDeck() {
  const deckCards = gameState.players[2].hand.map(card => card.name).join(', ') || 'Nenhuma carta';
  alert(`Mão do oponente:\n${deckCards}`);
}

function viewOpponentBanished() {
  const banishedCards = gameState.players[2].banished.map(card => card.name).join(', ') || 'Nenhuma carta';
  alert(`Cartas banidas do oponente:\n${banishedCards}`);
}

function viewPlayerBanished() {
  const banishedCards = gameState.players[1].banished.map(card => card.name).join(', ') || 'Nenhuma carta';
  alert(`Suas cartas banidas:\n${banishedCards}`);
}

function toggleLog() {
  const log = document.querySelector('.action-log');
  log.classList.toggle('collapsed');
}

// ============ FUNÇÕES AUXILIARES ============

function showMenu() {
  gameState = {
    mode: null,
    isOffline: false,
    currentPlayer: 1,
    currentTurn: 1,
    players: {
      1: { id: null, name: 'Jogador 1', deck: null, deckName: 'florestal', hand: [], field: [null, null, null, null], banished: [], deckCards: [], pressure: 0 },
      2: { id: null, name: 'Jogador 2', deck: null, deckName: 'glacial', hand: [], field: [null, null, null, null], banished: [], deckCards: [], pressure: 0 }
    },
    roomCode: null
  };
  hideAllScreens();
  document.getElementById('menuScreen').classList.add('active');
}

// ============ VISUALIZADOR DE DECK ============

function viewPlayerDeck() {
  const modal = document.getElementById('deckViewerModal');
  const content = document.getElementById('deckViewerContent');
  // No modo offline, mostra deck do jogador atual
  // No modo online, sempre mostra deck do jogador 1
  const currentPlayerNum = gameState.isOffline ? gameState.currentPlayer : 1;
  const player = gameState.players[currentPlayerNum];
  
  content.innerHTML = '';
  
  if (player.deckCards.length === 0) {
    content.innerHTML = '<div style="color: #888; text-align: center; padding: 20px;">Deck vazio</div>';
  } else {
    player.deckCards.forEach((card, index) => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.style.width = '100px';
      cardDiv.style.height = '140px';
      cardDiv.style.margin = '5px';
      
      // Encontrar o deck da carta
      let deckName = 'florestal';
      for (let d in DECKS) {
        if (DECKS[d].cards.some(c => c.id === card.id)) {
          deckName = d;
          break;
        }
      }
      
      const imagePath = `assets/cards/${deckName}/${card.image}`;
      
      cardDiv.innerHTML = `
        <div class="card-image" style="background-image: url('${imagePath}'); background-size: cover; background-position: center; height: 100%; position: relative;">
          <button onclick="event.stopPropagation(); pickCardFromDeck(${index});" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: #27ae60; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 10px; font-weight: bold;">PEGAR</button>
        </div>
      `;
      cardDiv.style.borderColor = player.deck.color;
      cardDiv.title = `${card.name} - Arraste ou clique PEGAR para mão`;
      cardDiv.draggable = true;
      cardDiv.ondragstart = (e) => startDragCard(e, currentPlayerNum, index, 'deck');
      cardDiv.ondblclick = () => pickCardFromDeck(index);
      
      content.appendChild(cardDiv);
    });
  }
  
  modal.style.display = 'block';
}

function closeDeckViewer() {
  const modal = document.getElementById('deckViewerModal');
  modal.style.display = 'none';
}

function pickCardFromDeck(deckIndex) {
  console.log(`🎴 Pegando carta do deck (index ${deckIndex})`);
  moveCard('deck', deckIndex, 'hand');
  // Atualizar o visualizador
  viewPlayerDeck();
}

console.log('✅ game.js carregado com sucesso!');
