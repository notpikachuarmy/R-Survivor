function updateWeapons(dt) {
  if (player.weapons.stone) {
    updateStoneWeapon(dt);
  }

  if (player.weapons.patataBoom) {
    updatePatataBoomWeapon(dt);
  }

  if (player.weapons.watermelonSeedTurret) {
    updateWatermelonSeedTurretWeapon(dt);
  }

  if (player.weapons.chikoritaLeaf) {
    updateChikoritaLeafWeapon(dt);
  }

  if (player.weapons.sockRock) {
    updateSockRockWeapon(dt);
  }

  if (player.weapons.panPaloma) {
    updatePanPalomaWeapon(dt);
  }
}

function updateChikoritaLeafWeapon(dt) {
  const weapon = player.weapons.chikoritaLeaf;

  if (weapon.timer === undefined) {
    weapon.timer = 0;
  }

  weapon.timer -= dt;

  if (weapon.timer <= 0) {
    shootChikoritaLeaves();
    weapon.timer = weapon.cooldown;
  }
}

function updateWatermelonSeedTurretWeapon(dt) {
  if (player.weapons.watermelonSeedTurret.timer === undefined) {
    player.weapons.watermelonSeedTurret.timer = 0;
  }
}

function updateStoneWeapon(dt) {
  if (player.weapons.stone.timer === undefined) {
    player.weapons.stone.timer = 0;
  }

  player.weapons.stone.timer -= dt;

  if (player.weapons.stone.timer <= 0) {
    shootStone();
    player.weapons.stone.timer = player.weapons.stone.cooldown;
  }
}

function updatePatataBoomWeapon(dt) {
  if (player.weapons.patataBoom.timer === undefined) {
    player.weapons.patataBoom.timer = 0;
  }

  player.weapons.patataBoom.timer -= dt;

  if (player.weapons.patataBoom.timer <= 0) {
    placePatataBoomMines();
    player.weapons.patataBoom.timer = player.weapons.patataBoom.cooldown;
  }
}

function updatePanPalomaWeapon(dt) {
  const weapon = player.weapons.panPaloma;

  // Cada Pan Paloma dispone de su propia ranura y su propio cooldown.
  // Así, aumentar maxActive permite mantener varios panes funcionando
  // de forma simultánea en lugar de hacerlos depender de un único timer.
  if (!Array.isArray(weapon.cooldownSlots)) weapon.cooldownSlots = [];

  while (weapon.cooldownSlots.length < weapon.maxActive) {
    weapon.cooldownSlots.push(0);
  }
  if (weapon.cooldownSlots.length > weapon.maxActive) {
    weapon.cooldownSlots.length = weapon.maxActive;
  }

  for (let slot = 0; slot < weapon.maxActive; slot++) {
    weapon.cooldownSlots[slot] = Math.max(0, (weapon.cooldownSlots[slot] ?? 0) - dt);

    const slotOccupied = panPalomas.some(pigeon => !pigeon.dead && pigeon.slot === slot);
    if (!slotOccupied && weapon.cooldownSlots[slot] <= 0) {
      spawnPanPaloma(slot);
      weapon.cooldownSlots[slot] = weapon.cooldown;
    }
  }
}

function updateSockRockWeapon(dt) {
  const weapon = player.weapons.sockRock;

  if (weapon.timer === undefined) {
    weapon.timer = 0;
  }

  weapon.timer -= dt;

  if (weapon.timer <= 0) {
    useSockRock();
    weapon.timer = weapon.cooldown;
  }
}
