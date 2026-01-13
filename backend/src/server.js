import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import gamesRouter from './routes/games.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const server = http.createServer(app);

// Configurar Socket.IO para comunicação em tempo real
const io = new SocketIOServer(server, {
  cors: {
    origin: ['https://douglas-pedroso.github.io', 'http://localhost:5500', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['https://douglas-pedroso.github.io', 'http://localhost:5500', 'http://localhost:3000'],
  credentials: true
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor está funcionando' });
});

// Rotas
app.use('/api/games', gamesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Socket.IO events para comunicação em tempo real
const rooms = new Map(); // Armazenar conexões por sala

io.on('connection', (socket) => {
  console.log('🎮 Novo cliente conectado:', socket.id);

  // Evento: Jogador entra em uma sala
  socket.on('join-game', (data) => {
    const { roomCode, playerId } = data;
    const room = `game-${roomCode}`;

    socket.join(room);
    
    if (!rooms.has(room)) {
      rooms.set(room, []);
    }
    rooms.get(room).push(socket.id);

    console.log(`👤 ${playerId} entrou na sala ${roomCode}`);

    // Notificar outros jogadores na sala
    socket.to(room).emit('player-joined', { playerId, socketId: socket.id });
  });

  // Evento: Atualização de estado do jogo
  socket.on('game-state-update', (data) => {
    const { roomCode, playerId, gameState } = data;
    const room = `game-${roomCode}`;

    socket.to(room).emit('game-state-update', {
      playerId,
      gameState
    });

    console.log(`📤 Estado do jogo atualizado de ${playerId}`);
  });

  // Evento: Ação do jogador
  socket.on('player-action', (data) => {
    const { roomCode, playerId, action, details } = data;
    const room = `game-${roomCode}`;

    socket.to(room).emit('player-action', {
      playerId,
      action,
      details
    });

    console.log(`🎯 ${playerId} realizou ação: ${action}`);
  });

  // Evento: Passar turno
  socket.on('end-turn', (data) => {
    const { roomCode, nextPlayer } = data;
    const room = `game-${roomCode}`;

    io.to(room).emit('turn-changed', { nextPlayer });
    console.log(`⏭️ Turno passou para ${nextPlayer}`);
  });

  // Evento: Render/Surrender
  socket.on('surrender', (data) => {
    const { roomCode, playerId } = data;
    const room = `game-${roomCode}`;

    io.to(room).emit('game-ended', {
      winner: 'opponent',
      loser: playerId,
      reason: 'surrender'
    });

    console.log(`🏳️ ${playerId} rendeu-se`);
  });

  // Evento: Desconexão
  socket.on('disconnect', () => {
    console.log('🚪 Cliente desconectado:', socket.id);

    // Remover de todas as salas
    for (const [room, sockets] of rooms.entries()) {
      const index = sockets.indexOf(socket.id);
      if (index > -1) {
        sockets.splice(index, 1);
        io.to(room).emit('player-disconnected', { socketId: socket.id });
      }
    }
  });
});

// Testar conexão com banco de dados (opcional)
const testDatabaseConnection = async () => {
  try {
    console.log('📊 Tentando conectar ao banco de dados...');
    const { default: pool } = await import('./config/database.js');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexão com banco de dados estabelecida');
    return true;
  } catch (error) {
    console.warn('⚠️  Aviso: Banco de dados não disponível:', error.message);
    console.log('💡 O servidor funcionará sem banco de dados por enquanto');
    return true; // Continuar mesmo sem banco
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Verificar conexão com banco de dados (não obrigatório)
  await testDatabaseConnection();

  server.listen(PORT, () => {
    console.log(`
🚀 Servidor rodando em: http://localhost:${PORT}
📊 WebSocket ativo para comunicação em tempo real
🌐 CORS habilitado para: ${process.env.CLIENT_URL || 'http://localhost:5500'}

⚙️  Para inicializar o banco de dados, execute:
   npm run migrate
    `);
  });
};

startServer();

export default app;
