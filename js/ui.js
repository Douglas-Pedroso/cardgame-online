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
  // Não precisa mais de drop zones, usamos clique + modal agora
}

function abrirMenuCarta(card, zone, index) {
  // Criar modal com opções
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  const menuDiv = document.createElement('div');
  menuDiv.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    max-width: 400px;
    text-align: center;
  `;
  
  const titulo = document.createElement('h3');
  titulo.textContent = card.name;
  titulo.style.cssText = 'margin: 0 0 15px 0; color: #333;';
  menuDiv.appendChild(titulo);
  
  const info = document.createElement('p');
  info.textContent = `💜${card.cost} ⚔️${card.power} | Zona atual: ${zone.toUpperCase()}`;
  info.style.cssText = 'margin: 0 0 20px 0; color: #666; font-size: 14px;';
  menuDiv.appendChild(info);
  
  // Botões para mover
  const opcoes = [
    { label: '🎮 Mover para Campo', zona: 'field' },
    { label: '✋ Mover para Mão', zona: 'hand' },
    { label: '💀 Mover para Banimento', zona: 'banished' }
  ];
  
  opcoes.forEach(opcao => {
    if (zona !== opcao.zona) {
      const btn = document.createElement('button');
      btn.textContent = opcao.label;
      btn.style.cssText = `
        display: block;
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
      `;
      btn.onmouseover = () => btn.style.background = '#45a049';
      btn.onmouseout = () => btn.style.background = '#4CAF50';
      btn.onclick = () => {
        moverCarta(index, zone, opcao.zona);
        modal.remove();
      };
      menuDiv.appendChild(btn);
    }
  });
  
  // Botão fechar
  const btnFechar = document.createElement('button');
  btnFechar.textContent = '❌ Fechar';
  btnFechar.style.cssText = `
    display: block;
    width: 100%;
    padding: 10px;
    margin: 15px 0 0 0;
    background: #999;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  `;
  btnFechar.onclick = () => modal.remove();
  menuDiv.appendChild(btnFechar);
  
  modal.appendChild(menuDiv);
  document.body.appendChild(modal);
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
  
  // Usar o ID como nome do arquivo, que já tem o sufixo
  const imagePath = `assets/cards/${deckName}/${card.id}.PNG`;
  
  div.style.cssText = `
    position: relative;
    width: 120px;
    height: 160px;
    border: 2px solid #333;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
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
  
  // Clique para abrir menu de ações
  div.onclick = () => abrirMenuCarta(card, zone, index);
  
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
      <div style="padding: 8px; text-align: center; font-weight: bold; font-size: 11px; color: #333;">
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
  abrirModalZona(gameState.deck, 'deck', 'Seu Deck');
}

function viewOpponentDeck() {
  alert('Oponente tem cartas no deck');
}

function viewPlayerBanished() {
  abrirModalZona(gameState.banished, 'banished', 'Cartas Banidas');
}

function viewOpponentBanished() {
  alert('Oponente tem cartas banidas');
}

function abrirModalZona(cartas, zone, titulo) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    overflow: auto;
  `;
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  const containerDiv = document.createElement('div');
  containerDiv.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  `;
  
  const tituloDiv = document.createElement('h2');
  tituloDiv.textContent = `${titulo} (${cartas.length} cartas)`;
  tituloDiv.style.cssText = 'margin: 0 0 20px 0; color: #333; text-align: center;';
  containerDiv.appendChild(tituloDiv);
  
  if (cartas.length === 0) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Nenhuma carta nesta zona.';
    vazio.style.cssText = 'text-align: center; color: #999;';
    containerDiv.appendChild(vazio);
  } else {
    const gridDiv = document.createElement('div');
    gridDiv.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    `;
    
    cartas.forEach((card, index) => {
      const cartaDiv = document.createElement('div');
      cartaDiv.style.cssText = `
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
      `;
      cartaDiv.onmouseover = () => cartaDiv.style.transform = 'scale(1.1)';
      cartaDiv.onmouseout = () => cartaDiv.style.transform = 'scale(1)';
      
      const img = document.createElement('img');
      
      // Encontrar o deck da carta
      let deckName = 'aquatico';
      for (let d in DECKS) {
        if (DECKS[d].cards.some(c => c.id === card.id)) {
          deckName = d;
          break;
        }
      }
      
      img.src = `assets/cards/${deckName}/${card.id}.PNG`;
      img.style.cssText = 'width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);';
      img.onerror = () => {
        img.style.display = 'none';
        cartaDiv.innerHTML = `
          <div style="
            border: 2px solid #333;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: #f0f0f0;
            height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
          ">
            <div>${card.name}</div>
            <div>💜${card.cost} ⚔️${card.power}</div>
          </div>
        `;
      };
      
      cartaDiv.appendChild(img);
      
      // Ao clicar, abrir menu de mover
      cartaDiv.onclick = (e) => {
        e.stopPropagation();
        abrirMenuCarta(card, zone, index);
        modal.remove();
      };
      
      gridDiv.appendChild(cartaDiv);
    });
    
    containerDiv.appendChild(gridDiv);
  }
  
  const btnFechar = document.createElement('button');
  btnFechar.textContent = '❌ Fechar';
  btnFechar.style.cssText = `
    display: block;
    width: 100%;
    padding: 10px;
    background: #999;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  `;
  btnFechar.onclick = () => modal.remove();
  containerDiv.appendChild(btnFechar);
  
  modal.appendChild(containerDiv);
  document.body.appendChild(modal);
}

console.log('✅ ui.js carregado com sucesso!');
