// EXEMPLOS DE USO DA API NO FRONTEND
// Este arquivo mostra como usar as funções em js/api-handler.js

// ========== EXEMPLO 1: CRIAR SALA ==========

async function exemploCriarSala() {
  try {
    // Informações do jogador
    const playerId = 'player_' + Date.now();
    const playerDeck = 'aquatico'; // ou: planta, fada, cavaleiro

    // Chamar API
    const game = await window.API.createGame(playerId, playerDeck);

    console.log('Sala criada!');
    console.log('Código da sala:', game.roomCode);
    console.log('Game ID:', game.gameId);

    // Armazenar para depois
    localStorage.setItem('roomCode', game.roomCode);
    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('playerId', playerId);
    
  } catch (error) {
    console.error('Erro ao criar sala:', error);
  }
}

// ========== EXEMPLO 2: ENTRAR EM SALA ==========

async function exemploEntrarSala() {
  try {
    const roomCode = 'ABC123'; // Obtido do usuário
    const playerId = 'player_' + Date.now();
    const playerDeck = 'planta';

    const game = await window.API.joinGame(roomCode, playerId, playerDeck);

    console.log('Entrou na sala!');
    console.log('Jogador 1:', game.player1Id, 'com deck:', game.player1Deck);
    console.log('Jogador 2:', game.player2Id, 'com deck:', game.player2Deck);

    // Armazenar
    localStorage.setItem('roomCode', roomCode);
    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('playerId', playerId);
    
  } catch (error) {
    console.error('Erro ao entrar na sala:', error);
  }
}

// ========== EXEMPLO 3: OBTER ESTADO DO JOGO ==========

async function exemploObterEstado() {
  try {
    const gameId = localStorage.getItem('gameId');
    
    const state = await window.API.getGameState(gameId);

    console.log('Estado do jogo:');
    console.log('Game ID:', state.game.id);
    console.log('Sala:', state.game.roomCode);
    console.log('Status:', state.game.status);

    // Estados de cada jogador
    state.states.forEach(playerState => {
      console.log(`\nJogador: ${playerState.playerId}`);
      console.log('  Mão:', playerState.hand.length, 'cartas');
      console.log('  Campo:', playerState.field.length, 'cartas');
      console.log('  Deck:', playerState.deck.length, 'cartas');
      console.log('  Banido:', playerState.banished.length, 'cartas');
      console.log('  Pressão:', playerState.pressureLevel);
    });
    
  } catch (error) {
    console.error('Erro ao obter estado:', error);
  }
}

// ========== EXEMPLO 4: ATUALIZAR ESTADO DO JOGO ==========

async function exemploAtualizarEstado() {
  try {
    const gameId = localStorage.getItem('gameId');
    const playerId = localStorage.getItem('playerId');

    const novoEstado = {
      hand: [
        { id: 'arina_sereia_1', name: 'Arina a Sereia' },
        { id: 'peixe_espada_1', name: 'Peixe Espada' }
      ],
      field: [
        { id: 'caranguejo_concha_1', name: 'Caranguejo da Concha' }
      ],
      deck: [],
      banished: [],
      pressureLevel: 0
    };

    await window.API.updateGameState(gameId, playerId, novoEstado);
    console.log('Estado atualizado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
  }
}

// ========== EXEMPLO 5: REGISTRAR AÇÃO ==========

async function exemploRegistrarAcao() {
  try {
    const gameId = localStorage.getItem('gameId');
    const playerId = localStorage.getItem('playerId');

    // Exemplo: Jogador jogou uma carta
    await window.API.recordGameAction(gameId, playerId, 'play_card', {
      cardId: 'arina_sereia_1',
      cardName: 'Arina a Sereia',
      fromZone: 'hand',
      toZone: 'field',
      timestamp: new Date().toISOString()
    });

    console.log('Ação registrada!');
    
  } catch (error) {
    console.error('Erro ao registrar ação:', error);
  }
}

// ========== EXEMPLO 6: COMUNICAÇÃO EM TEMPO REAL ==========

function exemploWebSocket() {
  // Quando um jogador entra na sala
  window.API.onPlayerJoined((data) => {
    console.log('Novo jogador entrou:', data.playerId);
    console.log('Socket ID:', data.socketId);
    
    // Atualizar UI
    document.getElementById('opponentName').textContent = data.playerId;
  });

  // Quando o estado do jogo é atualizado
  window.API.onGameStateUpdate((data) => {
    console.log('Estado atualizado por:', data.playerId);
    console.log('Novo estado:', data.gameState);
    
    // Atualizar visualização do campo do oponente
    atualizarCampoOponente(data.gameState);
  });

  // Quando um jogador realiza uma ação
  window.API.onPlayerAction((data) => {
    console.log('Ação de', data.playerId, ':', data.action);
    console.log('Detalhes:', data.details);
    
    // Processar ação na UI
    processarAcaoOponente(data.action, data.details);
  });

  // Quando o turno muda
  window.API.onTurnChanged((data) => {
    console.log('Próximo jogador:', data.nextPlayer);
    
    if (data.nextPlayer === localStorage.getItem('playerId')) {
      console.log('É seu turno!');
      document.getElementById('turnIndicator').textContent = 'Seu Turno';
    } else {
      console.log('Aguardando oponente...');
      document.getElementById('turnIndicator').textContent = 'Turno do Oponente';
    }
  });

  // Quando um jogador se desconecta
  window.API.onPlayerDisconnected((data) => {
    console.log('Jogador desconectado:', data.socketId);
    alert('Seu oponente se desconectou!');
  });

  // Quando o jogo termina
  window.API.onGameEnded((data) => {
    console.log('Jogo terminado!');
    console.log('Vencedor:', data.winner);
    console.log('Motivo:', data.reason);
    
    mostrarTelaVitoria(data.winner === localStorage.getItem('playerId'));
  });
}

// ========== EXEMPLO 7: EMITIR ESTADO PARA OPONENTE ==========

function exemploEmitirEstado() {
  const roomCode = localStorage.getItem('roomCode');
  const playerId = localStorage.getItem('playerId');

  const meuEstado = {
    hand: [/* cartas na mão */],
    field: [/* cartas no campo */],
    deck: [/* cartas no deck */],
    banished: [/* cartas banidas */],
    pressureLevel: 0
  };

  // Enviar para o oponente via WebSocket
  window.API.emitGameStateUpdate(roomCode, playerId, meuEstado);
}

// ========== EXEMPLO 8: EMITIR AÇÃO DO JOGADOR ==========

function exemploEmitirAcao() {
  const roomCode = localStorage.getItem('roomCode');
  const playerId = localStorage.getItem('playerId');

  // Exemplo: Declarar ataque
  window.API.emitPlayerAction(roomCode, playerId, 'declare_attack', {
    attacker: 'caranguejo_concha_1',
    target: 'peixe_espada_2',
    timestamp: new Date().toISOString()
  });

  // Exemplo: Passar turno
  window.API.emitPlayerAction(roomCode, playerId, 'end_turn', {
    nextPlayer: 'opponent'
  });
}

// ========== EXEMPLO 9: PASSAR TURNO ==========

function exemploPassarTurno() {
  const roomCode = localStorage.getItem('roomCode');
  const playerId = localStorage.getItem('playerId');
  const opponentId = localStorage.getItem('opponentId');

  // Passar turno para o oponente
  window.API.emitEndTurn(roomCode, opponentId);

  console.log('Turno passou para:', opponentId);
}

// ========== EXEMPLO 10: RENDER-SE ==========

function exemploRenderse() {
  const roomCode = localStorage.getItem('roomCode');
  const playerId = localStorage.getItem('playerId');

  if (confirm('Tem certeza que quer se render?')) {
    window.API.emitSurrender(roomCode, playerId);
    console.log('Você se rendeu!');
  }
}

// ========== EXEMPLO 11: FLUXO COMPLETO DO JOGO ==========

async function fluxoCompletoExemplo() {
  try {
    // 1. Criar sala
    const playerId = 'player_' + Date.now();
    const game = await window.API.createGame(playerId, 'aquatico');
    
    console.log('1️⃣  Sala criada:', game.roomCode);
    localStorage.setItem('gameId', game.gameId);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('roomCode', game.roomCode);

    // 2. Preparar ouvintes de WebSocket
    exemploWebSocket();

    // 3. Aguardar outro jogador entrar (simulado)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Obter estado inicial
    const state = await window.API.getGameState(game.gameId);
    console.log('2️⃣  Estado do jogo:', state);

    // 5. Inicializar estado do jogador
    const estadoInicial = {
      hand: [
        DECKS.aquatico.cards[0],
        DECKS.aquatico.cards[1],
        DECKS.aquatico.cards[2],
        DECKS.aquatico.cards[3]
      ],
      field: [],
      deck: DECKS.aquatico.cards.slice(4),
      banished: [],
      pressureLevel: 0
    };

    await window.API.updateGameState(game.gameId, playerId, estadoInicial);
    console.log('3️⃣  Estado inicializado');

    // 6. Registrar primeira ação
    await window.API.recordGameAction(game.gameId, playerId, 'game_start', {
      deck: 'aquatico',
      timestamp: new Date().toISOString()
    });

    console.log('4️⃣  Jogo iniciado!');
    
  } catch (error) {
    console.error('Erro no fluxo:', error);
  }
}

// ========== COMO INTEGRAR NO ui.js ==========

/*
Substitua as chamadas para firebase pelas chamadas de window.API

Exemplo antigo (Firebase):
  database.ref(`games/${roomCode}`).on('value', (snapshot) => {
    // ...
  });

Novo (Nossa API):
  window.API.onGameStateUpdate((data) => {
    // ...
  });
  
  window.API.emitGameStateUpdate(roomCode, playerId, state);
*/

console.log('✅ Exemplos de API carregados!');
console.log('Use: fluxoCompletoExemplo() para testar o fluxo completo');
