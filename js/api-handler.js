// api-handler.js - Comunicação com backend REST e WebSocket

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://cardgame-backend.render.com/api'; // Substitua com sua URL do Render

// Socket.IO para comunicação em tempo real
let socket = null;

// ========== INICIALIZAÇÃO ==========

const initSocket = () => {
  if (!socket) {
    const socketURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : 'https://cardgame-backend.render.com';

    socket = io(socketURL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('✅ Conectado ao servidor via WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado do servidor');
    });

    socket.on('error', (error) => {
      console.error('❌ Erro no WebSocket:', error);
    });
  }
  return socket;
};

// ========== FUNÇÕES DE JOGO ==========

// Criar nova sala
const createGame = async (playerId, playerDeck) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerId, playerDeck })
    });

    if (!response.ok) throw new Error('Erro ao criar sala');
    
    const data = await response.json();
    console.log('✅ Sala criada:', data.game.roomCode);
    
    // Conectar ao WebSocket
    initSocket().emit('join-game', { 
      roomCode: data.game.roomCode, 
      playerId 
    });

    return data.game;
  } catch (error) {
    console.error('❌ Erro ao criar jogo:', error);
    throw error;
  }
};

// Entrar em uma sala existente
const joinGame = async (roomCode, playerId, playerDeck) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games/${roomCode}/join?playerId=${playerId}&playerDeck=${playerDeck}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao entrar na sala');
    }

    const data = await response.json();
    console.log('✅ Entrou na sala:', roomCode);

    // Conectar ao WebSocket
    initSocket().emit('join-game', { 
      roomCode, 
      playerId 
    });

    return data.game;
  } catch (error) {
    console.error('❌ Erro ao entrar no jogo:', error);
    throw error;
  }
};

// Obter estado do jogo
const getGameState = async (gameId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/state`);
    
    if (!response.ok) throw new Error('Erro ao obter estado');
    
    return await response.json();
  } catch (error) {
    console.error('❌ Erro ao obter estado do jogo:', error);
    throw error;
  }
};

// Atualizar estado do jogo
const updateGameState = async (gameId, playerId, gameState) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerId,
        hand: gameState.hand || [],
        field: gameState.field || [],
        deck: gameState.deck || [],
        banished: gameState.banished || [],
        pressureLevel: gameState.pressureLevel || 0
      })
    });

    if (!response.ok) throw new Error('Erro ao atualizar estado');
    
    console.log('✅ Estado do jogo atualizado');
    return await response.json();
  } catch (error) {
    console.error('❌ Erro ao atualizar estado:', error);
    throw error;
  }
};

// Registrar ação do jogador
const recordGameAction = async (gameId, playerId, action, details) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerId, action, details })
    });

    if (!response.ok) throw new Error('Erro ao registrar ação');
    
    return await response.json();
  } catch (error) {
    console.error('❌ Erro ao registrar ação:', error);
    throw error;
  }
};

// Deletar jogo
const deleteGame = async (gameId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erro ao deletar jogo');
    
    console.log('✅ Jogo deletado');
    return await response.json();
  } catch (error) {
    console.error('❌ Erro ao deletar jogo:', error);
    throw error;
  }
};

// ========== EVENTOS DE WEBSOCKET ==========

// Listener para quando um jogador entra na sala
const onPlayerJoined = (callback) => {
  const s = initSocket();
  s.on('player-joined', callback);
};

// Listener para atualização de estado
const onGameStateUpdate = (callback) => {
  const s = initSocket();
  s.on('game-state-update', callback);
};

// Listener para ações do jogador
const onPlayerAction = (callback) => {
  const s = initSocket();
  s.on('player-action', callback);
};

// Listener para mudança de turno
const onTurnChanged = (callback) => {
  const s = initSocket();
  s.on('turn-changed', callback);
};

// Listener para quando um jogador se desconecta
const onPlayerDisconnected = (callback) => {
  const s = initSocket();
  s.on('player-disconnected', callback);
};

// Listener para fim do jogo
const onGameEnded = (callback) => {
  const s = initSocket();
  s.on('game-ended', callback);
};

// Emitir atualização de estado
const emitGameStateUpdate = (roomCode, playerId, gameState) => {
  const s = initSocket();
  s.emit('game-state-update', { roomCode, playerId, gameState });
};

// Emitir ação do jogador
const emitPlayerAction = (roomCode, playerId, action, details) => {
  const s = initSocket();
  s.emit('player-action', { roomCode, playerId, action, details });
};

// Emitir fim de turno
const emitEndTurn = (roomCode, nextPlayer) => {
  const s = initSocket();
  s.emit('end-turn', { roomCode, nextPlayer });
};

// Emitir surrender
const emitSurrender = (roomCode, playerId) => {
  const s = initSocket();
  s.emit('surrender', { roomCode, playerId });
};

// Desconectar do servidor
const disconnect = () => {
  if (socket) {
    socket.disconnect();
    console.log('🔌 Desconectado do servidor');
  }
};

// Exportar para uso global
window.API = {
  createGame,
  joinGame,
  getGameState,
  updateGameState,
  recordGameAction,
  deleteGame,
  onPlayerJoined,
  onGameStateUpdate,
  onPlayerAction,
  onTurnChanged,
  onPlayerDisconnected,
  onGameEnded,
  emitGameStateUpdate,
  emitPlayerAction,
  emitEndTurn,
  emitSurrender,
  disconnect
};

console.log('✅ API Handler carregado com sucesso!');