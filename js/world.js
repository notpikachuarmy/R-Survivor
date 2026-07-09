const WORLD_CHUNK_SIZE = 1024;

let worldChunks = new Map();

const WORLD_OBJECTS = {
  obstacles: {
    rock: {
      id: "rock",
      biome: "plains",
      sprite: () => Assets.obstacles.rock,
      width: 48,
      height: 48,
      collision: 20
    },
    bush: {
      id: "bush",
      biome: "plains",
      sprite: () => Assets.obstacles.bush,
      width: 48,
      height: 48,
      collision: 18
    },
    tree: {
      id: "tree",
      biome: "plains",
      sprite: () => Assets.obstacles.tree,
      width: 64,
      height: 96,
      collision: 18
    }
  },

  decorations: {
    grass1: {
      id: "grass1",
      biome: "plains",
      sprite: () => Assets.decorations.grass1,
      width: 32,
      height: 32
    },
    grass2: {
      id: "grass2",
      biome: "plains",
      sprite: () => Assets.decorations.grass2,
      width: 32,
      height: 32
    },
    flower1: {
      id: "flower1",
      biome: "plains",
      sprite: () => Assets.decorations.flower1,
      width: 32,
      height: 32
    }
  }
};

function getWorldTemplatesForBiome(kind, biome) {
  const ids = kind === "obstacles"
    ? getBiomeObstacleIds(biome)
    : getBiomeDecorationIds(biome);

  return ids
    .map(id => WORLD_OBJECTS[kind][id])
    .filter(Boolean);
}

function getRandomAmount(range, random) {
  const min = range?.min || 0;
  const max = range?.max ?? min;
  return min + Math.floor(random() * (max - min + 1));
}

function getChunkKey(chunkX, chunkY) {
  return `${chunkX},${chunkY}`;
}

function seededRandom(seed) {
  let value = seed;

  return function () {
    value |= 0;
    value = value + 0x6D2B79F5 | 0;

    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;

    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function getSeedFromChunk(chunkX, chunkY) {
  return chunkX * 92837111 ^ chunkY * 689287499;
}

function getRandomFromArray(array, random) {
  return array[Math.floor(random() * array.length)];
}

function createChunk(chunkX, chunkY) {
  const random = seededRandom(getSeedFromChunk(chunkX, chunkY));

  const baseX = chunkX * WORLD_CHUNK_SIZE;
  const baseY = chunkY * WORLD_CHUNK_SIZE;
  const centerX = baseX + WORLD_CHUNK_SIZE / 2;
  const centerY = baseY + WORLD_CHUNK_SIZE / 2;
  const biome = getBiomeAt(centerX, centerY);
  const biomeId = biome?.id || "plains";

  const chunk = {
    x: chunkX,
    y: chunkY,
    biomeId,
    obstacles: [],
    decorations: []
  };

  const decorationTemplates = getWorldTemplatesForBiome("decorations", biome);
  const obstacleTemplates = getWorldTemplatesForBiome("obstacles", biome);

  const decorationAmount = getRandomAmount(getBiomeObjectAmount(biome, "decoration"), random);
  const obstacleAmount = getRandomAmount(getBiomeObjectAmount(biome, "obstacle"), random);

  for (let i = 0; i < decorationAmount && decorationTemplates.length; i++) {
    const template = getRandomFromArray(decorationTemplates, random);

    chunk.decorations.push({
      id: template.id,
      sprite: template.sprite(),
      x: baseX + random() * WORLD_CHUNK_SIZE,
      y: baseY + random() * WORLD_CHUNK_SIZE,
      width: template.width,
      height: template.height,
      rotation: random() * Math.PI * 2
    });
  }

  for (let i = 0; i < obstacleAmount && obstacleTemplates.length; i++) {
    const template = getRandomFromArray(obstacleTemplates, random);

    const obstacle = {
      id: template.id,
      sprite: template.sprite(),
      x: baseX + random() * WORLD_CHUNK_SIZE,
      y: baseY + random() * WORLD_CHUNK_SIZE,
      width: template.width,
      height: template.height,
      size: template.collision * 2,
      collision: template.collision
    };

    let valid = true;

    for (const other of chunk.obstacles) {
      const minDistance = obstacle.collision + other.collision + 40;
      const dist = Math.hypot(obstacle.x - other.x, obstacle.y - other.y);

      if (dist < minDistance) {
        valid = false;
        break;
      }
    }

    if (valid) {
      chunk.obstacles.push(obstacle);
    }
  }

  return chunk;
}

function getChunk(chunkX, chunkY) {
  const key = getChunkKey(chunkX, chunkY);

  if (!worldChunks.has(key)) {
    worldChunks.set(key, createChunk(chunkX, chunkY));
  }

  return worldChunks.get(key);
}

function updateWorldAroundPlayer() {
  const playerChunkX = Math.floor(player.x / WORLD_CHUNK_SIZE);
  const playerChunkY = Math.floor(player.y / WORLD_CHUNK_SIZE);

  for (let y = playerChunkY - 2; y <= playerChunkY + 2; y++) {
    for (let x = playerChunkX - 2; x <= playerChunkX + 2; x++) {
      getChunk(x, y);
    }
  }
}

function getVisibleChunks() {
  const minChunkX = Math.floor((camera.x - canvas.width / 2) / WORLD_CHUNK_SIZE) - 1;
  const maxChunkX = Math.floor((camera.x + canvas.width / 2) / WORLD_CHUNK_SIZE) + 1;

  const minChunkY = Math.floor((camera.y - canvas.height / 2) / WORLD_CHUNK_SIZE) - 1;
  const maxChunkY = Math.floor((camera.y + canvas.height / 2) / WORLD_CHUNK_SIZE) + 1;

  const result = [];

  for (let y = minChunkY; y <= maxChunkY; y++) {
    for (let x = minChunkX; x <= maxChunkX; x++) {
      result.push(getChunk(x, y));
    }
  }

  return result;
}

function getNearbyObstacles() {
  const chunks = getVisibleChunks();
  const result = [];

  for (const chunk of chunks) {
    result.push(...chunk.obstacles);
  }

  return result;
}

function isCollidingWithObstacle(entity) {
  const nearbyObstacles = getNearbyObstacles();

  for (const obstacle of nearbyObstacles) {

    if (
  entity === player &&
  player.drillActive &&
  obstacle.id === "rock"
) {
  continue;
}
    const dist = Math.hypot(entity.x - obstacle.x, entity.y - obstacle.y);
    const entityRadius = entity.collision || entity.size * 0.35;

    if (dist < entityRadius + obstacle.collision) {
      return true;
    }
  }

  return false;
}

function moveWithObstacleCollision(entity, dx, dy) {
  entity.x += dx;

if (
  isCollidingWithObstacle(entity) ||
  isCollidingWithSenseiPillar(entity)
) {
  entity.x -= dx;
}

entity.y += dy;

if (
  isCollidingWithObstacle(entity) ||
  isCollidingWithSenseiPillar(entity)
) {
  entity.y -= dy;
 }
}

function drawWorldSprite(object) {
  const sx = worldToScreenX(object.x);
  const sy = worldToScreenY(object.y);

  ctx.drawImage(
    object.sprite,
    sx - object.width / 2,
    sy - object.height / 2,
    object.width,
    object.height
  );
}

function drawDecorations() {
  const chunks = getVisibleChunks();

  for (const chunk of chunks) {
    for (const decoration of chunk.decorations) {
      drawWorldSprite(decoration);
    }
  }
}

function drawObstacles() {
  const chunks = getVisibleChunks();

  for (const chunk of chunks) {
    for (const obstacle of chunk.obstacles) {
      drawWorldSprite(obstacle);
    }
  }
}

function drawWorld() {
  drawDecorations();
  drawObstacles();
}

function resetWorld() {
  worldChunks = new Map();
}
