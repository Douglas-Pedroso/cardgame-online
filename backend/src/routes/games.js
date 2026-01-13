import express from 'express';
import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

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
      const existing = await pool.query(
        'SELECT id FROM games WHERE room_code = $1',
        [roomCode]
      );
      if (existing.rows.length === 0) {
        isUnique = true;
      }
    }

    const result = await pool.query(
      `INSERT INTO games (room_code, player1_id, player1_deck, status)
       VALUES ($1, $2, $3, 'waiting')
       RETURNING id, room_code, player1_id, player1_deck, status`,
      [roomCode, playerId, playerDeck]
    );

    const game = result.rows[0];

    // Inicializar estado do jogador 1
    await pool.query(
      `INSERT INTO game_states (game_id, player_id, hand, field, deck, banished)
       VALUES ($1, $2, '[]', '[]', '[]', '[]')`,
      [game.id, playerId]
    );

    res.status(201).json({
      success: true,
      game: {
        gameId: game.id,
        roomCode: game.room_code,
        playerId: game.player1_id,
        playerDeck: game.player1_deck,
        status: game.status
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

    const result = await pool.query(
      'SELECT * FROM games WHERE room_code = $1',
      [roomCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    const game = result.rows[0];

    if (game.player2_id) {
      return res.status(400).json({ error: 'Sala já está cheia' });
    }

    // Atualizar sala com jogador 2
    await pool.query(
      'UPDATE games SET player2_id = $1, player2_deck = $2 WHERE id = $3',
      [playerId, playerDeck, game.id]
    );

    // Inicializar estado do jogador 2
    await pool.query(
      `INSERT INTO game_states (game_id, player_id, hand, field, deck, banished)
       VALUES ($1, $2, '[]', '[]', '[]', '[]')`,
      [game.id, playerId]
    );

    res.json({
      success: true,
      game: {
        gameId: game.id,
        roomCode: game.room_code,
        player1Id: game.player1_id,
        player1Deck: game.player1_deck,
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

    const gameResult = await pool.query(
      'SELECT * FROM games WHERE id = $1',
      [gameId]
    );

    if (gameResult.rows.length === 0) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    const game = gameResult.rows[0];

    const statesResult = await pool.query(
      'SELECT * FROM game_states WHERE game_id = $1',
      [gameId]
    );

    res.json({
      success: true,
      game: {
        id: game.id,
        roomCode: game.room_code,
        player1Id: game.player1_id,
        player1Deck: game.player1_deck,
        player2Id: game.player2_id,
        player2Deck: game.player2_deck,
        status: game.status,
        currentTurn: game.current_turn
      },
      states: statesResult.rows.map(state => ({
        playerId: state.player_id,
        hand: state.hand,
        field: state.field,
        deck: state.deck,
        banished: state.banished,
        pressureLevel: state.pressure_level
      }))
    });
  } catch (error) {
    console.error('Erro ao obter estado do jogo:', error);
    res.status(500).json({ error: 'Erro ao obter estado do jogo' });
  }
});

// PUT /api/games/:gameId/state - Atualizar estado do jogo
router.put('/:gameId/state', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId, hand, field, deck, banished, pressureLevel } = req.body;

    await pool.query(
      `UPDATE game_states 
       SET hand = $1, field = $2, deck = $3, banished = $4, pressure_level = $5, updated_at = CURRENT_TIMESTAMP
       WHERE game_id = $6 AND player_id = $7`,
      [
        JSON.stringify(hand || []),
        JSON.stringify(field || []),
        JSON.stringify(deck || []),
        JSON.stringify(banished || []),
        pressureLevel || 0,
        gameId,
        playerId
      ]
    );

    res.json({ success: true, message: 'Estado atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    res.status(500).json({ error: 'Erro ao atualizar estado' });
  }
});

// POST /api/games/:gameId/action - Registrar ação no jogo
router.post('/:gameId/action', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId, action, details } = req.body;

    await pool.query(
      `INSERT INTO game_actions (game_id, player_id, action, details)
       VALUES ($1, $2, $3, $4)`,
      [gameId, playerId, action, JSON.stringify(details || {})]
    );

    res.json({ success: true, message: 'Ação registrada' });
  } catch (error) {
    console.error('Erro ao registrar ação:', error);
    res.status(500).json({ error: 'Erro ao registrar ação' });
  }
});

// DELETE /api/games/:gameId - Deletar jogo
router.delete('/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;

    await pool.query('DELETE FROM games WHERE id = $1', [gameId]);

    res.json({ success: true, message: 'Jogo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar jogo:', error);
    res.status(500).json({ error: 'Erro ao deletar jogo' });
  }
});

export default router;
