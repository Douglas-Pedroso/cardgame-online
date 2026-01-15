// 🧪 TESTE DE DEBUG - Cole no Console (F12)

// Verificar se gameState existe e modo offline está ativado
console.log('=== STATUS DO JOGO ===');
console.log('gameState existe:', typeof gameState !== 'undefined');
console.log('Modo offline:', gameState?.isOffline);
console.log('Player atual:', gameState?.currentPlayer);
console.log('Mão do jogador:', gameState?.players[1]?.hand?.length, 'cartas');

// Verificar se drop zones estão configurados
console.log('\n=== DROP ZONES ===');
const playerFieldSlots = document.querySelectorAll('#playerField .field-slot');
console.log('Field slots encontrados:', playerFieldSlots.length);
playerFieldSlots.forEach((slot, i) => {
  console.log(`  Slot ${i} - ondrop configurado:`, typeof slot.ondrop !== 'undefined');
});

const playerBanished = document.getElementById('playerBanished');
console.log('playerBanished encontrado:', playerBanished !== null);
console.log('playerBanished ondrop configurado:', typeof playerBanished?.ondrop !== 'undefined');

// Verificar cartas na mão
console.log('\n=== CARTAS NA MÃO ===');
const cardsInHand = document.querySelectorAll('#playerHand .card');
console.log('Cards renderizados:', cardsInHand.length);
cardsInHand.forEach((card, i) => {
  console.log(`  Carta ${i} - draggable:`, card.draggable);
  console.log(`  Carta ${i} - ondragstart:`, typeof card.ondragstart !== 'undefined');
});

// Teste manual - simular drop
console.log('\n=== TESTE DE DROP (SIMULADO) ===');
if (playerFieldSlots.length > 0) {
  const testSlot = playerFieldSlots[0];
  console.log('Testando drop no slot 0...');
  
  // Criar evento simulado
  const dragEvent = new DragEvent('dragover', {
    bubbles: true,
    cancelable: true,
    dataTransfer: new DataTransfer()
  });
  
  testSlot.ondragover?.(dragEvent);
  console.log('ondragover executado');
}

console.log('\n✅ Teste completado - verifique os logs acima');
