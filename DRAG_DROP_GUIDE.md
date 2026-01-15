# 🎴 Guia de Teste - Drag and Drop

## Como Testar

### Passos:
1. **Recarregue a página** (F5 ou Ctrl+Shift+R)
2. **Abra o Console** (F12 → Console)
3. **Clique em "Jogar"**
4. **Selecione "Modo Offline"**
5. **Digite nomes e selecione decks**
6. **Clique "Iniciar Partida"**
7. **Escolha Pedra, Papel ou Tesoura**
8. **Espere carregar a tela de jogo**

### Teste de Drag and Drop:

#### Teste 1: Arrastar para o Campo
1. Clique e segure numa carta da sua mão
2. Arraste para um dos **4 slots do campo** (em azul/verde)
3. Solte o mouse
4. **Console deve mostrar:** ✅ Carta movida

#### Teste 2: Arrastar para Banimento
1. Clique e segure numa carta da sua mão
2. Arraste para a zona **"Seu Banido"** (abaixo)
3. Solte o mouse
4. **Console deve mostrar:** ⚫ Carta banida

### Logs Esperados (no Console):

```
🔧 Configurando drop zones...
📦 4 slots encontrados
🎴 Drop detectado no slot 0
📋 Data: {"player":1,"index":0,"type":"hand"}
👤 Player: 1, Data: Object
📌 Movendo carta...
✅ Carta "Nome da Carta" movida para o campo (slot 0)
```

### Se NÃO funcionar:

1. **Verifique os logs no Console (F12)**
   - Se não vir logs: drag/drop não está sendo acionado
   - Se vir erro: há bug na lógica

2. **Possíveis problemas:**
   - ❌ "Não encontrados slots" → HTML estrutura mudou
   - ❌ "Não é seu turno" → gameState.currentPlayer !== 1
   - ❌ "Índice inválido" → Data não foi transferida corretamente

3. **Soluções rápidas:**
   - Recarregue a página (Ctrl+Shift+R força limpeza de cache)
   - Verifique se está no turno do Jogador 1 (verde no indicador)
   - Abra DevTools e procure por erros em vermelho

### Estrutura Esperada:

```html
<!-- Onde arrastar PARA -->
<div id="playerField" class="field-slots">
  <div class="field-slot"><!-- Arraste aqui --></div>
  <div class="field-slot"><!-- Arraste aqui --></div>
  <div class="field-slot"><!-- Arraste aqui --></div>
  <div class="field-slot"><!-- Arraste aqui --></div>
</div>

<!-- Banimento -->
<div id="playerBanished" class="zone-content">
  <!-- Arraste cartas aqui para banir -->
</div>

<!-- De onde arrastar -->
<div id="playerHand" class="zone-content">
  <div class="card" draggable="true">...</div>
</div>
```

### Checklist de Funcionalidades:

- [ ] Cartas na mão têm atributo `draggable="true"`
- [ ] Campo tem 4 slots com IDs corretos
- [ ] Banimento tem ID `playerBanished`
- [ ] Listeners são re-configurados após atualizar
- [ ] Validações de turno funcionam
- [ ] Índices são passados corretamente

---

## Próximas Melhorias (Futuro)

- [ ] Animação visual ao mover carta
- [ ] Som ao completar movimento
- [ ] Undo/Redo de movimento
- [ ] Modo Online com sincronização
- [ ] Touch support para mobile

