const SAVE_KEY = "survivorSave";

const DEFAULT_SAVE = {
  bestScore: 0,
  bestTime: 0,

  selectedSkin: "default",
  unlockedSkins: ["default"],

  achievements: {},

  completedRifts: {},

  stats: {
    totalSlimeKills: 0,
    totalFireSlimeGiantKills: 0,
    totalFireSlimeSmallKills: 0,
    totalSlimeGiantKills: 0,
    totalSlimeEliteKills: 0,
    totalChestsOpened: 0,
    totalAlioliPotatoesEaten: 0,
    totalHealingReceived: 0,
    totalMimicsKilled: 0,
    totalRhyhornBossKills: 0,
    totalRhyhornKills: 0,
    totalWatermelonVoltorbKills: 0,
    totalWatermelonElectrodeKills: 0,
    totalWatermelonTurretKills: 0,
    totalSenseisDefeated: 0,
    totalPrisonersRescued: 0,
    totalGoldSlimeKills: 0,
    totalGoldSlimeGiantKills: 0,
    totalPinkSlimeKills: 0,
    totalPinkSlimeGiantKills: 0,
    totalCloudSlimeKills: 0,
    totalCloudSlimeGiantKills: 0,
    totalChickensSummoned: 0,
    totalEnemiesKilledInRiver: 0,
  },

  senseis: {
  defeated: []
},

  scrolls: {
  life: false,
  combat: false,
  knowledge: false,
  speed: false,
  talent: false
},

  encyclopedia: {
    weapons: ["stone"],
    items: [],
    enemies: ["slime"],
    scrolls: [],
  },

  unlocks: {
    fireSlimeGiant: false,
    fireSlimeSmall: false,
    slimeGiant: false,
    notpikachuOrb: false,
    patataBoom: false,
    scaryMedkit: false,
    rhyhorn: false,
    pokeball: false,
    watermelonVoltorb: false,
    watermelonElectrode: false,
    turret: false,
    flabebe: false,
    chikoritaLeaf: false,
    delibird: false,
    bigBlackChestItems: false,
    skin5: false,
    soap: false,
    sockRock: false,
    skin4: false,
    goldPlort: false,
    goldSlimeGiant: false,
    pinkSlimeGiant: false,
    cloudSlime: false,
    cloudSlimeGiant: false,
    slimeJam: false,
    greenPlort: false,
    firePlort: false,
    chicken: false,
    cursor: false,
    rooster: false,
    laprasFloat: false,
  }
};

function loadSave() {
  const saved = JSON.parse(localStorage.getItem(SAVE_KEY));

  if (!saved) {
    return structuredClone(DEFAULT_SAVE);
  }

  return mergeSave(DEFAULT_SAVE, saved);
}

function mergeSave(defaultData, savedData) {
  const result = structuredClone(defaultData);

  for (const key in savedData) {
    if (
      savedData[key] &&
      typeof savedData[key] === "object" &&
      !Array.isArray(savedData[key])
    ) {
      result[key] = {
        ...result[key],
        ...savedData[key]
      };
    } else {
      result[key] = savedData[key];
    }
  }

  return result;
}

function saveGameData(data) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function unlockEncyclopedia(category, id) {
  if (!saveData.encyclopedia[category]) return;

  if (!saveData.encyclopedia[category].includes(id)) {
    saveData.encyclopedia[category].push(id);
    saveGameData(saveData);
  }
}

function unlockSkin(id) {
  if (!saveData.unlockedSkins.includes(id)) {
    saveData.unlockedSkins.push(id);
    saveGameData(saveData);
  }
}

function selectSkin(id) {
  if (!saveData.unlockedSkins.includes(id)) return false;

  saveData.selectedSkin = id;
  saveGameData(saveData);
  return true;
}
