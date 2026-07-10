let hideCompletedAchievements = false;

function clampProgressValue(value, target) {
    const current = Number(value || 0);
    const goal = Number(target || 0);

    if (!Number.isFinite(current)) return 0;
    if (!Number.isFinite(goal) || goal <= 0) return Math.max(0, Math.floor(current));

    return Math.min(Math.max(0, Math.floor(current)), goal);
}

function makeProgressLine(label, value, target) {
    return {
        label,
        value: clampProgressValue(value, target),
        target
    };
}

function getAchievementProgressLines(achievement) {
    const stats = saveData?.stats || {};
    const completedRifts = saveData?.completedRifts || {};

    switch (achievement.id) {
        case "kill50Slimes":
            return [makeProgressLine("Slimes", stats.totalSlimeKills, 50)];

        case "kill100Slimes":
            return [makeProgressLine("Slimes", stats.totalSlimeKills, 100)];

        case "defeatFireSlime":
            return [makeProgressLine("Slime de Fuego Gigante", stats.totalFireSlimeGiantKills, 1)];

        case "kill100FireSlimeGiants":
            return [makeProgressLine("Slimes de Fuego Gigantes", stats.totalFireSlimeGiantKills, 100)];

        case "eat10AlioliPotatoes":
            return [makeProgressLine("Patatas con alioli", stats.totalAlioliPotatoesEaten, 10)];

        case "heal100Life":
            return [makeProgressLine("PS curados", stats.totalHealingReceived, 100)];

        case "defeatRhyhornBoss":
            return [makeProgressLine("Rhyhorn de grieta", stats.totalRhyhornBossKills, 1)];

        case "kill100WatermelonVoltorb":
            return [makeProgressLine("Voltorb Sandía", stats.totalWatermelonVoltorbKills, 100)];

        case "kill50WatermelonElectrode":
            return [makeProgressLine("Electrode Sandía", stats.totalWatermelonElectrodeKills, 50)];

        case "kill100WatermelonElectrode":
            return [makeProgressLine("Electrode Sandía", stats.totalWatermelonElectrodeKills, 100)];

        case "kill100WithWatermelonTurrets":
            return [makeProgressLine("Kills con torretas", stats.totalWatermelonTurretKills, 100)];

        case "kill10MimicsAfterRhyhorn":
            return [
                makeProgressLine("Grieta de Rhyhorn", completedRifts.rhyhorn ? 1 : 0, 1),
                makeProgressLine("Mímicos derrotados", stats.totalMimicsKilled, 10)
            ];

        case "unlockBigBlackChestItems":
            return [
                makeProgressLine("Grieta de Rhyhorn", completedRifts.rhyhorn ? 1 : 0, 1),
                makeProgressLine("Mímicos derrotados", stats.totalMimicsKilled, 5)
            ];

        case "defeatAllSenseis":
            return [makeProgressLine("Senseis derrotados", stats.totalSenseisDefeated, 5)];

        case "rescue5Prisoners":
            return [makeProgressLine("Prisioneros liberados", stats.totalPrisonersRescued, 5)];

        case "rescue10Prisoners":
            return [makeProgressLine("Prisioneros liberados", stats.totalPrisonersRescued, 10)];

        case "rescue15Prisoners":
            return [makeProgressLine("Prisioneros liberados", stats.totalPrisonersRescued, 15)];

        case "kill100GoldSlimes":
            return [makeProgressLine("Slimes de Oro", stats.totalGoldSlimeKills, 10)];

        case "kill25GoldSlimes":
            return [makeProgressLine("Slimes de Oro", stats.totalGoldSlimeKills, 25)];

        case "kill200Slimes":
            return [makeProgressLine("Slimes", stats.totalSlimeKills, 200)];

        case "kill500Slimes":
            return [makeProgressLine("Slimes", stats.totalSlimeKills, 500)];

        case "kill100FireSlimeSmall":
            return [makeProgressLine("Slimes de Fuego", stats.totalFireSlimeSmallKills, 100)];

        case "kill1000Slimes":
            return [makeProgressLine("Slimes", stats.totalSlimeKills, 1000)];

        case "reachLevel10":
            return [makeProgressLine("Nivel máximo alcanzado", player?.level || stats.maxLevelReached || 0, 10)];

        case "summon50Chickens":
            return [makeProgressLine("Gallinas invocadas", stats.totalChickensSummoned, 50)];

        case "kill100PinkSlimes":
            return [makeProgressLine("Slimes Rosas", stats.totalPinkSlimeKills, 100)];

        case "unlockCloudSlimeGiant":
            return [
                makeProgressLine("Slimes Rosas Gigantes", stats.totalPinkSlimeGiantKills, 100),
                makeProgressLine("Slimes de Fuego Gigantes", stats.totalFireSlimeGiantKills, 100),
                makeProgressLine("Slimes Gigantes", stats.totalSlimeGiantKills, 100)
            ];

        case "kill100CloudSlimeGiants":
            return [makeProgressLine("Slimes Nube Gigantes", stats.totalCloudSlimeGiantKills, 100)];

        case "unlockLaprasFloat":
            return [makeProgressLine("Enemigos derrotados en el río", stats.totalEnemiesKilledInRiver, 20)];

        default:
            return [];
    }
}

function renderAchievementProgress(lines) {
    if (!lines || lines.length === 0) {
        return `<div class="achievement-progress"><strong>PROGRESO</strong><div class="achievement-progress-row"><span>Sin contador</span><span>-</span></div></div>`;
    }

    return `
        <div class="achievement-progress">
            <strong>PROGRESO</strong>
            ${lines.map(line => `
                <div class="achievement-progress-row">
                    <span>${line.label}</span>
                    <span>${line.value}/${line.target}</span>
                </div>
            `).join("")}
        </div>
    `;
}

function ensureAchievementsControls(container) {
    let controls = document.getElementById("achievementsControls");

    if (!controls) {
        controls = document.createElement("div");
        controls.id = "achievementsControls";
        controls.className = "achievements-controls";
        container.parentElement.insertBefore(controls, container);
    }

    controls.innerHTML = `
        <button id="toggleCompletedAchievementsButton">
            ${hideCompletedAchievements ? "Mostrar completados" : "Ocultar completados"}
        </button>
    `;

    document.getElementById("toggleCompletedAchievementsButton").onclick = () => {
        hideCompletedAchievements = !hideCompletedAchievements;
        renderAchievements();
    };
}

function renderAchievements() {

    const container = document.getElementById("achievementsContent");

    if (!container) return;

    ensureAchievementsControls(container);

    container.innerHTML = "";

    for (const achievement of Object.values(AchievementDatabase)) {

        const completed =
            saveData.achievements[achievement.id] === true;

        if (hideCompletedAchievements && completed) continue;

        const card = document.createElement("div");

        card.className =
            "encyclopedia-card achievement-card" + (completed ? " completed" : " locked");

        const progressLines = getAchievementProgressLines(achievement);

        card.innerHTML = `
            <h3>${achievement.name}</h3>

            <p>${achievement.description}</p>

            ${renderAchievementProgress(progressLines)}

            <p><strong>Recompensa:</strong> ${achievement.reward}</p>

            <p style="font-weight:bold;color:${completed ? "#4CAF50" : "#ff5555"}">
                ${completed ? "✔ COMPLETADO" : "❌ PENDIENTE"}
            </p>
        `;

        container.appendChild(card);
    }
}
