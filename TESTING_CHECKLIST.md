# 🧪 Guia de Testes - Modo Offline

## Checklist de Testes

Utilize este checklist para validar o Modo Offline antes de usar em produção.

---

## ✅ Testes Funcionais

### 1. Menu Principal
- [ ] Página carrega corretamente
- [ ] Botão "Jogar" está visível
- [ ] Clique em "Jogar" abre tela de seleção de modo
- [ ] Link para documentação funciona

### 2. Seleção de Modo
- [ ] Opção "Modo Online" está visível
- [ ] Opção "Modo Offline" está visível
- [ ] Clique em "Modo Online" abre tela de criar sala
- [ ] Clique em "Modo Offline" abre tela de configuração
- [ ] Botão "Voltar" retorna ao menu principal

### 3. Configuração de Jogo Offline
- [ ] Campos de nome estão edítáveis
- [ ] Nomes padrão aparecem ("Jogador 1", "Jogador 2")
- [ ] Seleção de decks funciona para ambos jogadores
- [ ] Decks selecionados mudam de cor/estilo
- [ ] Botão "Iniciar Partida" está habilitado
- [ ] Clique em "Voltar" volta para seleção de modo

### 4. Inicialização de Jogo
- [ ] Nomes dos jogadores aparecem na tela de jogo
- [ ] Decks corretos aparecem (ícone e cor)
- [ ] Tela de Pedra, Papel, Tesoura aparece
- [ ] Contadores de deck mostram 20 cartas iniciais

### 5. Pedra, Papel, Tesoura
- [ ] Botões de Pedra, Papel, Tesoura aparecem
- [ ] Clique em um botão desativa os outros
- [ ] Mensagem "Aguardando escolha do oponente" aparece
- [ ] Após 1-2s, resultado aparece
- [ ] Resultado está correto (Pedra > Tesoura, Papel > Pedra, Tesoura > Papel)
- [ ] Empate permite jogar novamente
- [ ] Vencedor correto é mostrado

### 6. Tela de Jogo
- [ ] Layout está correto (oponente acima, jogador abaixo)
- [ ] Nomes dos jogadores aparecem nos devidos lugares
- [ ] Deck icons aparecem com cores corretas
- [ ] Campo de ambos jogadores tem 4 espaços
- [ ] Mão de cartas do jogador está visível

### 7. Cartas e Mão
- [ ] Jogador 1 tem 4 cartas na mão inicialmente
- [ ] Nomes das cartas aparecem
- [ ] Cores de borda das cartas correspondem ao deck
- [ ] Clique em uma carta mostra detalhes em modal
- [ ] Modal mostra: Nome, Tipo, Custo, Poder, Efeito
- [ ] Botão X fecha o modal

### 8. Controles de Jogo
- [ ] Botão "Passar Turno" está visível
- [ ] Botão "Render-se" está visível
- [ ] Indicador de turno mostra "Seu Turno" ou "Turno do Oponente"
- [ ] Botão log de ações está presente

### 9. Lógica de Turnos
- [ ] Indicador mostra "Seu Turno" após RPS
- [ ] Clique em "Passar Turno" muda para "Turno do Oponente"
- [ ] Após 1-2s, volta para "Seu Turno"
- [ ] Contador de deck muda corretamente
- [ ] Jogador 2 "compra" carta quando seu turno chega

### 10. Render-se
- [ ] Clique em "Render-se" mostra confirmação
- [ ] Confirmação aparece com vencedor
- [ ] Clique "OK" volta ao menu principal
- [ ] Game state é resetado

### 11. Modal de Cartas
- [ ] Clique em uma carta abre detalhes
- [ ] Todos os dados aparecem (nome, tipo, custo, poder, efeito)
- [ ] Botão X funciona
- [ ] Clique fora fecha o modal (se implementado)

---

## 🎯 Testes de UI/UX

### Responsividade
- [ ] Funciona em desktop (1920x1080)
- [ ] Funciona em tablet (768x1024)
- [ ] Elementos não ficam fora de tela
- [ ] Textos são legíveis em todos os tamanhos

### Cores e Estilos
- [ ] Cores dos decks aparecem corretamente
- [ ] Botões têm hover effects
- [ ] Seleção de deck muda visualmente
- [ ] Cards têm sombra e efeitos visuais

### Animações
- [ ] Fade-in das telas funciona
- [ ] Transições são suaves
- [ ] Spinners aparecem quando esperado

---

## 🐛 Testes de Bugs

### Contra Problemas Comuns
- [ ] Não há erros no console (F12 → Console)
- [ ] Dados não se perdem ao navegar
- [ ] Nomes com caracteres especiais funcionam
- [ ] Nomes vazios são tratados (padrão)
- [ ] Embaralhamento de deck varia (não é sempre igual)

### Casos Extremos
- [ ] Nomes muito longos não quebram layout
- [ ] Múltiplos cliques rápidos não causam bug
- [ ] Fechar abas/reload não danifica estado
- [ ] Voltar sem iniciar jogo funciona

---

## 📝 Testes de Documentação

- [ ] OFFLINE_MODE.md está correto
- [ ] Instruções são claras
- [ ] Links funcionam
- [ ] FAQ responde perguntas comuns
- [ ] Exemplos de código estão corretos

---

## 🔧 Testes de Compatibilidade

### Navegadores
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Dispositivos
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile (se aplicável)

---

## 📊 Testes de Performance

- [ ] Página carrega em < 2s
- [ ] Tela de jogo renderiza suavemente
- [ ] Sem lag ao clicar em botões
- [ ] Transições fluidas

---

## ✨ Testes Extras

### Fluxo Completo
- [ ] Menu → Modo Offline → Config → Jogo → Render-se → Menu (sem erros)
- [ ] Menu → Modo Online → Criar Sala (ainda funciona)
- [ ] Menu → Modo Online → Entrar na Sala (ainda funciona)

### Integração
- [ ] Offline não interfere com Online
- [ ] Assets dos decks carregam corretamente
- [ ] Funções auxiliares (getDeck, shuffleDeck) funcionam

---

## 🎮 Teste Completo de Partida

1. [ ] Abra o jogo no navegador
2. [ ] Clique em "Jogar"
3. [ ] Selecione "Modo Offline"
4. [ ] Digite nomes: "Teste P1" e "Teste P2"
5. [ ] Selecione Florestal e Glacial
6. [ ] Clique "Iniciar Partida"
7. [ ] Escolha Pedra, Papel ou Tesoura
8. [ ] Aguarde resultado
9. [ ] Veja a tela de jogo
10. [ ] Clique em uma carta para ver detalhes
11. [ ] Feche o modal
12. [ ] Clique "Passar Turno"
13. [ ] Aguarde turno do oponente
14. [ ] Passe turno novamente
15. [ ] Clique "Render-se"
16. [ ] Confirme
17. [ ] Volte ao menu

**Resultado Esperado**: Nenhum erro, fluxo suave ✅

---

## 📋 Relatório de Teste

### Template para Reportar Bugs

```
**Bug #X: [Descrição Breve]**

**Passos para Reproduzir:**
1. ...
2. ...
3. ...

**Comportamento Esperado:**
[Descrever]

**Comportamento Observado:**
[Descrever]

**Screenshots:**
[Se aplicável]

**Navegador/Dispositivo:**
[Chrome, Firefox, etc.]

**Severidade:**
[ ] Crítica
[ ] Alta
[ ] Média
[ ] Baixa
```

---

## ✅ Checklist Final

Antes de marcar como "Completo", confirme:

- [ ] Todos os testes passaram
- [ ] Sem erros no console
- [ ] Documentação atualizada
- [ ] Nenhum bug conhecido aberto
- [ ] Performance aceitável
- [ ] Compatibilidade confirmada

---

**Status de Testes:** ⏳ _Em Progresso_

**Última Atualização:** 15/01/2026

**Testador:** [Seu Nome]

---

## 🚀 Próximas Etapas

Após completar os testes:
1. Deploy no GitHub Pages
2. Deploy do backend no Render
3. Testar modo Online
4. Comunicar ao usuário

---

**Bom Teste! 🧪**
