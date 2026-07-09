const levelUpPanel = document.getElementById("levelUpPanel");
const upgradeOptions = document.getElementById("upgradeOptions");

function gainXP(amount) {
  player.xp += Math.ceil(amount * (player.xpMultiplier || 1));

  while (player.xp >= player.xpToNext) {
    player.xp -= player.xpToNext;
    player.level += 1;

    checkAchievements();
    saveGameData(saveData);

    player.xpToNext = Math.floor(player.xpToNext * 1.35);
    openLevelUpPanel();
  }
}

function openLevelUpPanel() {
  gamePaused = true;
  levelUpPanel.classList.remove("hidden");
  upgradeOptions.innerHTML = "";

  const options = getRandomUpgrades(3);

  for (const upgrade of options) {
    const card = document.createElement("button");
    card.className = "upgrade-card";

    card.innerHTML = `
      <h3>${upgrade.name}</h3>
      <p>${upgrade.description}</p>
    `;

    card.addEventListener("click", () => {
  upgrade.apply();
  registerWeaponUpgrade(upgrade.weaponId, upgrade.id, upgrade.unique === true);
  closeLevelUpPanel();
});

    upgradeOptions.appendChild(card);
  }
}

function closeLevelUpPanel() {
  levelUpPanel.classList.add("hidden");
  gamePaused = false;
}
