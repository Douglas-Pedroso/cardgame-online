// decks.js - Base de dados dos 4 decks do jogo

const DECKS = {
  aquatico: {
    name: "Aquático",
    icon: "🌊",
    color: "#4A90E2",
    cards: [
      { id: "arina_sereia_1", name: "Arina a Sereia", cost: 1, power: 1, type: "Criatura: Aquático", effect: "Ao combater uma criatura com poder igual Arina a Sereia não cai.", image: "arina_sereia.png" },
      { id: "arina_sereia_2", name: "Arina a Sereia", cost: 1, power: 1, type: "Criatura: Aquático", effect: "Ao combater uma criatura com poder igual Arina a Sereia não cai.", image: "arina_sereia.png" },
      { id: "armadura_aquatica_1", name: "Armadura Aquática", cost: 1, power: 0, type: "Item: Arma", effect: "Se uma criatura aquático for equipado com Armadura Aquática ela recebe +1 em poder.", image: "armadura_aquatica.png" },
      { id: "armadura_aquatica_2", name: "Armadura Aquática", cost: 1, power: 0, type: "Item: Arma", effect: "Se uma criatura aquático for equipado com Armadura Aquática ela recebe +1 em poder.", image: "armadura_aquatica.png" },
      { id: "armadura_aquatica_3", name: "Armadura Aquática", cost: 1, power: 0, type: "Item: Arma", effect: "Se uma criatura aquático for equipado com Armadura Aquática ela recebe +1 em poder.", image: "armadura_aquatica.png" },
      { id: "caranguejo_concha_1", name: "Caranguejo da Concha", cost: 2, power: 2, type: "Criatura: Aquático", effect: "Todas as suas criaturas aquático recebem +1 em poder se forem escolhidas para combates pelo seus adversários.", image: "caranguejo_concha.png" },
      { id: "caranguejo_concha_2", name: "Caranguejo da Concha", cost: 2, power: 2, type: "Criatura: Aquático", effect: "Todas as suas criaturas aquático recebem +1 em poder se forem escolhidas para combates pelo seus adversários.", image: "caranguejo_concha.png" },
      { id: "caranguejo_guardiao", name: "Caranguejo Guardião", cost: 3, power: 3, type: "Criatura: Aquático", effect: "Nenhuma criatura do seu lado do monte pode ser alvo de combate a não ser Caranguejo Guardião.", image: "caranguejo_guardiao.png" },
      { id: "concha_protetora_1", name: "Concha Protetora", cost: 2, power: 0, type: "Item: Reação", effect: "Substitua a criatura que foi escolhida pelo adversário para combater a criatura dele. Concha Protetora tem poder 0. Se Concha Protetora cair não perca nenhum nível de pressão.", image: "concha_protetora.png" },
      { id: "concha_protetora_2", name: "Concha Protetora", cost: 2, power: 0, type: "Item: Reação", effect: "Substitua a criatura que foi escolhida pelo adversário para combater a criatura dele. Concha Protetora tem poder 0. Se Concha Protetora cair não perca nenhum nível de pressão.", image: "concha_protetora.png" },
      { id: "concha_protetora_3", name: "Concha Protetora", cost: 2, power: 0, type: "Item: Reação", effect: "Substitua a criatura que foi escolhida pelo adversário para combater a criatura dele. Concha Protetora tem poder 0. Se Concha Protetora cair não perca nenhum nível de pressão.", image: "concha_protetora.png" },
      { id: "peixe_espada_1", name: "Peixe Espada", cost: 1, power: 1, type: "Criatura: Aquático", effect: "Pague 1 chama. +1 poder em Peixe Espada ao escolher um combatente.", image: "peixe_espada.png" },
      { id: "peixe_espada_2", name: "Peixe Espada", cost: 1, power: 1, type: "Criatura: Aquático", effect: "Pague 1 chama. +1 poder em Peixe Espada ao escolher um combatente.", image: "peixe_espada.png" },
      { id: "sereia_guardia", name: "Sereia Guardiã", cost: 3, power: 2, type: "Criatura: Aquático", effect: "Quando uma criatura aquático derrubar uma criatura. Sereia Guardiã recebe +1 em poder até seu próximo turno.", image: "sereia_guardia.png" },
      { id: "sereia_octo_1", name: "Sereia Octo", cost: 2, power: 2, type: "Criatura: Aquático", effect: "Sereia Octo recebe +1 em poder ao atacar uma criatura que já tenha sido atacada.", image: "sereia_octo.png" },
      { id: "sereia_octo_2", name: "Sereia Octo", cost: 2, power: 2, type: "Criatura: Aquático", effect: "Sereia Octo recebe +1 em poder ao atacar uma criatura que já tenha sido atacada.", image: "sereia_octo.png" },
      { id: "orca_centuriao", name: "Orca Centurião", cost: 4, power: 4, type: "Criatura: Aquático", effect: "Ao cair, perca apenas 3 níveis de pressão.", image: "orca_centuriao.png" },
      { id: "tridente_1", name: "Tridente", cost: 2, power: 0, type: "Item: Arma", effect: "Se Tridente for equipado a uma criatura aquático ela não pode ser atacada por mais de uma criatura.", image: "tridente.png" },
      { id: "tridente_2", name: "Tridente", cost: 2, power: 0, type: "Item: Arma", effect: "Se Tridente for equipado a uma criatura aquático ela não pode ser atacada por mais de uma criatura.", image: "tridente.png" },
      { id: "tubarao_centuriao", name: "Tubarão Centurião", cost: 4, power: 4, type: "Criatura: Aquático", effect: "Ao derrubar uma criatura cause +1 nível de pressão.", image: "tubarao_centuriao.png" }
    ]
  },

  planta: {
    name: "Planta",
    icon: "🌿",
    color: "#7CB342",
    cards: [
      { id: "broto_protetor_1", name: "Broto Protetor", cost: 2, power: 2, type: "Criatura: Planta", effect: "Criaturas plantas não são afetados por efeitos de carta.", image: "broto_protetor.png" },
      { id: "broto_protetor_2", name: "Broto Protetor", cost: 2, power: 2, type: "Criatura: Planta", effect: "Criaturas plantas não são afetados por efeitos de carta.", image: "broto_protetor.png" },
      { id: "cavaleiro_verde", name: "Cavaleiro Verde", cost: 3, power: 3, type: "Criatura: Cavaleiro Planta", effect: "Reação: Criaturas que escolham essa carta como alvo de ataque caem após o cálculo de nível de pressão.", image: "cavaleiro_verde.png" },
      { id: "dafne_ninfa_1", name: "Dafne a Ninfa do Bosque", cost: 1, power: 1, type: "Criatura: Planta", effect: "Preparação: Apague uma chama: Convoque para a montanha essa criatura.", image: "dafne_ninfa.png" },
      { id: "dafne_ninfa_2", name: "Dafne a Ninfa do Bosque", cost: 1, power: 1, type: "Criatura: Planta", effect: "Preparação: Apague uma chama: Convoque para a montanha essa criatura.", image: "dafne_ninfa.png" },
      { id: "gaiothar_liberto", name: "Gaiothar o Liberto", cost: 4, power: 4, type: "Criatura: Planta", effect: "Criaturas plantas só podem ser atacadas por criaturas de poder igual.", image: "gaiothar_liberto.png" },
      { id: "lobo_guardiao_1", name: "Lobo Guardião Silvestre", cost: 2, power: 2, type: "Criatura: Planta", effect: "Quando essa criatura cair, escolha uma criatura, ela não pode atacar neste turno.", image: "lobo_guardiao.png" },
      { id: "lobo_guardiao_2", name: "Lobo Guardião Silvestre", cost: 2, power: 2, type: "Criatura: Planta", effect: "Quando essa criatura cair, escolha uma criatura, ela não pode atacar neste turno.", image: "lobo_guardiao.png" },
      { id: "machado_equilibrio_1", name: "Machado do Equilíbrio", cost: 2, power: 0, type: "Item: Reação", effect: "Se uma criatura planta for derrubada, derrube a criatura que a derrubou nesse turno.", image: "machado_equilibrio.png" },
      { id: "machado_equilibrio_2", name: "Machado do Equilíbrio", cost: 2, power: 0, type: "Item: Reação", effect: "Se uma criatura planta for derrubada, derrube a criatura que a derrubou nesse turno.", image: "machado_equilibrio.png" },
      { id: "mudanca_alvo_1", name: "Mudança de Alvo", cost: 1, power: 0, type: "Item: Reação", effect: "Se uma criatura planta seria o alvo de um ataque mude esse alvo para uma outra criatura planta na sua montanha.", image: "mudanca_alvo.png" },
      { id: "mudanca_alvo_2", name: "Mudança de Alvo", cost: 1, power: 0, type: "Item: Reação", effect: "Se uma criatura planta seria o alvo de um ataque mude esse alvo para uma outra criatura planta na sua montanha.", image: "mudanca_alvo.png" },
      { id: "mudanca_alvo_3", name: "Mudança de Alvo", cost: 1, power: 0, type: "Item: Reação", effect: "Se uma criatura planta seria o alvo de um ataque mude esse alvo para uma outra criatura planta na sua montanha.", image: "mudanca_alvo.png" },
      { id: "rato_broto_1", name: "Rato Broto", cost: 1, power: 1, type: "Criatura: Planta", effect: "Reação: Quando uma criatura poder 2 ou 1 cair. Convoque essa criatura para a montanha.", image: "rato_broto.png" },
      { id: "rato_broto_2", name: "Rato Broto", cost: 1, power: 1, type: "Criatura: Planta", effect: "Reação: Quando uma criatura poder 2 ou 1 cair. Convoque essa criatura para a montanha.", image: "rato_broto.png" },
      { id: "rothor_monolito", name: "Róthor o Monolito", cost: 3, power: 3, type: "Criatura: Planta", effect: "Essa criatura tem poder 4 enquanto houver outra criatura planta na montanha.", image: "rothor_monolito.png" },
      { id: "veneno_paralisante_1", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante.png" },
      { id: "veneno_paralisante_2", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante.png" },
      { id: "veneno_paralisante_3", name: "Veneno Paralisante", cost: 2, power: 0, type: "Item: Reação", effect: "Negue o ataque que teria como alvo uma planta.", image: "veneno_paralisante.png" },
      { id: "verdanox_triplice", name: "Verdanox, o Tríplice Caule", cost: 4, power: 4, type: "Criatura: Planta", effect: "Ao derrubar uma criatura pode atacar outra novamente.", image: "verdanox_triplice.png" }
    ]
  },

  fada: {
    name: "Fada",
    icon: "🧚",
    color: "#E91E63",
    cards: [
      { id: "chifre_mistico", name: "Chifre Místico", cost: 3, power: 3, type: "Criatura: Fera Fada", effect: "Quando comprar uma carta de +1 poder a uma criatura fada durante um turno.", image: "chifre_mistico.png" },
      { id: "prole_dragao_1", name: "Prole de Dragão Verde", cost: 1, power: 1, type: "Criatura: Dragão Fada", effect: "Preparação: Remova esta carta do vale para fora do jogo, dê +1 poder a uma criatura fada durante um turno.", image: "prole_dragao.png" },
      { id: "prole_dragao_2", name: "Prole de Dragão Verde", cost: 1, power: 1, type: "Criatura: Dragão Fada", effect: "Preparação: Remova esta carta do vale para fora do jogo, dê +1 poder a uma criatura fada durante um turno.", image: "prole_dragao.png" },
      { id: "dragao_verde", name: "Dragão Verde", cost: 4, power: 4, type: "Criatura: Dragão Fada", effect: "Quando uma criatura fada cair dê +1 poder a uma criatura fada durante esse turno.", image: "dragao_verde.png" },
      { id: "faphina_rainha", name: "Fáphina a Rainha das Fadas", cost: 4, power: 4, type: "Criatura: Fada", effect: "Preparação: Uma vez por turno remova do jogo uma criatura fada do vale. Convoque uma criatura fada do vale para a montanha.", image: "faphina_rainha.png" },
      { id: "igrily_orvalho_1", name: "Igrily, a Fada do Orvalho", cost: 1, power: 1, type: "Criatura: Fada", effect: "Ao cair em combate, compre uma carta.", image: "igrily_orvalho.png" },
      { id: "igrily_orvalho_2", name: "Igrily, a Fada do Orvalho", cost: 1, power: 1, type: "Criatura: Fada", effect: "Ao cair em combate, compre uma carta.", image: "igrily_orvalho.png" },
      { id: "marca_monarca_1", name: "A Marca do Monarca", cost: 1, power: 0, type: "Item: Preparação, Maldição", effect: "A criatura alvo recebe -1 de poder. Remova uma criatura fada do seu vale do jogo: não pague o custo deste item.", image: "marca_monarca.png" },
      { id: "marca_monarca_2", name: "A Marca do Monarca", cost: 1, power: 0, type: "Item: Preparação, Maldição", effect: "A criatura alvo recebe -1 de poder. Remova uma criatura fada do seu vale do jogo: não pague o custo deste item.", image: "marca_monarca.png" },
      { id: "marca_monarca_3", name: "A Marca do Monarca", cost: 1, power: 0, type: "Item: Preparação, Maldição", effect: "A criatura alvo recebe -1 de poder. Remova uma criatura fada do seu vale do jogo: não pague o custo deste item.", image: "marca_monarca.png" },
      { id: "mariposa_lua_1", name: "Mariposa Pó de Lua", cost: 2, power: 2, type: "Criatura: Inseto Fada", effect: "Preparação: Escolha uma criatura. Ela não pode atacar Mariposa Pó de Lua durante esse turno.", image: "mariposa_lua.png" },
      { id: "mariposa_lua_2", name: "Mariposa Pó de Lua", cost: 2, power: 2, type: "Criatura: Inseto Fada", effect: "Preparação: Escolha uma criatura. Ela não pode atacar Mariposa Pó de Lua durante esse turno.", image: "mariposa_lua.png" },
      { id: "convocacao_monarca_1", name: "Convocação da Monarca", cost: 2, power: 0, type: "Item: Preparação", effect: "Convoque do seu vale para sua parte da montanha: Uma fada poder 2 ou duas fadas poder 1. Se Fáphinir a Rainha das Fadas estiver na montanha esse item custa 1.", image: "convocacao_monarca.png" },
      { id: "convocacao_monarca_2", name: "Convocação da Monarca", cost: 2, power: 0, type: "Item: Preparação", effect: "Convoque do seu vale para sua parte da montanha: Uma fada poder 2 ou duas fadas poder 1. Se Fáphinir a Rainha das Fadas estiver na montanha esse item custa 1.", image: "convocacao_monarca.png" },
      { id: "nemeses_guarda", name: "Nemeses a Fada da Guarda", cost: 3, power: 3, type: "Criatura: Cavaleiro Fada", effect: "Quando Nemeses a Fada da Guarda derruba uma criatura de +1 poder a uma criatura fada durante esse turno.", image: "nemeses_guarda.png" },
      { id: "raiz_sentinela_1", name: "Raiz-Sentinela", cost: 2, power: 2, type: "Criatura: Planta Fada", effect: "Restrição: Esta criatura não pode atacar. Quando essa criatura for escolhida para combate, ela recebe +1 poder até o fim do turno.", image: "raiz_sentinela.png" },
      { id: "raiz_sentinela_2", name: "Raiz-Sentinela", cost: 2, power: 2, type: "Criatura: Planta Fada", effect: "Restrição: Esta criatura não pode atacar. Quando essa criatura for escolhida para combate, ela recebe +1 poder até o fim do turno.", image: "raiz_sentinela.png" },
      { id: "raizes_protetoras_1", name: "Raízes Protetoras", cost: 2, power: 0, type: "Item: Reação / Maldição", effect: "A criatura alvo não pode declarar ataque neste turno se houver uma criatura fada na sua parte da montanha o custo desse item passa a ser 1.", image: "raizes_protetoras.png" },
      { id: "raizes_protetoras_2", name: "Raízes Protetoras", cost: 2, power: 0, type: "Item: Reação / Maldição", effect: "A criatura alvo não pode declarar ataque neste turno se houver uma criatura fada na sua parte da montanha o custo desse item passa a ser 1.", image: "raizes_protetoras.png" },
      { id: "raizes_protetoras_3", name: "Raízes Protetoras", cost: 2, power: 0, type: "Item: Reação / Maldição", effect: "A criatura alvo não pode declarar ataque neste turno se houver uma criatura fada na sua parte da montanha o custo desse item passa a ser 1.", image: "raizes_protetoras.png" }
    ]
  },

  cavaleiro: {
    name: "Cavaleiro",
    icon: "🏹",
    color: "#FF6F00",
    cards: [
      { id: "arco_flecha_1", name: "Arco e Flecha", cost: 1, power: 0, type: "Item: Arma", effect: "Se a criatura equipada for um cavaleiro ela tem: (Preparação) Uma vez durante seu turno mova uma chama para brasa. Cause -1 poder a uma criatura.", image: "arco_flecha.png" },
      { id: "arco_flecha_2", name: "Arco e Flecha", cost: 1, power: 0, type: "Item: Arma", effect: "Se a criatura equipada for um cavaleiro ela tem: (Preparação) Uma vez durante seu turno mova uma chama para brasa. Cause -1 poder a uma criatura.", image: "arco_flecha.png" },
      { id: "armadilha_caca_1", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_caca.png" },
      { id: "armadilha_caca_2", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_caca.png" },
      { id: "armadilha_caca_3", name: "Armadilha de Caça", cost: 1, power: 0, type: "Item: Reação", effect: "Cause -1 poder a uma criatura que esteja declarando ataque.", image: "armadilha_caca.png" },
      { id: "bufalo_armado", name: "Búfalo Armado", cost: 3, power: 3, type: "Criatura: Fera Cavaleiro", effect: "Se for escolhido pelo oponente para combater recebe +1 em seu poder.", image: "bufalo_armado.png" },
      { id: "centauro_bronze", name: "Centauro de Bronze", cost: 4, power: 3, type: "Criatura: Fera Cavaleiro", effect: "Se sua zona de brasa estiver cheia esta criatura tem poder 5. Caso contrário essa carta tem poder 3. Se essa criatura cair seu nível de pressão sobe em 4.", image: "centauro_bronze.png" },
      { id: "cervo_mentor_1", name: "Cervo Mentor", cost: 2, power: 2, type: "Criatura: Fera Cavaleiro", effect: "Quando Cervo Mentor é convocado mande uma chama para brasa. Convoque para a montanha uma criatura fera poder 1 de seu vale.", image: "cervo_mentor.png" },
      { id: "cervo_mentor_2", name: "Cervo Mentor", cost: 2, power: 2, type: "Criatura: Fera Cavaleiro", effect: "Quando Cervo Mentor é convocado mande uma chama para brasa. Convoque para a montanha uma criatura fera poder 1 de seu vale.", image: "cervo_mentor.png" },
      { id: "coelho_flecheiro_1", name: "Coelho Flecheiro", cost: 1, power: 1, type: "Criatura: Fera Cavaleiro", effect: "Quando Coelho Flecheiro é convocado na sua parte da montanha inflinja -1 poder a uma criatura.", image: "coelho_flecheiro.png" },
      { id: "coelho_flecheiro_2", name: "Coelho Flecheiro", cost: 1, power: 1, type: "Criatura: Fera Cavaleiro", effect: "Quando Coelho Flecheiro é convocado na sua parte da montanha inflinja -1 poder a uma criatura.", image: "coelho_flecheiro.png" },
      { id: "falcao_arqueiro", name: "Falcão Arqueiro", cost: 3, power: 3, type: "Criatura: Fera Cavaleiro", effect: "Preparação: Mova uma chama para a brasa, cause -1 poder a uma criatura.", image: "falcao_arqueiro.png" },
      { id: "ornitorrinco_escudeiro_1", name: "Ornitorrinco Escudeiro", cost: 1, power: 1, type: "Criatura: Fera Cavaleiro", effect: "Quando Ornitorrinco Escudeiro é convocado procure em seu deck por Coelho Flecheiro e o ponha na sua mão, embaralhe seu deck.", image: "ornitorrinco_escudeiro.png" },
      { id: "ornitorrinco_escudeiro_2", name: "Ornitorrinco Escudeiro", cost: 1, power: 1, type: "Criatura: Fera Cavaleiro", effect: "Quando Ornitorrinco Escudeiro é convocado procure em seu deck por Coelho Flecheiro e o ponha na sua mão, embaralhe seu deck.", image: "ornitorrinco_escudeiro.png" },
      { id: "resgate_aprendiz_1", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_aprendiz.png" },
      { id: "resgate_aprendiz_2", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_aprendiz.png" },
      { id: "resgate_aprendiz_3", name: "Resgate do Aprendiz", cost: 1, power: 0, type: "Item: Preparação", effect: "Traga do seu vale uma criatura poder 1 para a sua mão.", image: "resgate_aprendiz.png" },
      { id: "satiro_mentor_1", name: "Sátiro Mentor", cost: 2, power: 2, type: "Criatura: Fera Cavaleiro", effect: "Quando Sátiro Mentor cair convoque para a montanha uma criatura poder 1 de seu vale.", image: "satiro_mentor.png" },
      { id: "satiro_mentor_2", name: "Sátiro Mentor", cost: 2, power: 2, type: "Criatura: Fera Cavaleiro", effect: "Quando Sátiro Mentor cair convoque para a montanha uma criatura poder 1 de seu vale.", image: "satiro_mentor.png" },
      { id: "valquiria_sul", name: "Valquíria do Sul", cost: 4, power: 4, type: "Criatura: Cavaleiro", effect: "Preparação: Se sua zona de brasa estiver cheia cause -1 poder a uma criatura.", image: "valquiria_sul.png" }
    ]
  }
};

// Função auxiliar para obter deck completo
function getDeck(deckName) {
  return DECKS[deckName] || null;
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