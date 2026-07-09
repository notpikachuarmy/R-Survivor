function markProjectileFaction(projectile, faction) {
  if (!projectile) return projectile;
  projectile.faction = faction;
  projectile.sourcePrefix = faction;
  return projectile;
}
