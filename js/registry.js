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
      clickCooldown: 2,
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
    if (typeof ensureRunWeaponStats === "function") ensureRunWeaponStats(id);
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
    minimapColor: "rgba(110, 170, 67, 0.28)",
    background: {
      type: "tile",
      asset: () => Assets.biomes.plains.grassTile,
      tileSize: 64,
      fallbackColor: "#6eaa43"
    },
    enemyPool: [
      { id: "slime", weight: 60, minTime: 0 },
      { id: "pinkSlime", weight: 12, minTime: 360 },
      { id: "pinkSlimeGiant", weight: 3, minTime: 360, unlockKey: "pinkSlimeGiant" },
      { id: "cloudSlime", weight: 12, minTime: 360, unlockKey: "cloudSlime" },
      { id: "cloudSlimeGiant", weight: 4, minTime: 360, unlockKey: "cloudSlimeGiant" },
      { id: "fireSlimeSmall", weight: 10, minTime: 30, unlockKey: "fireSlimeSmall" },
      { id: "slimeGiant", weight: 7, minTime: 45, unlockKey: "slimeGiant" },
      { id: "fireSlimeGiant", weight: 2, minTime: 45, unlockKey: "fireSlimeGiant", unique: true },
      { id: "watermelonVoltorb", weight: 7, minTime: 60, unlockKey: "watermelonVoltorb" },
      { id: "watermelonElectrode", weight: 3, minTime: 90, unlockKey: "watermelonElectrode" },
      { id: "flabebe", weight: 5, minTime: 180, unlockKey: "flabebe" },
      { id: "delibird", weight: 2, minTime: 180, unlockKey: "delibird" }
    ],
    decorations: ["grass1", "grass2", "flower1"],
    obstacles: ["rock", "bush", "tree"],
    decorationAmount: { min: 18, max: 35 },
    obstacleAmount: { min: 5, max: 12 }
  },

  forest: {
    id: "forest",
    name: "Bosque",
    minimapColor: "rgba(24, 99, 48, 0.34)",
    background: {
      type: "tile",
      asset: () => Assets.biomes.forest.forestTile,
      tileSize: 64,
      fallbackColor: "#235f32"
    },
    enemyPool: [
      { id: "slime", weight: 55, minTime: 0 },
      { id: "slimeGiant", weight: 8, minTime: 45 },
      { id: "watermelonVoltorb", weight: 9, minTime: 60 },
      { id: "watermelonElectrode", weight: 4, minTime: 90 }
    ],
    decorations: ["grass1", "grass2", "flower1", "flowerBlue", "flowerRed", "flowerYellow", "bushSmall"],
    obstacles: ["treeForest1", "treeForest2", "treeForest3", "bush", "rock"],
    decorationAmount: { min: 28, max: 52 },
    obstacleAmount: { min: 12, max: 24 }
  },

  river: {
    id: "river",
    name: "Río",
    minimapColor: "rgba(48, 122, 221, 0.32)",
    background: {
      type: "river",
      groundAsset: () => Assets.biomes.river.riverTile,
      tileSize: 64,
      fallbackColor: "#c8a060"
    },
    enemyPool: [
      { id: "cloudSlime", weight: 22, minTime: 0 },
      { id: "cloudSlimeGiant", weight: 6, minTime: 45 }
    ],
    decorations: [],
    obstacles: [],
    decorationAmount: { min: 0, max: 0 },
    obstacleAmount: { min: 0, max: 0 }
  }
};

const BIOME_TILE_SIZE = 64;
const RIVER_HALF_WIDTH = 132;
const RIVER_BANK_WIDTH = 92;
const FOREST_CELL_SIZE = 2300;

function getRiverCenterY(x) {
  return 900 + Math.sin(x / 760) * 360 + Math.sin(x / 1730 + 1.7) * 210;
}

function getRiverDistance(x, y) {
  return Math.abs(y - getRiverCenterY(x));
}

function isRiverWaterAt(x, y) {
  return getRiverDistance(x, y) <= RIVER_HALF_WIDTH;
}

function isRiverBiomeAt(x, y) {
  return getRiverDistance(x, y) <= RIVER_HALF_WIDTH + RIVER_BANK_WIDTH;
}

function hashBiomeCell(cellX, cellY) {
  let value = Math.imul(cellX, 374761393) ^ Math.imul(cellY, 668265263);
  value = (value ^ (value >>> 13)) >>> 0;
  value = Math.imul(value, 1274126177) >>> 0;
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

function isForestBiomeAt(x, y) {
  const cellX = Math.floor((x + 900) / FOREST_CELL_SIZE);
  const cellY = Math.floor((y - 500) / FOREST_CELL_SIZE);
  const localX = ((x + 900) % FOREST_CELL_SIZE + FOREST_CELL_SIZE) % FOREST_CELL_SIZE;
  const localY = ((y - 500) % FOREST_CELL_SIZE + FOREST_CELL_SIZE) % FOREST_CELL_SIZE;
  const patchRoll = hashBiomeCell(cellX, cellY);

  if (patchRoll < 0.42) return false;

  const centerX = FOREST_CELL_SIZE * (0.35 + hashBiomeCell(cellX + 17, cellY - 11) * 0.3);
  const centerY = FOREST_CELL_SIZE * (0.35 + hashBiomeCell(cellX - 29, cellY + 7) * 0.3);
  const radiusX = FOREST_CELL_SIZE * (0.30 + hashBiomeCell(cellX + 5, cellY + 19) * 0.16);
  const radiusY = FOREST_CELL_SIZE * (0.30 + hashBiomeCell(cellX - 13, cellY - 3) * 0.16);
  const dx = (localX - centerX) / radiusX;
  const dy = (localY - centerY) / radiusY;

  return dx * dx + dy * dy <= 1;
}

function getBiomeAt(x, y) {
  // Prioridad: el río corta cualquier bioma porque será una barrera natural.
  if (isRiverBiomeAt(x, y)) return BiomeRegistry.river;
  if (isForestBiomeAt(x, y)) return BiomeRegistry.forest;
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
    if (typeof canSpawnEnemy === "function" && !canSpawnEnemy(entry.id, biome?.id)) return false;
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

const GlobalRareEnemyPool = [
  { id: "goldSlime", weight: 30, minTime: 60 },
  { id: "goldSlimeGiant", weight: 1, minTime: 60, unlockKey: "goldSlimeGiant" }
];

function getGlobalRareEnemyPool(time, save = saveData) {
  return GlobalRareEnemyPool.filter(entry => {
    if (time < (entry.minTime || 0)) return false;
    if (entry.unlockKey && !save?.unlocks?.[entry.unlockKey]) return false;
    if (typeof canSpawnEnemy === "function" && !canSpawnEnemy(entry.id)) return false;
    return true;
  });
}

function pickGlobalRareEnemyId(time, save = saveData) {
  // Tirada muy baja e independiente del bioma.
  // Así los slimes de oro pueden aparecer en planicie, desierto, bosque, etc.
  if (Math.random() > 0.0025) return null;
  const entry = pickWeightedEntry(getGlobalRareEnemyPool(time, save));
  return entry?.id || null;
}

function pickBiomeEnemyId(x, y, time, save = saveData) {
  const biome = getBiomeAt(x, y);
  const entry = pickWeightedEntry(getBiomeEnemyPool(biome, time, save));
  return entry?.id || "slime";
}
