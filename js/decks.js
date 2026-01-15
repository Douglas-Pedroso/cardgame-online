// decks.js - Base de dados dos 3 decks do jogo

const DECKS = {
  florestal: {
    name: "Florestal",
    icon: "🌲",
    color: "#558B2F",
    cards: [
      { id: "broto_protetor_1", name: "Broto Protetor", cost: 2, power: 2, type: "Criatura: Planta", effect: "Criaturas plantas não são afetados por efeitos de carta.", image: "broto_protetor1.PNG" },
      { id: "broto_protetor_2", name: "Broto Protetor", cost: 2, power: 2, type: "Criatura: Planta", effect: "Criaturas plantas não são afetados por efeitos de carta.", image: "broto_protetor2.PNG" },
      { id: "cavaleiro_verde", name: "Cavaleiro Verde", cost: 3, power: 3, type: "Criatura: Cavaleiro Planta", effect: "Reação: Criaturas que escolham essa carta como alvo de ataque caem após o cálculo de nível de pressão.", image: "cavaleiro_verde.PNG" },
      { id: "dafne_ninfa_1", name: "Dafne a Ninfa do Bosque", cost: 1, power: 1, type: "Criatura: Planta", effect: "Preparação: Apague uma chama: Convoque para a montanha essa criatura.", image: "dafne_a_ninfa1.PNG" },
      { id: "dafne_ninfa_2", name: "Dafne a Ninfa do Bosque", cost: 1, power: 1, type: "Criatura: Planta", effect: "Preparação: Apague uma chama: Convoque para a montanha essa criatura.", image: "dafne_a_ninfa2.PNG" },
      { id: "gaiothar_liberto", name: "Gaiothar o Liberto", cost: 4, power: 4, type: "Criatura: Planta", effect: "Criaturas plantas só podem ser atacadas por criaturas de poder igual.", image: "gaiothar_o_liberto.PNG" },
      { id: "lobo_guardiao_1", name: "Lobo Guardião Silvestre", cost: 2, power: 2, type: "Criatura: Planta", effect: "Quando essa criatura cair, escolha uma criatura, ela não pode atacar neste turno.", image: "lobo_guardiao1.PNG" },
      { id: "lobo_guardiao_2", name: "Lobo Guardião Silvestre", cost: 2, power: 2, type: "Criatura: Planta", effect: "Quando essa criatura cair, escolha uma criatura, ela não pode atacar neste turno.", image: "lobo_guardiao2.PNG" },
      { id: "machado_equilibrio_1", name: "Machado do Equilíbrio", cost: 2, power: 0, type: "Item: Reação", effect: "Se uma criatura planta for derrubada, derrube a criatura que a derrubou nesse turno.", image: "machado_do_equilibrio1.PNG" },
      { id: "machado_equilibrio_2", name: "Machado do Equilíbrio", cost: 2, power: 0, type: "Item: Reação", effect: "Se uma criatura planta for derrubada, derrube a criatura que a derrubou nesse turno.", image: "machado_do_equilibrio2.PNG" },
      { id: "rato_broto_1", name: "Rato Broto", cost: 1, power: 1, type: "Criatura: Planta", effect: "Reação: Quando uma criatura poder 2 ou 1 cair. Convoque essa criatura para a montanha.", image: "rato_broto1.PNG" },
      { id: "rato_broto_2", name: "Rato Broto", cost: 1, power: 1, type: "Criatura: Planta", effect: "Reação: Quando uma criatura poder 2 ou 1 cair. Convoque essa criatura para a montanha.", image: "rato_broto2.PNG" },
      { id: "rothor_monolito", name: "Róthor o Monolito", cost: 3, power: 3, type: "Criatura: Planta", effect: "Essa criatura tem poder 4 enquanto houver outra criatura planta na montanha.", image: "rothor_monolito.PNG" },
      { id: "ultrapassar_limites_1", name: "Ultrapassar Limites", cost: 2, power: 0, type: "Item: Preparação", effect: "Uma criatura planta recebe +2 em poder até o fim do turno.", image: "ultrapassar_limites1.PNG" },
      { id: "ultrapassar_limites_2", name: "Ultrapassar Limites", cost: 2, power: 0, type: "Item: Preparação", effect: "Uma criatura planta recebe +2 em poder até o fim do turno.", image: "ultrapassar_limites2.PNG" },
      { id: "ultrapassar_limites_3", name: "Ultrapassar Limites", cost: 2, power: 0, type: "Item: Preparação", effect: "Uma criatura planta recebe +2 em poder até o fim do turno.", image: "ultrapassar_limites3.PNG" },
      { id: "veneno_paralisante_1", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante1.PNG" },
      { id: "veneno_paralisante_2", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante2.PNG" },
      { id: "veneno_paralisante_3", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante3.PNG" },
      { id: "verdanox_triplice", name: "Verdanox, o Tríplice Caule", cost: 4, power: 4, type: "Criatura: Planta", effect: "Ao derrubar uma criatura pode atacar outra novamente.", image: "verdanox_o_triplice.PNG" }
    ]
  },

  glacial: {
    name: "Glacial",
    icon: "❄️",
    color: "#00BCD4",
    cards: [
      { id: "behemoth_calamitoso", name: "Behemoth o Calamitoso", cost: 4, power: 4, type: "Criatura: Besta Glacial", effect: "Ao cair inflige +2 de pressão ao seu adversário.", image: "behemoth_o_calamitoso.PNG" },
      { id: "brarrier_viking_1", name: "Brarrier o Viking", cost: 3, power: 3, type: "Criatura: Cavaleiro Glacial", effect: "Preparação: Cause -1 de poder a uma criatura inimiga.", image: "brarrier_o_viking1.PNG" },
      { id: "brarrier_viking_2", name: "Brarrier o Viking", cost: 3, power: 3, type: "Criatura: Cavaleiro Glacial", effect: "Preparação: Cause -1 de poder a uma criatura inimiga.", image: "brarrier_o_viking2.PNG" },
      { id: "cetro_ventos_1", name: "Cetro dos Ventos", cost: 2, power: 0, type: "Item: Arma", effect: "Criatura equipada recebe +1 de poder. Preparação: Cause -1 de poder a uma criatura.", image: "cetro_dos_ventos1.PNG" },
      { id: "cetro_ventos_2", name: "Cetro dos Ventos", cost: 2, power: 0, type: "Item: Arma", effect: "Criatura equipada recebe +1 de poder. Preparação: Cause -1 de poder a uma criatura.", image: "cetro_dos_ventos2.PNG" },
      { id: "ciclope_subordinado", name: "Ciclope Subordinado", cost: 3, power: 3, type: "Criatura: Besta Glacial", effect: "Não pode ser alvo de itens. Causa pressão ao adversário quando declarado para ataque.", image: "ciclope_subordinado.PNG" },
      { id: "escudo_marcado_1", name: "Escudo Marcado", cost: 2, power: 0, type: "Item: Proteção", effect: "Reduz dano recebido em -1. Se criatura glacial, recebe +2 de poder.", image: "escudo_marcado1.PNG" },
      { id: "escudo_marcado_2", name: "Escudo Marcado", cost: 2, power: 0, type: "Item: Proteção", effect: "Reduz dano recebido em -1. Se criatura glacial, recebe +2 de poder.", image: "escudo_marcado2.PNG" },
      { id: "escudo_marcado_3", name: "Escudo Marcado", cost: 2, power: 0, type: "Item: Proteção", effect: "Reduz dano recebido em -1. Se criatura glacial, recebe +2 de poder.", image: "escudo_marcado3.PNG" },
      { id: "mamute_bastiao_1", name: "Mamute Bastião", cost: 2, power: 2, type: "Criatura: Besta Glacial", effect: "Quando for escolhida para combate recebe +1 de poder. Preparação: Compre uma carta.", image: "mamute_bastiao1.PNG" },
      { id: "mamute_bastiao_2", name: "Mamute Bastião", cost: 2, power: 2, type: "Criatura: Besta Glacial", effect: "Quando for escolhida para combate recebe +1 de poder. Preparação: Compre uma carta.", image: "mamute_bastiao2.PNG" },
      { id: "rainha_vento", name: "Rainha do Vento", cost: 4, power: 4, type: "Criatura: Fada Glacial", effect: "Criaturas glaciais recebem +1 de poder. Preparação: Cause -1 de poder a uma criatura inimiga.", image: "rainha_do_vento.PNG" },
      { id: "urso_aspirante_1", name: "Urso Aspirante", cost: 1, power: 1, type: "Criatura: Besta Glacial", effect: "Quando declarado para ataque, compre uma carta.", image: "urso_aspirante1.PNG" },
      { id: "urso_aspirante_2", name: "Urso Aspirante", cost: 1, power: 1, type: "Criatura: Besta Glacial", effect: "Quando declarado para ataque, compre uma carta.", image: "urso_aspirante2.PNG" },
      { id: "urso_centuriao", name: "Urso Centurião", cost: 4, power: 4, type: "Criatura: Besta Glacial", effect: "Ao combater recebe +1 de poder. Ao derrubar causa +1 de pressão.", image: "urso_centuriao.PNG" },
      { id: "ventos_congelantes_1", name: "Ventos Congelantes", cost: 2, power: 0, type: "Item: Reação", effect: "Negue um ataque. Criatura que sofreu freeze não pode atacar no turno seguinte.", image: "ventos_congelantes1.PNG" },
      { id: "ventos_congelantes_2", name: "Ventos Congelantes", cost: 2, power: 0, type: "Item: Reação", effect: "Negue um ataque. Criatura que sofreu freeze não pode atacar no turno seguinte.", image: "ventos_congelantes2.PNG" },
      { id: "ventos_congelantes_3", name: "Ventos Congelantes", cost: 2, power: 0, type: "Item: Reação", effect: "Negue um ataque. Criatura que sofreu freeze não pode atacar no turno seguinte.", image: "ventos_congelantes3.PNG" },
      { id: "vento_branco_1", name: "Vento Branco", cost: 1, power: 0, type: "Item: Preparação", effect: "Uma criatura glacial recebe +1 de poder até o fim do turno.", image: "vento_branco1.PNG" },
      { id: "vento_branco_2", name: "Vento Branco", cost: 1, power: 0, type: "Item: Preparação", effect: "Uma criatura glacial recebe +1 de poder até o fim do turno.", image: "vento_branco2.PNG" }
    ]
  },

  terrana: {
    name: "Terrana",
    icon: "🏜️",
    color: "#D2B48C",
    cards: [
      { id: "arco_flecha_1", name: "Arco e Flecha", cost: 1, power: 0, type: "Item: Arma", effect: "Se a criatura equipada for um cavaleiro ela tem: (Preparação) Uma vez durante seu turno mova uma chama para brasa. Cause -1 poder a uma criatura.", image: "arco_e_flecha1.PNG" },
      { id: "arco_flecha_2", name: "Arco e Flecha", cost: 1, power: 0, type: "Item: Arma", effect: "Se a criatura equipada for um cavaleiro ela tem: (Preparação) Uma vez durante seu turno mova uma chama para brasa. Cause -1 poder a uma criatura.", image: "arco_e_flecha2.PNG" },
      { id: "armadilha_caca_1", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_de_caca1.PNG" },
      { id: "armadilha_caca_2", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_de_caca2.PNG" },
      { id: "armadilha_caca_3", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_de_caca3.PNG" },
      { id: "bufalo_armado", name: "Búfalo Armado", cost: 3, power: 3, type: "Criatura: Fera Terrana", effect: "Se for escolhido pelo oponente para combater recebe +1 em seu poder.", image: "bufalo_armado.PNG" },
      { id: "centauro_bronze", name: "Centauro de Bronze", cost: 4, power: 3, type: "Criatura: Fera Terrana", effect: "Se sua zona de brasa estiver cheia esta criatura tem poder 5. Caso contrário essa carta tem poder 3. Se essa criatura cair seu nível de pressão sobe em 4.", image: "centauro_de_bronze.PNG" },
      { id: "cervo_mentor_1", name: "Cervo Mentor", cost: 2, power: 2, type: "Criatura: Fera Terrana", effect: "Quando Cervo Mentor é convocado mande uma chama para brasa. Convoque para a montanha uma criatura fera poder 1 de seu vale.", image: "cervo_mentor1.PNG" },
      { id: "cervo_mentor_2", name: "Cervo Mentor", cost: 2, power: 2, type: "Criatura: Fera Terrana", effect: "Quando Cervo Mentor é convocado mande uma chama para brasa. Convoque para a montanha uma criatura fera poder 1 de seu vale.", image: "cervo_mentor2.PNG" },
      { id: "coelho_flecheiro_1", name: "Coelho Flecheiro", cost: 1, power: 1, type: "Criatura: Fera Terrana", effect: "Quando Coelho Flecheiro é convocado na sua parte da montanha inflinja -1 poder a uma criatura.", image: "coelho_flecheiro1.PNG" },
      { id: "coelho_flecheiro_2", name: "Coelho Flecheiro", cost: 1, power: 1, type: "Criatura: Fera Terrana", effect: "Quando Coelho Flecheiro é convocado na sua parte da montanha inflinja -1 poder a uma criatura.", image: "coelho_flecheiro2.PNG" },
      { id: "falcao_arqueiro", name: "Falcão Arqueiro", cost: 3, power: 3, type: "Criatura: Fera Terrana", effect: "Preparação: Mova uma chama para a brasa, cause -1 poder a uma criatura.", image: "falcao_arqueiro.PNG" },
      { id: "ornitorrinco_escudeiro_1", name: "Ornitorrinco Escudeiro", cost: 1, power: 1, type: "Criatura: Fera Terrana", effect: "Quando Ornitorrinco Escudeiro é convocado procure em seu deck por Coelho Flecheiro e o ponha na sua mão, embaralhe seu deck.", image: "ornitorrinco_escudeiro1.PNG" },
      { id: "ornitorrinco_escudeiro_2", name: "Ornitorrinco Escudeiro", cost: 1, power: 1, type: "Criatura: Fera Terrana", effect: "Quando Ornitorrinco Escudeiro é convocado procure em seu deck por Coelho Flecheiro e o ponha na sua mão, embaralhe seu deck.", image: "ornitorrinco_escudeiro2.PNG" },
      { id: "resgate_aprendiz_1", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_do_aprendiz1.PNG" },
      { id: "resgate_aprendiz_2", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_do_aprendiz2.PNG" },
      { id: "resgate_aprendiz_3", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_do_aprendiz3.PNG" },
      { id: "satiro_mentor_1", name: "Sátiro Mentor", cost: 2, power: 2, type: "Criatura: Fera Terrana", effect: "Quando Sátiro Mentor cair convoque para a montanha uma criatura poder 1 de seu vale.", image: "satiro_mentor1.PNG" },
      { id: "satiro_mentor_2", name: "Sátiro Mentor", cost: 2, power: 2, type: "Criatura: Fera Terrana", effect: "Quando Sátiro Mentor cair convoque para a montanha uma criatura poder 1 de seu vale.", image: "satiro_mentor2.PNG" },
      { id: "valquiria_sul", name: "Valquíria do Sul", cost: 4, power: 4, type: "Criatura: Cavaleira", effect: "Preparação: Se sua zona de brasa estiver cheia cause -1 poder a uma criatura.", image: "valquiria_do_sul.PNG" }
    ]
  }
};

// Função auxiliar para obter deck completo
function getDeck(deckName) {
  if (!deckName || !DECKS[deckName]) {
    console.error('❌ Deck nao encontrado:', deckName, 'Usando Florestal como fallback.');
    return DECKS['florestal'];
  }
  return DECKS[deckName];
}

// Função para embaralhar deck
function shuffleDeck(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DECKS, getDeck, shuffleDeck };
}