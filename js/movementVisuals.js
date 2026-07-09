function isFriendlyEntity(entity) {
  return entity?.faction === "ally" || entity?.isAlly === true || entity?.tags?.includes("ally");
}

function isHostileEntity(entity) {
  return entity?.faction === "enemy" && !isFriendlyEntity(entity);
}

function getFactionPrefix(entity) {
  if (entity?.faction) return entity.faction;
  if (isFriendlyEntity(entity)) return "ally";
  return "enemy";
}
