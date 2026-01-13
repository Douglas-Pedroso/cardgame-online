// config.js - Configuração do Firebase

// ⚠️ IMPORTANTE: Substitua estes valores pelas suas credenciais do Firebase
// Para obter suas credenciais:
// 1. Acesse https://console.firebase.google.com/
// 2. Selecione seu projeto
// 3. Vá em Configurações do Projeto (ícone de engrenagem)
// 4. Role até "Seus aplicativos" e clique no ícone Web (</>)
// 5. Copie o objeto firebaseConfig

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializar Firebase
let app;
let database;

try {
  app = firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log('✅ Firebase inicializado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  alert('Erro ao conectar com Firebase. Verifique suas credenciais em config.js');
}

// Exportar para uso global
window.firebaseApp = app;
window.firebaseDB = database;