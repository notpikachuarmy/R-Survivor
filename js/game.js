
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");
const starterWeaponButton = document.getElementById("starterWeaponButton");
const skinsButton = document.getElementById("skinsButton");
const encyclopediaButton = document.getElementById("encyclopediaButton");
const achievementsButton = document.getElementById("achievementsButton");

const starterWeaponPanel = document.getElementById("starterWeaponPanel");
const starterWeaponContent = document.getElementById("starterWeaponContent");
const closeStarterWeaponButton = document.getElementById("closeStarterWeaponButton");

const skinsPanel = document.getElementById("skinsPanel");
const skinsList = document.getElementById("skinsList");
const closeSkinsButton = document.getElementById("closeSkinsButton");

const encyclopediaPanel = document.getElementById("encyclopediaPanel");
const closeEncyclopediaButton = document.getElementById("closeEncyclopediaButton");
const achievementsPanel = document.getElementById("achievementsPanel");
const achievementsContent = document.getElementById("achievementsContent");
const closeAchievementsButton = document.getElementById("closeAchievementsButton");
const pausePanel = document.getElementById("pausePanel");
const pauseBuildContent = document.getElementById("pauseBuildContent");
const resumeButton = document.getElementById("resumeButton");
const giveUpButton = document.getElementById("giveUpButton");
const devSavePanel = document.getElementById("devSavePanel");
const devSaveContent = document.getElementById("devSaveContent");
const closeDevSaveButton = document.getElementById("closeDevSaveButton");

const bestScoreText = document.getElementById("bestScoreText");
const bestTimeText = document.getElementById("bestTimeText");
const ui = document.getElementById("ui");

const blackChestPanel = document.getElementById("blackChestPanel");
const blackChestOptions = document.getElementById("blackChestOptions");

const timeText = document.getElementById("timeText");
const killsText = document.getElementById("killsText");
const scoreText = document.getElementById("scoreText");
const levelText = document.getElementById("levelText");
const xpText = document.getElementById("xpText");
const xpNeedText = document.getElementById("xpNeedText");

const gameOverPanel = document.getElementById("gameOver");
const finalTime = document.getElementById("finalTime");
const finalKills = document.getElementById("finalKills");
const finalScore = document.getElementById("finalScore");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const saveData = loadSave();

const keys = {};

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "escape") {
    if (closeTopMenuPanel()) return;
    if (gameStarted && !gameOver) {
      togglePause();
      return;
    }
  }

  if (key === "f8") {
    e.preventDefault();
    toggleDevSavePanel();
    return;
  }

  keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

const player = {
  x: 0,
  y: 0,
  size: 64,
  collision: 22,
  speed: 260,
  life: 100,
  maxLife: 100,
  facing: "right",
  invulnerableTimer: 0,

  scaryMedkitActive: false,
  evioliteActive: false,
  runningShoesActive: false,
  drillActive: false,
  leaderBadgeActive: false,
  soapActive: false,
  slimeJamActive: false,
  greenPlortActive: false,

  firePlortActive: false,
  burnChance: 0,
  burnDamage: 1,
  burnDuration: 5,
  burnTickRate: 1,
  burnState: null,

  chickenActive: false,
  chickenMax: 0,
  chickenLife: 30,
  chickenAttractRange: 260,
  chickenSpawnRadius: 110,
  chickenCooldown: 12,
  chickenTimer: 0,
  chickenGiantChance: 0,

  roosterActive: false,
  roosterMax: 0,
  roosterLife: 45,
  roosterDamage: 8,
  roosterSpeed: 170,
  roosterRespawnCooldown: 5,
  roosterGiantUnlocked: false,
  roosterSlimeUnlocked: false,
  
  pokeballActive: false,
  maxAllies: 0,
  allyDamageMultiplier: 1,
  allyLifeMultiplier: 1,
  allySpeedMultiplier: 1,
  
  level: 1,
  xp: 0,
  xpToNext: 10,

  uniqueUpgrades: {},

  weaponUpgradeCounts: {},
  weapons: {}
};

let enemies = [];
let projectiles = [];
let senseiStatues = [];
let senseiSpawnTimer = 60;
let prisonerCages = [];
let rescuedPrisoners = [];
let prisonerCageSpawnTimer = 90;
let enemyProjectiles = [];
let allyProjectiles = [];
let patataBoomMines = [];
let watermelonTurrets = [];
let chickens = [];
let roosters = [];
let explosions = [];
let rockSpikes = [];
let electricBites = [];
let watermelonExplosions = [];
let sockSwings = [];
let mouseCursors = [];
let senseiSlashes = [];
let senseiPillars = [];
let senseiEffects = [];
let mouseClickEffects = [];
let senseiDebuffZones = [];
let chests = [];
let drops = [];
let bags = [];
let blackChests = [];
let activeRifts = [];

let gameStarted = false;
let gamePaused = false;
let gameTime = 0;
let spawnTimer = 0;
let bossSpawnTimer = 25;
let mimicSpawnTimer = 120;
let rhyhornSpawnTimer = 300;
// let shootTimer = 0;
let hordeTimer = 300;
let hordeDuration = 0;
let hordeActive = false;
let kills = 0;
let score = 0;
let gameOver = false;
let lastTime = performance.now();
let selectedStarterWeaponId = localStorage.getItem("survivorsStarterWeapon") || "stone";


const camera = {
  x: 0,
  y: 0
};

checkAchievements();
saveGameData(saveData);
bestScoreText.textContent = saveData.bestScore;
bestTimeText.textContent = formatTime(saveData.bestTime);

playButton.addEventListener("click", startGame);

starterWeaponButton.addEventListener("click", () => {
  renderStarterWeaponMenu();
  starterWeaponPanel.classList.remove("hidden");
});

closeStarterWeaponButton.addEventListener("click", () => {
  starterWeaponPanel.classList.add("hidden");
});

skinsButton.addEventListener("click", () => {
  renderSkinsMenu();
  skinsPanel.classList.remove("hidden");
});

closeSkinsButton.addEventListener("click", () => {
  skinsPanel.classList.add("hidden");
});

encyclopediaButton.addEventListener("click", () => {
  checkAchievements();
  saveGameData(saveData);
  renderEncyclopedia();
  encyclopediaPanel.classList.remove("hidden");
});

closeEncyclopediaButton.addEventListener("click", () => {
  encyclopediaPanel.classList.add("hidden");
});

achievementsButton.addEventListener("click", () => {
  checkAchievements();
  saveGameData(saveData);
  renderAchievements();
  achievementsPanel.classList.remove("hidden");
});

closeAchievementsButton.addEventListener("click", () => {
  achievementsPanel.classList.add("hidden");
});

resumeButton.addEventListener("click", () => {
  togglePause(false);
});

giveUpButton.addEventListener("click", () => {
  togglePause(false);
  player.life = 0;
  endGame();
});

if (closeDevSaveButton) {
  closeDevSaveButton.addEventListener("click", () => {
    devSavePanel.classList.add("hidden");
  });
}

function closeTopMenuPanel() {
  const panels = [devSavePanel, starterWeaponPanel, skinsPanel, encyclopediaPanel, achievementsPanel];
  for (const panel of panels) {
    if (panel && !panel.classList.contains("hidden")) {
      panel.classList.add("hidden");
      return true;
    }
  }
  return false;
}

function toggleDevSavePanel() {
  if (!devSavePanel) return;
  if (devSavePanel.classList.contains("hidden")) {
    renderDevSavePanel();
    devSavePanel.classList.remove("hidden");
  } else {
    devSavePanel.classList.add("hidden");
  }
}


function devArray(value) {
  return Array.isArray(value) ? value : [];
}

function getDevSenseiIds() {
  return Object.keys(typeof SenseiDatabase !== "undefined" ? SenseiDatabase : {});
}

function getDevRiftIds() {
  return Object.keys(typeof RiftDatabase !== "undefined" ? RiftDatabase : {});
}

function getDevWeaponIds() {
  if (typeof WeaponRegistry !== "undefined") return Object.keys(WeaponRegistry);
  return Object.keys(saveData.unlocks || {});
}

function ensureDevSaveShape() {
  saveData.unlocks ||= {};
  saveData.stats ||= {};
  saveData.achievements ||= {};
  saveData.completedRifts ||= {};
  saveData.senseis ||= { defeated: [] };
  saveData.senseis.defeated = devArray(saveData.senseis.defeated);
  saveData.scrolls ||= { life: false, combat: false, knowledge: false, speed: false, talent: false };
  saveData.unlockedSkins ||= ["default"];
  saveData.encyclopedia ||= { weapons: ["stone"], items: [], enemies: ["slime"], scrolls: [] };
}

function renderDevSavePanel(activeTab = "resumen") {
  if (!devSaveContent) return;
  ensureDevSaveShape();

  const tabs = [
    ["resumen", "Resumen"],
    ["stats", "Stats"],
    ["logros", "Logros"],
    ["senseis", "Senseis"],
    ["grietas", "Grietas"],
    ["desbloqueos", "Desbloqueos"],
    ["run", "Run"]
  ];

  const statKeys = Object.keys(saveData.stats || {}).sort();
  const achievementEntries = Object.values(AchievementDatabase || {}).sort((a, b) => a.name.localeCompare(b.name));
  const senseiEntries = getDevSenseiIds().map(id => SenseiDatabase[id]);
  const riftEntries = getDevRiftIds().map(id => RiftDatabase[id]);
  const skinEntries = Object.values(SkinDatabase || {}).sort((a, b) => a.name.localeCompare(b.name));
  const weaponEntries = getDevWeaponIds().map(id => getWeaponDefinition ? getWeaponDefinition(id) : null).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
  const unlockKeys = Object.keys(saveData.unlocks || {}).sort();

  const tabButtons = tabs.map(([id, label]) => `
    <button class="dev-tab-button ${activeTab === id ? "active" : ""}" data-dev-tab="${id}">${label}</button>
  `).join("");

  let body = "";

  if (activeTab === "resumen") {
    const completedAchievements = achievementEntries.filter(a => saveData.achievements[a.id]).length;
    const completedSenseis = senseiEntries.filter(s => saveData.senseis.defeated.includes(s.id)).length;
    const completedRifts = riftEntries.filter(r => saveData.completedRifts[r.id]).length;
    body = `
      <section class="dev-save-section">
        <h3>Acciones globales</h3>
        <div class="dev-save-actions">
          <button id="devCompleteEverythingButton">Completar todo de verdad</button>
          <button id="devUnlockOnlyButton">Sólo marcar desbloqueos</button>
          <button id="devCompleteEncyclopediaButton">Completar enciclopedia</button>
          <button id="devSaveApplyButton">Guardar cambios</button>
          <button id="devSaveResetButton">Reset save</button>
        </div>
        <p class="dev-help">"Completar todo" sube stats, marca grietas, derrota senseis, entrega pergaminos, desbloquea skins y ejecuta recompensas de logros.</p>
      </section>
      <section class="dev-save-section">
        <h3>Estado actual</h3>
        <div class="dev-stat-list">
          <label><span>Logros completados</span><strong>${completedAchievements} / ${achievementEntries.length}</strong></label>
          <label><span>Senseis completados</span><strong>${completedSenseis} / ${senseiEntries.length}</strong></label>
          <label><span>Grietas completadas</span><strong>${completedRifts} / ${riftEntries.length}</strong></label>
          <label><span>Skins desbloqueadas</span><strong>${saveData.unlockedSkins.length} / ${skinEntries.length}</strong></label>
          <label><span>Récord</span><input type="number" data-dev-number="bestScore" value="${saveData.bestScore || 0}"></label>
          <label><span>Mejor tiempo</span><input type="number" data-dev-number="bestTime" value="${Math.round(saveData.bestTime || 0)}"></label>
          <label><span>Monedas</span><input type="number" data-dev-number="coins" value="${saveData.coins || 0}"></label>
        </div>
      </section>
    `;
  }

  if (activeTab === "stats") {
    body = `
      <section class="dev-save-section">
        <h3>Stats editables</h3>
        <div class="dev-save-actions">
          <button id="devMaxStatsButton">Poner stats de test</button>
          <button id="devZeroStatsButton">Stats a 0</button>
          <button id="devSaveApplyButton">Guardar cambios</button>
        </div>
        <div class="dev-stat-list">
          ${statKeys.map(key => `
            <label><span>${key}</span><input type="number" data-dev-stat="${key}" value="${saveData.stats[key] || 0}"></label>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (activeTab === "logros") {
    body = `
      <section class="dev-save-section">
        <h3>Logros</h3>
        <div class="dev-save-actions">
          <button id="devCompleteAchievementsButton">Completar todos</button>
          <button id="devResetAchievementsButton">Resetear logros</button>
        </div>
        <div class="dev-check-list">
          ${achievementEntries.map(a => `
            <label title="${a.reward || ""}"><input type="checkbox" data-dev-achievement="${a.id}" ${saveData.achievements[a.id] ? "checked" : ""}> <span>${a.name}</span><small>${a.description}</small></label>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (activeTab === "senseis") {
    body = `
      <section class="dev-save-section">
        <h3>Senseis y pergaminos</h3>
        <div class="dev-save-actions">
          <button id="devCompleteSenseisButton">Completar todos</button>
          <button id="devResetSenseisButton">Resetear senseis</button>
        </div>
        <div class="dev-check-list">
          ${senseiEntries.map(sensei => `
            <label><input type="checkbox" data-dev-sensei="${sensei.id}" ${saveData.senseis.defeated.includes(sensei.id) ? "checked" : ""}> <span>${sensei.name}</span><small>Pergamino: ${ScrollDatabase[sensei.id]?.name || sensei.id}</small></label>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (activeTab === "grietas") {
    body = `
      <section class="dev-save-section">
        <h3>Grietas</h3>
        <div class="dev-save-actions">
          <button id="devCompleteRiftsButton">Completar todas</button>
          <button id="devResetRiftsButton">Resetear grietas</button>
        </div>
        <div class="dev-check-list">
          ${riftEntries.map(rift => `
            <label><input type="checkbox" data-dev-rift="${rift.id}" ${saveData.completedRifts[rift.id] ? "checked" : ""}> <span>${rift.name}</span><small>Boss: ${rift.bossId}</small></label>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (activeTab === "desbloqueos") {
    body = `
      <section class="dev-save-section">
        <h3>Skins</h3>
        <div class="dev-save-actions"><button id="devUnlockSkinsButton">Desbloquear skins</button><button id="devResetSkinsButton">Reset skins</button></div>
        <div class="dev-check-list compact">
          ${skinEntries.map(skin => `
            <label><input type="checkbox" data-dev-skin="${skin.id}" ${saveData.unlockedSkins.includes(skin.id) ? "checked" : ""}> <span>${skin.name}</span><small>${skin.id}</small></label>
          `).join("")}
        </div>
      </section>
      <section class="dev-save-section">
        <h3>Armas iniciales registradas</h3>
        <div class="dev-check-list compact">
          ${weaponEntries.map(w => `
            <label><input type="checkbox" data-dev-weapon="${w.id}" ${isWeaponUnlocked(w.id) ? "checked" : ""} ${!w.unlockKey ? "disabled" : ""}> <span>${w.name}</span><small>${w.unlockKey || "base"}${w.canStart ? " · inicial" : ""}</small></label>
          `).join("")}
        </div>
      </section>
      <section class="dev-save-section">
        <h3>Unlock flags crudos</h3>
        <div class="dev-check-list compact">
          ${unlockKeys.map(key => `
            <label><input type="checkbox" data-dev-unlock="${key}" ${saveData.unlocks[key] ? "checked" : ""}> <span>${key}</span></label>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (activeTab === "run") {
    body = `
      <section class="dev-save-section">
        <h3>Herramientas de partida</h3>
        <p class="dev-help">Funcionan durante una run. Si estás en menú, simplemente guardan lo permanente.</p>
        <div class="dev-save-actions">
          <button id="devGiveLevelButton">+10 niveles</button>
          <button id="devGiveCoinsButton">+999 monedas</button>
          <button id="devHealButton">Curar jugador</button>
          <button id="devKillEnemiesButton">Eliminar enemigos actuales</button>
          <button id="devLearnWeaponsButton">Aprender armas desbloqueadas</button>
        </div>
      </section>
    `;
  }

  devSaveContent.innerHTML = `<div class="dev-tabs">${tabButtons}</div>${body}`;

  document.querySelectorAll("[data-dev-tab]").forEach(button => {
    button.addEventListener("click", () => renderDevSavePanel(button.dataset.devTab));
  });

  wireDevInputs(activeTab);
}

function wireDevInputs(activeTab) {
  document.querySelectorAll("[data-dev-unlock]").forEach(input => {
    input.addEventListener("change", () => {
      saveData.unlocks[input.dataset.devUnlock] = input.checked;
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.querySelectorAll("[data-dev-weapon]").forEach(input => {
    input.addEventListener("change", () => {
      const weapon = getWeaponDefinition(input.dataset.devWeapon);
      if (weapon?.unlockKey) saveData.unlocks[weapon.unlockKey] = input.checked;
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.querySelectorAll("[data-dev-skin]").forEach(input => {
    input.addEventListener("change", () => {
      setDevSkinUnlocked(input.dataset.devSkin, input.checked);
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.querySelectorAll("[data-dev-achievement]").forEach(input => {
    input.addEventListener("change", () => {
      setDevAchievement(input.dataset.devAchievement, input.checked);
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.querySelectorAll("[data-dev-sensei]").forEach(input => {
    input.addEventListener("change", () => {
      setDevSenseiCompleted(input.dataset.devSensei, input.checked);
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.querySelectorAll("[data-dev-rift]").forEach(input => {
    input.addEventListener("change", () => {
      setDevRiftCompleted(input.dataset.devRift, input.checked);
      applyDevSaveChanges(false);
      renderDevSavePanel(activeTab);
    });
  });

  document.getElementById("devSaveApplyButton")?.addEventListener("click", () => applyDevSaveChanges(true));
  document.getElementById("devCompleteEverythingButton")?.addEventListener("click", () => { completeDevEverything(); renderDevSavePanel(activeTab); });
  document.getElementById("devUnlockOnlyButton")?.addEventListener("click", () => { devUnlockAllFlags(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devCompleteEncyclopediaButton")?.addEventListener("click", () => { completeDevEncyclopedia(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devMaxStatsButton")?.addEventListener("click", () => { setDevStatsToCompletionValues(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devZeroStatsButton")?.addEventListener("click", () => { Object.keys(saveData.stats || {}).forEach(k => saveData.stats[k] = 0); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devCompleteAchievementsButton")?.addEventListener("click", () => { completeDevAchievements(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devResetAchievementsButton")?.addEventListener("click", () => { saveData.achievements = {}; applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devCompleteSenseisButton")?.addEventListener("click", () => { completeDevSenseis(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devResetSenseisButton")?.addEventListener("click", () => { resetDevSenseis(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devCompleteRiftsButton")?.addEventListener("click", () => { completeDevRifts(); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devResetRiftsButton")?.addEventListener("click", () => { saveData.completedRifts = {}; applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devUnlockSkinsButton")?.addEventListener("click", () => { Object.keys(SkinDatabase).forEach(id => setDevSkinUnlocked(id, true)); applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devResetSkinsButton")?.addEventListener("click", () => { saveData.unlockedSkins = ["default"]; saveData.selectedSkin = "default"; applyDevSaveChanges(true); renderDevSavePanel(activeTab); });

  document.getElementById("devSaveResetButton")?.addEventListener("click", () => {
    if (!confirm("¿Resetear el save entero?")) return;
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  });

  document.getElementById("devGiveLevelButton")?.addEventListener("click", () => {
    if (gameStarted && !gameOver) {
      player.level += 10;
      player.xp = 0;
      player.xpToNext = Math.max(10, player.xpToNext);
      levelText.textContent = player.level;
    }
  });
  document.getElementById("devGiveCoinsButton")?.addEventListener("click", () => { saveData.coins = (saveData.coins || 0) + 999; applyDevSaveChanges(true); renderDevSavePanel(activeTab); });
  document.getElementById("devHealButton")?.addEventListener("click", () => { if (gameStarted && !gameOver) player.life = player.maxLife; });
  document.getElementById("devKillEnemiesButton")?.addEventListener("click", () => { if (gameStarted && !gameOver) enemies = []; });
  document.getElementById("devLearnWeaponsButton")?.addEventListener("click", () => { if (gameStarted && !gameOver) learnDevUnlockedWeapons(); });
}

function applyDevSaveChanges(showAlert = true) {
  ensureDevSaveShape();
  document.querySelectorAll("[data-dev-number]").forEach(input => {
    saveData[input.dataset.devNumber] = Number(input.value) || 0;
  });
  document.querySelectorAll("[data-dev-stat]").forEach(input => {
    saveData.stats[input.dataset.devStat] = Number(input.value) || 0;
  });
  checkAchievements();
  saveGameData(saveData);
  bestScoreText.textContent = saveData.bestScore || 0;
  bestTimeText.textContent = formatTime(saveData.bestTime || 0);
  renderStarterWeaponMenu();
  if (showAlert) alert("Save actualizado");
}

function setDevStatsToCompletionValues() {
  ensureDevSaveShape();
  const values = {
    totalSlimeKills: 1000,
    totalFireSlimeGiantKills: 100,
    totalFireSlimeSmallKills: 100,
    totalSlimeGiantKills: 50,
    totalSlimeEliteKills: 50,
    totalChestsOpened: 100,
    totalAlioliPotatoesEaten: 10,
    totalHealingReceived: 1000,
    totalMimicsKilled: 10,
    totalRhyhornBossKills: 1,
    totalRhyhornKills: 25,
    totalWatermelonVoltorbKills: 100,
    totalWatermelonElectrodeKills: 100,
    totalWatermelonTurretKills: 100,
    totalSenseisDefeated: 5,
    totalPrisonersRescued: 15,
    totalGoldSlimeKills: 10,
    totalChickensSummoned: 50
  };
  for (const [key, value] of Object.entries(values)) {
    saveData.stats[key] = Math.max(Number(saveData.stats[key] || 0), value);
  }
  if (player) player.level = Math.max(player.level || 1, 10);
}

function completeDevAchievements() {
  ensureDevSaveShape();
  setDevStatsToCompletionValues();
  for (const achievement of Object.values(AchievementDatabase || {})) {
    if (!saveData.achievements[achievement.id]) {
      saveData.achievements[achievement.id] = true;
    }
    if (typeof achievement.unlock === "function") achievement.unlock();
  }
}

function setDevAchievement(id, completed) {
  ensureDevSaveShape();
  const achievement = AchievementDatabase[id];
  if (!achievement) return;
  saveData.achievements[id] = completed;
  if (completed && typeof achievement.unlock === "function") achievement.unlock();
}

function completeDevSenseis() {
  ensureDevSaveShape();
  for (const id of getDevSenseiIds()) setDevSenseiCompleted(id, true);
  saveData.stats.totalSenseisDefeated = Math.max(saveData.stats.totalSenseisDefeated || 0, getDevSenseiIds().length);
}

function setDevSenseiCompleted(id, completed) {
  ensureDevSaveShape();
  const defeated = new Set(saveData.senseis.defeated);
  if (completed) {
    defeated.add(id);
    unlockScroll(id);
  } else {
    defeated.delete(id);
    if (saveData.scrolls) saveData.scrolls[id] = false;
    const scrolls = saveData.encyclopedia?.scrolls;
    if (Array.isArray(scrolls)) saveData.encyclopedia.scrolls = scrolls.filter(scrollId => scrollId !== id);
  }
  saveData.senseis.defeated = [...defeated];
  saveData.stats.totalSenseisDefeated = saveData.senseis.defeated.length;
  applyPermanentScrollBonuses();
}

function resetDevSenseis() {
  ensureDevSaveShape();
  saveData.senseis.defeated = [];
  saveData.stats.totalSenseisDefeated = 0;
  for (const id of Object.keys(saveData.scrolls || {})) saveData.scrolls[id] = false;
  if (saveData.encyclopedia?.scrolls) saveData.encyclopedia.scrolls = [];
}

function completeDevRifts() {
  ensureDevSaveShape();
  for (const id of getDevRiftIds()) setDevRiftCompleted(id, true);
  saveData.stats.totalRhyhornBossKills = Math.max(saveData.stats.totalRhyhornBossKills || 0, 1);
}

function setDevRiftCompleted(id, completed) {
  ensureDevSaveShape();
  saveData.completedRifts[id] = completed;
}

function setDevSkinUnlocked(id, unlocked) {
  ensureDevSaveShape();
  const set = new Set(saveData.unlockedSkins || ["default"]);
  if (unlocked) set.add(id);
  else if (id !== "default") set.delete(id);
  set.add("default");
  saveData.unlockedSkins = [...set];
  if (!saveData.unlockedSkins.includes(saveData.selectedSkin)) saveData.selectedSkin = "default";
}

function devUnlockAllFlags() {
  ensureDevSaveShape();
  for (const key of Object.keys(saveData.unlocks || {})) saveData.unlocks[key] = true;
  for (const weapon of Object.values(WeaponRegistry || {})) {
    if (weapon.unlockKey) saveData.unlocks[weapon.unlockKey] = true;
    if (weapon.encyclopedia) unlockEncyclopedia("weapons", weapon.id);
  }
}

function completeDevEncyclopedia() {
  ensureDevSaveShape();

  const database = typeof EncyclopediaDatabase !== "undefined" ? EncyclopediaDatabase : {};
  for (const [category, entries] of Object.entries(database)) {
    if (!saveData.encyclopedia[category]) saveData.encyclopedia[category] = [];
    for (const id of Object.keys(entries || {})) {
      if (!saveData.encyclopedia[category].includes(id)) {
        saveData.encyclopedia[category].push(id);
      }
    }
  }

  // También cubre contenido registrado fuera de la enciclopedia clásica.
  if (typeof WeaponRegistry !== "undefined") {
    saveData.encyclopedia.weapons ||= [];
    for (const weapon of Object.values(WeaponRegistry)) {
      if (weapon.encyclopedia !== false && !saveData.encyclopedia.weapons.includes(weapon.id)) {
        saveData.encyclopedia.weapons.push(weapon.id);
      }
    }
  }

  if (typeof EnemyDatabase !== "undefined") {
    saveData.encyclopedia.enemies ||= [];
    for (const enemy of Object.values(EnemyDatabase)) {
      if (enemy.id && !saveData.encyclopedia.enemies.includes(enemy.id)) {
        saveData.encyclopedia.enemies.push(enemy.id);
      }
    }
  }

  if (typeof ScrollDatabase !== "undefined") {
    saveData.encyclopedia.scrolls ||= [];
    for (const scroll of Object.values(ScrollDatabase)) {
      if (scroll.id && !saveData.encyclopedia.scrolls.includes(scroll.id)) {
        saveData.encyclopedia.scrolls.push(scroll.id);
      }
    }
  }
}

function completeDevEverything() {
  ensureDevSaveShape();
  setDevStatsToCompletionValues();
  completeDevRifts();
  completeDevSenseis();
  devUnlockAllFlags();
  completeDevEncyclopedia();
  Object.keys(SkinDatabase || {}).forEach(id => setDevSkinUnlocked(id, true));
  completeDevAchievements();
  saveGameData(saveData);
  checkAchievements();
  bestScoreText.textContent = saveData.bestScore || 0;
  bestTimeText.textContent = formatTime(saveData.bestTime || 0);
  renderStarterWeaponMenu();
  applyPermanentScrollBonuses();
  alert("Todo completado para pruebas");
}

function learnDevUnlockedWeapons() {
  for (const weapon of Object.values(WeaponRegistry || {})) {
    if (isWeaponUnlocked(weapon.id)) applyWeaponDefinition(weapon.id);
  }
}

function applyPermanentScrollBonuses() {
  if (!player || !saveData?.scrolls) return;
  player._appliedScrollBonuses ||= {};

  if (saveData.scrolls.life && !player._appliedScrollBonuses.life) {
    player.maxLife += 100;
    player.life = Math.min(player.maxLife, (player.life || 0) + 100);
    player._appliedScrollBonuses.life = true;
  }

  if (saveData.scrolls.combat && !player._appliedScrollBonuses.combat) {
    player.baseDamageBonus = (player.baseDamageBonus || 0) + 3;
    player._appliedScrollBonuses.combat = true;
  }

  if (saveData.scrolls.knowledge && !player._appliedScrollBonuses.knowledge) {
    player.xpMultiplier = (player.xpMultiplier || 1) * 1.05;
    player._appliedScrollBonuses.knowledge = true;
  }

  if (saveData.scrolls.speed && !player._appliedScrollBonuses.speed) {
    player.speed *= 1.05;
    player._appliedScrollBonuses.speed = true;
  }

  if (saveData.scrolls.talent && !player._appliedScrollBonuses.talent) {
    player.freeStartingUpgrade = true;
    player._appliedScrollBonuses.talent = true;
  }
}


function startGame() {
  gameStarted = true;
  gamePaused = false;
  resetPlayerForNewRun();
  mainMenu.classList.add("hidden");
  ui.classList.remove("hidden");
  resetWorld();
  watermelonTurrets = [];
  chickens = [];
  roosters = [];
  senseiStatues = [];
  prisonerCages = [];
  rescuedPrisoners = [];
  senseiPillars = [];
  sockSwings = [];
  mouseCursors = [];
  mouseClickEffects = [];
  senseiSlashes = [];
  senseiEffects = [];
  senseiDebuffZones = [];
  senseiSpawnTimer = 60;
  prisonerCageSpawnTimer = 90;
  rhyhornSpawnTimer = 300;
  applyStarterWeapon();
  applyPermanentScrollBonuses();
    if (player.freeStartingUpgrade) {
      openLevelUpPanel();
    }
  startMusic();

  spawnRift("rhyhorn");
}

function resetPlayerForNewRun() {
  player.x = 0;
  player.y = 0;

  player.speed = 260;
  player.life = 100;
  player.maxLife = 100;
  player.facing = "right";
  player.invulnerableTimer = 0;

  player.scaryMedkitActive = false;
  player.evioliteActive = false;
  player.runningShoesActive = false;
  player.drillActive = false;
  player.leaderBadgeActive = false;
  player.soapActive = false;
  player.slimeJamActive = false;
  player.greenPlortActive = false;

  player.firePlortActive = false;
  player.burnChance = 0;
  player.burnDamage = 1;
  player.burnDuration = 5;
  player.burnTickRate = 1;
  player.burnState = null;

  player.chickenActive = false;
  player.chickenMax = 0;
  player.chickenLife = 30;
  player.chickenAttractRange = 260;
  player.chickenSpawnRadius = 110;
  player.chickenCooldown = 12;
  player.chickenTimer = 0;
  player.chickenGiantChance = 0;

  player.roosterActive = false;
  player.roosterMax = 0;
  player.roosterLife = 45;
  player.roosterDamage = 8;
  player.roosterSpeed = 170;
  player.roosterRespawnCooldown = 5;
  player.roosterGiantUnlocked = false;
  player.roosterSlimeUnlocked = false;

  player.pokeballActive = false;
  player.maxAllies = 0;
  player.allyDamageMultiplier = 1;
  player.allyLifeMultiplier = 1;
  player.allySpeedMultiplier = 1;

  player.level = 1;
  player.xp = 0;
  player.xpToNext = 10;

  player.baseDamageBonus = 0;
  player.xpMultiplier = 1;
  player.freeStartingUpgrade = false;
  player._appliedScrollBonuses = {};

  player.uniqueUpgrades = {};
  
  player.weaponUpgradeCounts = {};

  player.weapons = {};
  applyWeaponDefinition("stone");
}


// getStarterWeaponOptions vive ahora en js/registry.js para que el menú sea data-driven.

function renderStarterWeaponMenu() {
  starterWeaponContent.innerHTML = "";

  const unlockedWeapons = getStarterWeaponOptions().filter(weapon => weapon.unlocked);
  if (!unlockedWeapons.some(weapon => weapon.id === selectedStarterWeaponId)) {
    selectedStarterWeaponId = "stone";
    localStorage.setItem("survivorsStarterWeapon", selectedStarterWeaponId);
  }

  for (const weapon of unlockedWeapons) {
    const card = document.createElement("div");
    card.className = "starter-weapon-card" + (selectedStarterWeaponId === weapon.id ? " selected" : "") + (weapon.unlocked ? "" : " locked");

    const sprite = weapon.sprite();
    card.innerHTML = `
      <img src="${sprite.src}" alt="${weapon.name}">
      <h3>${weapon.name}</h3>
      <p>${weapon.description}</p>
      <p><strong>${weapon.unlocked ? "Disponible" : "Bloqueada"}</strong></p>
    `;

    if (weapon.unlocked) {
      card.addEventListener("click", () => {
        selectedStarterWeaponId = weapon.id;
        localStorage.setItem("survivorsStarterWeapon", selectedStarterWeaponId);
        renderStarterWeaponMenu();
      });
    }

    starterWeaponContent.appendChild(card);
  }
}

function applyStarterWeapon() {
  const options = getStarterWeaponOptions().filter(weapon => weapon.unlocked);
  const selected = options.find(weapon => weapon.id === selectedStarterWeaponId) || options[0];

  player.weapons = {};
  selectedStarterWeaponId = selected?.id || "stone";
  localStorage.setItem("survivorsStarterWeapon", selectedStarterWeaponId);

  if (selected) {
    selected.apply();
  } else {
    applyWeaponDefinition("stone");
  }
}

function getWeaponDisplayName(id) {
  const registryName = typeof getWeaponDisplayNameFromRegistry === "function"
    ? getWeaponDisplayNameFromRegistry(id)
    : id;
  if (registryName !== id) return registryName;

  const chest = (typeof BLACK_CHEST_WEAPONS !== "undefined")
    ? BLACK_CHEST_WEAPONS.find(weapon => weapon.id === id)
    : null;

  return chest ? chest.name : id;
}

function formatStatValue(value) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : Math.round(value * 100) / 100;
  }
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return value;
}

function getWeaponStatRows(id, weapon) {
  const commonLabels = {
    damage: "Daño",
    projectiles: "Proyectiles",
    cooldown: "Cooldown",
    size: "Tamaño",
    speed: "Velocidad",
    lifeTime: "Duración",
    bounces: "Rebotes",
    pierce: "Perforación",
    specialChance: "Especial",
    specialDamage: "Daño especial",
    mines: "Minas",
    radius: "Radio",
    maxTurrets: "Torretas",
    duration: "Duración",
    fireCooldown: "Cadencia",
    leaves: "Hojas",
    range: "Rango",
    count: "Cantidad",
    clickRange: "Rango clic",
    moveSpeed: "Velocidad cursor",
    respawnCooldown: "Respawn"
  };

  const hidden = new Set(["tags", "slots", "timer", "shootTimer"]);
  const rows = [];

  for (const [key, label] of Object.entries(commonLabels)) {
    if (weapon[key] !== undefined) rows.push([label, formatStatValue(weapon[key])]);
  }

  if (id === "rooster") {
    rows.push(["Gallos", player.roosterMax]);
    rows.push(["Daño", player.roosterDamage]);
    rows.push(["Vida", player.roosterLife]);
    rows.push(["Velocidad", player.roosterSpeed]);
    rows.push(["Respawn", player.roosterRespawnCooldown]);
  }

  if (id === "chicken") {
    rows.push(["Gallinas", player.chickenMax]);
    rows.push(["Vida", player.chickenLife]);
    rows.push(["Atracción", player.chickenAttractRange]);
    rows.push(["Respawn", player.chickenCooldown]);
  }

  if (id === "pokeball") {
    rows.push(["Aliados", `${getAllies().length}/${player.maxAllies}`]);
    rows.push(["Daño aliado", `x${formatStatValue(player.allyDamageMultiplier)}`]);
    rows.push(["Vida aliado", `x${formatStatValue(player.allyLifeMultiplier)}`]);
    rows.push(["Velocidad aliado", `x${formatStatValue(player.allySpeedMultiplier)}`]);
  }

  for (const [key, value] of Object.entries(weapon)) {
    if (hidden.has(key) || commonLabels[key]) continue;
    if (["number", "boolean", "string"].includes(typeof value)) {
      rows.push([key, formatStatValue(value)]);
    }
  }

  return rows;
}

function buildStatList(rows) {
  return rows.length
    ? `<ul>${rows.map(([name, value]) => `<li><span>${name}</span><strong>${value}</strong></li>`).join("")}</ul>`
    : "<p>Sin stats visibles</p>";
}

function renderPauseBuildPanel() {
  if (!pauseBuildContent) return;

  const weapons = Object.entries(player.weapons || {});
  const items = [
    [player.scaryMedkitActive, "Botiquín Scary", [["Efecto", "Jefes pueden soltar botiquines"]]],
    [player.evioliteActive, "Mineral evolutivo", [["Efecto", "Reduce daño recibido"]]],
    [player.runningShoesActive, "Deportivas", [["Velocidad", Math.round(player.speed)] ]],
    [player.drillActive, "Taladro", [["Efecto", "Atraviesas rocas"]]],
    [player.leaderBadgeActive, "Distintivo de líder", [["Aliados/torretas", "+15% daño"]]],
    [player.soapActive, "Jabón", [["Efecto", "Puede esquivar daño"]]],
    [player.slimeJamActive, "Mermelada Slime", [["Contra slimes", "+3 daño"]]],
    [player.greenPlortActive, "Plort Verde", [["XP slime", "Aumentada"]]],
    [player.firePlortActive, "Plort de Fuego", [["Quemadura", `${Math.round(player.burnChance * 100)}%`], ["Daño", player.burnDamage], ["Duración", player.burnDuration]]]
  ].filter(item => item[0]);

  const weaponCards = weapons.map(([id, weapon]) => `
    <article class="build-detail-card">
      <h3>${getWeaponDisplayName(id)}</h3>
      ${buildStatList(getWeaponStatRows(id, weapon))}
      <p class="build-upgrade-count">Mejoras elegidas: ${(player.weaponUpgradeCounts || {})[id] || 0}</p>
    </article>
  `).join("") || "<p>Sin armas</p>";

  const itemCards = items.map(([, name, rows]) => `
    <article class="build-detail-card item-card">
      <h3>${name}</h3>
      ${buildStatList(rows)}
    </article>
  `).join("") || "<p>Sin items de run</p>";

  pauseBuildContent.innerHTML = `
    <section class="pause-build-section player-summary">
      <h3>Jugador</h3>
      <p>Vida: ${Math.ceil(player.life)} / ${player.maxLife}</p>
      <p>Nivel: ${player.level} · XP: ${player.xp}/${player.xpToNext}</p>
      <p>Velocidad: ${Math.round(player.speed)}</p>
    </section>
    <section class="pause-build-section wide">
      <h3>Armas</h3>
      <div class="build-card-grid">${weaponCards}</div>
    </section>
    <section class="pause-build-section wide">
      <h3>Items</h3>
      <div class="build-card-grid">${itemCards}</div>
    </section>
  `;
}
function togglePause(forceState = null) {
  if (!gameStarted || gameOver) return;

  gamePaused = forceState !== null ? forceState : !gamePaused;

  if (gamePaused) {
    renderPauseBuildPanel();
    pausePanel.classList.remove("hidden");
  } else {
    pausePanel.classList.add("hidden");
  }
}

function worldToScreenX(x) {
  return x - camera.x + canvas.width / 2;
}

function worldToScreenY(y) {
  return y - camera.y + canvas.height / 2;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function isCollidingWithSenseiPillar(entity) {
  for (const pillar of senseiPillars) {
    if (pillar.lifeTime <= 0) continue;

    if (
      distance(entity, pillar) <
      entity.collision + pillar.collision
    ) {
      return true;
    }
  }

  return false;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function isVisibleOnScreen(entity, margin = 80) {
  const sx = worldToScreenX(entity.x);
  const sy = worldToScreenY(entity.y);

  return (
    sx > -margin &&
    sx < canvas.width + margin &&
    sy > -margin &&
    sy < canvas.height + margin
  );
}

function renderSkinsMenu() {
  skinsList.innerHTML = "";

  for (const skin of getAvailableSkins()) {
    const unlocked = isSkinUnlocked(skin.id);
    const selected = saveData.selectedSkin === skin.id;

    const card = document.createElement("div");
    card.className = "skin-card" + (unlocked ? "" : " locked");

    card.innerHTML = `
      <img src="${skin.sprite().src}" alt="${skin.name}">
      <h3>${skin.name}</h3>
      <p>${skin.description}</p>
      <p>${unlocked ? "Desbloqueada" : skin.unlockText}</p>
      <button>${selected ? "Equipada" : unlocked ? "Equipar" : "Bloqueada"}</button>
    `;

    const button = card.querySelector("button");

    button.addEventListener("click", () => {
      if (!unlocked) return;

      selectSkin(skin.id);
      renderSkinsMenu();
    });

    skinsList.appendChild(card);
  }
}

function getNearestEnemyFromPoint(x, y, ignoredEnemies = []) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.isAlly) continue;
    if (ignoredEnemies.includes(enemy)) continue;

    const d = Math.hypot(enemy.x - x, enemy.y - y);

    if (d < nearestDist) {
      nearest = enemy;
      nearestDist = d;
    }
  }

  return nearest;
}

function getNearestEnemyInRangeFromPoint(x, y, range) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.isAlly) continue;

    const d = Math.hypot(enemy.x - x, enemy.y - y);

    if (d <= range && d < nearestDist) {
      nearest = enemy;
      nearestDist = d;
    }
  }

  return nearest;
}

function shootWatermelonSeedFromTurret(turret) {
  const target = getNearestEnemyInRangeFromPoint(
    turret.x,
    turret.y,
    turret.range
  );

  if (!target) return;

  const angle = Math.atan2(target.y - turret.y, target.x - turret.x);

  projectiles.push({
    id: "watermelonSeed",
    source: "watermelonSeedTurret",
    sourceTags: ["turret", "plant", "projectile"],

    x: turret.x,
    y: turret.y,

    size: 16,
    collision: 7,

    vx: Math.cos(angle) * turret.projectileSpeed,
    vy: Math.sin(angle) * turret.projectileSpeed,

    damage: turret.damage,
    lifeTime: 1.8,

    hitEnemies: [],
    bouncesLeft: 0,
    special: false
  });
}

function shootChikoritaLeaves() {
  const weapon = player.weapons.chikoritaLeaf;
  if (!weapon) return;

  for (let i = 0; i < weapon.leaves; i++) {
    const angle = Math.random() * Math.PI * 2;

    projectiles.push({
      id: "razorLeaf",
      source: "chikoritaLeaf",
      sourceTags: ["plant", "projectile"],

      x: player.x,
      y: player.y,

      size: weapon.size,
      collision: weapon.collision,

      vx: Math.cos(angle) * weapon.speed,
      vy: Math.sin(angle) * weapon.speed,

      damage: weapon.damage,
      lifeTime: weapon.lifeTime,

      pierceLeft: weapon.pierce,
      hitEnemies: [],

      bouncesLeft: 0,
      special: false
    });
  }
}

const SenseiDatabase = {
  life: {
    id: "life",
    enemyId: "senseiLife",
    name: "Sensei de la Vida",
    statueName: "Estatua del Sensei de la Vida",
    sprite: () => Assets.npc.senseiLife
  },

  combat: {
    id: "combat",
    enemyId: "senseiCombat",
    name: "Sensei del Combate",
    statueName: "Estatua del Sensei del Combate",
    sprite: () => Assets.npc.senseiCombat
  },

  knowledge: {
    id: "knowledge",
    enemyId: "senseiKnowledge",
    name: "Sensei del Conocimiento",
    statueName: "Estatua del Sensei del Conocimiento",
    sprite: () => Assets.npc.senseiKnowledge
  },

  speed: {
    id: "speed",
    enemyId: "senseiSpeed",
    name: "Sensei de la Velocidad",
    statueName: "Estatua del Sensei de la Velocidad",
    sprite: () => Assets.npc.senseiSpeed
  },

  talent: {
    id: "talent",
    enemyId: "senseiTalent",
    name: "Sensei del Talento",
    statueName: "Estatua del Sensei del Talento",
    sprite: () => Assets.npc.senseiTalent
  }
};

const ScrollDatabase = {
  life: {
    id: "life",
    name: "Pergamino de Vida",
    description: "+100 PS máximos permanentes.",
    sprite: () => Assets.items.scrollLife
  },

  combat: {
    id: "combat",
    name: "Pergamino de Combate",
    description: "+3 daño base permanente para todas las armas.",
    sprite: () => Assets.items.scrollCombat
  },

  knowledge: {
    id: "knowledge",
    name: "Pergamino de Conocimiento",
    description: "+5% XP permanente.",
    sprite: () => Assets.items.scrollKnowledge
  },

  speed: {
    id: "speed",
    name: "Pergamino de Velocidad",
    description: "+5% velocidad permanente.",
    sprite: () => Assets.items.scrollSpeed
  },

  talent: {
    id: "talent",
    name: "Pergamino de Talento",
    description: "Empiezas cada partida con una mejora gratuita.",
    sprite: () => Assets.items.scrollTalent
  }
};

const PrisonerDatabase = [
  {
    id: "prisoner1",
    sprite: () => Assets.npc.prisoner1
  },
  {
    id: "prisoner2",
    sprite: () => Assets.npc.prisoner2
  },
  {
    id: "prisoner3",
    sprite: () => Assets.npc.prisoner3
  }
];

function spawnEnemy(typeId = "slime") {
  if (!canSpawnEnemy(typeId)) return false;

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 700 + Math.random() * 250;

  const x = player.x + Math.cos(angle) * distanceFromPlayer;
  const y = player.y + Math.sin(angle) * distanceFromPlayer;

  const enemy = createEnemy(typeId, x, y);

  if (!enemy) return false;

  if (!isCollidingWithObstacle(enemy)) {
    enemies.push(enemy);
    unlockEncyclopedia("enemies", enemy.id);
    return true;
  }

  return false;
}

function spawnEnemyGuaranteed(typeId, attempts = 20) {
  for (let i = 0; i < attempts; i++) {
    if (spawnEnemy(typeId)) {
      return true;
    }
  }

  console.warn("No se pudo spawnear:", typeId);
  return false;
}

function spawnEnemyAt(typeId, x, y) {
  const enemy = createEnemy(typeId, x, y);

  if (!enemy) return;

  if (!isCollidingWithObstacle(enemy)) {
    enemies.push(enemy);
    unlockEncyclopedia("enemies", enemy.id);
  }
}

function spawnRift(riftId) {
  if (isRiftCompleted(riftId)) return;

  const data = RiftDatabase[riftId];
  if (!data) return;

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 600;

  activeRifts.push({
    id: data.id,
    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,
    width: data.width,
    height: data.height,
    collision: data.collision,
    summonTime: data.summonTime,
    summonTimer: data.summonTime,
    summoning: false,
    sprite: data.sprite()
  });

  showEventMessage("Ha aparecido una grieta...");
}

function updateRifts(dt) {
  for (const rift of activeRifts) {
    const touching =
      distance(player, rift) < player.collision + rift.collision;

    if (touching) {
      rift.summoning = true;
      rift.summonTimer -= dt;

      if (rift.summonTimer <= 0) {
        summonRiftBoss(rift);
      }
    } else {
      rift.summoning = false;
      rift.summonTimer = rift.summonTime;
    }
  }

  activeRifts = activeRifts.filter(rift => !rift.dead);
}

function summonRiftBoss(rift) {
  const data = RiftDatabase[rift.id];

  const angle = Math.random() * Math.PI * 2;
  const spawnDistance = 260;

  spawnEnemyAt(
    data.bossId,
    rift.x + Math.cos(angle) * spawnDistance,
    rift.y + Math.sin(angle) * spawnDistance
  );

  rift.dead = true;

  showEventMessage(data.name + " se ha abierto");
}

function spawnRandomEnemy() {
  const biomeEnemy = pickBiomeEnemyId(player.x, player.y, gameTime, saveData);
  spawnEnemy(biomeEnemy || "slime");
}

function getAvailableSenseiIds() {
  const defeated = saveData.senseis?.defeated || [];

  return Object.keys(SenseiDatabase).filter(id => {
    return !defeated.includes(id);
  });
}

function spawnMouseClickEffect(x, y) {
  mouseClickEffects.push({
    x,
    y,
    size: 26,
    lifeTime: 0.18,
    maxLifeTime: 0.18
  });
}

function updateMouseClickEffects(dt) {
  for (const effect of mouseClickEffects) {
    effect.lifeTime -= dt;
  }

  mouseClickEffects = mouseClickEffects.filter(effect => effect.lifeTime > 0);
}

function spawnSenseiStatue() {
  const availableSenseis = getAvailableSenseiIds();

  if (availableSenseis.length === 0) return false;

  const senseiId = availableSenseis[
    Math.floor(Math.random() * availableSenseis.length)
  ];

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 900 + Math.random() * 700;

  const statue = {
    id: "senseiStatue",
    senseiId,
    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 64,
    height: 64,
    size: 64,
    collision: 28,

    sprite: Assets.world.senseiStatue
  };

  if (isCollidingWithObstacle(statue)) {
    return false;
  }

  senseiStatues.push(statue);
  return true;
}

function spawnPrisonerCage() {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 1000 + Math.random() * 900;

  const prisonerData = PrisonerDatabase[
    Math.floor(Math.random() * PrisonerDatabase.length)
  ];

  const cage = {
    id: "prisonerCage",

    prisonerId: prisonerData.id,
    prisonerSprite: prisonerData.sprite(),

    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 64,
    height: 64,
    size: 64,
    collision: 30,

    life: 8,

    sprite: Assets.world.cage
  };

  if (isCollidingWithObstacle(cage)) {
    return false;
  }

  prisonerCages.push(cage);
  return true;
}

function updatePrisonerCages(dt) {
  prisonerCageSpawnTimer -= dt;

  if (
    prisonerCageSpawnTimer <= 0 &&
    prisonerCages.length < 2
  ) {
    const spawned = spawnPrisonerCage();

    if (spawned) {
      prisonerCageSpawnTimer = 180 + Math.random() * 180;
    } else {
      prisonerCageSpawnTimer = 15;
    }
  }

  for (const prisoner of rescuedPrisoners) {
    prisoner.escapeTimer -= dt;

    const dx = prisoner.x - player.x;
    const dy = prisoner.y - player.y;
    const dist = Math.hypot(dx, dy) || 1;

    prisoner.x += (dx / dist) * prisoner.speed * dt;
    prisoner.y += (dy / dist) * prisoner.speed * dt;

    if (prisoner.escapeTimer <= 0 || dist > 1200) {
      prisoner.dead = true;
    }
  }

  rescuedPrisoners = rescuedPrisoners.filter(prisoner => !prisoner.dead);
}

function breakPrisonerCage(cage) {
  cage.dead = true;

  rescuePrisoner(cage);
  dropPrisonerReward(cage.x, cage.y);

  saveData.stats.totalPrisonersRescued++;
  checkAchievements();
  saveGameData(saveData);
}

function rescuePrisoner(cage) {
  rescuedPrisoners.push({
    id: cage.prisonerId,

    x: cage.x,
    y: cage.y,

    width: 48,
    height: 48,
    size: 48,
    collision: 18,

    speed: 260,
    escapeTimer: 4,

    sprite: cage.prisonerSprite
  });
}

function dropPrisonerReward(x, y) {
  const roll = Math.random() * 101;

  if (roll < 70) {
    spawnItemDrop("oranBerry", x, y);
    return;
  }

  if (roll < 95) {
    spawnItemDrop("alioliPotatoes", x, y);
    return;
  }

  if (roll < 100) {
    spawnItemDrop("sunkernSeed", x, y);
    return;
  }

  spawnItemDrop("rareCandy", x, y);
}

function updateSenseiStatues(dt) {
  if (senseiStatues.length === 0) {
    senseiSpawnTimer -= dt;

    if (senseiSpawnTimer <= 0) {
      spawnSenseiStatue();
      senseiSpawnTimer = 300;
    }
  }

  for (const statue of senseiStatues) {
    const interactionRange = player.collision + statue.collision + 35;

    if (distance(player, statue) < interactionRange) {
      summonSenseiFromStatue(statue);
    }
  }

  senseiStatues = senseiStatues.filter(statue => !statue.dead);
}

function summonSenseiFromStatue(statue) {
  const data = SenseiDatabase[statue.senseiId];
  if (!data) return;

  statue.dead = true;

  spawnEnemyAt(data.enemyId, statue.x, statue.y);

  showEventMessage(data.name + " ha despertado");
}

function shootStone() {
  if (enemies.length === 0) return;

  const stoneStats = player.weapons.stone;
  const baseTarget = getNearestEnemyFromPoint(player.x, player.y);

  if (!baseTarget) return;

  const baseAngle = Math.atan2(baseTarget.y - player.y, baseTarget.x - player.x);

  for (let i = 0; i < stoneStats.projectiles; i++) {
    const spread = (i - (stoneStats.projectiles - 1) / 2) * 0.18;
    const angle = baseAngle + spread;
    const isSpecial = Math.random() < stoneStats.specialChance;

    projectiles.push({
      id: "stone",
      source: "stone",
      x: player.x,
      y: player.y,
      size: isSpecial ? stoneStats.size + 8 : stoneStats.size,
      collision: isSpecial ? (stoneStats.size + 8) * 0.35 : stoneStats.size * 0.35,
      vx: Math.cos(angle) * stoneStats.speed,
      vy: Math.sin(angle) * stoneStats.speed,
      damage: isSpecial ? stoneStats.damage + stoneStats.specialDamage : stoneStats.damage,
      lifeTime: stoneStats.lifeTime,
      bouncesLeft: stoneStats.bounces,
      hitEnemies: [],
      special: isSpecial
    });
  }
}

function updatePlayer(dt) {
  let dx = 0;
  let dy = 0;

  if (keys["w"] || keys["arrowup"]) dy -= 1;
  if (keys["s"] || keys["arrowdown"]) dy += 1;
  if (keys["a"] || keys["arrowleft"]) dx -= 1;
  if (keys["d"] || keys["arrowright"]) dx += 1;

  player.visualMoving = dx !== 0 || dy !== 0;

  if (dx !== 0 || dy !== 0) {
    const len = Math.hypot(dx, dy);
    dx /= len;
    dy /= len;

    moveWithObstacleCollision(
      player,
      dx * player.speed * dt,
      dy * player.speed * dt
    );

    if (dx < 0) player.facing = "left";
    if (dx > 0) player.facing = "right";
  }

  if (player.invulnerableTimer > 0) {
    player.invulnerableTimer -= dt;
  }
}

function updateEnemies(dt) {
  for (const enemy of enemies) {
      if (enemy.isAlly) {
        updateAlly(enemy, dt);
      continue;
      }

    if (enemy.id === "goldSlime") {
  updateGoldSlime(enemy, dt);
  continue;
}
    const chickenTarget = getNearestChickenForEnemy(enemy);
const mainTarget = chickenTarget || player;
    enemy.currentTarget = mainTarget;

const dx = mainTarget.x - enemy.x;
const dy = mainTarget.y - enemy.y;
const dist = Math.hypot(dx, dy) || 1;

      if (enemy.id === "delibird" && enemy.isEscaping) {
  enemy.escapeTimer -= dt;

  moveWithObstacleCollision(
    enemy,
    -(dx / dist) * enemy.speed * 2.8 * dt,
    -(dy / dist) * enemy.speed * 2.8 * dt
  );

  if (enemy.escapeTimer <= 0 || dist > 1200) {
    enemy.dead = true;
  }

  continue;
}

      if (dx < 0) {
        enemy.facing = "left";
      } else {
        enemy.facing = "right";
      }

    if (
    enemy.id === "watermelonVoltorb" ||
    enemy.id === "watermelonElectrode"
) {
    updateWatermelonVoltorb(enemy, dt, dx, dy, dist);
    continue;
}

    const speed = enemy.speed * (hordeActive ? 1.30 : 1);
    const contactDamage = (enemy.isBoss ? 20 : 10) * (hordeActive ? 1.25 : 1);

    if (enemy.attacks.includes("rockLine")) {
  enemy.rockLineTimer = enemy.rockLineTimer ?? 2.5;
  enemy.rockLineTimer -= dt;

  if (dist < enemy.rockLineRange && enemy.rockLineTimer <= 0) {
    spawnRockSpikeLine(enemy);
    enemy.rockLineTimer = enemy.rockLineCooldown;
  }
}
    if (enemy.attacks.includes("electricBite")) {
  enemy.electricBiteTimer -= dt;

  if (
    dist < enemy.electricBiteRange &&
    enemy.electricBiteTimer <= 0
  ) {
    useElectricBite(enemy);
    enemy.electricBiteTimer = enemy.electricBiteCooldown;
  }
}
    if (enemy.attacks.includes("fireball")) {
      enemy.fireballTimer -= dt;

      if (dist < enemy.fireballRange && enemy.fireballTimer <= 0) {
        shootEnemyFireball(enemy);
        enemy.fireballTimer = enemy.fireballCooldown;
      }
    }

    if (enemy.attacks.includes("knife")) {
  enemy.knifeTimer -= dt;

  if (dist < enemy.knifeRange && enemy.knifeTimer <= 0) {
    shootEnemyKnife(enemy);
    enemy.knifeTimer = enemy.knifeCooldown;
  }
}

  updateSenseiAttacks(enemy, dt, dist);
    
    if (enemy.state === "chase") {
  if (enemy.attacks.includes("knife")) {
    const preferredDistance = 360;

    if (dist > preferredDistance + 40) {
      moveWithObstacleCollision(
        enemy,
        (dx / dist) * speed * dt,
        (dy / dist) * speed * dt
      );
    } else if (dist < preferredDistance - 80) {
      moveWithObstacleCollision(
        enemy,
        -(dx / dist) * speed * dt,
        -(dy / dist) * speed * dt
      );
    }
  } else {
    moveWithObstacleCollision(
      enemy,
      (dx / dist) * speed * dt,
      (dy / dist) * speed * dt
    );
  }

      enemy.attackCooldown -= dt;

      if (
  (enemy.attacks.includes("charge") || enemy.attacks.includes("rhyhornCharge")) &&
  dist < enemy.chargeRange &&
  enemy.attackCooldown <= 0
) {
  enemy.state = "charge";
enemy.chargeTimer = enemy.chargeTime;
enemy.chargeTargetX = mainTarget.x;
enemy.chargeTargetY = mainTarget.y;
}
    } else if (enemy.state === "charge") {
      enemy.chargeTimer -= dt;

      if (enemy.chargeTimer <= 0) {
        const targetX = enemy.chargeTargetX ?? player.x;
        const targetY = enemy.chargeTargetY ?? player.y;
        const angle = Math.atan2(targetY - enemy.y, targetX - enemy.x);

        enemy.jumpVx = Math.cos(angle) * enemy.jumpSpeed * (hordeActive ? 1.20 : 1);
        enemy.jumpVy = Math.sin(angle) * enemy.jumpSpeed * (hordeActive ? 1.20 : 1);
        enemy.jumpTimer = enemy.jumpDuration;
        enemy.state = "jump";
      }
    } else if (enemy.state === "jump") {
      moveWithObstacleCollision(
        enemy,
        enemy.jumpVx * dt,
        enemy.jumpVy * dt
      );

      enemy.jumpTimer -= dt;

      if (enemy.jumpTimer <= 0) {
        enemy.state = "chase";
        enemy.attackCooldown = enemy.attackCooldownBase;
      }
    }

    const roosterTarget = getNearestRoosterInRange(enemy);

if (roosterTarget && enemy.attackCooldown <= 0) {
  roosterTarget.life -= contactDamage;
  enemy.attackCooldown = enemy.attackCooldownBase || 1;

  if (roosterTarget.life <= 0) {
    roosterTarget.dead = true;
    roosterTarget.respawnTimer = player.roosterRespawnCooldown;
  }

  continue;
}

    const allyTarget = getNearestAllyInRange(enemy);

    if (allyTarget && enemy.attackCooldown <= 0) {
      allyTarget.life -= contactDamage;
      enemy.attackCooldown = enemy.attackCooldownBase;

    if (allyTarget.life <= 0) {
      allyTarget.dead = true;
    }

    continue;
    }
    if (
  chickenTarget &&
  distance(chickenTarget, enemy) < chickenTarget.collision + enemy.collision &&
  enemy.attackCooldown <= 0
) {
  chickenTarget.life -= contactDamage;
  enemy.attackCooldown = enemy.attackCooldownBase || 1;

  if (chickenTarget.life <= 0) {
    chickenTarget.dead = true;
  }

  continue;
}
    if (
      distance(player, enemy) < player.collision + enemy.collision &&
      player.invulnerableTimer <= 0
    ) {
      damagePlayer(contactDamage);
      player.invulnerableTimer = 0.6;

    }
  }
}

function updateSenseiAttacks(enemy, dt, dist) {
  if (!enemy.tags || !enemy.tags.includes("sensei")) return;

  if (enemy.attacks.includes("senseiSlash")) {
    enemy.senseiSlashTimer -= dt;

    if (dist < enemy.senseiSlashRange && enemy.senseiSlashTimer <= 0) {
      useSenseiSlash(enemy);
      enemy.senseiSlashTimer = enemy.senseiSlashCooldown;
    }
  }

  if (enemy.attacks.includes("senseiShuriken")) {
    enemy.senseiShurikenTimer -= dt;

    if (dist < enemy.senseiShurikenRange && enemy.senseiShurikenTimer <= 0) {
      shootSenseiShurikens(enemy);
      enemy.senseiShurikenTimer = enemy.senseiShurikenCooldown;
    }
  }

  if (enemy.attacks.includes("senseiBlueFireball")) {
    enemy.senseiBlueFireballTimer -= dt;

    if (dist < enemy.senseiBlueFireballRange && enemy.senseiBlueFireballTimer <= 0) {
      shootSenseiBlueFireball(enemy);
      enemy.senseiBlueFireballTimer = enemy.senseiBlueFireballCooldown;
    }
  }

  if (enemy.attacks.includes("senseiTeleport")) {
    enemy.senseiTeleportTimer -= dt;

    if (dist < 520 && enemy.senseiTeleportTimer <= 0) {
      useSenseiTeleport(enemy);
      enemy.senseiTeleportTimer = enemy.senseiTeleportCooldown;
    }
  }

  if (enemy.attacks.includes("senseiPillar")) {
    enemy.senseiPillarTimer -= dt;

    if (dist < 700 && enemy.senseiPillarTimer <= 0) {
      spawnSenseiPillarNearPlayer(enemy);
      enemy.senseiPillarTimer = enemy.senseiPillarCooldown;
    }
  }

  if (enemy.attacks.includes("senseiMeditation")) {
    enemy.senseiMeditationTimer -= dt;

    if (
        enemy.life < enemy.maxLife * 0.25 &&
        enemy.senseiMeditationTimer <= 0
    ) {
        useSenseiMeditation(enemy);
        enemy.senseiMeditationTimer = enemy.senseiMeditationCooldown;
    }
}

  if (enemy.attacks.includes("senseiDebuff")) {
    enemy.senseiDebuffTimer -= dt;

    if (dist < 520 && enemy.senseiDebuffTimer <= 0) {
      spawnSenseiDebuffZone(enemy);
      enemy.senseiDebuffTimer = enemy.senseiDebuffCooldown;
    }
  }
}

function shootSenseiShurikens(enemy) {
  const baseAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

  for (let i = -1; i <= 1; i++) {
    const angle = baseAngle + i * 0.18;

    enemyProjectiles.push({
      id: "senseiShuriken",

      x: enemy.x,
      y: enemy.y,

      size: 24,
      collision: 8,

      vx: Math.cos(angle) * enemy.senseiShurikenSpeed,
      vy: Math.sin(angle) * enemy.senseiShurikenSpeed,

      damage: enemy.senseiShurikenDamage,
      lifeTime: 3
    });
  }
}

function shootSenseiBlueFireball(enemy) {
  const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

  enemyProjectiles.push({
    id: "senseiBlueFireball",

    x: enemy.x,
    y: enemy.y,

    size: 32,
    collision: 12,

    vx: Math.cos(angle) * enemy.senseiBlueFireballSpeed,
    vy: Math.sin(angle) * enemy.senseiBlueFireballSpeed,

    damage: enemy.senseiBlueFireballDamage,
    lifeTime: 4,

    burnTime: 5
  });
}

function useSenseiSlash(enemy) {
  const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

  const slashDistance = 54;

  const slash = {
    x: enemy.x + Math.cos(angle) * slashDistance,
    y: enemy.y + Math.sin(angle) * slashDistance,

    width: 96,
    height: 96,
    size: 96,
    collision: 46,

    angle,
    damage: enemy.senseiSlashDamage,
    lifeTime: 0.16,
    hasHitPlayer: false,

    sprite: Assets.effects.swordSlash
  };

  senseiSlashes.push(slash);
}

function updateSenseiSlashes(dt) {
  for (const slash of senseiSlashes) {
    slash.lifeTime -= dt;

    if (
      !slash.hasHitPlayer &&
      distance(player, slash) < player.collision + slash.collision &&
      player.invulnerableTimer <= 0
    ) {
      damagePlayer(slash.damage);
      player.invulnerableTimer = 0.6;
      slash.hasHitPlayer = true;
    }
  }

  senseiSlashes = senseiSlashes.filter(slash => slash.lifeTime > 0);
}

function spawnSenseiPillarNearPlayer(enemy) {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 80 + Math.random() * 120;

  const pillar = {
    id: "senseiPillar",

    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 20,
    height: 64,
    size: 64,
    collision: 18,

    lifeTime: 120,

    sprite: Assets.world.senseiPillar
  };

  if (!isCollidingWithObstacle(pillar)) {
    senseiPillars.push(pillar);
  }
}

function updateSenseiPillars(dt) {
  for (const pillar of senseiPillars) {
    pillar.lifeTime -= dt;
  }

  senseiPillars = senseiPillars.filter(pillar => pillar.lifeTime > 0);
}

function useSenseiMeditation(enemy) {
  enemy.life = Math.min(enemy.maxLife, enemy.life + 50);

  senseiEffects.push({
    id: "meditation",
    x: enemy.x,
    y: enemy.y - enemy.size / 2 - 18,
    width: 32,
    height: 32,
    size: 32,
    lifeTime: 1.2,
    followTarget: enemy,
    sprite: Assets.effects.meditation
  });
}

function updateSenseiEffects(dt) {
  for (const effect of senseiEffects) {
    effect.lifeTime -= dt;

    if (effect.followTarget && !effect.followTarget.dead) {
      effect.x = effect.followTarget.x;
      effect.y = effect.followTarget.y - effect.followTarget.size / 2 - 18;
    }
  }

  senseiEffects = senseiEffects.filter(effect => effect.lifeTime > 0);
}

function spawnSenseiDebuffZone(enemy) {
  senseiEffects.push({
    id: "debuffHands",
    x: enemy.x,
    y: enemy.y - enemy.size / 2 - 18,
    width: 32,
    height: 32,
    size: 32,
    lifeTime: 1,
    followTarget: enemy,
    sprite: Assets.effects.debuffCircle
  });

  senseiDebuffZones.push({
    id: "senseiDebuffZone",
    x: player.x,
    y: player.y,
    radius: 140,
    lifeTime: 4,
    damageMultiplier: 0.75
  });
}

function updateSenseiDebuffZones(dt) {
  player.damageDebuffTimer = Math.max(0, (player.damageDebuffTimer || 0) - dt);
  player.damageDebuffMultiplier = 1;

  for (const zone of senseiDebuffZones) {
    zone.lifeTime -= dt;

    if (distance(player, zone) < player.collision + zone.radius) {
      player.damageDebuffTimer = 0.2;
      player.damageDebuffMultiplier = zone.damageMultiplier;
    }
  }

  senseiDebuffZones = senseiDebuffZones.filter(zone => zone.lifeTime > 0);
}

function useSenseiTeleport(enemy) {
  const oldX = enemy.x;
  const oldY = enemy.y;

  senseiEffects.push({
    id: "smoke",
    x: oldX,
    y: oldY,
    width: 64,
    height: 64,
    size: 64,
    lifeTime: 0.6,
    sprite: Assets.effects.smoke
  });

  senseiEffects.push({
    id: "ninjaLog",
    x: oldX,
    y: oldY,
    width: 48,
    height: 48,
    size: 48,
    lifeTime: 1.2,
    sprite: Assets.effects.ninjaLog
  });

  const angleBehindPlayer = Math.atan2(
    enemy.y - player.y,
    enemy.x - player.x
  );

  const distanceBehind = 95;

  const newX = player.x + Math.cos(angleBehindPlayer) * distanceBehind;
  const newY = player.y + Math.sin(angleBehindPlayer) * distanceBehind;

  const testPosition = {
    x: newX,
    y: newY,
    collision: enemy.collision
  };

  if (!isCollidingWithObstacle(testPosition)) {
    enemy.x = newX;
    enemy.y = newY;
  }

  senseiEffects.push({
    id: "smoke",
    x: enemy.x,
    y: enemy.y,
    width: 64,
    height: 64,
    size: 64,
    lifeTime: 0.6,
    sprite: Assets.effects.smoke
  });
}

function updateGoldSlime(enemy, dt) {
  if (enemy.wanderAngle === undefined) {
    enemy.wanderAngle = Math.random() * Math.PI * 2;
    enemy.wanderTimer = 1 + Math.random() * 2;
  }

  enemy.wanderTimer -= dt;

  if (enemy.wanderTimer <= 0) {
    enemy.wanderAngle += -1.2 + Math.random() * 2.4;
    enemy.wanderTimer = 0.8 + Math.random() * 1.6;
  }

  const moveX = Math.cos(enemy.wanderAngle) * enemy.speed * dt;
  const moveY = Math.sin(enemy.wanderAngle) * enemy.speed * dt;

  const oldX = enemy.x;
  const oldY = enemy.y;

  moveWithObstacleCollision(enemy, moveX, moveY);

  if (enemy.x === oldX && enemy.y === oldY) {
    enemy.wanderAngle += Math.PI / 2 + Math.random() * Math.PI;
    enemy.wanderTimer = 0.4;
  }

  enemy.facing = Math.cos(enemy.wanderAngle) < 0 ? "left" : "right";
}

function updateWatermelonVoltorb(enemy, dt, dx, dy, dist) {
  if (enemy.state === "chase") {
    enemy.facing = dx < 0 ? "left" : "right";

    if (dist > enemy.explosionRange) {
      moveWithObstacleCollision(
        enemy,
        (dx / dist) * enemy.speed * dt,
        (dy / dist) * enemy.speed * dt
      );
    } else {
      enemy.state = "detonate";
      enemy.explosionTimer = enemy.explosionTime;
    }

    return;
  }

  if (enemy.state === "detonate") {
    enemy.explosionTimer -= dt;

    if (enemy.explosionTimer <= 0) {
      explodeWatermelonVoltorb(enemy);
    }
  }
}

function explodeWatermelonVoltorb(enemy) {
  if (enemy.hasExploded) return;

  enemy.hasExploded = true;

  watermelonExplosions.push({
    x: enemy.x,
    y: enemy.y,
    size: enemy.explosionRange * 2,
    lifeTime: 1.5,
    sprite: Assets.effects.watermelonExplosion
  });

  if (
    distance(player, enemy) < player.collision + enemy.explosionRange &&
    player.invulnerableTimer <= 0
  ) {
    damagePlayer(enemy.explosionDamage);
    player.invulnerableTimer = 0.6;

  }

  enemy.dead = true;
}

function explodeWatermelonAlly(enemy) {
    if (enemy.hasExploded) return;
    enemy.hasExploded = true;
    watermelonExplosions.push({
        x: enemy.x,
        y: enemy.y,
        size: enemy.explosionRange * 2,
        lifeTime: 1.5,
        sprite: Assets.effects.watermelonExplosion
    });
    for (const target of enemies) {
        if (target.dead) continue;
        if (target.isAlly) continue;
        if (
            distance(enemy, target) <
            enemy.explosionRange + target.collision
        ) {
            damageEnemy(
  target,
  Math.ceil(enemy.explosionDamage * player.allyDamageMultiplier),
  "allyExplosion",
  ["ally", "explosive"]
);
        }
    }
    enemy.dead = true;

}

function spawnRockSpikeLine(enemy) {
  const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

  const spikeAmount = 6;
  const spacing = 58;

  for (let i = 1; i <= spikeAmount; i++) {
    rockSpikes.push({
      x: enemy.x + Math.cos(angle) * spacing * i,
      y: enemy.y + Math.sin(angle) * spacing * i,

      width: 48,
      height: 48,
      collision: 22,

      damage: 16,
      lifeTime: 1.2,
      delay: i * 0.08,
      hasHitPlayer: false,

      sprite: Assets.projectiles.rockSpike
    });
  }
}

function updateRockSpikes(dt) {
  for (const spike of rockSpikes) {
    spike.delay -= dt;

    if (spike.delay > 0) continue;

    spike.lifeTime -= dt;

    if (
      !spike.hasHitPlayer &&
      distance(player, spike) < player.collision + spike.collision &&
      player.invulnerableTimer <= 0
    ) {
      damagePlayer(spike.damage);
      player.invulnerableTimer = 0.6;
      spike.hasHitPlayer = true;

    }
  }

  rockSpikes = rockSpikes.filter(spike => spike.lifeTime > 0);
}

function updateWatermelonExplosions(dt) {
  for (const explosion of watermelonExplosions) {
    explosion.lifeTime -= dt;
  }

  watermelonExplosions = watermelonExplosions.filter(explosion => explosion.lifeTime > 0);
}

function useElectricBite(enemy) {
  const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
  const distanceFromEnemy = enemy.collision + 45;

  electricBites.push({
    x: enemy.x + Math.cos(angle) * distanceFromEnemy,
    y: enemy.y + Math.sin(angle) * distanceFromEnemy,
    size: 96,
    collision: 50,
    damage: enemy.electricBiteDamage,
    lifeTime: 0.35,
    hasHitPlayer: false,
    sprite: Assets.effects.electricBite
  });
}

function updateElectricBites(dt) {
  for (const bite of electricBites) {
    bite.lifeTime -= dt;

    if (
      !bite.hasHitPlayer &&
      distance(player, bite) < player.collision + bite.collision &&
      player.invulnerableTimer <= 0
    ) {
      damagePlayer(bite.damage);
      player.invulnerableTimer = 0.6;
      bite.hasHitPlayer = true;

    }
  }

  electricBites = electricBites.filter(bite => bite.lifeTime > 0);
}

function shootEnemyFireball(enemy) {
  const target = enemy.currentTarget || player;

  const angle = Math.atan2(
    target.y - enemy.y,
    target.x - enemy.x
  );

  enemyProjectiles.push({
    x: enemy.x,
    y: enemy.y,
    size: 28,
    collision: 10,
    vx: Math.cos(angle) * enemy.fireballSpeed,
    vy: Math.sin(angle) * enemy.fireballSpeed,
    damage: enemy.fireballDamage,
    lifeTime: 3
  });
}

function shootEnemyKnife(enemy) {
  const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

  enemyProjectiles.push({
    id: "knife",

    x: enemy.x,
    y: enemy.y,

    size: 24,
    collision: 8,

    vx: Math.cos(angle) * enemy.knifeSpeed,
    vy: Math.sin(angle) * enemy.knifeSpeed,

    damage: enemy.knifeDamage,
    lifeTime: 3
  });
}

function shootAllyFireball(ally, target) {
  const angle = Math.atan2(target.y - ally.y, target.x - ally.x);

  allyProjectiles.push({
    id: "fireball",
    source: "allyFireball",
    sourceTags: ["ally", "projectile"],
    x: ally.x,
    y: ally.y,
    size: 28,
    collision: 10,
    vx: Math.cos(angle) * ally.fireballSpeed,
    vy: Math.sin(angle) * ally.fireballSpeed,
    damage: Math.ceil(ally.fireballDamage * player.allyDamageMultiplier),
    lifeTime: 3
  });
}

function shootAllyKnife(ally, target) {
  const angle = Math.atan2(target.y - ally.y, target.x - ally.x);

  allyProjectiles.push({
    id: "knife",
    source: "allyKnife",
    sourceTags: ["ally", "projectile"],

    x: ally.x,
    y: ally.y,

    size: 24,
    collision: 8,

    vx: Math.cos(angle) * ally.knifeSpeed,
    vy: Math.sin(angle) * ally.knifeSpeed,

    damage: Math.ceil(ally.knifeDamage * player.allyDamageMultiplier),

    lifeTime: 3
  });
}

function updateAllyProjectiles(dt) {
  for (const p of allyProjectiles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.lifeTime -= dt;

    if (isCollidingWithObstacle(p) ||
  isCollidingWithSenseiPillar(p)
) {
  p.lifeTime = 0;
}

    for (const enemy of enemies) {
      if (enemy.dead) continue;
      if (enemy.isAlly) continue;

      if (distance(p, enemy) < p.collision + enemy.collision) {
        damageEnemy(enemy, p.damage, p.source, p.sourceTags || ["ally"]);
        p.lifeTime = 0;
        break;
      }
    }
  }

  allyProjectiles = allyProjectiles.filter(p => p.lifeTime > 0);
}

function updateEnemyProjectiles(dt) {
  for (const p of enemyProjectiles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.lifeTime -= dt;

    if (
  isCollidingWithObstacle(p) ||
  isCollidingWithSenseiPillar(p)
) {
  p.lifeTime = 0;
}

    if (
      distance(player, p) < player.collision + p.collision &&
      player.invulnerableTimer <= 0
    ) {
      damagePlayer(p.damage);
      player.invulnerableTimer = 0.6;
      p.lifeTime = 0;

    }
  }

  enemyProjectiles = enemyProjectiles.filter(p => p.lifeTime > 0);
}

function bounceProjectile(projectile, enemyHit) {
  if (projectile.id === "watermelonSeed") {
    projectile.lifeTime = 0;
    return;
  }

  if (projectile.id === "razorLeaf") {
    return;
  }

  if (projectile.bouncesLeft === undefined) {
    projectile.bouncesLeft = 0;
  }

  if (projectile.bouncesLeft <= 0) {
    projectile.lifeTime = 0;
    return;
  }

  const nextTarget = getNearestEnemyFromPoint(
    enemyHit.x,
    enemyHit.y,
    projectile.hitEnemies
  );

  if (!nextTarget) {
    projectile.lifeTime = 0;
    return;
  }

  const angle = Math.atan2(
    nextTarget.y - enemyHit.y,
    nextTarget.x - enemyHit.x
  );

  projectile.x = enemyHit.x;
  projectile.y = enemyHit.y;

  projectile.vx = Math.cos(angle) * player.weapons.stone.speed;
  projectile.vy = Math.sin(angle) * player.weapons.stone.speed;

  projectile.bouncesLeft -= 1;

  projectile.lifeTime = Math.max(projectile.lifeTime, 0.7);
}

function applyBurn(target, options = {}) {
  if (!target) return;

  const damage = options.damage ?? 1;
  const duration = options.duration ?? 5;
  const tickRate = options.tickRate ?? 1;

  target.burnState = {
    damage,
    duration,
    tickRate,
    tickTimer: tickRate
  };
}

function updateBurnOnTarget(target, dt) {
  if (!target.burnState) return;

  const burn = target.burnState;

  burn.duration -= dt;
  burn.tickTimer -= dt;

  if (burn.tickTimer <= 0) {
    burn.tickTimer = burn.tickRate;

    if (target === player) {
      damagePlayer(burn.damage);
    } else {
      target.life -= burn.damage;

      if (target.life <= 0 && !target.dead) {
        if (tryCaptureEnemy(target)) {
          target.burnState = null;
          return;
        }

        target.dead = true;
        kills++;
        score += target.scoreValue;

        let xpGained = target.xpValue;

        if (player.greenPlortActive && target.id === "slime") {
          xpGained = 10;
        }

        gainXP(xpGained);

        onEnemyKilled(target, "burn");
      }
    }
  }

  if (burn.duration <= 0) {
    target.burnState = null;
  }
}

function updateBurns(dt) {
  updateBurnOnTarget(player, dt);

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    updateBurnOnTarget(enemy, dt);
  }

  enemies = enemies.filter(enemy => !enemy.dead);
}

function damagePlayer(amount) {
  if (player.soapActive && Math.random() < 0.05) {
    showEventMessage("¡Has esquivado el daño con la Pastilla de Jabón!");
    return;
  }

  let finalDamage = amount;

  if (player.evioliteActive) {
    finalDamage *= 0.90;
  }

  finalDamage = Math.ceil(finalDamage);

  player.life -= finalDamage;

  if (player.life <= 0) {
    player.life = 0;
    endGame();
  }
}

function damageEnemy(enemy, amount, source = null, sourceTags = []) {
  const finalDamage = calculatePlayerDamage(amount, sourceTags, enemy);

  enemy.life -= finalDamage;

  if (
  player.firePlortActive &&
  Math.random() < player.burnChance
) {
  applyBurn(enemy, {
    damage: player.burnDamage,
    duration: player.burnDuration,
    tickRate: player.burnTickRate
  });
}

  if (enemy.id === "delibird" && !enemy.dead) {
    enemy.hasBeenHit = true;
    enemy.isEscaping = true;
    enemy.escapeTimer = 6;
  }

  if (enemy.life <= 0 && !enemy.dead) {
    if (tryCaptureEnemy(enemy)) {
      return;
    }

    enemy.dead = true;
    kills++;
    score += enemy.scoreValue;
    let xpGained = enemy.xpValue;

if (player.greenPlortActive && enemy.id === "slime") {
  xpGained = 10;
}

gainXP(xpGained);

    onEnemyKilled(enemy, source);
  }
}

function getPlayerDamageBonus(sourceTags = []) {
  let multiplier = 1;

  if (
    player.leaderBadgeActive &&
    (
      sourceTags.includes("turret") ||
      sourceTags.includes("ally")
    )
  ) {
    multiplier *= 1.15;
  }

  return multiplier;
}

function calculatePlayerDamage(amount, sourceTags = [], enemy = null) {
  let finalDamage = amount + (player.baseDamageBonus || 0);

  if (
    player.slimeJamActive &&
    enemy &&
    enemy.tags &&
    enemy.tags.includes("slime")
  ) {
    finalDamage += 3;
  }

  finalDamage *= getPlayerDamageBonus(sourceTags);

  if ((player.damageDebuffTimer || 0) > 0) {
    finalDamage *= player.damageDebuffMultiplier || 1;
  }

  return Math.ceil(finalDamage);
}

function setFaction(entity, faction) {
  entity.faction = faction;
  entity.isAlly = faction === "ally";
}

function isAlly(entity) {
  return entity && (entity.faction === "ally" || entity.isAlly === true);
}

function isEnemyFaction(entity) {
  return entity && !entity.dead && !isAlly(entity);
}

function getAllies() {
  return enemies.filter(enemy => isAlly(enemy) && !enemy.dead);
}

function canConvertEnemyToAlly(enemy) {
  if (!enemy || enemy.dead) return false;
  if (isAlly(enemy)) return false;
  if (enemy.isBoss) return false;
  if (enemy.cannotCapture) return false;
  if (["mimic", "delibird"].includes(enemy.id)) return false;
  return true;
}

function convertEnemyToAlly(enemy, announce = true) {
  setFaction(enemy, "ally");
  enemy.life = Math.max(1, Math.floor(enemy.maxLife * player.allyLifeMultiplier));
  enemy.maxLife = enemy.life;
  enemy.speed *= player.allySpeedMultiplier;
  enemy.attackCooldown = 0.5;
  enemy.state = "chase";
  enemy.fireballTimer = 0.5;
  enemy.knifeTimer = 0.5;

  if (announce) {
    showEventMessage(enemy.name + " se ha unido");
  }
}

function tryCaptureEnemy(enemy) {
  if (!player.pokeballActive) return false;
  if (!canConvertEnemyToAlly(enemy)) return false;
  if (getAllies().length >= player.maxAllies) return false;

  convertEnemyToAlly(enemy);
  return true;
}

function convertRandomEnemyToAlly() {
  const candidates = enemies.filter(canConvertEnemyToAlly);

  if (candidates.length === 0) {
    showEventMessage("No hay enemigos válidos para convertir");
    return;
  }

  convertEnemyToAlly(candidates[Math.floor(Math.random() * candidates.length)]);
}

function getNearestEnemyForAlly(ally) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.isAlly) continue;

    const d = distance(ally, enemy);

    if (d < nearestDist) {
      nearest = enemy;
      nearestDist = d;
    }
  }

  return nearest;
}

function getNearestAllyInRange(enemy) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const ally of getAllies()) {
    const d = distance(enemy, ally);

    if (d < enemy.collision + ally.collision + 12 && d < nearestDist) {
      nearest = ally;
      nearestDist = d;
    }
  }

  return nearest;
}

function getNearestRoosterInRange(enemy) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const rooster of roosters) {
    if (rooster.dead) continue;

    const d = distance(enemy, rooster);

    if (
      d < enemy.collision + rooster.collision + 12 &&
      d < nearestDist
    ) {
      nearest = rooster;
      nearestDist = d;
    }
  }

  return nearest;
}

function updateAlly(enemy, dt) {
  const target = getNearestEnemyForAlly(enemy);

  if (!target) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist > 140) {
      moveWithObstacleCollision(
        enemy,
        (dx / dist) * enemy.speed * dt,
        (dy / dist) * enemy.speed * dt
      );
    }

    return;
  }

  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const dist = Math.hypot(dx, dy) || 1;

  enemy.facing = dx < 0 ? "left" : "right";

  if (enemy.attacks.includes("explode")) {
    if (enemy.state === "chase") {
        moveWithObstacleCollision(
            enemy,
            (dx / dist) * enemy.speed * dt,
            (dy / dist) * enemy.speed * dt
        );
        if (dist < enemy.explosionRange) {
            enemy.state = "detonate";
            enemy.explosionTimer = enemy.explosionTime;
        }
    }
    else if (enemy.state === "detonate") {
        enemy.explosionTimer -= dt;
        if (enemy.explosionTimer <= 0) {
            explodeWatermelonAlly(enemy);
        }
    }
    return;
}

  if (enemy.attacks.includes("fireball")) {
    enemy.fireballTimer -= dt;

    if (dist < enemy.fireballRange && enemy.fireballTimer <= 0) {
      shootAllyFireball(enemy, target);
      enemy.fireballTimer = enemy.fireballCooldown;
    }
  }

  if (enemy.attacks.includes("knife")) {
  enemy.knifeTimer -= dt;

  if (dist < enemy.knifeRange && enemy.knifeTimer <= 0) {
    shootAllyKnife(enemy, target);
    enemy.knifeTimer = enemy.knifeCooldown;
  }
}

  if (enemy.state === "chase") {
    moveWithObstacleCollision(
      enemy,
      (dx / dist) * enemy.speed * dt,
      (dy / dist) * enemy.speed * dt
    );

    enemy.attackCooldown -= dt;

    if (
      enemy.attacks.includes("charge") &&
      dist < enemy.chargeRange &&
      enemy.attackCooldown <= 0
    ) {
      enemy.state = "charge";
      enemy.chargeTimer = enemy.chargeTime;
      enemy.chargeTargetX = target.x;
      enemy.chargeTargetY = target.y;
    }

    if (
      !enemy.attacks.includes("charge") &&
      dist < enemy.collision + target.collision + 12 &&
      enemy.attackCooldown <= 0
    ) {
      damageEnemy(
  target,
  Math.ceil(6 * player.allyDamageMultiplier),
  "allyMelee",
  ["ally", "melee"]
);
      enemy.attackCooldown = 0.8;
    }
  } else if (enemy.state === "charge") {
    enemy.chargeTimer -= dt;

    if (enemy.chargeTimer <= 0) {
      const angle = Math.atan2(
        enemy.chargeTargetY - enemy.y,
        enemy.chargeTargetX - enemy.x
      );

      enemy.jumpVx = Math.cos(angle) * enemy.jumpSpeed;
      enemy.jumpVy = Math.sin(angle) * enemy.jumpSpeed;
      enemy.jumpTimer = enemy.jumpDuration;
      enemy.state = "jump";
    }
  } else if (enemy.state === "jump") {
    moveWithObstacleCollision(
      enemy,
      enemy.jumpVx * dt,
      enemy.jumpVy * dt
    );

    if (distance(enemy, target) < enemy.collision + target.collision) {
      damageEnemy(
  target,
  Math.ceil(10 * player.allyDamageMultiplier),
  "allyCharge",
  ["ally", "charge"]
);
    }

    enemy.jumpTimer -= dt;

    if (enemy.jumpTimer <= 0) {
      enemy.state = "chase";
      enemy.attackCooldown = enemy.attackCooldownBase;
    }
  }
}

function onEnemyKilled(enemy, source = null) {
  if (source === "watermelonSeedTurret") {
  saveData.stats.totalWatermelonTurretKills++;
}
  if (enemy.id === "delibird") {
  if (Math.random() < 1) {
    spawnBag(enemy.x, enemy.y);
  }
}
if (enemy.id === "slime") {
    saveData.stats.totalSlimeKills++;
  }

  if (enemy.id === "goldSlime") {
  saveData.stats.totalGoldSlimeKills++;

    if (
      saveData.unlocks.goldPlort &&
      Math.random() < 0.01
    ) {
    spawnItemDrop("goldPlort", enemy.x, enemy.y);
    }
  }

  if (enemy.senseiId) {
  completeSensei(enemy.senseiId, enemy.x, enemy.y);
}

  if (enemy.id === "fireSlimeSmall") {
    saveData.stats.totalFireSlimeSmallKills++;
  }

  if (enemy.id === "watermelonVoltorb") {
  saveData.stats.totalWatermelonVoltorbKills++;
}
  if (enemy.id === "watermelonElectrode") {
    saveData.stats.totalWatermelonElectrodeKills++;
}

  if (enemy.id === "rhyhornBoss") {

    saveData.stats.totalRhyhornBossKills++;

    completeRift("rhyhorn");
    saveData.unlocks.rhyhorn = true;
    unlockEncyclopedia("enemies", "rhyhorn");
    spawnBlackChest(enemy.x, enemy.y);

    if (player.scaryMedkitActive && Math.random() < 0.25) {
    spawnItemDrop("scaryMedkit", enemy.x + 35, enemy.y);
   }
}

  if (enemy.id === "rhyhorn") {
  spawnBlackChest(enemy.x, enemy.y);

  if (player.scaryMedkitActive && Math.random() < 0.50) {
    spawnItemDrop("scaryMedkit", enemy.x + 35, enemy.y);
  }
}

  if (enemy.id === "mimic") {

    saveData.stats.totalMimicsKilled++;

    spawnBlackChest(enemy.x, enemy.y);

}
  
if (enemy.id === "slimeGiant") {
  saveData.stats.totalSlimeGiantKills++;
  spawnEnemyAt("slimeElite", enemy.x - 45, enemy.y);
  spawnEnemyAt("slimeElite", enemy.x + 45, enemy.y);
}

if (enemy.id === "slimeElite") {
  saveData.stats.totalSlimeEliteKills++;
}
  if (enemy.id === "fireSlimeGiant") {
    saveData.stats.totalFireSlimeGiantKills++;

    if (Math.random() < enemy.chestChance) {
      spawnChest(enemy.x, enemy.y);
    }
    if (player.scaryMedkitActive && Math.random() < 0.25) {
    spawnItemDrop("scaryMedkit", enemy.x + 35, enemy.y);
   }
  }

  checkAchievements();
  saveGameData(saveData);
}

function completeSensei(senseiId, x, y) {
  if (!saveData.senseis) {
    saveData.senseis = { defeated: [] };
  }

  if (!saveData.scrolls) {
    saveData.scrolls = {
      life: false,
      combat: false,
      knowledge: false,
      speed: false,
      talent: false
    };
  }

  if (!saveData.senseis.defeated.includes(senseiId)) {
    saveData.senseis.defeated.push(senseiId);
    saveData.stats.totalSenseisDefeated++;

    unlockScroll(senseiId);

    checkAchievements();
    saveGameData(saveData);
  }
}

function unlockScroll(scrollId) {
  const scroll = ScrollDatabase[scrollId];

  if (!scroll) return;

  saveData.scrolls[scrollId] = true;

  unlockEncyclopedia("scrolls", scrollId);

  showEventMessage("Has obtenido: " + scroll.name);
}

function spawnChest(x, y) {
  chests.push({
    id: "basicChest",
    x,
    y,
    width: ChestDatabase.basicChest.width,
    height: ChestDatabase.basicChest.height,
    size: ChestDatabase.basicChest.collision * 2,
    collision: ChestDatabase.basicChest.collision,
    life: ChestDatabase.basicChest.life,
    sprite: ChestDatabase.basicChest.sprite()
  });
}

function spawnBag(x, y) {
  bags.push({
    id: "bag",
    x,
    y,
    width: 40,
    height: 40,
    size: 40,
    collision: 20,
    life: 3,
    sprite: Assets.items.bag
  });
}

function spawnBlackChest(x, y) {
  blackChests.push({
    id: "blackChest",
    x,
    y,
    width: 32,
    height: 32,
    size: 40,
    collision: 20,
    life: 5,
    sprite: Assets.items.blackChest
  });
}

function breakChest(chest) {
  chest.dead = true;

  const dropId = getRandomChestDrop(chest.id);
  const itemData = ItemDatabase[dropId];

  drops.push({
    id: dropId,
    x: chest.x,
    y: chest.y,
    width: itemData.width,
    height: itemData.height,
    collision: itemData.collision,
    sprite: itemData.sprite()
  });

  saveData.stats.totalChestsOpened++;
  saveGameData(saveData);
}

function breakBag(bag) {
  bag.dead = true;

  const dropId = getRandomBagDrop();
  const itemData = ItemDatabase[dropId];

  drops.push({
    id: dropId,
    x: bag.x,
    y: bag.y,
    width: itemData.width,
    height: itemData.height,
    collision: itemData.collision,
    sprite: itemData.sprite()
  });
}

function getRandomBagDrop() {
  const rarityRoll = Math.random();

  let rarity = "common";

  if (rarityRoll < 0.70) {
    rarity = "common";
  } else if (rarityRoll < 0.95) {
    rarity = "rare";
  } else {
    rarity = "ultra";
  }

  const commonDrops = [
    "oranBerry",
    "flabebeFlower",
    "sunkernSeed"
  ];

  const rareDrops = [
    "shellderShell",
    "rareCandy"
  ];

  const ultraDrops = [
    "heartScale"
  ];

  let pool = commonDrops;

  if (rarity === "rare") {
    pool = rareDrops;
  }

  if (rarity === "ultra") {
    pool = ultraDrops;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function spawnItemDrop(itemId, x, y) {
  const itemData = ItemDatabase[itemId];

  if (!itemData) return;

  drops.push({
    id: itemId,
    x,
    y,
    width: itemData.width,
    height: itemData.height,
    collision: itemData.collision,
    sprite: itemData.sprite()
  });
}

function openBlackChest(chest) {
  chest.dead = true;
  openBlackChestRewardPanel();
}

function openBlackChestRewardPanel() {
  gamePaused = true;
  blackChestPanel.classList.remove("hidden");
  blackChestOptions.innerHTML = "";

  const rewards = getBlackChestRewards(3);

  for (const reward of rewards) {
    const card = document.createElement("button");
    card.className = "black-chest-card";

    card.innerHTML = `
      <img src="${reward.sprite().src}" alt="${reward.name}">
      <h3>${reward.name}</h3>
      <p>${reward.description}</p>
    `;

    card.addEventListener("click", () => {
      reward.apply();
      closeBlackChestRewardPanel();
    });

    blackChestOptions.appendChild(card);
  }
}

function closeBlackChestRewardPanel() {
  blackChestPanel.classList.add("hidden");
  gamePaused = false;
}

const BLACK_CHEST_WEAPONS = [
  {
    id: "patataBoom",
    unlockKey: "patataBoom",

    name: "PatataBoom",
    description: "Nueva arma: coloca minas explosivas cerca del jugador.",

    sprite: () => Assets.items.patataBoom,

    apply() {
      addPatataBoomWeapon();
    }
  },
  {
  id: "scaryMedkit",
  unlockKey: "scaryMedkit",

  name: "Botiquín de la familia Scary",
  description: "Item de run: Activa la posibilidad de que los jefes suelten botiquines durante esta partida.",

  sprite: () => Assets.items.scaryMedkit,

  apply() {
    player.scaryMedkitActive = true;
    unlockEncyclopedia("items", "scaryMedkit");
  }
},
  {
  id: "pokeball",
  unlockKey: "pokeball",

  name: "Poké Ball",
  description: "Item de run: Captura enemigos derrotados para que luchen como aliados durante esta partida.",

  sprite: () => Assets.items.pokeball,

  apply() {
    player.pokeballActive = true;
    player.maxAllies = Math.max(player.maxAllies, 1);
    player.weapons.pokeball = {
    tags: ["capture", "summon"]
  };
    unlockEncyclopedia("items", "pokeball");
  }
},
  {
  id: "watermelonSeedTurret",
  unlockKey: "turret",

  name: "Torreta semillas de sandía",
  description: "Nueva arma: coloca torretas temporales que disparan semillas de sandía.",

  sprite: () => Assets.items.watermelonSeedTurret,

  apply() {
    addWatermelonSeedTurretWeapon();
  }
},
  {
  id: "chikoritaLeaf",
  unlockKey: "chikoritaLeaf",

  name: "Hoja de Chikorita",
  description: "Nueva arma: lanza hojas afiladas que atraviesan enemigos.",

  sprite: () => Assets.items.chikoritaLeaf,

  apply() {
    addChikoritaLeafWeapon();
  }
},
  {
  id: "eviolite",
  unlockKey: "bigBlackChestItems",

  name: "Mineral evolutivo",
  description: "Item de run: reduce el daño recibido un 10%.",

  sprite: () => Assets.items.eviolite,

  apply() {
    player.evioliteActive = true;
    unlockEncyclopedia("items", "eviolite");
  }
},
{
  id: "runningShoes",
  unlockKey: "bigBlackChestItems",

  name: "Deportivas",
  description: "Item de run: aumenta la velocidad del jugador un 10%.",

  sprite: () => Assets.items.runningShoes,

  apply() {
    player.runningShoesActive = true;
    player.speed *= 1.10;
    unlockEncyclopedia("items", "runningShoes");
  }
},
{
  id: "drill",
  unlockKey: "bigBlackChestItems",

  name: "Taladro",
  description: "Item de run: permite atravesar rocas.",

  sprite: () => Assets.items.drill,

  apply() {
    player.drillActive = true;
    unlockEncyclopedia("items", "drill");
  }
},
{
  id: "leaderBadge",
  unlockKey: "bigBlackChestItems",

  name: "Distintivo de líder",
  description: "Item de run: aumenta el daño de torretas y aliados.",

  sprite: () => Assets.items.leaderBadge,

  apply() {
    player.leaderBadgeActive = true;
    unlockEncyclopedia("items", "leaderBadge");
  }
},
  {
  id: "soap",
  unlockKey: "soap",

  name: "Pastilla de Jabón",
  description: "Item de run: 5% de probabilidad de esquivar cualquier daño recibido. Cuidado, no se te caiga.",

  sprite: () => Assets.items.soap,

  apply() {
    player.soapActive = true;
    unlockEncyclopedia("items", "soap");
  }
},
  {
  id: "sockRock",
  unlockKey: "sockRock",

  name: "Calcetín con Piedra",
  description: "Nueva arma: golpea delante del jugador con un calcetín cargado de mala intención.",

  sprite: () => Assets.items.sockRock,

  apply() {
    addSockRockWeapon();
  }
},
  {
  id: "slimeJam",
  unlockKey: "slimeJam",

  name: "Tarro de Mermelada de Slime",
  description: "Item de run: +3 daño contra enemigos con tag slime.",

  sprite: () => Assets.items.slimeJam,

  apply() {
    player.slimeJamActive = true;
    unlockEncyclopedia("items", "slimeJam");
  }
},

{
  id: "greenPlort",
  unlockKey: "greenPlort",

  name: "Plort Verde",
  description: "Item de run: mientras esté activo, los Slimes normales dan 10 XP.",

  sprite: () => Assets.items.greenPlort,

  apply() {
    player.greenPlortActive = true;
    unlockEncyclopedia("items", "greenPlort");
  }
},
  {
  id: "firePlort",
  unlockKey: "firePlort",

  name: "Plort de Fuego",
  description: "Item de run: tus ataques tienen una pequeña probabilidad de aplicar Quemadura.",

  sprite: () => Assets.items.firePlort,

  apply() {
    player.firePlortActive = true;
    player.burnChance = Math.max(player.burnChance, 0.05);
    player.burnDamage = Math.max(player.burnDamage, 1);
    player.burnDuration = Math.max(player.burnDuration, 5);
    player.burnTickRate = Math.min(player.burnTickRate, 1);

    player.weapons.firePlort = {
      tags: ["fire", "burn", "item"]
    };

    unlockEncyclopedia("items", "firePlort");
  }
},
  {
  id: "chicken",
  unlockKey: "chicken",

  name: "Gallina",
  description: "Item de run: invoca gallinas que atraen a enemigos slime.",

  sprite: () => Assets.items.chicken,

  apply() {
    addChickenItem();
  }
},
  {
  id: "cursor",
  unlockKey: "cursor",

  name: "Cursor",
  description: "Nueva arma: cursores que se mueven por la pantalla y hacen clic sobre enemigos.",

  sprite: () => Assets.items.cursor,

  apply() {
    addCursorWeapon();
  }
},
  {
  id: "rooster",
  unlockKey: "rooster",

  name: "Gallo de Pelea",
  description: "Nueva arma: invoca gallos aliados que picotean enemigos.",

  sprite: () => Assets.items.rooster,

  apply() {
    addRoosterWeapon();
  }
},
];

function getBlackChestRewards(amount = 3) {
  const pool = [];

  for (const weapon of BLACK_CHEST_WEAPONS) {
    const unlocked = saveData.unlocks[weapon.unlockKey];

    let owned = player.weapons[weapon.id];

    if (weapon.id === "scaryMedkit") {
      owned = player.scaryMedkitActive;
    }
    if (weapon.id === "pokeball") {
      owned = player.pokeballActive;
    }
    if (weapon.id === "eviolite") {
      owned = player.evioliteActive;
    }
    if (weapon.id === "runningShoes") {
      owned = player.runningShoesActive;
    }
    if (weapon.id === "drill") {
      owned = player.drillActive;
    }
    if (weapon.id === "leaderBadge") {
      owned = player.leaderBadgeActive;
    }
    if (weapon.id === "soap") {
      owned = player.soapActive;
    }
    if (weapon.id === "slimeJam") {
      owned = player.slimeJamActive;
    }
    if (weapon.id === "greenPlort") {
      owned = player.greenPlortActive;
    }
    if (weapon.id === "firePlort") {
      owned = player.firePlortActive;
    }
    if (weapon.id === "chicken") {
      owned = player.chickenActive;
    }
    if (weapon.id === "rooster") {
      owned = player.roosterActive;
    }

    if (unlocked && !owned) {
      for (let i = 0; i < 4; i++) {
        pool.push({
          id: weapon.id + "_weapon",
          name: weapon.name,
          description: weapon.description,
          sprite: weapon.sprite,
          apply: weapon.apply
        });
      }
    }
  }

  for (const upgrade of getAvailableUpgrades()) {
    pool.push({
      id: upgrade.id,
      name: upgrade.name,
      description: upgrade.description,
      sprite: () => {
  if (upgrade.weaponId === "patataBoom") {
    return Assets.items.patataBoom;
  }

  if (upgrade.weaponId === "watermelonSeedTurret") {
    return Assets.items.watermelonSeedTurret;
  }

  if (upgrade.weaponId === "chikoritaLeaf") {
    return Assets.items.chikoritaLeaf;
  }

  if (upgrade.weaponId === "sockRock") {
    return Assets.items.sockRock;
  }
  if (upgrade.weaponId === "firePlort") {
    return Assets.items.firePlort;
  }

  if (upgrade.weaponId === "pokeball") {
    return Assets.items.pokeball;
  }
        
  if (upgrade.weaponId === "chicken") {
    return Assets.items.chicken;
  }

  if (upgrade.weaponId === "cursor") {
    return Assets.items.cursor;
  }

  if (upgrade.weaponId === "rooster") {
    return Assets.items.rooster;
  }

  return Assets.projectiles.stone;
},
      apply() {
  upgrade.apply();
  registerWeaponUpgrade(upgrade.weaponId, upgrade.id, upgrade.unique === true);
}
    });
  }

  const result = [];

  while (result.length < amount && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }

  return result;
}

function addPatataBoomWeapon() {
  player.weapons.patataBoom = cloneRegistryValue(WeaponRegistry.patataBoom.initialStats);
  unlockEncyclopedia("weapons", "patataBoom");
}

function addWatermelonSeedTurretWeapon() {
  player.weapons.watermelonSeedTurret = cloneRegistryValue(WeaponRegistry.watermelonSeedTurret.initialStats);
  unlockEncyclopedia("weapons", "watermelonSeedTurret");
}

function addCursorWeapon() {
  player.weapons.cursor = cloneRegistryValue(WeaponRegistry.cursor.initialStats);
  createMissingMouseCursors();
  unlockEncyclopedia("weapons", "cursor");
}

function createMissingMouseCursors() {
  const weapon = player.weapons.cursor;
  if (!weapon) return;

  while (mouseCursors.length < weapon.count) {
    mouseCursors.push(createMouseCursor());
  }

  if (mouseCursors.length > weapon.count) {
    mouseCursors.length = weapon.count;
  }
}

function createMouseCursor() {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 80 + Math.random() * 120;

  return {
    id: "mouseCursor",

    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 32,
    height: 32,
    size: 32,
    collision: 12,

    target: null,
    clickTimer: 0,

    sprite: Assets.projectiles.mouseCursor
  };
}

function findMouseCursorTarget(cursor, usedTargets = []) {
  const weapon = player.weapons.cursor;
  if (!weapon) return null;

  const candidates = enemies.filter(enemy => {
    if (enemy.dead) return false;
    if (enemy.isAlly) return false;

    const playerDist = distance(player, enemy);
    if (playerDist > weapon.range) return false;

    return true;
  });

  if (candidates.length === 0) return null;

  const unused = candidates.filter(enemy => !usedTargets.includes(enemy));
  const pool = unused.length > 0 ? unused : candidates;

  return pool[Math.floor(Math.random() * pool.length)];
}

function updateMouseCursors(dt) {
  const weapon = player.weapons.cursor;

  if (!weapon) {
    mouseCursors = [];
    return;
  }

  createMissingMouseCursors();

  const usedTargets = [];

  for (const cursor of mouseCursors) {
    cursor.clickTimer -= dt;

    if (
      !cursor.target ||
      cursor.target.dead ||
      cursor.target.isAlly ||
      distance(player, cursor.target) > weapon.range
    ) {
      cursor.target = findMouseCursorTarget(cursor, usedTargets);
    }

    if (cursor.target && !usedTargets.includes(cursor.target)) {
      usedTargets.push(cursor.target);
    }

    if (!cursor.target) {
      idleMouseCursor(cursor, dt);
      continue;
    }

    moveMouseCursorToTarget(cursor, cursor.target, dt);

    if (
      distance(cursor, cursor.target) <=
      cursor.collision + cursor.target.collision + weapon.clickRange
    ) {
      if (cursor.clickTimer <= 0) {
        clickEnemyWithCursor(cursor, cursor.target);
        cursor.clickTimer = weapon.clickCooldown;

        cursor.target = null;
      }
    }
  }
}

function moveMouseCursorToTarget(cursor, target, dt) {
  const weapon = player.weapons.cursor;
  if (!weapon) return;

  const dx = target.x - cursor.x;
  const dy = target.y - cursor.y;
  const dist = Math.hypot(dx, dy) || 1;

  cursor.x += (dx / dist) * weapon.moveSpeed * dt;
  cursor.y += (dy / dist) * weapon.moveSpeed * dt;

  cursor.facing = dx < 0 ? "left" : "right";
}

function idleMouseCursor(cursor, dt) {
  if (cursor.idleAngle === undefined) {
    cursor.idleAngle = Math.random() * Math.PI * 2;
    cursor.idleTimer = 0.5 + Math.random();
  }

  cursor.idleTimer -= dt;

  if (cursor.idleTimer <= 0) {
    cursor.idleAngle += -1 + Math.random() * 2;
    cursor.idleTimer = 0.5 + Math.random();
  }

  const desiredX = player.x + Math.cos(cursor.idleAngle) * 130;
  const desiredY = player.y + Math.sin(cursor.idleAngle) * 90;

  const dx = desiredX - cursor.x;
  const dy = desiredY - cursor.y;
  const dist = Math.hypot(dx, dy) || 1;

  const speed = 280;

  cursor.x += (dx / dist) * speed * dt;
  cursor.y += (dy / dist) * speed * dt;

  cursor.facing = dx < 0 ? "left" : "right";
}

function clickEnemyWithCursor(cursor, enemy) {
  if (!enemy || enemy.dead) return;

  spawnMouseClickEffect(enemy.x, enemy.y);

  damageEnemy(
    enemy,
    player.weapons.cursor.damage,
    "cursor",
    ["cursor", "digital", "click"]
  );
}

function addSockRockWeapon() {
  player.weapons.sockRock = cloneRegistryValue(WeaponRegistry.sockRock.initialStats);
  unlockEncyclopedia("weapons", "sockRock");
}

function useSockRock() {
  const weapon = player.weapons.sockRock;
  if (!weapon) return;

  const angle = player.facing === "left" ? Math.PI : 0;

  sockSwings.push({
    id: "sockSwing",

    x: player.x + Math.cos(angle) * weapon.range,
    y: player.y + Math.sin(angle) * weapon.range,

    width: weapon.size,
    height: weapon.size,
    size: weapon.size,
    collision: weapon.collision,

    angle,
    damage: weapon.damage,
    lifeTime: weapon.duration,
    maxLifeTime: weapon.duration,

    hitEnemies: [],

    sprite: Assets.projectiles.sockSwing
  });
}

function updateSockSwings(dt) {
  for (const swing of sockSwings) {
    swing.lifeTime -= dt;

    for (const enemy of enemies) {
      if (enemy.dead) continue;
      if (enemy.isAlly) continue;
      if (swing.hitEnemies.includes(enemy)) continue;

      if (distance(swing, enemy) < swing.collision + enemy.collision) {
        swing.hitEnemies.push(enemy);

        damageEnemy(
          enemy,
          swing.damage,
          "sockRock",
          ["melee", "sock", "rock"]
        );
      }
    }
  }

  sockSwings = sockSwings.filter(swing => swing.lifeTime > 0);
}

function addChikoritaLeafWeapon() {
  player.weapons.chikoritaLeaf = cloneRegistryValue(WeaponRegistry.chikoritaLeaf.initialStats);
  unlockEncyclopedia("weapons", "chikoritaLeaf");
}

function placePatataBoomMines() {
  const weapon = player.weapons.patataBoom;

  for (let i = 0; i < weapon.mines; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distanceFromPlayer = 80 + Math.random() * 70;

    patataBoomMines.push({
      x: player.x + Math.cos(angle) * distanceFromPlayer,
      y: player.y + Math.sin(angle) * distanceFromPlayer,
      width: 32,
      height: 32,
      collision: 18,
      damage: weapon.damage,
      radius: weapon.radius,
      chain: weapon.chain,
      sprite: Assets.projectiles.patataBoomMine
    });
  }
}

function createWatermelonSeedTurret() {
  const weapon = player.weapons.watermelonSeedTurret;
  if (!weapon) return null;

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 90 + Math.random() * 80;

  const turret = {
    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 48,
    height: 48,
    size: 48,
    collision: 22,

    duration: weapon.duration,
    shootTimer: 0,

    damage: weapon.damage,
    fireCooldown: weapon.fireCooldown,
    range: weapon.range,
    projectileSpeed: weapon.projectileSpeed,

    sprite: Assets.items.watermelonSeedTurret
  };

  if (isCollidingWithObstacle(turret)) {
    return null;
  }

  return turret;
}

function addChickenItem() {
  player.chickenActive = true;
  player.chickenMax = Math.max(player.chickenMax, 1);

  player.weapons.chicken = {
    tags: ["ally", "chicken", "summon"]
  };

  summonMissingChickens();

  unlockEncyclopedia("items", "chicken");
}

function summonMissingChickens() {
  if (!player.chickenActive) return;

  const aliveChickens = chickens.filter(chicken => !chicken.dead);
  const missing = player.chickenMax - aliveChickens.length;

  if (missing <= 0) return;

  for (let i = 0; i < missing; i++) {
    summonChicken();
  }
}

function summonChicken() {
  const isGiant = Math.random() < player.chickenGiantChance;

  const sizeMultiplier = isGiant ? 3 : 1;

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 60 + Math.random() * player.chickenSpawnRadius;

  const leaderMultiplier = player.leaderBadgeActive ? 1.15 : 1;

  chickens.push({
    id: "chicken",

    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 48 * sizeMultiplier,
    height: 48 * sizeMultiplier,
    size: 48 * sizeMultiplier,
    collision: 18 * sizeMultiplier,

    life: Math.ceil(player.chickenLife * sizeMultiplier * leaderMultiplier),
    maxLife: Math.ceil(player.chickenLife * sizeMultiplier * leaderMultiplier),

    attractRange: player.chickenAttractRange * sizeMultiplier * leaderMultiplier,

    isGiant,

    speed: isGiant ? 45 : 70,
    wanderAngle: Math.random() * Math.PI * 2,
    wanderTimer: 0.8 + Math.random() * 1.4,

    sprite: Assets.allies.chicken
  });

  saveData.stats.totalChickensSummoned++;
  saveGameData(saveData);
}

function updateChickens(dt) {
  if (!player.chickenActive) {
    chickens = [];
    return;
  }

  for (const chicken of chickens) {
    updateChickenWander(chicken, dt);
  }

  chickens = chickens.filter(chicken => !chicken.dead);

  if (chickens.length < player.chickenMax) {
    player.chickenTimer -= dt;

    if (player.chickenTimer <= 0) {
      summonMissingChickens();
      player.chickenTimer = player.chickenCooldown;
    }
  } else {
    player.chickenTimer = player.chickenCooldown;
  }
}

function updateChickenWander(chicken, dt) {
  const distFromPlayer = distance(chicken, player);

if (distFromPlayer > 900) {
  chicken.tooFarTimer = (chicken.tooFarTimer || 0) + dt;

  if (chicken.tooFarTimer >= 4) {
    chicken.dead = true;
    return;
  }
} else {
  chicken.tooFarTimer = 0;
}
  
  chicken.wanderTimer -= dt;

  if (chicken.wanderTimer <= 0) {
    chicken.wanderAngle += -1.4 + Math.random() * 2.8;
    chicken.wanderTimer = 0.8 + Math.random() * 1.6;
  }

  const moveX = Math.cos(chicken.wanderAngle) * chicken.speed * dt;
  const moveY = Math.sin(chicken.wanderAngle) * chicken.speed * dt;

  const oldX = chicken.x;
  const oldY = chicken.y;

  moveWithObstacleCollision(chicken, moveX, moveY);

  if (chicken.x === oldX && chicken.y === oldY) {
    chicken.wanderAngle += Math.PI / 2 + Math.random() * Math.PI;
    chicken.wanderTimer = 0.4;
  }
}

function addRoosterWeapon() {
  player.roosterActive = true;
  player.roosterMax = Math.max(player.roosterMax, 1);

  player.weapons.rooster = cloneRegistryValue(WeaponRegistry.rooster.initialStats);

  summonMissingRoosters();

  unlockEncyclopedia("weapons", "rooster");
}

function summonMissingRoosters() {
  if (!player.roosterActive) return;

  const aliveRoosters = roosters.filter(rooster => !rooster.dead);
  const missing = player.roosterMax - aliveRoosters.length;

  if (missing <= 0) return;

  for (let i = 0; i < missing; i++) {
    summonRooster();
  }
}

function summonRooster() {
  const isGiant = player.roosterGiantUnlocked;
  const isSlimeRooster = player.roosterSlimeUnlocked;

  const sizeMultiplier = isGiant ? 2.2 : 1;
  const leaderMultiplier = player.leaderBadgeActive ? 1.15 : 1;

  const angle = Math.random() * Math.PI * 2;
  const distanceFromPlayer = 70 + Math.random() * 90;

  roosters.push({
    id: "rooster",

    x: player.x + Math.cos(angle) * distanceFromPlayer,
    y: player.y + Math.sin(angle) * distanceFromPlayer,

    width: 32 * sizeMultiplier,
    height: 32 * sizeMultiplier,
    size: 32 * sizeMultiplier,
    collision: 14 * sizeMultiplier,

    life: Math.ceil(player.roosterLife * sizeMultiplier * leaderMultiplier),
    maxLife: Math.ceil(player.roosterLife * sizeMultiplier * leaderMultiplier),

    damage: Math.ceil(player.roosterDamage * leaderMultiplier),
    speed: player.roosterSpeed,
    attackCooldown: 0,
    attackCooldownBase: 0.6,

    respawnTimer: 0,

    isGiant,
    isSlimeRooster,

    sprite: isSlimeRooster
      ? Assets.allies.roosterSlime
      : Assets.allies.rooster
  });
}

function updateRoosters(dt) {
  if (!player.roosterActive) {
    roosters = [];
    return;
  }

  for (const rooster of roosters) {
    if (rooster.dead) {
      rooster.respawnTimer -= dt;

      if (rooster.respawnTimer <= 0) {
        rooster.dead = false;
        rooster.life = rooster.maxLife;

        const angle = Math.random() * Math.PI * 2;
        const distanceFromPlayer = 70 + Math.random() * 90;

        rooster.x = player.x + Math.cos(angle) * distanceFromPlayer;
        rooster.y = player.y + Math.sin(angle) * distanceFromPlayer;
      }

      continue;
    }

    updateRoosterAI(rooster, dt);
  }

  summonMissingRoosters();
}

function updateRoosterAI(rooster, dt) {
  const target = getNearestEnemyForRooster(rooster);

  if (!target) {
    moveRoosterNearPlayer(rooster, dt);
    return;
  }

  const dx = target.x - rooster.x;
  const dy = target.y - rooster.y;
  const dist = Math.hypot(dx, dy) || 1;

  rooster.facing = dx < 0 ? "left" : "right";

  if (dist > rooster.collision + target.collision + 8) {
    moveWithObstacleCollision(
      rooster,
      (dx / dist) * rooster.speed * dt,
      (dy / dist) * rooster.speed * dt
    );
  }

  rooster.attackCooldown -= dt;

  if (
    dist <= rooster.collision + target.collision + 12 &&
    rooster.attackCooldown <= 0
  ) {
    let damage = rooster.damage;

    if (
      rooster.isSlimeRooster &&
      target.tags &&
      target.tags.includes("slime")
    ) {
      damage *= 3;
    }

    damageEnemy(
      target,
      damage,
      "rooster",
      ["ally", "rooster", "melee"]
    );

    rooster.attackCooldown = rooster.attackCooldownBase;
  }
}

function getNearestEnemyForRooster(rooster) {
  let nearest = null;
  let nearestDist = Infinity;

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.isAlly) continue;

    const d = distance(rooster, enemy);

    if (d < nearestDist) {
      nearest = enemy;
      nearestDist = d;
    }
  }

  return nearest;
}

function moveRoosterNearPlayer(rooster, dt) {
  const dx = player.x - rooster.x;
  const dy = player.y - rooster.y;
  const dist = Math.hypot(dx, dy) || 1;

  if (dist > 160) {
    moveWithObstacleCollision(
      rooster,
      (dx / dist) * rooster.speed * dt,
      (dy / dist) * rooster.speed * dt
    );
  }

  rooster.facing = dx < 0 ? "left" : "right";
}

function explodePatataBoomMine(mine) {
  mine.dead = true;

  explosions.push({
    x: mine.x,
    y: mine.y,
    size: mine.radius * 2,
    lifeTime: 0.35,
    sprite: Assets.effects.explosion
  });

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.isAlly) continue;

    if (distance(mine, enemy) < mine.radius + enemy.collision) {
      damageEnemy(
    enemy,
    mine.damage,
    "patataBoom",
    ["plant", "explosive"]
);
    }
  }
}

function updatePatataBoomMines(dt) {
  for (const mine of patataBoomMines) {
    for (const enemy of enemies) {
      if (enemy.dead) continue;

      if (distance(mine, enemy) < mine.collision + enemy.collision) {
        explodePatataBoomMine(mine);
        break;
      }
    }
  }

  patataBoomMines = patataBoomMines.filter(mine => !mine.dead);

  for (const explosion of explosions) {
    explosion.lifeTime -= dt;
  }

  explosions = explosions.filter(explosion => explosion.lifeTime > 0);
}

function updateWatermelonSeedTurrets(dt) {
  const weapon = player.weapons.watermelonSeedTurret;

  if (!weapon) {
    watermelonTurrets = [];
    return;
  }

  if (!weapon.slots) {
    weapon.slots = [];
  }

  while (weapon.slots.length < weapon.maxTurrets) {
    weapon.slots.push({
      turret: null,
      respawnTimer: 0
    });
  }

  if (weapon.slots.length > weapon.maxTurrets) {
    weapon.slots.length = weapon.maxTurrets;
  }

  watermelonTurrets = [];

  for (const slot of weapon.slots) {
    if (slot.turret) {
      const turret = slot.turret;

      turret.duration -= dt;
      turret.shootTimer -= dt;

      if (turret.duration <= 0) {
        slot.turret = null;
        slot.respawnTimer = weapon.respawnCooldown;
        continue;
      }

      if (turret.shootTimer <= 0) {
        shootWatermelonSeedFromTurret(turret);
        turret.shootTimer = turret.fireCooldown;
      }

      watermelonTurrets.push(turret);
      continue;
    }

    slot.respawnTimer -= dt;

    if (slot.respawnTimer <= 0) {
      const newTurret = createWatermelonSeedTurret();

      if (newTurret) {
        slot.turret = newTurret;
        watermelonTurrets.push(newTurret);
      } else {
        slot.respawnTimer = 0.5;
      }
    }
  }
}

function getNearestChickenForEnemy(enemy) {
  if (!enemy.tags || !enemy.tags.includes("slime")) return null;

  let nearest = null;
  let nearestDist = Infinity;

  for (const chicken of chickens) {
    if (chicken.dead) continue;

    const d = distance(enemy, chicken);

    if (
      d < chicken.attractRange &&
      d < nearestDist
    ) {
      nearest = chicken;
      nearestDist = d;
    }
  }

  return nearest;
}

function updateProjectiles(dt) {
  for (const p of projectiles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.lifeTime -= dt;

    if (isCollidingWithObstacle(p) ||
  isCollidingWithSenseiPillar(p)
) {
  p.lifeTime = 0;
}
  }

  projectiles = projectiles.filter(p => p.lifeTime > 0);

  for (const p of projectiles) {
    for (const chest of chests) {
      if (chest.dead) continue;

      if (distance(p, chest) < p.collision + chest.collision) {
        chest.life -= p.damage;
        p.lifeTime = 0;

        if (chest.life <= 0) {
          breakChest(chest);
        }

        break;
      }
    }
  }

  for (const p of projectiles) {
  for (const bag of bags) {
    if (bag.dead) continue;

    if (distance(p, bag) < p.collision + bag.collision) {
      bag.life -= p.damage;
      p.lifeTime = 0;

      if (bag.life <= 0) {
        breakBag(bag);
      }

      break;
    }
  }
}
  for (const p of projectiles) {
  for (const cage of prisonerCages) {
    if (cage.dead) continue;
    if (p.lifeTime <= 0) continue;

    if (distance(p, cage) < p.collision + cage.collision) {
      cage.life -= p.damage;
      p.lifeTime = 0;

      if (cage.life <= 0) {
        breakPrisonerCage(cage);
      }

      break;
    }
  }
}

  for (const p of projectiles) {
    if (p.lifeTime <= 0) continue;

    for (const enemy of enemies) {
      if (enemy.dead) continue;
      if (enemy.isAlly) continue;
      if (p.hitEnemies.includes(enemy)) continue;

if (distance(p, enemy) < p.collision + enemy.collision) {
  p.hitEnemies.push(enemy);
  damageEnemy(enemy, p.damage, p.source, p.sourceTags || []);

  if (p.id === "razorLeaf") {
    p.pierceLeft -= 1;

    if (p.pierceLeft <= 0) {
      p.lifeTime = 0;
    }

    break;
  }

  if (p.id === "watermelonSeed") {
    p.lifeTime = 0;
    break;
  }

  bounceProjectile(p, enemy);
  break;
}
    }
  }

  enemies = enemies.filter(enemy => !enemy.dead);
  chests = chests.filter(chest => !chest.dead);
  bags = bags.filter(bag => !bag.dead);
  prisonerCages = prisonerCages.filter(cage => !cage.dead);
  projectiles = projectiles.filter(p => p.lifeTime > 0);
}

function updateDrops() {
  for (const drop of drops) {
    if (distance(player, drop) < player.collision + drop.collision) {
      const item = ItemDatabase[drop.id];

      if (item) {
        item.apply();
      }

      drop.collected = true;
    }
  }

  drops = drops.filter(drop => !drop.collected);
}

function updateBlackChests() {

    for (const chest of blackChests) {

        if (
            distance(player, chest) <
            player.collision + chest.collision
        ) {

            openBlackChest(chest);

        }

    }

    blackChests = blackChests.filter(chest => !chest.dead);

}

function killVisibleEnemies() {
  for (const enemy of enemies) {
    if (isVisibleOnScreen(enemy)) {
      enemy.dead = true;
      kills++;
      score += enemy.scoreValue;
      gainXP(enemy.xpValue);
      onEnemyKilled(enemy);
    }
  }

  enemies = enemies.filter(enemy => !enemy.dead);
}

function drawGrid() {
  const gridSize = 128;

  const startX = Math.floor((camera.x - canvas.width / 2) / gridSize) * gridSize;
  const endX = camera.x + canvas.width / 2;

  const startY = Math.floor((camera.y - canvas.height / 2) / gridSize) * gridSize;
  const endY = camera.y + canvas.height / 2;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;

  for (let x = startX; x < endX; x += gridSize) {
    const sx = worldToScreenX(x);
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, canvas.height);
    ctx.stroke();
  }

  for (let y = startY; y < endY; y += gridSize) {
    const sy = worldToScreenY(y);
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(canvas.width, sy);
    ctx.stroke();
  }
}

function drawSprite(img, x, y, size, facing = "right", alpha = 1, visual = null) {
  let sx = worldToScreenX(x);
  let sy = worldToScreenY(y);

  let rotation = 0;
  let scaleX = 1;
  let scaleY = 1;

  if (visual && visual.sway) {
    const t = performance.now() / (visual.speed || 120);
    const amount = visual.amount || 1;
    sy += Math.abs(Math.sin(t)) * amount;
    rotation = Math.sin(t) * 0.06 * amount;
    scaleX = 1 + Math.sin(t) * 0.025 * amount;
    scaleY = 1 - Math.sin(t) * 0.018 * amount;
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(sx, sy);
  ctx.rotate(rotation);
  ctx.scale((facing === "left" ? -1 : 1) * scaleX, scaleY);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}

function drawRotatedSprite(img, x, y, width, height, angle, alpha = 1) {
  const sx = worldToScreenX(x);
  const sy = worldToScreenY(y);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(sx, sy);
  ctx.rotate(angle + Math.PI / 2);
  ctx.drawImage(img, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function drawBurnParticles(entity) {
  if (!entity.burnState) return;

  const sx = worldToScreenX(entity.x);
  const sy = worldToScreenY(entity.y);

  ctx.save();
  ctx.globalAlpha = 0.75;

  for (let i = 0; i < 3; i++) {
    const angle = performance.now() * 0.006 + i * 2.1;
    const radius = entity.size ? entity.size * 0.35 : 24;

    const px = sx + Math.cos(angle) * radius;
    const py = sy + Math.sin(angle) * radius - 8;

    ctx.drawImage(
      Assets.effects.burnParticle,
      px - 8,
      py - 8,
      16,
      16
    );
  }

  ctx.restore();
}

function drawHordeBuffParticles(enemy) {
  if (!hordeActive) return;

  const sx = worldToScreenX(enemy.x);
  const sy = worldToScreenY(enemy.y);

  ctx.save();
  ctx.fillStyle = "#ff4444";

  for (let i = 0; i < 3; i++) {
    const angle = performance.now() * 0.004 + i * 2;
    const px = sx + Math.cos(angle) * (enemy.size * 0.45);
    const py = sy + Math.sin(angle) * (enemy.size * 0.45);

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawAllyHearts(enemy) {
  const sx = worldToScreenX(enemy.x);
  const sy = worldToScreenY(enemy.y);

  ctx.save();

  for (let i = 0; i < 2; i++) {
    const offset = Math.sin(performance.now() / 300 + i) * 8;

    ctx.globalAlpha = 0.75;
    ctx.drawImage(
      Assets.effects.heartParticle,
      sx - 8 + i * 16,
      sy - enemy.size / 2 - 18 + offset,
      16,
      16
    );
  }

  ctx.restore();
}

function drawChargeWarning(enemy) {
  if (enemy.state !== "charge") return;
  if (!enemy.attacks.includes("rhyhornCharge")) return;

  const targetX = enemy.chargeTargetX ?? player.x;
  const targetY = enemy.chargeTargetY ?? player.y;

  const sx1 = worldToScreenX(enemy.x);
  const sy1 = worldToScreenY(enemy.y);
  const sx2 = worldToScreenX(targetX);
  const sy2 = worldToScreenY(targetY);

  ctx.save();

  ctx.strokeStyle = "rgba(255, 60, 60, 0.75)";
  ctx.lineWidth = 10;
  ctx.setLineDash([18, 12]);

  ctx.beginPath();
  ctx.moveTo(sx1, sy1);
  ctx.lineTo(sx2, sy2);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.restore();
}

function drawWorldObject(object) {
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

function drawRockSpikes() {
  for (const spike of rockSpikes) {
    if (spike.delay > 0) {
      const sx = worldToScreenX(spike.x);
      const sy = worldToScreenY(spike.y);

      ctx.save();
      ctx.fillStyle = "rgba(180, 90, 40, 0.35)";
      ctx.beginPath();
      ctx.arc(sx, sy, spike.collision, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      continue;
    }

    drawWorldObject(spike);
  }
}

function drawWatermelonVoltorbWarning(enemy) {
if (
    enemy.id !== "watermelonVoltorb" &&
    enemy.id !== "watermelonElectrode"
) {
    return;
}
  if (enemy.state !== "detonate") return;

  const sx = worldToScreenX(enemy.x);
  const sy = worldToScreenY(enemy.y);

  const progress = 1 - enemy.explosionTimer / enemy.explosionTime;
  const pulse = 0.65 + Math.sin(performance.now() / 70) * 0.2;

  ctx.save();

  ctx.globalAlpha = 0.25 + progress * 0.35;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(sx, sy, enemy.explosionRange, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = pulse;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sx, sy, enemy.explosionRange, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawRifts() {
  for (const rift of activeRifts) {
    drawWorldObject(rift);

    if (rift.summoning) {
      const sx = worldToScreenX(rift.x);
      const sy = worldToScreenY(rift.y);

      ctx.save();
      ctx.fillStyle = "white";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Invocando...",
        sx,
        sy - rift.height / 2 - 12
      );
      ctx.restore();
    }
  }
}

function drawPlayerLifeBar() {
  const sx = worldToScreenX(player.x);
  const sy = worldToScreenY(player.y);

  const barWidth = 70;
  const barHeight = 8;
  const x = sx - barWidth / 2;
  const y = sy - player.size / 2 - 18;

  ctx.fillStyle = "black";
  ctx.fillRect(x - 2, y - 2, barWidth + 4, barHeight + 4);

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, barWidth, barHeight);

  ctx.fillStyle = "lime";
  ctx.fillRect(x, y, barWidth * (player.life / player.maxLife), barHeight);
}

function drawXPBar() {
  const width = 260;
  const height = 10;
  const x = canvas.width / 2 - width / 2;
  const y = 16;

  ctx.fillStyle = "black";
  ctx.fillRect(x - 2, y - 2, width + 4, height + 4);

  ctx.fillStyle = "#31436b";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "#66aaff";
  ctx.fillRect(x, y, width * (player.xp / player.xpToNext), height);
}

function drawEntityLifeBar(entity) {
  if (!entity.maxLife) return;

  const sx = worldToScreenX(entity.x);
  const sy = worldToScreenY(entity.y);

  const barWidth = entity.size;
  const barHeight = 6;
  const x = sx - barWidth / 2;
  const y = sy - entity.size / 2 - 10;

  ctx.fillStyle = "black";
  ctx.fillRect(x - 1, y - 1, barWidth + 2, barHeight + 2);

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, barWidth, barHeight);

  ctx.fillStyle = "lime";
  ctx.fillRect(x, y, barWidth * (entity.life / entity.maxLife), barHeight);
}

function isEntityMoving(entity) {
  return Math.abs(entity.x - (entity._lastDrawX ?? entity.x)) > 0.2 || Math.abs(entity.y - (entity._lastDrawY ?? entity.y)) > 0.2;
}

function rememberDrawPosition(entity) {
  entity._lastDrawX = entity.x;
  entity._lastDrawY = entity.y;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hordeActive) {
  ctx.fillStyle = "rgba(120,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

  camera.x = player.x;
  camera.y = player.y;

  updateWorldAroundPlayer();

  drawGrid();
  drawWorld();
  drawRifts();

  for (const statue of senseiStatues) {
  drawWorldObject(statue);
}
  for (const pillar of senseiPillars) {
  drawWorldObject(pillar);
}
  for (const cursor of mouseCursors) {
  drawSprite(
    cursor.sprite,
    cursor.x,
    cursor.y,
    cursor.size,
    cursor.facing || "right"
  );
}
  for (const effect of mouseClickEffects) {
  const sx = worldToScreenX(effect.x);
  const sy = worldToScreenY(effect.y);
  const alpha = effect.lifeTime / effect.maxLifeTime;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.arc(sx, sy, effect.size * (1 - alpha + 0.4), 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sx - 8, sy);
  ctx.lineTo(sx + 8, sy);
  ctx.moveTo(sx, sy - 8);
  ctx.lineTo(sx, sy + 8);
  ctx.stroke();

  ctx.restore();
}

  for (const swing of sockSwings) {
  drawRotatedSprite(
    swing.sprite,
    swing.x,
    swing.y,
    swing.width,
    swing.height,
    swing.angle,
    swing.lifeTime / swing.maxLifeTime
  );
}

for (const zone of senseiDebuffZones) {
  const sx = worldToScreenX(zone.x);
  const sy = worldToScreenY(zone.y);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "purple";
  ctx.beginPath();
  ctx.arc(sx, sy, zone.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = "purple";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sx, sy, zone.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

  for (const drop of drops) {
    drawWorldObject(drop);
  }

  for (const chest of chests) {
    drawWorldObject(chest);
  }

  for (const bag of bags) {
  drawWorldObject(bag);
}

  for (const cage of prisonerCages) {
  drawWorldObject(cage);
}

for (const prisoner of rescuedPrisoners) {
  drawWorldObject(prisoner);
}

  for (const chest of blackChests) {
    drawWorldObject(chest);
}

  for (const mine of patataBoomMines) {
  drawWorldObject(mine);
}

  for (const turret of watermelonTurrets) {
    drawWorldObject(turret);
}
  for (const chicken of chickens) {
  drawSprite(chicken.sprite, chicken.x, chicken.y, chicken.size, chicken.facing || "right", 1, { sway: isEntityMoving(chicken), amount: 0.65, speed: 140 });
  drawEntityLifeBar(chicken);
}
  for (const rooster of roosters) {
  if (rooster.dead) continue;

  drawSprite(rooster.sprite, rooster.x, rooster.y, rooster.size, rooster.facing || "right", 1, { sway: isEntityMoving(rooster), amount: 0.8, speed: 125 });
  drawEntityLifeBar(rooster);
}

for (const explosion of explosions) {
  drawSprite(
    explosion.sprite,
    explosion.x,
    explosion.y,
    explosion.size,
    "right",
    explosion.lifeTime / 0.35
  );
}

  for (const explosion of watermelonExplosions) {
  drawSprite(
    explosion.sprite,
    explosion.x,
    explosion.y,
    explosion.size,
    "right",
    explosion.lifeTime / 1.5
  );
}

  for (const p of projectiles) {
  if (p.id === "watermelonSeed") {
    drawSprite(Assets.projectiles.watermelonSeed, p.x, p.y, p.size);
    continue;
  }

    if (p.id === "razorLeaf") {
  drawSprite(Assets.projectiles.razorLeaf, p.x, p.y, p.size);
  continue;
}

  if (p.special) {
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.shadowColor = "red";
    drawSprite(Assets.projectiles.stone, p.x, p.y, p.size);
    ctx.restore();
  } else {
    drawSprite(Assets.projectiles.stone, p.x, p.y, p.size);
  }
}

  for (const p of enemyProjectiles) {
  if (p.id === "knife") {
    drawSprite(Assets.projectiles.knife, p.x, p.y, p.size);
  } else if (p.id === "senseiShuriken") {
    drawSprite(Assets.projectiles.shuriken, p.x, p.y, p.size);
  } else if (p.id === "senseiBlueFireball") {
    drawSprite(Assets.projectiles.blueFireball, p.x, p.y, p.size);
  } else {
    drawSprite(Assets.projectiles.fireball, p.x, p.y, p.size);
  }
}

  for (const slash of senseiSlashes) {
  drawRotatedSprite(
    slash.sprite,
    slash.x,
    slash.y,
    slash.width,
    slash.height,
    slash.angle,
    slash.lifeTime / 0.16
  );
}

for (const effect of senseiEffects) {
  drawWorldObject(effect);
}

drawRockSpikes();

  for (const p of allyProjectiles) {
  if (p.id === "knife") {
    drawSprite(Assets.projectiles.knife, p.x, p.y, p.size);
  } else {
    drawSprite(Assets.projectiles.fireball, p.x, p.y, p.size);
  }
}

  for (const bite of electricBites) {
  drawSprite(bite.sprite, bite.x, bite.y, bite.size, "right", bite.lifeTime / 0.35);
}

  for (const enemy of enemies) {
  let alpha = 1;

  if (enemy.state === "charge") {
    alpha = 0.65 + Math.sin(performance.now() / 80) * 0.25;
  }

  drawChargeWarning(enemy);
  drawWatermelonVoltorbWarning(enemy);
  drawSprite(enemy.sprite, enemy.x, enemy.y, enemy.size, enemy.facing, alpha, { sway: true, amount: enemy.isAlly ? 0.7 : 0.45, speed: enemy.isAlly ? 135 : 155 });
  drawHordeBuffParticles(enemy);
  drawBurnParticles(enemy);

    if (enemy.isAlly) {
      drawAllyHearts(enemy);
    }
}

  const playerAlpha = player.invulnerableTimer > 0
    ? 0.5 + Math.sin(performance.now() / 60) * 0.3
    : 1;

  drawSprite(getCurrentPlayerSprite(), player.x, player.y, player.size, player.facing, playerAlpha, { sway: player.visualMoving, amount: 1.15, speed: 95 });
  drawBurnParticles(player);
  drawPlayerLifeBar();
  drawXPBar();
  drawMinimap();

  for (const entity of enemies) rememberDrawPosition(entity);
  for (const entity of chickens) rememberDrawPosition(entity);
  for (const entity of roosters) rememberDrawPosition(entity);
}

function updateUI() {
  timeText.textContent = formatTime(gameTime);
  killsText.textContent = kills;
  scoreText.textContent = score;
  levelText.textContent = player.level;
  xpText.textContent = player.xp;
  xpNeedText.textContent = player.xpToNext;
}

function drawMinimap() {
  const mapSize = 150;
  const mapRadius = mapSize / 2;
  const x = canvas.width - mapSize - 20;
  const y = 20;
  const centerX = x + mapRadius;
  const centerY = y + mapRadius;
  const range = 1200;

  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(x, y, mapSize, mapSize);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, mapSize, mapSize);

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
  ctx.fill();

  drawMinimapEntities(drops, centerX, centerY, mapRadius, range, "lime");
  drawMinimapEntities(chests, centerX, centerY, mapRadius, range, "gold");
  drawMinimapEntities(bags, centerX, centerY, mapRadius, range, "orange");
  drawMinimapEntities(blackChests, centerX, centerY, mapRadius, range, "purple");
  drawMinimapEntities(activeRifts, centerX, centerY, mapRadius, range, "cyan");
  drawMinimapEntities(senseiStatues, centerX, centerY, mapRadius, range, "white");
  drawMinimapEntities(prisonerCages, centerX, centerY, mapRadius, range, "pink");

  ctx.restore();
}

function showEventMessage(text){

    const panel=document.getElementById("eventMessage");
    const label=document.getElementById("eventMessageText");

    label.textContent=text;

    panel.classList.remove("hidden");

    setTimeout(()=>{
        panel.classList.add("hidden");
    },2000);

}

function drawMinimapEntities(list, centerX, centerY, mapRadius, range, color) {
  ctx.fillStyle = color;

  for (const entity of list) {
    const dx = entity.x - player.x;
    const dy = entity.y - player.y;

    const dist = Math.hypot(dx, dy);

    if (dist === 0) continue;

    const clampedDist = Math.min(dist, range);

    const px = centerX + (dx / dist) * (clampedDist / range) * (mapRadius - 8);
    const py = centerY + (dy / dist) * (clampedDist / range) * (mapRadius - 8);

    ctx.beginPath();
    ctx.arc(px, py, dist > range ? 5 : 4, 0, Math.PI * 2);
    ctx.fill();

    if (dist > range) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

function endGame() {
  gameOver = true;
  stopMusic();

  if (score > saveData.bestScore) {
    saveData.bestScore = score;
  }

  if (gameTime > saveData.bestTime) {
    saveData.bestTime = gameTime;
  }

  saveGameData(saveData);

  finalTime.textContent = formatTime(gameTime);
  finalKills.textContent = kills;
  finalScore.textContent = score;

  gameOverPanel.classList.remove("hidden");
}

function update(dt) {
  if (!gameStarted || gameOver || gamePaused) return;

  gameTime += dt;

  if (!hordeActive) {
    hordeTimer -= dt;

    if (hordeTimer <= 0) {
      hordeActive = true;
      hordeDuration = 60;
      showEventMessage("¡¡HORDA!!");
    }
  } else {
    hordeDuration -= dt;

    if (hordeDuration <= 0) {
      hordeActive = false;
      hordeTimer = 300;
      showEventMessage("La horda ha terminado");
    }
  }

  spawnTimer -= dt;
  bossSpawnTimer -= dt;
  mimicSpawnTimer -= dt;
  rhyhornSpawnTimer -= dt;

  if (spawnTimer <= 0) {
    spawnRandomEnemy();

    const spawnSpeed = Math.max(0.22, 1.2 - gameTime * 0.01);

    spawnTimer = hordeActive
      ? spawnSpeed * 0.45
      : spawnSpeed;
  }

  if (
    saveData.unlocks.fireSlimeGiant &&
    bossSpawnTimer <= 0 &&
    Math.random() < 0.18
  ) {
    spawnEnemy("fireSlimeGiant");
    bossSpawnTimer = 45;
  }

  if (
    !hordeActive &&
    mimicSpawnTimer <= 0 &&
    !enemies.some(enemy => enemy.id === "mimic")
  ) {
    spawnEnemyGuaranteed("mimic");
    mimicSpawnTimer = 120;
  }
  if (
  saveData.unlocks.rhyhorn &&
  rhyhornSpawnTimer <= 0 &&
  !enemies.some(enemy => enemy.id === "rhyhorn")
) {
  spawnEnemyGuaranteed("rhyhorn");
  rhyhornSpawnTimer = 300;
}

  updatePlayer(dt);
  updateWeapons(dt);
  updateEnemies(dt);
  updateBurns(dt);
  updateEnemyProjectiles(dt);
  updateAllyProjectiles(dt);
  updateRockSpikes(dt);
  updateElectricBites(dt);
  updateSenseiSlashes(dt);
  updateSenseiPillars(dt);
  updateSenseiEffects(dt);
  updateSenseiDebuffZones(dt);
  updateWatermelonExplosions(dt);
  updateSockSwings(dt);
  updateMouseCursors(dt);
  updateMouseClickEffects(dt);
  updateProjectiles(dt);
  updatePatataBoomMines(dt);
  updateWatermelonSeedTurrets(dt);
  updateChickens(dt);
  updateRoosters(dt);
  updateDrops();
  updateBlackChests();
  updateRifts(dt);
  updateSenseiStatues(dt);
  updatePrisonerCages(dt);
  updateUI();
}

function gameLoop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  update(dt);
  render();

  requestAnimationFrame(gameLoop);
}

loadAssets(() => {
  requestAnimationFrame(gameLoop);
});
