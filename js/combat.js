function getAttackTags(source, extraTags = []) {
  const base = Array.isArray(source?.tags) ? source.tags : [];
  return [...new Set([...base, ...extraTags])];
}
