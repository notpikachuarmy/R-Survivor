const RiftDatabase = {
  rhyhorn: {
    id: "rhyhorn",
    name: "Grieta de Rhyhorn",
    bossId: "rhyhornBoss",
    sprite: () => Assets.world.magicCircle,
    width: 128,
    height: 128,
    collision: 60,
    summonTime: 3
  }
};

function isRiftCompleted(id) {
  return saveData.completedRifts[id] === true;
}

function completeRift(id) {
  saveData.completedRifts[id] = true;
  saveGameData(saveData);
}
