module.exports =
  entities =>
    entities.reduce(
      (groupedEntities, entity) =>
        ({
          ...groupedEntities,
          [entity.buildingId]: !groupedEntities[entity.buildingId]
            ? [entity]
            : [...groupedEntities[entity.buildingId], entity]
        }),
      {}
    );
