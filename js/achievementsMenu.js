let hideCompletedAchievements = false;

function getAchievementProgressRows(achievement) {
    const s = saveData.stats || {};
    const row = (value, target, label = "") => ({
        value: Math.min(value || 0, target),
        target,
        label
    });

    switch (achievement.id) {
        case "kill50Slimes": return [row(s.totalSlimeKills, 50)];
        case "kill100Slimes": return [row(s.totalSlimeKills, 100)];
        case "kill200Slimes": return [row(s.totalSlimeKills, 200)];
        case "kill500Slimes": return [row(s.totalSlimeKills, 500)];
        case "kill1000Slimes": return [row(s.totalSlimeKills, 1000)];
        case "defeatFireSlime": return [row(s.totalFireSlimeGiantKills, 1)];
        case "kill100FireSlimeGiants": return [row(s.totalFireSlimeGiantKills, 100)];
        case "eat10AlioliPotatoes": return [row(s.totalAlioliPotatoesEaten, 10)];
        case "heal100Life": return [row(s.totalHealingReceived, 100)];
        case "defeatRhyhornBoss": return [row(s.totalRhyhornBossKills, 1)];
        case "kill100WatermelonVoltorb": return [row(s.totalWatermelonVoltorbKills, 100)];
        case "kill50WatermelonElectrode": return [row(s.totalWatermelonElectrodeKills, 50)];
        case "kill100WatermelonElectrode": return [row(s.totalWatermelonElectrodeKills, 100)];
        case "kill100WithWatermelonTurrets": return [row(s.totalWatermelonTurretKills, 100)];
        case "kill10MimicsAfterRhyhorn": return [
            { value: saveData.completedRifts?.rhyhorn ? 1 : 0, target: 1, label: "Grieta de Rhyhorn" },
            row(s.totalMimicsKilled, 10, "Mímicos")
        ];
        case "unlockBigBlackChestItems": return [
            { value: saveData.completedRifts?.rhyhorn ? 1 : 0, target: 1, label: "Grieta de Rhyhorn" },
            row(s.totalMimicsKilled, 5, "Mímicos")
        ];
        case "defeatAllSenseis": return [row(s.totalSenseisDefeated, 5)];
        case "rescue5Prisoners": return [row(s.totalPrisonersRescued, 5)];
        case "rescue10Prisoners": return [row(s.totalPrisonersRescued, 10)];
        case "rescue15Prisoners": return [row(s.totalPrisonersRescued, 15)];
        case "kill100GoldSlimes": return [row(s.totalGoldSlimeKills, 10)];
        case "kill25GoldSlimes": return [row(s.totalGoldSlimeKills, 25)];
        case "kill100FireSlimeSmall": return [row(s.totalFireSlimeSmallKills, 100)];
        case "reachLevel10": return [row(Math.max(s.maxLevelReached || 0, player?.level || 0), 10)];
        case "summon50Chickens": return [row(s.totalChickensSummoned, 50)];
        case "kill100PinkSlimes": return [row(s.totalPinkSlimeKills, 100)];
        case "unlockCloudSlimeGiant": return [
            row(s.totalPinkSlimeGiantKills, 100, "Slimes Rosas Gigantes"),
            row(s.totalFireSlimeGiantKills, 100, "Slimes de Fuego Gigantes"),
            row(s.totalSlimeGiantKills, 100, "Slimes Gigantes")
        ];
        case "kill100CloudSlimeGiants": return [row(s.totalCloudSlimeGiantKills, 100, "Slimes Nube Gigantes")];
        default: return [];
    }
}

function renderAchievementProgress(achievement) {
    const rows = getAchievementProgressRows(achievement);
    if (!rows.length) return "";
    return `
        <div class="achievement-progress">
            <strong>PROGRESO</strong>
            ${rows.map(row => `
                <div class="achievement-progress-row">
                    <span>${row.value}/${row.target}</span>
                    ${row.label ? `<em>${row.label}</em>` : ""}
                </div>
            `).join("")}
        </div>
    `;
}

function renderAchievements() {
    const container = document.getElementById("achievementsContent");
    container.innerHTML = "";

    const toolbar = document.createElement("div");
    toolbar.className = "achievements-toolbar";
    toolbar.innerHTML = `
        <label>
            <input type="checkbox" id="hideCompletedAchievementsCheckbox" ${hideCompletedAchievements ? "checked" : ""}>
            Ocultar logros completados
        </label>
    `;
    container.appendChild(toolbar);

    const checkbox = toolbar.querySelector("#hideCompletedAchievementsCheckbox");
    checkbox.addEventListener("change", () => {
        hideCompletedAchievements = checkbox.checked;
        renderAchievements();
    });

    for (const achievement of Object.values(AchievementDatabase)) {
        const completed = saveData.achievements[achievement.id] === true;
        if (hideCompletedAchievements && completed) continue;

        const card = document.createElement("div");
        card.className = "encyclopedia-card" + (completed ? "" : " locked");
        card.innerHTML = `
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
            ${renderAchievementProgress(achievement)}
            <p><strong>Recompensa:</strong> ${achievement.reward}</p>
            <p style="font-weight:bold;color:${completed ? "#4CAF50" : "#ff5555"}">
                ${completed ? "✔ COMPLETADO" : "❌ PENDIENTE"}
            </p>
        `;
        container.appendChild(card);
    }
}
