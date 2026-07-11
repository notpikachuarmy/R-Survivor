const AchievementDatabase = {
  kill50Slimes: {
  id: "kill50Slimes",
  name: "Slime, slime y más slime",
  description: "Derrota a 50 slimes.",
  reward: "Desbloquea al Slime Gigante.",

  check() {
    return saveData.stats.totalSlimeKills >= 50;
  },

  unlock() {
    saveData.unlocks.slimeGiant = true;
    unlockEncyclopedia("enemies", "slimeGiant");
  }
},
  

  kill100CloudSlimesForPidove: {
    id: "kill100CloudSlimesForPidove",
    name: "Pájaros en las nubes",
    description: "Derrota a 100 Slimes Nube normales.",
    reward: "Desbloquea a Pidove.",
    check() { return saveData.stats.totalCloudSlimeKills >= 100; },
    unlock() {
      saveData.unlocks.pidove = true;
      unlockEncyclopedia("enemies", "pidove");
    }
  },
  kill100Pidoves: {
    id: "kill100Pidoves",
    name: "Pan para las palomas",
    description: "Derrota a 100 Pidoves.",
    reward: "Desbloquea el arma Pan Paloma.",
    check() { return saveData.stats.totalPidoveKills >= 100; },
    unlock() {
      saveData.unlocks.panPaloma = true;
      unlockEncyclopedia("weapons", "panPaloma");
    }
  },
  kill100Slimes: {
    id: "kill100Slimes",
    name: "Exterminador de Slimes",
    description: "Derrota a 100 slimes.",
    reward: "Desbloquea al Slime de Fuego Gigante y el Orbe de bendición de NotPikachu.",

    check() {
      return saveData.stats.totalSlimeKills >= 100;
    },

    unlock() {
      saveData.unlocks.fireSlimeGiant = true;
      saveData.unlocks.notpikachuOrb = true;

      unlockEncyclopedia("enemies", "fireSlimeGiant");
      unlockEncyclopedia("items", "notpikachuOrb");
    }
  },

  defeatFireSlime: {
    id: "defeatFireSlime",
    name: "El héroe del fuego",
    description: "Derrota al Slime de Fuego Gigante.",
    reward: "Desbloquea la Skin 1.",

    check() {
      return saveData.stats.totalFireSlimeGiantKills >= 1;
    },

    unlock() {
      unlockSkin("skin1");
    }
  },
  kill100FireSlimeGiants: {
  id: "kill100FireSlimeGiants",
  name: "Domador de llamas",
  description: "Derrota a 100 Slimes de Fuego Gigantes.",
  reward: "Desbloquea al Slime de Fuego pequeño.",

  check() {
    return saveData.stats.totalFireSlimeGiantKills >= 100;
  },

  unlock() {
    saveData.unlocks.fireSlimeSmall = true;
    unlockEncyclopedia("enemies", "fireSlimeSmall");
  }
},
  eat10AlioliPotatoes: {
  id: "eat10AlioliPotatoes",
  name: "Patatas explosivas",
  description: "Come 10 Patatas con alioli.",
  reward: "Desbloquea PatataBoom.",

  check() {
    return saveData.stats.totalAlioliPotatoesEaten >= 10;
  },

  unlock() {
    saveData.unlocks.patataBoom = true;
    unlockEncyclopedia("weapons", "patataBoom");
  }
},
heal100Life: {
  id: "heal100Life",
  name: "Curación familiar",
  description: "Cura 100 puntos de vida en total.",
  reward: "Desbloquea el Botiquín de la familia Scary.",

  check() {
    return saveData.stats.totalHealingReceived >= 100;
  },

  unlock() {
    saveData.unlocks.scaryMedkit = true;
    unlockEncyclopedia("items", "scaryMedkit");
  }
},
defeatRhyhornBoss: {
  id: "defeatRhyhornBoss",
  name: "Domador de la grieta",
  description: "Derrota al Rhyhorn invocado por la grieta.",
  reward: "Desbloquea Rhyhorn, Poké Ball, Voltorb Sandía y la Skin de entrenador.",

  check() {
    return saveData.stats.totalRhyhornBossKills >= 1;
  },

  unlock() {
    saveData.unlocks.rhyhorn = true;
    saveData.unlocks.pokeball = true;
    saveData.unlocks.watermelonVoltorb = true;

    unlockSkin("skin2");
    unlockEncyclopedia("enemies", "rhyhornBoss");
    unlockEncyclopedia("items", "pokeball");
    unlockEncyclopedia("enemies", "rhyhorn");
  }
},
kill100WatermelonVoltorb: {
  id: "kill100WatermelonVoltorb",
  name: "Sandía explosiva",
  description: "Derrota a 100 Voltorb Sandía.",
  reward: "Desbloquea Electrode Sandía.",

  check() {
    return saveData.stats.totalWatermelonVoltorbKills >= 100;
  },

  unlock() {
    saveData.unlocks.watermelonElectrode = true;
    unlockEncyclopedia("enemies", "watermelonElectrode");
  }
},
kill50WatermelonElectrode:{
    id:"kill50WatermelonElectrode",
    name:"¡Torretas listas!",
    description:"Derrota a 50 Electrode Sandía.",
    reward:"Desbloquea la Torreta.",

    check(){
        return saveData.stats.totalWatermelonElectrodeKills>=50;
    },

    unlock(){
        saveData.unlocks.turret=true;
    }
},
kill100WatermelonElectrode:{
    id:"kill100WatermelonElectrode",
    name:"Flor asesina",
    description:"Derrota a 100 Electrode Sandía.",
    reward:"Desbloquea Flabébé.",
  
    check(){
        return saveData.stats.totalWatermelonElectrodeKills>=100;
    },
  
    unlock(){
        saveData.unlocks.flabebe=true;
    }
},
  kill100WithWatermelonTurrets: {
  id: "kill100WithWatermelonTurrets",
  name: "Jardinería agresiva",
  description: "Consigue 100 kills con torretas de semillas de sandía.",
  reward: "Desbloquea la Hoja de Chikorita.",

  check() {
    return saveData.stats.totalWatermelonTurretKills >= 100;
  },

  unlock() {
    saveData.unlocks.chikoritaLeaf = true;
  }
},
  kill10MimicsAfterRhyhorn: {
  id: "kill10MimicsAfterRhyhorn",
  name: "El ladrón de sacos",
  description: "Derrota a 10 Mímicos además de la brecha de Rhyhorn.",
  reward: "Desbloquea Delibird y a Randes navideño.",

  check() {
    return (
      saveData.completedRifts.rhyhorn === true &&
      saveData.stats.totalMimicsKilled >= 10
    );
  },

  unlock() {
    saveData.unlocks.delibird = true;
    unlockEncyclopedia("enemies", "delibird");
    unlockSkin("skin3");
  }
},
  unlockBigBlackChestItems: {
  id: "unlockBigBlackChestItems",
  name: "Botín de la brecha",
  description: "Supera la brecha de Rhyhorn y derrota a 5 Mímicos.",
  reward: "Desbloquea los objetos grandes de cofre negro.",

  check() {
    return (
      saveData.completedRifts.rhyhorn === true &&
      saveData.stats.totalMimicsKilled >= 5
    );
  },

  unlock() {
    saveData.unlocks.bigBlackChestItems = true;

    unlockEncyclopedia("items", "eviolite");
    unlockEncyclopedia("items", "runningShoes");
    unlockEncyclopedia("items", "drill");
    unlockEncyclopedia("items", "leaderBadge");
  }
},
  defeatAllSenseis: {
  id: "defeatAllSenseis",
  name: "Alumno graduado",
  description: "Derrota a los 5 Senseis.",
  reward: "Desbloquea la Skin 5.",

  check() {
    return saveData.stats.totalSenseisDefeated >= 5;
  },

  unlock() {
    saveData.unlocks.skin5 = true;

    if (!saveData.unlockedSkins.includes("skin5")) {
      saveData.unlockedSkins.push("skin5");
    }
  }
},
  rescue5Prisoners: {
  id: "rescue5Prisoners",
  name: "Fuga improvisada",
  description: "Libera a 5 prisioneros.",
  reward: "Desbloquea la Skin 4: Randes Prisionero.",

  check() {
    return saveData.stats.totalPrisonersRescued >= 5;
  },

  unlock() {
    saveData.unlocks.skin4 = true;
    unlockSkin("skin4");
  }
},

rescue10Prisoners: {
  id: "rescue10Prisoners",
  name: "Cuidado, que se cae",
  description: "Libera a 10 prisioneros.",
  reward: "Desbloquea la Pastilla de Jabón.",

  check() {
    return saveData.stats.totalPrisonersRescued >= 10;
  },

  unlock() {
    saveData.unlocks.soap = true;
    unlockEncyclopedia("items", "soap");
  }
},

rescue15Prisoners: {
  id: "rescue15Prisoners",
  name: "Arma carcelaria",
  description: "Libera a 15 prisioneros.",
  reward: "Desbloquea el Calcetín con Piedra.",

  check() {
    return saveData.stats.totalPrisonersRescued >= 15;
  },

  unlock() {
    saveData.unlocks.sockRock = true;
    unlockEncyclopedia("weapons", "sockRock");
  }
},
  kill100GoldSlimes: {
  id: "kill100GoldSlimes",
  name: "Fiebre del oro",
  description: "Derrota a 10 Slimes de Oro.",
  reward: "Desbloquea el Plort de Oro.",

  check() {
    return saveData.stats.totalGoldSlimeKills >= 10;
  },

  unlock() {
    saveData.unlocks.goldPlort = true;
    unlockEncyclopedia("items", "goldPlort");
  }
},
  kill200Slimes: {
  id: "kill200Slimes",
  name: "Mermelada viscosa",
  description: "Derrota a 200 slimes.",
  reward: "Desbloquea el Tarro de Mermelada de Slime.",

  check() {
    return saveData.stats.totalSlimeKills >= 200;
  },

  unlock() {
    saveData.unlocks.slimeJam = true;
    unlockEncyclopedia("items", "slimeJam");
  }
},

kill500Slimes: {
  id: "kill500Slimes",
  name: "Economía de Plorts",
  description: "Derrota a 500 slimes.",
  reward: "Desbloquea el Plort Verde.",

  check() {
    return saveData.stats.totalSlimeKills >= 500;
  },

  unlock() {
    saveData.unlocks.greenPlort = true;
    unlockEncyclopedia("items", "greenPlort");
  }
},
  kill100FireSlimeSmall: {
  id: "kill100FireSlimeSmall",
  name: "Fuego controlado",
  description: "Derrota a 100 Slimes de Fuego.",
  reward: "Desbloquea el Plort de Fuego.",

  check() {
    return saveData.stats.totalFireSlimeSmallKills >= 100;
  },

  unlock() {
    saveData.unlocks.firePlort = true;
    unlockEncyclopedia("items", "firePlort");
  }
},
  kill1000Slimes: {
  id: "kill1000Slimes",
  name: "El corral antislime",
  description: "Derrota a 1000 slimes.",
  reward: "Desbloquea la Gallina.",

  check() {
    return saveData.stats.totalSlimeKills >= 1000;
  },

  unlock() {
    saveData.unlocks.chicken = true;
    unlockEncyclopedia("items", "chicken");
  }
},
  reachLevel10: {
  id: "reachLevel10",
  name: "Usuario avanzado",
  description: "Alcanza el nivel 10 en una partida.",
  reward: "Desbloquea el Cursor.",

  check() {
    return player.level >= 10;
  },

  unlock() {
    saveData.unlocks.cursor = true;
    unlockEncyclopedia("weapons", "cursor");
  }
},
  summon50Chickens: {
  id: "summon50Chickens",
  name: "Gallinero estable",
  description: "Invoca 50 gallinas.",
  reward: "Desbloquea el Gallo de Pelea.",

  check() {
    return saveData.stats.totalChickensSummoned >= 50;
  },

  unlock() {
    saveData.unlocks.rooster = true;
    unlockEncyclopedia("weapons", "rooster");
  }
},
  kill25GoldSlimes: {
  id: "kill25GoldSlimes",
  name: "Brillo enorme",
  description: "Derrota a 25 Slimes de Oro.",
  reward: "Desbloquea el Slime de Oro Gigante.",

  check() {
    return saveData.stats.totalGoldSlimeKills >= 25;
  },

  unlock() {
    saveData.unlocks.goldSlimeGiant = true;
    unlockEncyclopedia("enemies", "goldSlimeGiant");
  }
},
  kill100PinkSlimes: {
  id: "kill100PinkSlimes",
  name: "Salto rosado",
  description: "Derrota a 100 Slimes Rosas.",
  reward: "Desbloquea el Slime Rosa Gigante.",

  check() {
    return saveData.stats.totalPinkSlimeKills >= 100;
  },

  unlock() {
    saveData.unlocks.pinkSlimeGiant = true;
    unlockEncyclopedia("enemies", "pinkSlimeGiant");
  }
},

  unlockCloudSlimeGiant: {
  id: "unlockCloudSlimeGiant",
  name: "Cumulonimbo baboso",
  description: "Derrota a 100 Slimes Rosas Gigantes, 100 Slimes de Fuego Gigantes y 100 Slimes Gigantes.",
  reward: "Desbloquea el Slime Nube Gigante.",

  check() {
    return (saveData.stats.totalPinkSlimeGiantKills || 0) >= 100 &&
      (saveData.stats.totalFireSlimeGiantKills || 0) >= 100 &&
      (saveData.stats.totalSlimeGiantKills || 0) >= 100;
  },

  unlock() {
    saveData.unlocks.cloudSlimeGiant = true;
    unlockEncyclopedia("enemies", "cloudSlimeGiant");
  }
},
  kill100CloudSlimeGiants: {
  id: "kill100CloudSlimeGiants",
  name: "Niebla domesticada",
  description: "Derrota a 100 Slimes Nube Gigantes.",
  reward: "Desbloquea el Slime Nube.",

  check() {
    return (saveData.stats.totalCloudSlimeGiantKills || 0) >= 100;
  },

  unlock() {
    saveData.unlocks.cloudSlime = true;
    unlockEncyclopedia("enemies", "cloudSlime");
  }
},

  unlockLaprasFloat: {
  id: "unlockLaprasFloat",
  name: "Socorrista del río",
  description: "Derrota a 20 enemigos dentro del bioma río.",
  reward: "Desbloquea el Flotador Lapras en los cofres negros.",

  check() {
    return (saveData.stats.totalEnemiesKilledInRiver || 0) >= 20;
  },

  unlock() {
    saveData.unlocks.laprasFloat = true;
    unlockEncyclopedia("items", "laprasFloat");
  }
},

};

function checkAchievements() {
  for (const achievement of Object.values(AchievementDatabase)) {
    if (saveData.achievements[achievement.id]) continue;

    if (achievement.check()) {
      saveData.achievements[achievement.id] = true;
      achievement.unlock();
      saveGameData(saveData);

      console.log("Logro desbloqueado:", achievement.name);
    }
  }
}
