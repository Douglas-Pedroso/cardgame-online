import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Armazenar dados em memória (temporário até banco ficar pronto)
const games = new Map();

// Função para gerar código de sala aleatório (6 caracteres)
const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// POST /api/games/create - Criar nova sala
router.post('/create', async (req, res) => {
  try {
    const { playerId, playerDeck } = req.body;

    if (!playerId || !playerDeck) {
      return res.status(400).json({ error: 'playerId e playerDeck são obrigatórios' });
    }

    let roomCode;
    let isUnique = false;

    // Garantir que o código é único
    while (!isUnique) {
      roomCode = generateRoomCode();
      if (!games.has(roomCode)) {
        isUnique = true;
      }
    }

    const gameId = uuidv4();
    const gameData = {
      id: gameId,
      roomCode,
      player1Id: playerId,
      player1Deck: playerDeck,
      player2Id: null,
      player2Deck: null,
      status: 'waiting',
      createdAt: new Date()
    };

    games.set(roomCode, gameData);

    res.status(201).json({
      success: true,
      game: {
        gameId,
        roomCode,
        playerId,
        playerDeck,
        status: 'waiting'
      }
    });
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ error: 'Erro ao criar sala' });
  }
});

// GET /api/games/:roomCode/join - Entrar em uma sala existente
router.get('/:roomCode/join', async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { playerId, playerDeck } = req.query;

    if (!playerId || !playerDeck) {
      return res.status(400).json({ error: 'playerId e playerDeck são obrigatórios' });
    }

    const game = games.get(roomCode);

    if (!game) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    if (game.player2Id) {
      return res.status(400).json({ error: 'Sala já está cheia' });
    }

    // Atualizar sala com jogador 2
    game.player2Id = playerId;
    game.player2Deck = playerDeck;

    res.json({
      success: true,
      game: {
        gameId: game.id,
        roomCode: game.roomCode,
        player1Id: game.player1Id,
        player1Deck: game.player1Deck,
        player2Id: playerId,
        player2Deck: playerDeck,
        status: game.status
      }
    });
  } catch (error) {
    console.error('Erro ao entrar na sala:', error);
    res.status(500).json({ error: 'Erro ao entrar na sala' });
  }
});

// GET /api/games/:gameId/state - Obter estado atual do jogo
router.get('/:gameId/state', async (req, res) => {
  try {
    const { gameId } = req.params;

    let game = null;
    for (let [key, value] of games) {
      if (value.id === gameId) {
        game = value;
        break;
      }
    }

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json({
      success: true,
      game: {
        id: game.id,
        roomCode: game.roomCode,
        player1Id: game.player1Id,
        player1Deck: game.player1Deck,
        player2Id: game.player2Id,
        player2Deck: game.player2Deck,
        status: game.status
      },
      states: []
    });
  } catch (error) {
    console.error('Erro ao obter estado do jogo:', error);
    res.status(500).json({ error: 'Erro ao obter estado do jogo' });
  }
});

// PUT /api/games/:gameId/state - Atualizar estado do jogo
router.put('/:gameId/state', async (req, res) => {
  try {
    res.json({ success: true, message: 'Estado atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    res.status(500).json({ error: 'Erro ao atualizar estado' });
  }
});

// POST /api/games/:gameId/action - Registrar ação no jogo
router.post('/:gameId/action', async (req, res) => {
  try {
    res.json({ success: true, message: 'Ação registrada' });
  } catch (error) {
    console.error('Erro ao registrar ação:', error);
    res.status(500).json({ error: 'Erro ao registrar ação' });
  }
});

// DELETE /api/games/:gameId - Deletar jogo
router.delete('/:gameId', async (req, res) => {
  try {
    res.json({ success: true, message: 'Jogo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar jogo:', error);
    res.status(500).json({ error: 'Erro ao deletar jogo' });
  }
});

export default router;
