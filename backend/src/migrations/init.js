import pool from '../config/database.js';

const initDatabase = async () => {
  try {
    console.log('📊 Inicializando banco de dados...');

    // Criar tabela de salas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        room_code VARCHAR(6) UNIQUE NOT NULL,
        player1_id VARCHAR(255),
        player2_id VARCHAR(255),
        player1_deck VARCHAR(50),
        player2_deck VARCHAR(50),
        status VARCHAR(50) DEFAULT 'waiting',
        current_turn VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabela "games" criada/verificada');

    // Criar tabela de estado do jogo
    await pool.query(`
      CREATE TABLE IF NOT EXISTS game_states (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
        player_id VARCHAR(255) NOT NULL,
        hand JSONB DEFAULT '[]',
        field JSONB DEFAULT '[]',
        deck JSONB DEFAULT '[]',
        banished JSONB DEFAULT '[]',
        pressure_level INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabela "game_states" criada/verificada');

    // Criar tabela de ações do jogo (log)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS game_actions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
        player_id VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabela "game_actions" criada/verificada');

    // Criar índices para melhor performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_games_room_code ON games(room_code);
      CREATE INDEX IF NOT EXISTS idx_game_states_game_id ON game_states(game_id);
      CREATE INDEX IF NOT EXISTS idx_game_actions_game_id ON game_actions(game_id);
    `);
    console.log('✅ Índices criados/verificados');

    console.log('✨ Banco de dados inicializado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
};

initDatabase();
