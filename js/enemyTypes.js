const EnemyDatabase = {
  slime: {
    id: "slime",
    name: "Slime",
    type: "normal",
    tags: ["slime"],
    sprite: () => Assets.enemies.slime,

    size: 56,
    collision: 20,
    life: 3,
    speed: 80,
    xpValue: 3,
    scoreValue: 10,

    attacks: ["charge"],
    chargeRange: 260,
    chargeTime: 0.75,
    jumpSpeed: 520,
    jumpDuration: 0.35,
    attackCooldown: 1.8,

    isBoss: false,
    chestChance: 0
  },

  fireSlimeGiant: {
    id: "fireSlimeGiant",
    name: "Slime de Fuego Gigante",
    type: "fire",
    tags: ["slime", "fire", "gigante", "boss"],
    sprite: () => Assets.enemies.fireSlimeGiant,

    size: 96,
    collision: 38,
    life: 80,
    speed: 55,
    xpValue: 40,
    scoreValue: 250,

    attacks: ["charge", "fireball"],
    chargeRange: 300,
    chargeTime: 1.0,
    jumpSpeed: 620,
    jumpDuration: 0.42,
    attackCooldown: 2.2,

    fireballRange: 520,
    fireballCooldown: 2.8,
    fireballSpeed: 360,
    fireballDamage: 12,

    isBoss: true,
    chestChance: 0.1
  },

  fireSlimeSmall: {
  id: "fireSlimeSmall",
  name: "Slime de Fuego",
  type: "fire",
  tags: ["slime", "fire"],
  sprite: () => Assets.enemies.fireSlimeGiant,

  size: 56,
  collision: 20,
  life: 8,
  speed: 70,
  xpValue: 8,
  scoreValue: 25,

  attacks: ["fireball"],
  chargeRange: 0,
  chargeTime: 0,
  jumpSpeed: 0,
  jumpDuration: 0,
  attackCooldown: 2.2,

  fireballRange: 460,
  fireballCooldown: 2.6,
  fireballSpeed: 300,
  fireballDamage: 8,

  isBoss: false,
  chestChance: 0
},
slimeGiant: {
  id: "slimeGiant",
  name: "Slime Gigante",
  type: "normal",
  tags: ["slime", "gigante"],
  sprite: () => Assets.enemies.slimeGiant,

  size: 96,
  collision: 38,
  life: 45,
  speed: 45,
  xpValue: 25,
  scoreValue: 120,

  attacks: ["charge"],
  chargeRange: 300,
  chargeTime: 1.0,
  jumpSpeed: 560,
  jumpDuration: 0.42,
  attackCooldown: 2.3,

  isBoss: false,
  chestChance: 0
},

slimeElite: {
  id: "slimeElite",
  name: "Slime Elite",
  type: "normal",
  tags: ["slime"],
  sprite: () => Assets.enemies.slimeElite,

  size: 60,
  collision: 22,
  life: 25,
  speed: 125,
  xpValue: 7,
  scoreValue: 30,

  attacks: ["charge"],
  chargeRange: 260,
  chargeTime: 0.55,
  jumpSpeed: 620,
  jumpDuration: 0.32,
  attackCooldown: 1.4,

  isBoss: false,
  chestChance: 0
},
mimic: {
    id: "mimic",
    name: "Mímico",
    type: "special",
    tags: [],
    sprite: () => Assets.enemies.mimic,

    size: 64,
    collision: 26,

    life: 120,
    speed: 85,

    xpValue: 60,
    scoreValue: 400,

    attacks: ["charge"],

    chargeRange: 280,
    chargeTime: 0.9,
    jumpSpeed: 560,
    jumpDuration: 0.40,
    attackCooldown: 1.8,

    isBoss: false,
    chestChance: 0
},
  rhyhornBoss: {
  id: "rhyhornBoss",
  name: "Rhyhorn",
  type: "boss",
  tags: ["boss", "rock"],

  sprite: () => Assets.enemies.rhyhornBoss,

  size: 112,
  collision: 42,
  life: 180,
  speed: 45,
  xpValue: 90,
  scoreValue: 600,

  attacks: ["rhyhornCharge", "rockLine", "electricBite"],

  chargeRange: 420,
  chargeTime: 0.9,
  jumpSpeed: 780,
  jumpDuration: 0.55,
  attackCooldown: 2.2,

  rockLineRange: 650,
  rockLineCooldown: 4.5,

  electricBiteRange: 95,
  electricBiteCooldown: 3.2,
  electricBiteDamage: 18,

  isBoss: true,
  chestChance: 1
},
watermelonVoltorb: {
  id: "watermelonVoltorb",
  name: "Voltorb Sandía",
  type: "explosive",

  tags: ["plant", "explosive"],

  sprite: () => Assets.enemies.watermelonVoltorb,

  size: 56,
  collision: 22,

  life: 20,
  speed: 145,

  xpValue: 1,
  scoreValue: 45,

  attacks: ["explode"],

  explosionRange: 75,
  explosionDamage: 7,
  explosionTime: 1.1,

  isBoss: false,
  chestChance: 0
},
watermelonElectrode: {

    id: "watermelonElectrode",

    name: "Electrode Sandía",

    type: "explosive",

    tags: ["plant","explosive"],

    sprite: () => Assets.enemies.watermelonElectrode,

    size: 64,
    collision: 24,

    life: 30,
    speed: 175,

    xpValue: 5,
    scoreValue: 90,

    attacks: ["explode"],

    explosionRange: 110,
    explosionDamage: 15,
    explosionTime: 0.8,

    isBoss:false,

    chestChance:0

},
  flabebe: {
  id: "flabebe",
  name: "Flabébé",
  type: "ranged",
  tags: ["plant", "fairy", "knife"],

  sprite: () => Assets.enemies.flabebe,

  size: 56,
  collision: 20,

  life: 18,
  speed: 85,

  xpValue: 8,
  scoreValue: 60,

  attacks: ["knife"],

  knifeRange: 520,
  knifeCooldown: 1.8,
  knifeSpeed: 430,
  knifeDamage: 9,

  isBoss: false,
  chestChance: 0
},
  delibird: {
  id: "delibird",
  name: "Delibird",
  type: "rare",
  tags: ["rare", "bag"],

  sprite: () => Assets.enemies.delibird,

  size: 64,
  collision: 22,

  life: 35,
  speed: 165,

  xpValue: 20,
  scoreValue: 180,

  attacks: [],

  isBoss: false,
  chestChance: 0,

  dropsBag: true,
  cannotCapture: true
},
  rhyhorn: {
  id: "rhyhorn",
  name: "Rhyhorn",
  type: "special",
  tags: ["boss", "rhyhorn", "rock"],

  sprite: () => Assets.enemies.rhyhorn,

  size: 80,
  collision: 32,

  life: 150,
  speed: 60,

  xpValue: 45,
  scoreValue: 300,

  attacks: ["rhyhornCharge", "rockLine"],

  state: "chase",

  chargeRange: 360,
  chargeTime: 0.45,
  jumpSpeed: 680,
  jumpDuration: 0.32,
  attackCooldown: 1.4,

  rockLineRange: 520,
  rockLineCooldown: 3.2,

  isBoss: true,
  chestChance: 1,

  cannotCapture: true
},
  senseiLife: {
  id: "senseiLife",
  name: "Sensei de la Vida",
  type: "sensei",
  tags: ["sensei", "boss"],

  sprite: () => Assets.npc.senseiLife,

  size: 80,
  collision: 32,
  life: 220,
  speed: 75,
  xpValue: 100,
  scoreValue: 800,

  attacks: ["senseiSlash", "charge", "senseiPillar", "senseiMeditation"],
  chargeRange: 340,
  chargeTime: 0.7,
  jumpSpeed: 680,
  jumpDuration: 0.35,
  attackCooldown: 1.8,

  senseiSlashCooldown: 2.2,
  senseiSlashRange: 95,
  senseiSlashDamage: 14,

  senseiShurikenCooldown: 2.4,
  senseiShurikenRange: 620,
  senseiShurikenSpeed: 520,
  senseiShurikenDamage: 9,

  senseiBlueFireballCooldown: 3.2,
  senseiBlueFireballRange: 650,
  senseiBlueFireballSpeed: 360,
  senseiBlueFireballDamage: 18,

  senseiTeleportCooldown: 20,
  senseiPillarCooldown: 8,
  senseiMeditationCooldown: 30,
  senseiDebuffCooldown: 9,

  isBoss: true,
  chestChance: 0,
  cannotCapture: true,
  senseiId: "life"
},

senseiCombat: {
  id: "senseiCombat",
  name: "Sensei del Combate",
  type: "sensei",
  tags: ["sensei", "boss"],

  sprite: () => Assets.npc.senseiCombat,

  size: 80,
  collision: 32,
  life: 200,
  speed: 85,
  xpValue: 100,
  scoreValue: 800,

  attacks: ["senseiTeleport", "senseiSlash", "senseiShuriken", "senseiDebuff"],
  chargeRange: 360,
  chargeTime: 0.6,
  jumpSpeed: 720,
  jumpDuration: 0.32,
  attackCooldown: 1.6,

  senseiSlashCooldown: 2.2,
  senseiSlashRange: 95,
  senseiSlashDamage: 14,

  senseiShurikenCooldown: 2.4,
  senseiShurikenRange: 620,
  senseiShurikenSpeed: 520,
  senseiShurikenDamage: 9,

  senseiBlueFireballCooldown: 3.2,
  senseiBlueFireballRange: 650,
  senseiBlueFireballSpeed: 360,
  senseiBlueFireballDamage: 18,

  senseiTeleportCooldown: 20,
  senseiPillarCooldown: 8,
  senseiMeditationCooldown: 30,
  senseiDebuffCooldown: 9,

  isBoss: true,
  chestChance: 0,
  cannotCapture: true,
  senseiId: "combat"
},

senseiKnowledge: {
  id: "senseiKnowledge",
  name: "Sensei del Conocimiento",
  type: "sensei",
  tags: ["sensei", "boss"],

  sprite: () => Assets.npc.senseiKnowledge,

  size: 80,
  collision: 32,
  life: 190,
  speed: 70,
  xpValue: 100,
  scoreValue: 800,

  attacks: ["senseiBlueFireball", "senseiTeleport", "senseiPillar", "senseiMeditation"],
  chargeRange: 330,
  chargeTime: 0.75,
  jumpSpeed: 650,
  jumpDuration: 0.35,
  attackCooldown: 1.9,

  senseiSlashCooldown: 2.2,
  senseiSlashRange: 95,
  senseiSlashDamage: 14,

  senseiShurikenCooldown: 2.4,
  senseiShurikenRange: 620,
  senseiShurikenSpeed: 520,
  senseiShurikenDamage: 9,

  senseiBlueFireballCooldown: 3.2,
  senseiBlueFireballRange: 650,
  senseiBlueFireballSpeed: 360,
  senseiBlueFireballDamage: 18,

  senseiTeleportCooldown: 20,
  senseiPillarCooldown: 8,
  senseiMeditationCooldown: 30,
  senseiDebuffCooldown: 9,

  isBoss: true,
  chestChance: 0,
  cannotCapture: true,
  senseiId: "knowledge"
},

senseiSpeed: {
  id: "senseiSpeed",
  name: "Sensei de la Velocidad",
  type: "sensei",
  tags: ["sensei", "boss"],

  sprite: () => Assets.npc.senseiSpeed,

  size: 80,
  collision: 30,
  life: 180,
  speed: 105,
  xpValue: 100,
  scoreValue: 800,

  attacks: ["senseiTeleport", "charge", "senseiShuriken", "senseiSlash"],
  chargeRange: 380,
  chargeTime: 0.45,
  jumpSpeed: 800,
  jumpDuration: 0.28,
  attackCooldown: 1.3,

  senseiSlashCooldown: 2.2,
  senseiSlashRange: 95,
  senseiSlashDamage: 14,

  senseiShurikenCooldown: 2.4,
  senseiShurikenRange: 620,
  senseiShurikenSpeed: 520,
  senseiShurikenDamage: 9,

  senseiBlueFireballCooldown: 3.2,
  senseiBlueFireballRange: 650,
  senseiBlueFireballSpeed: 360,
  senseiBlueFireballDamage: 18,

  senseiTeleportCooldown: 20,
  senseiPillarCooldown: 8,
  senseiMeditationCooldown: 30,
  senseiDebuffCooldown: 9,

  isBoss: true,
  chestChance: 0,
  cannotCapture: true,
  senseiId: "speed"
},

senseiTalent: {
  id: "senseiTalent",
  name: "Sensei del Talento",
  type: "sensei",
  tags: ["sensei", "boss"],

  sprite: () => Assets.npc.senseiTalent,

  size: 80,
  collision: 32,
  life: 210,
  speed: 80,
  xpValue: 100,
  scoreValue: 800,

  attacks: ["senseiBlueFireball", "senseiSlash", "senseiDebuff", "charge", "senseiShuriken", "senseiTeleport", "senseiPillar", "senseiMeditation"],
  chargeRange: 350,
  chargeTime: 0.65,
  jumpSpeed: 700,
  jumpDuration: 0.33,
  attackCooldown: 1.7,

  senseiSlashCooldown: 2.2,
  senseiSlashRange: 95,
  senseiSlashDamage: 14,

  senseiShurikenCooldown: 2.4,
  senseiShurikenRange: 620,
  senseiShurikenSpeed: 520,
  senseiShurikenDamage: 9,

  senseiBlueFireballCooldown: 3.2,
  senseiBlueFireballRange: 650,
  senseiBlueFireballSpeed: 360,
  senseiBlueFireballDamage: 18,

  senseiTeleportCooldown: 20,
  senseiPillarCooldown: 8,
  senseiMeditationCooldown: 30,
  senseiDebuffCooldown: 9,

  isBoss: true,
  chestChance: 0,
  cannotCapture: true,
  senseiId: "talent"
},
  goldSlime: {
  id: "goldSlime",
  name: "Slime de Oro",
  type: "rare",
  tags: ["slime", "gold", "rare"],

  sprite: () => Assets.enemies.goldSlime,

  size: 56,
  collision: 20,

  life: 5,
  speed: 115,

  xpValue: 250,
  scoreValue: 500,

  attacks: [],

  isBoss: false,
  chestChance: 0,
  cannotCapture: true,
},
  goldSlimeGiant: {
  id: "goldSlimeGiant",
  name: "Slime de Oro Gigante",
  type: "rare",
  tags: ["slime", "gold", "rare", "gigante"],

  sprite: () => Assets.enemies.goldSlimeGiant,

  size: 96,
  collision: 38,

  life: 40,
  speed: 90,

  xpValue: 750,
  scoreValue: 1500,

  attacks: [],

  isBoss: false,
  chestChance: 0,
  cannotCapture: true,
},
  pinkSlime: {
  id: "pinkSlime",
  name: "Slime Rosa",
  type: "normal",
  tags: ["slime", "pink"],

  sprite: () => Assets.enemies.pinkSlime,

  size: 56,
  collision: 20,

  life: 28,
  speed: 95,

  xpValue: 12,
  scoreValue: 50,

  attacks: ["charge"],
  chargeRange: 330,
  chargeTime: 0.9,
  jumpSpeed: 760,
  jumpDuration: 0.36,
  attackCooldown: 1.7,
  jumpsOverObstacles: true,

  isBoss: false,
  chestChance: 0
},
  pinkSlimeGiant: {
  id: "pinkSlimeGiant",
  name: "Slime Rosa Gigante",
  type: "normal",
  tags: ["slime", "pink", "gigante"],

  sprite: () => Assets.enemies.pinkSlimeGiant,

  size: 96,
  collision: 38,

  life: 110,
  speed: 75,

  xpValue: 55,
  scoreValue: 220,

  attacks: ["charge"],
  chargeRange: 420,
  chargeTime: 1.05,
  jumpSpeed: 900,
  jumpDuration: 0.48,
  attackCooldown: 2.1,
  jumpsOverObstacles: true,

  isBoss: false,
  chestChance: 0
},
  cloudSlimeGiant: {
  id: "cloudSlimeGiant",
  name: "Slime Nube Gigante",
  type: "normal",
  tags: ["slime", "cloud", "gigante"],
  sprite: () => Assets.enemies.cloudSlimeGiant,
  size: 96,
  collision: 36,
  life: 115,
  speed: 90,
  xpValue: 60,
  scoreValue: 240,
  attacks: ["cloudWall", "slimeRain"],
  noContactDamage: true,
  ignoresObstacles: true,
  orbitDistance: 320,
  cloudCooldown: 2.8,
  rainCooldown: 9,
  rainDuration: 4,
  isBoss: false,
  chestChance: 0,
  cannotCapture: true,
},
  cloudSlime: {
  id: "cloudSlime",
  name: "Slime Nube",
  type: "normal",
  tags: ["slime", "cloud"],
  sprite: () => Assets.enemies.cloudSlime,
  size: 56,
  collision: 20,
  life: 32,
  speed: 105,
  xpValue: 14,
  scoreValue: 70,
  attacks: ["cloudWall"],
  noContactDamage: true,
  ignoresObstacles: true,
  orbitDistance: 280,
  cloudCooldown: 4.2,
  isBoss: false,
  chestChance: 0,
  cannotCapture: true,
},

};

function createEnemy(typeId, x, y) {
  const data = EnemyDatabase[typeId];

  if (!data) {
    console.warn("Enemy type not found:", typeId);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    faction: "enemy",
    tags: [...(data.tags || [])],
    sprite: data.sprite(),

    x,
    y,
    size: data.size,
    collision: data.collision,

    life: data.life,
    maxLife: data.life,
    speed: data.speed,
    xpValue: data.xpValue,
    scoreValue: data.scoreValue,

    attacks: [...data.attacks],
    chargeRange: data.chargeRange,
    chargeTime: data.chargeTime,
    jumpSpeed: data.jumpSpeed,
    jumpDuration: data.jumpDuration,
    attackCooldownBase: data.attackCooldown,

    fireballRange: data.fireballRange || 0,
    fireballCooldown: data.fireballCooldown || 0,
    fireballTimer: 1.5 + Math.random(),
    fireballSpeed: data.fireballSpeed || 0,
    fireballDamage: data.fireballDamage || 0,

    knifeRange: data.knifeRange || 0,
    knifeCooldown: data.knifeCooldown || 0,
    knifeTimer: 1 + Math.random(),
    knifeSpeed: data.knifeSpeed || 0,
    knifeDamage: data.knifeDamage || 0,

    explosionRange: data.explosionRange || 0,
    explosionDamage: data.explosionDamage || 0,
    explosionTime: data.explosionTime || 0,
    explosionTimer: 0,
    hasExploded: false,

    rockLineRange: data.rockLineRange || 0,
    rockLineCooldown: data.rockLineCooldown || 0,
    rockLineTimer: 2.5,

    electricBiteRange: data.electricBiteRange || 0,
    electricBiteCooldown: data.electricBiteCooldown || 0,
    electricBiteTimer: 1.5,
    electricBiteDamage: data.electricBiteDamage || 0,

    senseiSlashCooldown: data.senseiSlashCooldown || 0,
    senseiSlashTimer: 1 + Math.random(),
    senseiSlashRange: data.senseiSlashRange || 0,
    senseiSlashDamage: data.senseiSlashDamage || 0,

    senseiShurikenCooldown: data.senseiShurikenCooldown || 0,
    senseiShurikenTimer: 1.2 + Math.random(),
    senseiShurikenRange: data.senseiShurikenRange || 0,
    senseiShurikenSpeed: data.senseiShurikenSpeed || 0,
    senseiShurikenDamage: data.senseiShurikenDamage || 0,

    senseiBlueFireballCooldown: data.senseiBlueFireballCooldown || 0,
    senseiBlueFireballTimer: 1.8 + Math.random(),
    senseiBlueFireballRange: data.senseiBlueFireballRange || 0,
    senseiBlueFireballSpeed: data.senseiBlueFireballSpeed || 0,
    senseiBlueFireballDamage: data.senseiBlueFireballDamage || 0,

    senseiTeleportCooldown: data.senseiTeleportCooldown || 0,
    senseiTeleportTimer: 4 + Math.random() * 2,

    senseiPillarCooldown: data.senseiPillarCooldown || 0,
    senseiPillarTimer: 3 + Math.random() * 2,

    senseiMeditationCooldown: data.senseiMeditationCooldown || 0,
    senseiMeditationTimer: 6 + Math.random() * 3,

    senseiDebuffCooldown: data.senseiDebuffCooldown || 0,
    senseiDebuffTimer: 4 + Math.random() * 2,

    isBoss: data.isBoss,
    chestChance: data.chestChance,
    cannotCapture: data.cannotCapture || false,
    noContactDamage: data.noContactDamage || false,
    ignoresObstacles: data.ignoresObstacles || false,
    orbitDistance: data.orbitDistance || 0,
    cloudCooldown: data.cloudCooldown || 0,
    rainCooldown: data.rainCooldown || 0,
    rainDuration: data.rainDuration || 0,
    jumpsOverObstacles: data.jumpsOverObstacles || false,
    senseiId: data.senseiId || null,

    dropsBag: data.dropsBag || false,
    isEscaping: false,
    escapeTimer: 0,
    hasBeenHit: false,

    state: "chase",

    facing: "right",

    chargeTimer: 0,
    jumpTimer: 0,
    jumpVx: 0,
    jumpVy: 0,
    attackCooldown: 1 + Math.random()
  };
}

function canSpawnEnemy(typeId) {
  if (typeId === "fireSlimeGiant") {
    return saveData.unlocks.fireSlimeGiant === true;
  }

  if (typeId === "slimeGiant") {
  return saveData.unlocks.slimeGiant === true;
}
  if (typeId === "delibird") {
  return saveData.unlocks.delibird === true;
}
  
if (typeId === "fireSlimeSmall") {
  return saveData.unlocks.fireSlimeSmall === true;
}

if (typeId === "watermelonVoltorb") {
  return saveData.unlocks.watermelonVoltorb === true;
}

if (typeId === "watermelonElectrode") {
  return saveData.unlocks.watermelonElectrode === true;
}

if (typeId === "flabebe") {
  return saveData.unlocks.flabebe === true;
}

if (typeId === "goldSlimeGiant") {
  return saveData.unlocks.goldSlimeGiant === true;
}

if (typeId === "pinkSlimeGiant") {
  return saveData.unlocks.pinkSlimeGiant === true;
}

if (typeId === "cloudSlimeGiant") {
  return saveData.unlocks.cloudSlimeGiant === true;
}

if (typeId === "cloudSlime") {
  return saveData.unlocks.cloudSlime === true;
}

  if (typeId === "rhyhorn") {
  return saveData.unlocks.rhyhorn === true;
}
  if (typeId.startsWith("sensei")) {
  return true;
}

  return true;
}
