function renderAchievements() {

    const container = document.getElementById("achievementsContent");

    container.innerHTML = "";

    for (const achievement of Object.values(AchievementDatabase)) {

        const completed =
            saveData.achievements[achievement.id] === true;

        const card = document.createElement("div");

        card.className =
            "encyclopedia-card" + (completed ? "" : " locked");

        let progress = "";

        switch (achievement.id) {

            case "kill100Slimes":
                progress = `${saveData.stats.totalSlimeKills} / 100`;
                break;

            case "defeatFireSlime":
                progress = `${saveData.stats.totalFireSlimeGiantKills} / 1`;
                break;

            case "kill50WatermelonElectrode":
                progress = `${saveData.stats.totalWatermelonElectrodeKills} / 50`;
                break;

            case "kill100WithWatermelonTurrets":
                progress = `${saveData.stats.totalWatermelonTurretKills} / 100`;
                break;

            case "defeatAllSenseis":
                progress = `${saveData.stats.totalSenseisDefeated} / 5`;
                break;

            case "rescue5Prisoners":
                  progress = `${saveData.stats.totalPrisonersRescued} / 5`;
                  break;

            case "rescue10Prisoners":
                  progress = `${saveData.stats.totalPrisonersRescued} / 10`;
                  break;

            case "rescue15Prisoners":
                  progress = `${saveData.stats.totalPrisonersRescued} / 15`;
                  break;
                
            case "kill100GoldSlimes":
                 progress = `${saveData.stats.totalGoldSlimeKills} / 10`;
                 break;

            case "kill25GoldSlimes":
                 progress = `${saveData.stats.totalGoldSlimeKills} / 25`;
                 break;

            case "kill100PinkSlimes":
                 progress = `${saveData.stats.totalPinkSlimeKills || 0} / 100`;
                 break;
                
            case "kill200Slimes":
                  progress = `${saveData.stats.totalSlimeKills} / 200`;
                  break;

            case "kill500Slimes":
                  progress = `${saveData.stats.totalSlimeKills} / 500`;
                  break;
                
            case "kill100FireSlimeSmall":
                  progress = `${saveData.stats.totalFireSlimeSmallKills} / 100`;
                  break;
                
            case "kill1000Slimes":
                  progress = `${saveData.stats.totalSlimeKills} / 1000`;
                  break;
                
            case "summon50Chickens":
                  progress = `${saveData.stats.totalChickensSummoned} / 50`;
                  break;

            default:
                progress = "";
                break;
        }

        card.innerHTML = `
            <h3>${achievement.name}</h3>

            <p>${achievement.description}</p>

            <p><strong>Progreso:</strong> ${progress}</p>

            <p><strong>Recompensa:</strong> ${achievement.reward}</p>

            <p style="font-weight:bold;color:${completed ? "#4CAF50" : "#ff5555"}">
                ${completed ? "✔ COMPLETADO" : "❌ PENDIENTE"}
            </p>
        `;

        container.appendChild(card);
    }
}
