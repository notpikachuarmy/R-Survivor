function markAsAlly(entity) {
  if (!entity) return entity;
  entity.faction = "ally";
  entity.isAlly = true;
  entity.tags = [...new Set([...(entity.tags || []), "ally"] )];
  return entity;
}
