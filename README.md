🎴 Card Game Online - Multiplayer
Jogo de cartas online para 2 jogadores com sincronização em tempo real usando Firebase.

🎮 Características
✅ Multiplayer em tempo real
✅ 4 decks disponíveis (Aquático, Planta, Fada, Cavaleiro)
✅ Sistema de turnos
✅ Movimentação livre de cartas entre zonas
✅ Pedra, papel, tesoura para decidir quem começa
✅ Visualização completa dos decks do oponente
✅ Compra aleatória de cartas
🚀 Como Configurar
1. Criar Projeto Firebase
Acesse Firebase Console
Clique em "Adicionar projeto"
Dê um nome (ex: "cardgame-online")
Desative o Google Analytics (opcional)
Clique em "Criar projeto"
2. Configurar Realtime Database
No menu lateral, clique em "Realtime Database"
Clique em "Criar banco de dados"
Escolha a localização (ex: us-central1)
Selecione "Iniciar no modo de teste" (temporário)
Clique em "Ativar"
3. Configurar Regras de Segurança
Na aba "Regras", substitua por:

json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
⚠️ IMPORTANTE: Estas regras são para desenvolvimento. Para produção, implemente autenticação!

4. Obter Credenciais
Clique no ícone de engrenagem ⚙️ → "Configurações do projeto"
Role até "Seus aplicativos"
Clique no ícone </> (Web)
Registre o app com um apelido
Copie as credenciais do objeto firebaseConfig
5. Configurar o Projeto
Abra o arquivo js/config.js
Substitua os valores pelas suas credenciais:
javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
📦 Hospedar no GitHub Pages
1. Criar Repositório
bash
# Inicializar repositório
git init
git add .
git commit -m "Initial commit - Card Game Online"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/cardgame-online.git
git branch -M main
git push -u origin main
2. Ativar GitHub Pages
Vá em "Settings" do repositório
No menu lateral, clique em "Pages"
Em "Source", selecione "main" branch
Clique em "Save"
Aguarde alguns minutos
Acesse: https://SEU_USUARIO.github.io/cardgame-online/
🎯 Como Jogar
Início do Jogo
Jogador 1: Clica em "Criar Sala" e escolhe um deck
Compartilha o código da sala com o amigo
Jogador 2: Clica em "Entrar na Sala", insere o código e escolhe deck
Ambos jogam Pedra, Papel, Tesoura
O vencedor começa com 4 cartas
Zonas do Jogo
Mão: Cartas privadas do jogador
Campo: 4 espaços para cartas em jogo (visíveis)
Deck: Pilha de cartas disponíveis (visível para ambos)
Banido: Cartas removidas do jogo (visível)
Ações Disponíveis
Durante seu turno, você pode:

Arrastar cartas entre zonas livremente
Ver o deck do oponente clicando nele
Passar o turno: Adversário compra 1 carta aleatória do deck
Render-se: Encerra a partida
Movimentos Permitidos
Mão → Campo
Campo → Mão
Campo → Deck
Campo → Banido
Banido → Mão/Campo/Deck
Deck → Mão/Campo/Banido
🎴 Decks Disponíveis
🌊 Aquático (20 cartas)
Criaturas aquáticas com foco em controle e adaptação.

🌿 Planta (20 cartas)
Criaturas plantas com mecânicas de proteção e suporte.

🧚 Fada (20 cartas)
Criaturas mágicas com habilidades de manipulação de campo.

🏹 Cavaleiro (20 cartas)
Guerreiros e feras com mecânicas de combate direto.

🛠️ Tecnologias Utilizadas
HTML5/CSS3/JavaScript - Frontend
Firebase Realtime Database - Backend/Sincronização
GitHub Pages - Hospedagem
Font Awesome - Ícones
Google Fonts - Tipografia
📱 Responsividade
O jogo é otimizado para:

💻 Desktop (1920x1080 recomendado)
📱 Tablet (landscape)
📱 Mobile (com limitações)
🐛 Solução de Problemas
Firebase não conecta
Verifique se as credenciais em config.js estão corretas
Confirme que o Realtime Database está ativo
Verifique as regras de segurança
Cartas não aparecem
Certifique-se de que as imagens estão na pasta assets/cards/
Verifique os nomes dos arquivos em decks.js
Sincronização lenta
Verifique sua conexão com internet
Firebase pode ter delay de 100-500ms (normal)
📄 Licença
Este projeto é livre para uso pessoal e educacional.

🤝 Contribuindo
Pull requests são bem-vindos! Para grandes mudanças, abra uma issue primeiro.

📞 Suporte
Encontrou um bug? Abra uma issue no GitHub!

Feito com ❤️ para jogar com amigos

🎮 Bom jogo!

