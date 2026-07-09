const ItemDatabase = {
  alioliPotatoes: {
    id: "alioliPotatoes",
    name: "Patatas con alioli",
    type: "common",
    category: "consumable",
    sprite: () => Assets.items.alioliPotatoes,
    width: 32,
    height: 32,
    collision: 18,
    description: "Curan parte de la vida del jugador.",
    healAmount: 30,

    apply() {
  const lifeBefore = player.life;

  player.life = Math.min(player.maxLife, player.life + this.healAmount);

  const healedAmount = player.life - lifeBefore;

  saveData.stats.totalAlioliPotatoesEaten += 1;
  saveData.stats.totalHealingReceived += healedAmount;

  unlockEncyclopedia("items", this.id);
  checkAchievements();
  saveGameData(saveData);
}
  },

  notpikachuOrb: {
    id: "notpikachuOrb",
    name: "Orbe de bendición de NotPikachu",
    type: "rare",
    category: "consumable",
    sprite: () => Assets.items.notpikachuOrb,
    width: 32,
    height: 32,
    collision: 18,
    description: "Elimina a todos los enemigos visibles en pantalla.",
    unlockRequirement: "Desbloqueado al matar 100 slimes.",

    apply() {
      killVisibleEnemies();
      unlockEncyclopedia("items", this.id);
    }
  },
  scaryMedkit: {
  id: "scaryMedkit",
  name: "Botiquín de la familia Scary",
  type: "rare",
  category: "consumable",
  sprite: () => Assets.items.scaryMedkit,
  width: 32,
  height: 32,
  collision: 18,
  description: "Cura 50 puntos de vida.",
  healAmount: 50,

  apply() {
    const lifeBefore = player.life;

    player.life = Math.min(player.maxLife, player.life + this.healAmount);

    const healedAmount = player.life - lifeBefore;

    saveData.stats.totalHealingReceived += healedAmount;

    unlockEncyclopedia("items", this.id);
    checkAchievements();
    saveGameData(saveData);
  }
 },
  flabebeFlower: {
  id: "flabebeFlower",
  name: "Flor de Flabébé",
  type: "bag_common",
  category: "consumable",
  sprite: () => Assets.items.flabebeFlower,
  width: 32,
  height: 32,
  collision: 18,
  description: "+50 XP.",

  apply() {
    gainXP(50);
    unlockEncyclopedia("items", this.id);
  }
},

sunkernSeed: {
  id: "sunkernSeed",
  name: "Semilla Sunkern",
  type: "bag_common",
  category: "consumable",
  sprite: () => Assets.items.sunkernSeed,
  width: 32,
  height: 32,
  collision: 18,
  description: "+10 PS máximos.",

  apply() {
    player.maxLife += 10;
    player.life += 10;
    unlockEncyclopedia("items", this.id);
  }
},

shellderShell: {
  id: "shellderShell",
  name: "Concha Shellder",
  type: "bag_rare",
  category: "consumable",
  sprite: () => Assets.items.shellderShell,
  width: 32,
  height: 32,
  collision: 18,
  description: "Invencibilidad durante 5 segundos.",

  apply() {
    player.invulnerableTimer = Math.max(player.invulnerableTimer, 5);
    unlockEncyclopedia("items", this.id);
  }
},

rareCandy: {
  id: "rareCandy",
  name: "Caramelo raro",
  type: "bag_rare",
  category: "consumable",
  sprite: () => Assets.items.rareCandy,
  width: 32,
  height: 32,
  collision: 18,
  description: "+1 nivel.",

  apply() {
    player.level += 1;
    openLevelUpPanel();
    unlockEncyclopedia("items", this.id);
  }
},

heartScale: {
  id: "heartScale",
  name: "Escama corazón",
  type: "bag_ultra",
  category: "consumable",
  sprite: () => Assets.items.heartScale,
  width: 32,
  height: 32,
  collision: 18,
  description: "Convierte un enemigo aleatorio en aliado.",

  apply() {
    convertRandomEnemyToAlly();
    unlockEncyclopedia("items", this.id);
  }
},

oranBerry: {
  id: "oranBerry",
  name: "Baya aranja",
  type: "bag_common",
  category: "consumable",
  sprite: () => Assets.items.oranBerry,
  width: 32,
  height: 32,
  collision: 18,
  description: "Cura 10 PS.",

  apply() {
    player.life = Math.min(player.maxLife, player.life + 10);
    unlockEncyclopedia("items", this.id);
  }
},
  goldPlort: {
  id: "goldPlort",
  name: "Plort de Oro",
  type: "ultra",
  category: "consumable",
  sprite: () => Assets.items.goldPlort,
  width: 32,
  height: 32,
  collision: 18,
  description: "Da una enorme cantidad de experiencia (1000 XP).",

  apply() {
    gainXP(1000);
    unlockEncyclopedia("items", this.id);
  }
},
};

const ChestDatabase = {
  basicChest: {
    id: "basicChest",
    name: "Cofre",
    sprite: () => Assets.items.chest,
    width: 32,
    height: 32,
    collision: 20,
    life: 3,

    possibleDrops() {
      const drops = ["alioliPotatoes"];

      if (saveData.unlocks.notpikachuOrb) {
        drops.push("notpikachuOrb");
      }

      return drops;
    }
  }
};

function getRandomChestDrop(chestId) {
  const chest = ChestDatabase[chestId];
  const drops = chest.possibleDrops();

  const roll = Math.random();

  if (drops.includes("notpikachuOrb") && roll < 0.15) {
    return "notpikachuOrb";
  }

  return "alioliPotatoes";
}
