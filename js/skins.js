const SkinDatabase = {
  default: {
    id: "default",
    name: "Randes",
    description: "La skin inicial del jugador.",
    sprite: () => Assets.player.default,
    unlockText: "Disponible desde el inicio."
  },

  skin1: {
    id: "skin1",
    name: "Randes princesa",
    description: "Randes vestido como la princesa Peach, ¿qué mas quieres?.",
    sprite: () => Assets.player.skin1,
    unlockText: "Derrota al Slime de Fuego Gigante."
  },
  skin2: {
    id: "skin2",
    name: "Randes Hoennita",
    description: "Randes preparado para explorar Hoenn, una vez más.",
    sprite: () => Assets.player.skin2,
    unlockText: "Derrota al Rhyhorn de la grieta."
},
  skin3: {
    id: "skin3",
    name: "Randes Claus",
    description: "Randes trae regalos, como piedras para los slimes.",
    sprite: () => Assets.player.skin3,
    unlockText: "Derrota al Rhyhorn de la grieta y a 10 mímicos."
},
  skin4: {
  id: "skin4",
  name: "Randes Prisionero",
  description: "Randes después de pasar demasiado tiempo encerrado.",
  sprite: () => Assets.player.skin4,
  unlockText: "Libera a 5 prisioneros."
},
  skin5: {
    id: "skin5",
    name: "Randes ninja",
    description: "Randes entrenó con los 5 Senseis y maestro se volvió.",
    sprite: () => Assets.player.skin5,
    unlockText: "Derrota a los 5 Senseis."
},
};

function getCurrentPlayerSprite() {
  const skinId = saveData.selectedSkin || "default";
  const skin = SkinDatabase[skinId] || SkinDatabase.default;

  return skin.sprite();
}

function getAvailableSkins() {
  return Object.values(SkinDatabase);
}

function isSkinUnlocked(id) {
  return saveData.unlockedSkins.includes(id);
}
