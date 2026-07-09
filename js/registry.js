/*
 * Registry central del proyecto.
 * Objetivo: que añadir armas/enemigos/biomas sea principalmente añadir datos aquí,
 * no parchear menús, enciclopedia, spawner y pausa por separado.
 */

const WeaponRegistry = {
  stone: {
    id: "stone",
    name: "Piedra",
    description: "Arma inicial básica: lanza piedras al enemigo más cercano.",
    category: "Arma",
    sprite: () => Assets.projectiles.stone,
    unlockKey: null,
    canStart: true,
    encyclopedia: true,
    initialStats: {
      tags: ["stone", "projectile"],
      damage: 1,
      projectiles: 1,
      cooldown: 0.8,
      size: 24,
      speed: 520,
      lifeTime: 1.8,
      bounces: 0,
      specialChance: 0,
      specialDamage: 3
    }
  },

  patataBoom: {
    id: "patataBoom",
    name: "PatataBoom",
    description: "Empiezas colocando minas explosivas.",
    category: "Arma",
    sprite: () => Assets.items.patataBoom,
    unlockKey: "patataBoom",
    canStart: true,
    encyclopedia: true,
    applyFn: "addPatataBoomWeapon",
    initialStats: {
      tags: ["plant", "explosive", "patataboom"],
      damage: 10,
      cooldown: 3.5,
      timer: 0,
      mines: 1,
      radius: 90,
      chain: false
    }
  },

  watermelonSeedTurret: {
    id: "watermelonSeedTurret",
    name: "Torreta de sandía",
    description: "Empiezas con una torreta temporal que dispara semillas.",
    category: "Arma",
    sprite: () => Assets.items.watermelonSeedTurret,
    unlockKey: "turret",
    canStart: true,
    encyclopedia: true,
    applyFn: "addWatermelonSeedTurretWeapon",
    initialStats: {
      tags: ["plant", "turret", "projectile"],
      damage: 6,
      respawnCooldown: 5,
      slots: [],
      maxTurrets: 1,
      duration: 8,
      fireCooldown: 0.75,
      range: 260,
      projectileSpeed: 520
    }
  },

  chikoritaLeaf: {
    id: "chikoritaLeaf",
    name: "Hoja de Chikorita",
    description: "Empiezas lanzando hojas perforantes.",
    category: "Arma",
    sprite: () => Assets.items.chikoritaLeaf,
    unlockKey: "chikoritaLeaf",
    canStart: true,
    encyclopedia: true,
    applyFn: "addChikoritaLeafWeapon",
    initialStats: {
      tags: ["plant", "projectile", "piercing"],
      damage: 5,
      cooldown: 1.15,
      timer: 0,
      leaves: 1,
      speed: 620,
      size: 24,
      collision: 10,
      lifeTime: 1.6,
      pierce: 3
    }
  },

  sockRock: {
    id: "sockRock",
    name: "Calcetín con Piedra",
    description: "Empiezas con un golpe cuerpo a cuerpo frontal.",
    category: "Arma",
    sprite: () => Assets.items.sockRock,
    unlockKey: "sockRock",
    canStart: true,
    encyclopedia: true,
    applyFn: "addSockRockWeapon",
    initialStats: {
      tags: ["melee", "sock", "rock"],
      damage: 12,
      cooldown: 1.2,
      timer: 0,
      range: 72,
      size: 96,
      collision: 45,
      duration: 0.18
    }
  },

  cursor: {
    id: "cursor",
    name: "Cursor",
    description: "Empiezas con un cursor que hace clic sobre enemigos.",
    category: "Arma",
    sprite: () => Assets.items.cursor,
    unlockKey: "cursor",
    canStart: true,
    encyclopedia: true,
    applyFn: "addCursorWeapon",
    initialStats: {
      tags: ["cursor", "digital", "click"],
      damage: 8,
      clickCooldown: 5.6,
      count: 1,
      range: 520,
      moveSpeed: 520,
      clickRange: 18
    }
  },

  rooster: {
    id: "rooster",
    name: "Gallo de Pelea",
    description: "Empiezas con gallos aliados que picotean enemigos.",
    category: "Arma",
    sprite: () => Assets.items.rooster,
    unlockKey: "rooster",
    canStart: true,
    encyclopedia: true,
    applyFn: "addRoosterWeapon",
    initialStats: {
      tags: ["ally", "rooster", "summon"]
    }
  }
};

function cloneRegistryValue(value) {
  return structuredClone(value);
}

function getWeaponDefinition(id) {
  return WeaponRegistry[id] || null;
}

function isWeaponUnlocked(id, save = saveData) {
  const weapon = getWeaponDefinition(id);
  if (!weapon) return false;
  if (!weapon.unlockKey) return true;
  return !!save?.unlocks?.[weapon.unlockKey];
}

function getStarterWeaponOptions() {
  return Object.values(WeaponRegistry)
    .filter(weapon => weapon.canStart)
    .map(weapon => ({
      id: weapon.id,
      name: weapon.name,
      description: weapon.description,
      unlocked: isWeaponUnlocked(weapon.id),
      sprite: weapon.sprite,
      apply: () => applyWeaponDefinition(weapon.id)
    }));
}

function applyWeaponDefinition(id) {
  const weapon = getWeaponDefinition(id);
  if (!weapon) return false;

  if (weapon.initialStats) {
    player.weapons[id] = cloneRegistryValue(weapon.initialStats);
  }

  const applyFn = weapon.applyFn && window[weapon.applyFn];
  if (typeof applyFn === "function") {
    applyFn();
  }

  if (weapon.encyclopedia) {
    unlockEncyclopedia("weapons", id);
  }

  return true;
}

function getWeaponDisplayNameFromRegistry(id) {
  return getWeaponDefinition(id)?.name || id;
}

const BiomeRegistry = {
  plains: {
    id: "plains",
    name: "Planicie",
    bounds: { type: "default" },
    background: {
      type: "tile",
      asset: () => Assets.biomes.plains.grassTile,
      tileSize: 64,
      fallbackColor: "#6eaa43"
    },
    enemyPool: [
      { id: "slime", weight: 60, minTime: 0 },
      { id: "goldSlime", weight: 1, minTime: 60 },
      { id: "fireSlimeSmall", weight: 10, minTime: 30, unlockKey: "fireSlimeSmall" },
      { id: "slimeGiant", weight: 7, minTime: 45, unlockKey: "slimeGiant" },
      { id: "fireSlimeGiant", weight: 2, minTime: 45, unlockKey: "fireSlimeGiant", unique: true },
      { id: "watermelonVoltorb", weight: 7, minTime: 60, unlockKey: "watermelonVoltorb" },
      { id: "watermelonElectrode", weight: 3, minTime: 90, unlockKey: "watermelonElectrode" },
      { id: "flabebe", weight: 5, minTime: 180, unlockKey: "flabebe" },
      { id: "delibird", weight: 2, minTime: 180, unlockKey: "delibird" }
    ],

    // Objetos propios de Planicie. Cuando se añada desierto/bosque/etc.,
    // se define aquí su lista y el generador no mezclará assets entre biomas.
    decorations: ["grass1", "grass2", "flower1"],
    obstacles: ["rock", "bush", "tree"],
    decorationAmount: { min: 18, max: 35 },
    obstacleAmount: { min: 5, max: 12 }
  }
};

function getBiomeAt(x, y) {
  // Preparado para crecer: forest/cave/desert pueden tener bounds propios.
  return BiomeRegistry.plains;
}


function getBiomeIdAt(x, y) {
  return getBiomeAt(x, y)?.id || "plains";
}

function getBiomeWorldSet(biomeOrId) {
  const biome = typeof biomeOrId === "string" ? BiomeRegistry[biomeOrId] : biomeOrId;
  return biome || BiomeRegistry.plains;
}

function getBiomeDecorationIds(biomeOrId) {
  return getBiomeWorldSet(biomeOrId).decorations || [];
}

function getBiomeObstacleIds(biomeOrId) {
  return getBiomeWorldSet(biomeOrId).obstacles || [];
}

function getBiomeObjectAmount(biomeOrId, type) {
  const biome = getBiomeWorldSet(biomeOrId);
  const key = type === "obstacle" ? "obstacleAmount" : "decorationAmount";
  return biome[key] || { min: 0, max: 0 };
}

function getBiomeEnemyPool(biome, time, save = saveData) {
  return (biome?.enemyPool || []).filter(entry => {
    if (time < (entry.minTime || 0)) return false;
    if (entry.unlockKey && !save?.unlocks?.[entry.unlockKey]) return false;
    if (entry.unique && enemies?.some(enemy => enemy.id === entry.id)) return false;
    if (typeof canSpawnEnemy === "function" && !canSpawnEnemy(entry.id)) return false;
    return true;
  });
}

function pickWeightedEntry(entries) {
  if (!entries.length) return null;
  const total = entries.reduce((sum, entry) => sum + (entry.weight || 1), 0);
  let roll = Math.random() * total;
  for (const entry of entries) {
    roll -= entry.weight || 1;
    if (roll <= 0) return entry;
  }
  return entries[0];
}

function pickBiomeEnemyId(x, y, time, save = saveData) {
  const biome = getBiomeAt(x, y);
  const entry = pickWeightedEntry(getBiomeEnemyPool(biome, time, save));
  return entry?.id || "slime";
}
