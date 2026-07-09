const EncyclopediaDatabase = {
  weapons: {
    stone: {
      id: "stone",
      name: "Piedra",
      category: "Arma",
      sprite: () => Assets.projectiles.stone,
      description: "Proyectil automático que se lanza hacia el enemigo más cercano.",
      details: [
        "Tipo: Proyectil",
        "Puedes mejorar su daño, cadencia, tamaño, proyectiles extra, rebote y piedras especiales."
      ]
    },
    patataBoom: {
  id: "patataBoom",
  name: "PatataBoom",
  category: "Arma",
  sprite: () => Assets.items.patataBoom,
  description: "Arma que coloca minas explosivas cerca del jugador. Las minas no dañan al jugador, pero explotan cuando un enemigo las pisa.",
  details: [
    "Tipo: Mina",
    "Puedes mejorar su daño, radio, cantidad de minas, cadencia y explosión en cadena."
  ]
},
    watermelonSeedTurret: {
  id: "watermelonSeedTurret",
  name: "Torreta semillas de sandía",
  category: "Arma",
  sprite: () => Assets.items.watermelonSeedTurret,
  description: "Coloca torretas temporales que disparan semillas de sandía al enemigo más cercano.",
  details: [
    "Tipo: Torreta automática",
    "Las torretas duran unos segundos, desaparecen y vuelven a colocarse tras un cooldown.",
    "Puedes mejorar la cantidad máxima de torretas, daño, cadencia, duración y alcance."
  ]
},
    chikoritaLeaf: {
  id: "chikoritaLeaf",
  name: "Hoja de Chikorita",
  category: "Arma",
  sprite: () => Assets.items.chikoritaLeaf,
  description: "Lanza hojas afiladas que atraviesan varios enemigos en direcciones aleatorias.",
  details: [
    "Tipo: Proyectil",
    "Puedes mejorar su daño, número de hojas, velocidad, perforación y tamaño."
  ]
},
    sockRock: {
  id: "sockRock",
  name: "Calcetín con piedras",
  category: "Arma",
  sprite: () => Assets.items.sockRock,
  description: "Arma cuerpo a cuerpo que golpea delante del jugador.",
  details: [
    "Tipo: Cuerpo a cuerpo",
    "Puede golpear a varios enemigos en el mismo ataque.",
    "Puedes mejorar su daño, alcance, velocidad de ataque y tamaño.",
  ]
},
    cursor: {
  id: "cursor",
  name: "Cursor",
  category: "Arma",
  sprite: () => Assets.items.cursor,
  description: "Cursores que se mueven hacia enemigos y hacen clic para dañarlos.",
  details: [
    "Busca enemigos automáticamente.",
    "Ignora obstáculos y no tiene colisión con el mundo.",
    "Al llegar al enemigo hace clic y causa daño.",
    "Después busca otro objetivo.",
    "Si hay varios cursores, intentan repartirse entre distintos enemigos.",
    "Puedes mejorar su daño, velocidad de click, cantidad de cursores y alcance desde el jugador.",
  ]
},
    rooster: {
  id: "rooster",
  name: "Gallo de Pelea",
  category: "Arma",
  sprite: () => Assets.items.rooster,
  description: "Invoca gallos aliados permanentes que picotean enemigos.",
  details: [
    "Busca al enemigo más cercano.",
    "Lo persigue y lo picotea.",
    "Si muere, reaparece tras 5 segundos.",
    "El Distintivo de Líder mejora su daño.",
    "Puedes mejorar su daño, velocidad, vida, numero de gallos, gallos giganytes y gallos devoraslimes.",
    "El Gallo Devoraslimes hace mucho más daño contra enemigos con tag slime.",
  ]
},
    
  },

  items: {
    alioliPotatoes: {
      id: "alioliPotatoes",
      name: "Patatas con alioli",
      category: "Consumible",
      sprite: () => Assets.items.alioliPotatoes,
      description: "Curan 30 puntos de vida al recogerlas.",
      details: ["Sale de cofres."]
    },

    notpikachuOrb: {
      id: "notpikachuOrb",
      name: "Orbe de bendición de NotPikachu",
      category: "Consumible",
      sprite: () => Assets.items.notpikachuOrb,
      description: "Elimina a todos los enemigos visibles en pantalla.",
      details: ["Sale de cofres."]
    },
    scaryMedkit: {
  id: "scaryMedkit",
  name: "Botiquín de la familia Scary",
  category: "Consumible / Item de run",
  sprite: () => Assets.items.scaryMedkit,
  description: "Cura 50 puntos de vida. Para aparecer durante una partida, primero debes activarlo desde un cofre negro.",
  details: [
    "Una vez activado en una run, los jefes pueden soltarlo.",
  ]
},
    pokeball: {
  id: "pokeball",
  name: "Poké Ball",
  category: "Item de run",
  sprite: () => Assets.items.pokeball,
  description: "Permite capturar enemigos derrotados para que luchen como aliados durante la partida.",
  details: [
    "El primer enemigo que muera será capturado.",
    "Máximo inicial: 1 aliado.",
    "Tiene mejoras de más aliados, más daño aliado, más vida de aliados y más velocidad de aliados."
  ]
},
    flabebeFlower: {
  id: "flabebeFlower",
  name: "Flor de Flabébé",
  category: "Consumible",
  sprite: () => Assets.items.flabebeFlower,
  description: "Otorga 50 puntos de experiencia.",
  details: ["Sale de sacos."]
},

sunkernSeed: {
  id: "sunkernSeed",
  name: "Semilla Sunkern",
  category: "Consumible",
  sprite: () => Assets.items.sunkernSeed,
  description: "Aumenta los PS máximos en 10.",
  details: ["Sale de sacos."]
},

shellderShell: {
  id: "shellderShell",
  name: "Concha Shellder",
  category: "Consumible",
  sprite: () => Assets.items.shellderShell,
  description: "Da invencibilidad durante 5 segundos.",
  details: ["Sale de sacos."]
},

rareCandy: {
  id: "rareCandy",
  name: "Caramelo raro",
  category: "Consumible",
  sprite: () => Assets.items.rareCandy,
  description: "Sube un nivel al jugador.",
  details: ["Sale de sacos."]
},

heartScale: {
  id: "heartScale",
  name: "Escama corazón",
  category: "Consumible",
  sprite: () => Assets.items.heartScale,
  description: "Convierte un enemigo aleatorio en aliado.",
  details: ["Sale de sacos"]
},

oranBerry: {
  id: "oranBerry",
  name: "Baya aranja",
  category: "Consumible",
  sprite: () => Assets.items.oranBerry,
  description: "Cura 10 PS.",
  details: ["Sale de sacos."]
},
    eviolite: {
  id: "eviolite",
  name: "Mineral evolutivo",
  category: "Item de run",
  sprite: () => Assets.items.eviolite,
  description: "Reduce el daño recibido un 10% durante la run.",
  details: [
    "Aplica a toda clase de daños",
  ]
},

runningShoes: {
  id: "runningShoes",
  name: "Deportivas",
  category: "Item de run",
  sprite: () => Assets.items.runningShoes,
  description: "Aumenta la velocidad del jugador un 10% durante la run.",
  details: []
},

drill: {
  id: "drill",
  name: "Taladro",
  category: "Item de run",
  sprite: () => Assets.items.drill,
  description: "Permite atravesar rocas durante la run.",
  details: [
    "No atraviesa árboles ni arbustos.",
  ]
},

leaderBadge: {
  id: "leaderBadge",
  name: "Distintivo de líder",
  category: "Item de run",
  sprite: () => Assets.items.leaderBadge,
  description: "Aumenta el daño de aliados y torretas durante la run.",
  details: [
    "Afecta a todo ataque con tag ally.",
    "Afecta a todo ataque con tag turret.",
  ]
},
    soap: {
  id: "soap",
  name: "Pastilla de Jabón",
  category: "Item de run",
  sprite: () => Assets.items.soap,
  description: "5% de probabilidad de esquivar cualquier daño recibido. Cuidado, no se te caiga.",
  details: [
  ]
},
    goldPlort: {
  id: "goldPlort",
  name: "Plort de Oro",
  category: "Consumible",
  sprite: () => Assets.items.goldPlort,
  description: "Otorga 1000 de experiencia al recogerlo.",
  details: [
    "Tiene un 1% de probabilidad de caer al derrotar un Slime de Oro.",
  ]
},
    slimeJam: {
  id: "slimeJam",
  name: "Tarro de Mermelada de Slime",
  category: "Item de run",
  sprite: () => Assets.items.slimeJam,
  description: "+3 daño contra enemigos con tag slime.",
  details: [
    "Afecta a todo ataque con tag slime.",
  ]
},

greenPlort: {
  id: "greenPlort",
  name: "Plort Verde",
  category: "Item de run",
  sprite: () => Assets.items.greenPlort,
  description: "Mientras esté activo, los Slimes normales pasan de dar 3 XP a dar 10 XP.",
  details: [
    "Solo afecta al Slime normal.",
  ]
},
  firePlort: {
  id: "firePlort",
  name: "Plort de Fuego",
  category: "Item de run",
  sprite: () => Assets.items.firePlort,
  description: "Tus ataques tienen una pequeña probabilidad de aplicar Quemadura.",
  details: [
    "La Quemadura base hace 1 daño por segundo durante 5 segundos.",
    "Tiene mejoras de duración, daño, frecuencia y probabilidad."
  ]
},  
  chicken: {
  id: "chicken",
  name: "Gallina",
  category: "Item de run / Aliado",
  sprite: () => Assets.items.chicken,
  description: "Invoca gallinas que atraen a enemigos con tag slime.",
  details: [
    "Las gallinas no atacan.",
    "Los enemigos con tag slime las priorizan como objetivo.",
    "El Distintivo de Líder aumenta su vida y rango de atracción.",
    "Tiene mejoras de vida, rango de atracción, area de aparición y de salir gigante.",
  ]
},
  },
  scrolls: {
     life: {
    id: "life",
    name: "Pergamino de Vida",
    category: "Pergamino",
    sprite: () => Assets.items.scrollLife,
    description: "+100 PS máximos permanentes.",
    details: [
    ]
  },

  combat: {
    id: "combat",
    name: "Pergamino de Combate",
    category: "Pergamino",
    sprite: () => Assets.items.scrollCombat,
    description: "+3 daño base permanente.",
    details: [
    ]
  },

  knowledge: {
    id: "knowledge",
    name: "Pergamino de Conocimiento",
    category: "Pergamino",
    sprite: () => Assets.items.scrollKnowledge,
    description: "+5% XP permanente.",
    details: [
    ]
  },

  speed: {
    id: "speed",
    name: "Pergamino de Velocidad",
    category: "Pergamino",
    sprite: () => Assets.items.scrollSpeed,
    description: "+5% velocidad permanente.",
    details: [
    ]
  },

  talent: {
    id: "talent",
    name: "Pergamino de Talento",
    category: "Pergamino",
    sprite: () => Assets.items.scrollTalent,
    description: "Empiezas cada partida con una mejora gratuita.",
    details: [
    ]
  },
  },

  enemies: {
    slime: {
      id: "slime",
      name: "Slime",
      category: "Enemigo",
      sprite: () => Assets.enemies.slime,
      description: "Enemigo básico que persigue al jugador y carga contra él.",
      details: [
        "3 PS",
        "3 XP",
        "Velocidad: 80",
        "Ataque: Carga"]
    },

    fireSlimeSmall: {
      id: "fireSlimeSmall",
      name: "Slime de Fuego",
      category: "Enemigo",
      sprite: () => Assets.enemies.fireSlimeSmall,
      description: "Versión pequeña del Slime de Fuego Gigante. No carga, pero escupe bolas de fuego.",
      details: [
        "8 PS",
        "8 XP",
        "Velocidad: 70",
        "Ataque: Bola de fuego",
      ]
    },

    slimeGiant: {
      id: "slimeGiant",
      name: "Slime Gigante",
      category: "Enemigo",
      sprite: () => Assets.enemies.slimeGiant,
      description: "Una versión enorme del slime común. Tiene mucha más vida y al morir libera dos slimes elite.",
      details: [
        "45 PS",
        "25 XP",
        "Velocidad: 45",
        "Ataque: Carga",
        "Al morir genera 2 Slimes Elite.",
      ]
    },

    slimeElite: {
      id: "slimeElite",
      name: "Slime Elite",
      category: "Enemigo",
      sprite: () => Assets.enemies.slimeElite,
      description: "Slime oscuro, más rápido y resistente que el slime normal.",
      details: [
        "25 PS",
        "7 XP",
        "Velocidad: 125",
        "Ataque: Carga",
        "Aparece al morir un Slime Gigante."
      ]
    },
    goldSlime: {
  id: "goldSlime",
  name: "Slime de Oro",
  category: "Enemigo",
  sprite: () => Assets.enemies.goldSlime,
  description: "Un slime extremadamente raro que no persigue al jugador. Da muchísima experiencia.",
  details: [
    "5 PS",
    "250 XP",
    "No ataca.",
    "Se mueve dando vueltas por el mapa.",
  ]
},
    mimic: {
  id: "mimic",
  name: "Mímico",
  category: "Enemigo",
  sprite: () => Assets.enemies.mimic,
  description: "Un extraño cofre. Aparece exactamente cada 2 minutos y al derrotarlo siempre deja un Cofre Negro.",
  details: [
    "120 PS",
    "60 XP",
    "Velocidad: 85",
    "Ataque: Carga",
    "Aparece cada 2 minutos.",
    "Siempre deja un Cofre Negro.",
  ]
},
  watermelonVoltorb: {
    id: "watermelonVoltorb",
    name: "Voltorb Sandía",
    category: "Enemigo",
    sprite: () => Assets.enemies.watermelonVoltorb,
    description: "Enemigo rápido que se acerca al jugador, marca una zona roja y explota tras unos segundos.",
    details: [
      "20 PS",
      "1 XP",
      "Velocidad: 145",
      "Ataque: Explota",
  ]
},
  watermelonElectrode:{
    id:"watermelonElectrode",
    name:"Electrode Sandía",
    category:"Enemigo",
    sprite:()=>Assets.enemies.watermelonElectrode,
    description:"Versión evolucionada del Voltorb Sandía. Mucho más rápida y con una explosión devastadora.",
    details:[
        "30 PS",
        "5 XP",
        "Velocidad: 175",
        "Ataque: Explota",
    ]
},
    flabebe: {
  id: "flabebe",
  name: "Flabébé",
  category: "Enemigo a distancia",
  sprite: () => Assets.enemies.flabebe,
  description: "Un pequeño flabebe con calle, mantiene la distancia y lanza cuchillos al jugador.",
  details: [
    "18 PS",
    "8 XP",
    "Velocidad: 85",
    "Ataque: Cuchillos.",
    "Aparece a partir del minuto 3.",
  ]
},
  delibird: {
  id: "delibird",
  name: "Delibird",
  category: "Enemigo raro",
  sprite: () => Assets.enemies.delibird,
  description: "Enemigo raro y veloz que huye al recibir daño. Puede soltar sacos.",
  details: [
    "35 PS",
    "20 XP",
    "Velocidad: 165",
    "Huye muy rápido tras recibir daño.",
    "Siempre deja un Saco.",
  ]
},
  fireSlimeGiant: {
      id: "fireSlimeGiant",
      name: "Slime de Fuego Gigante",
      category: "Jefe",
      sprite: () => Assets.enemies.fireSlimeGiant,
      description: "Jefe raro con ataque de carga y bolas de fuego.",
      details: [
        "80 PS",
        "40 XP",
        "Velocidad: 55",
        "Ataque: Bola de fuego",
        "Ataque: Carga",
        "Tiene un 10% de probabilidad de soltar un cofre al morir.",
      ]
    },
    
  rhyhornBoss: {
      id: "rhyhornBoss",
      name: "Rhyhorn",
      category: "Jefe",
      sprite: () => Assets.enemies.rhyhornBoss,
      description: "El guardián de la grieta. Embiste a gran velocidad, levanta pilares de roca y descarga un mordisco eléctrico.",
      details: [
        "180 PS",
        "90 XP",
        "Velocidad: 45",
        "Ataque: Carga",
        "Ataque: Linea de rocas",
        "Ataque: Colmillo trueno",
      ]
    },
    rhyhorn: {
  id: "rhyhorn",
  name: "Rhyhorn",
  category: "Jefe",

  sprite: () => Assets.enemies.rhyhorn,

  description: "Versión debilitada del guardián de la brecha. Aparece periódicamente una vez derrotado el jefe.",

  details: [
    "Vida: 90",
    "Velocidad: 60",
    "Ataque: Carga.",
    "Ataque: Línea de rocas.",
    "Siempre deja un Cofre Negro.",
  ]
},
    senseiLife: {
  id: "senseiLife",
  name: "Sensei de la Vida",
  category: "Sensei",
  sprite: () => Assets.npc.senseiLife,
  description: "Maestro oculto que otorga el Pergamino de Vida al ser derrotado.",
  details: [
    "220 PS",
    "100 XP",
    "Velocidad: 75",
    "Ataque: Corte de espada",
    "Ataque: Carga",
    "Ataque: Pilares",
    "Ataque: Meditación",
    "Al derrotarlo desaparece para siempre."
  ]
},

senseiCombat: {
  id: "senseiCombat",
  name: "Sensei del Combate",
  category: "Sensei",
  sprite: () => Assets.npc.senseiCombat,
  description: "Maestro oculto que otorga el Pergamino de Combate al ser derrotado.",
  details: [
    "200 PS",
    "100 XP",
    "Velocidad: 85",
    "Ataques: teletransporte, corte, shurikens y debuff.",
    "Ataque: Corte de espada",
    "Ataque: Zona de debuff",
    "Ataque: Teletransporte",
    "Ataque: Shurikens",
    "Al derrotarlo desaparece para siempre."
  ]
},

senseiKnowledge: {
  id: "senseiKnowledge",
  name: "Sensei del Conocimiento",
  category: "Sensei",
  sprite: () => Assets.npc.senseiKnowledge,
  description: "Maestro oculto que otorga el Pergamino de Conocimiento al ser derrotado.",
  details: [
    "190 PS",
    "100 XP",
    "Velocidad: 70",
    "Ataques: bola azul, teletransporte, pilar y meditación.",
    "Ataque: Bola de fuego azul",
    "Ataque: Teletransporte",
    "Ataque: Pilares",
    "Ataque: Meditación",
    "Al derrotarlo desaparece para siempre."
  ]
},

senseiSpeed: {
  id: "senseiSpeed",
  name: "Sensei de la Velocidad",
  category: "Sensei",
  sprite: () => Assets.npc.senseiSpeed,
  description: "Maestro oculto que otorga el Pergamino de Velocidad al ser derrotado.",
  details: [
    "180 PS",
    "100 XP",
    "Velocidad: 105",
    "Ataque: Corte de espada",
    "Ataque: Carga",
    "Ataque: Teletransporte",
    "Ataque: Shurikens",
    "Al derrotarlo desaparece para siempre."
  ]
},

senseiTalent: {
  id: "senseiTalent",
  name: "Sensei del Talento",
  category: "Sensei",
  sprite: () => Assets.npc.senseiTalent,
  description: "Maestro oculto que otorga el Pergamino de Talento al ser derrotado.",
  details: [
    "210 PS",
    "100 XP",
    "Velocidad: 80",
    "Ataque: Bola de fuego azul",
    "Ataque: Corte de espada",
    "Ataque: Zona de debuff",
    "Ataque: Carga",
    "Ataque: Teletransporte",
    "Ataque: Shurikens",
    "Ataque: Pilares",
    "Ataque: Meditación",
    "Al derrotarlo desaparece para siempre."
  ]
},
  }
};

function renderEncyclopedia() {
  const container = document.getElementById("encyclopediaContent");
  container.innerHTML = "";

  renderEncyclopediaCategory(container, "weapons", "Armas");
  renderEncyclopediaCategory(container, "items", "Objetos");
  renderEncyclopediaCategory(container, "scrolls", "Pergaminos");
  renderEncyclopediaCategory(container, "enemies", "Enemigos");
}

function renderEncyclopediaCategory(container, categoryId, title) {
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  titleElement.style.width = "100%";
  titleElement.style.textAlign = "center";
  container.appendChild(titleElement);

  const entries = EncyclopediaDatabase[categoryId];

  for (const entry of Object.values(entries)) {
    const unlocked = saveData.encyclopedia[categoryId]?.includes(entry.id);

    const card = document.createElement("div");
    card.className = "encyclopedia-card" + (unlocked ? "" : " locked");

    if (unlocked) {
      card.innerHTML = `
        <img src="${entry.sprite().src}" alt="${entry.name}">
        <h3>${entry.name}</h3>
        <strong>${entry.category}</strong>
        <p>${entry.description}</p>
        ${
          entry.details
            ? `<ul>${entry.details.map(detail => `<li>${detail}</li>`).join("")}</ul>`
            : ""
        }
      `;
    } else {
      card.innerHTML = `
        <h3>???</h3>
        <p>No descubierto todavía.</p>
      `;
    }

    container.appendChild(card);
  }
}

// Sincroniza armas nuevas del registry con la enciclopedia.
// Si mañana añades un arma en WeaponRegistry con encyclopedia:true, aparecerá aquí automáticamente.
if (typeof WeaponRegistry !== "undefined") {
  for (const weapon of Object.values(WeaponRegistry)) {
    if (!weapon.encyclopedia) continue;
    EncyclopediaDatabase.weapons[weapon.id] = {
      ...(EncyclopediaDatabase.weapons[weapon.id] || {}),
      id: weapon.id,
      name: weapon.name,
      category: weapon.category || "Arma",
      sprite: weapon.sprite,
      description: weapon.description,
      details: EncyclopediaDatabase.weapons[weapon.id]?.details || ["Definida desde WeaponRegistry."]
    };
  }
}
