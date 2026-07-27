import { buildings, clients, powerAssets } from "../data/bmsData";

export const normalizeId = (value) =>
  value === null || value === undefined ? "" : String(value);

const uniqueStrings = (values) => [
  ...new Set(
    (Array.isArray(values) ? values : [])
      .map((value) => normalizeId(value).trim())
      .filter(Boolean)
  ),
];

const toIdSet = (values) => new Set(uniqueStrings(values));

const clientOptions = clients.map((name) => ({
  id: name,
  name,
}));

const buildingOptions = buildings.map((building) => ({
  ...building,
  clientIds: clientOptions.map((client) => client.id),
}));

const blockOptions = buildingOptions.map((building) => ({
  id: `${building.id}-core`,
  name: `${building.name} Core`,
  buildingId: building.id,
}));

const floorOptions = buildingOptions.flatMap((building) => {
  const blockId = `${building.id}-core`;

  return Array.from({ length: building.floors }, (_, index) => {
    const floorNumber = String(index + 1);

    return {
      id: `${building.id}:${floorNumber}`,
      name: `${building.name} Floor ${floorNumber}`,
      floorNumber,
      buildingId: building.id,
      blockId,
    };
  });
});

const createSlug = (value) =>
  normalizeId(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getFloorZoneClients = (floorNumber) => {
  const startIndex = Math.max(0, (Number(floorNumber) - 1) * 4);
  return clients.slice(startIndex, startIndex + 4);
};

const createZoneId = ({ buildingId, floorNumber, routeId, clientId }) =>
  `${buildingId}:${floorNumber}:zone-${routeId}:${createSlug(clientId)}`;

const zoneOptions = floorOptions.flatMap((floor) =>
  getFloorZoneClients(floor.floorNumber).map((clientId, index) => {
    const routeId = String(index + 1);

    return {
      id: createZoneId({
        buildingId: floor.buildingId,
        floorNumber: floor.floorNumber,
        routeId,
        clientId,
      }),
      name: clientId,
      zoneName: clientId,
      zoneLabel: `Zone ${routeId}`,
      routeId,
      clientId,
      clientName: clientId,
      buildingId: floor.buildingId,
      buildingName:
        buildingOptions.find(
          (building) =>
            normalizeId(building.id) === normalizeId(floor.buildingId)
        )?.name || floor.buildingId,
      blockId: floor.blockId,
      floorId: floor.id,
      floorName: floor.name,
      floorNumber: floor.floorNumber,
    };
  })
);

const systemOptions = floorOptions.flatMap((floor) =>
  powerAssets.map((asset) => ({
    id: `${floor.id}:${asset.id}`,
    name: `${floor.name} · ${asset.title}`,
    assetId: asset.id,
    title: asset.title,
    buildingId: floor.buildingId,
    blockId: floor.blockId,
    floorId: floor.id,
  }))
);

const filterValid = (ids, options) => {
  const validIds = new Set(options.map((item) => normalizeId(item.id)));
  return uniqueStrings(ids).filter((id) => validIds.has(id));
};

export const getClientsAllowedForAdmin = (admin) => {
  const adminClientIds = toIdSet(admin?.assignedClientIds);

  return clientOptions.filter((client) =>
    adminClientIds.has(normalizeId(client.id))
  );
};

export const getBuildingsAllowedForAdmin = (
  admin,
  selectedClientIds = []
) => {
  const adminBuildingIds = toIdSet(admin?.assignedBuildingIds);
  const selectedClients = toIdSet(selectedClientIds);

  if (selectedClients.size === 0) {
    return [];
  }

  return buildingOptions.filter(
    (building) =>
      adminBuildingIds.has(normalizeId(building.id)) &&
      building.clientIds.some((clientId) =>
        selectedClients.has(normalizeId(clientId))
      )
  );
};

export const getBlocksAllowedForAdmin = (
  admin,
  selectedBuildingIds = []
) => {
  const adminBlockIds = toIdSet(admin?.assignedBlockIds);
  const selectedBuildings = toIdSet(selectedBuildingIds);

  if (selectedBuildings.size === 0) {
    return [];
  }

  return blockOptions.filter(
    (block) =>
      adminBlockIds.has(normalizeId(block.id)) &&
      selectedBuildings.has(normalizeId(block.buildingId))
  );
};

export const getFloorsAllowedForAdmin = (
  admin,
  selectedBlockIds = []
) => {
  const adminFloorIds = toIdSet(admin?.assignedFloorIds);
  const selectedBlocks = toIdSet(selectedBlockIds);

  if (selectedBlocks.size === 0) {
    return [];
  }

  return floorOptions.filter(
    (floor) =>
      adminFloorIds.has(normalizeId(floor.id)) &&
      selectedBlocks.has(normalizeId(floor.blockId))
  );
};

export const getSystemsAllowedForAdmin = (
  admin,
  selectedFloorIds = []
) => {
  const adminSystemIds = toIdSet(admin?.assignedSystemIds);
  const selectedFloors = toIdSet(selectedFloorIds);

  if (selectedFloors.size === 0) {
    return [];
  }

  return systemOptions.filter(
    (system) =>
      adminSystemIds.has(normalizeId(system.id)) &&
      selectedFloors.has(normalizeId(system.floorId))
  );
};

export const getAllClients = () => clientOptions;

export const getAllBuildings = () => buildingOptions;

export const getAllBlocks = () => blockOptions;

export const getAllFloors = () => floorOptions;

export const getAllSystems = () => systemOptions;

export const getAllZones = () => zoneOptions;

export const getFloorZoneOptions = () => zoneOptions;

export const getClientById = (clientId) =>
  clientOptions.find(
    (client) => String(client.id) === String(clientId)
  ) || null;

export const getBuildingsForClient = (clientId) =>
  buildingOptions.filter((building) =>
    building.clientIds.some(
      (assignedClientId) =>
        normalizeId(assignedClientId) === normalizeId(clientId)
    )
  );

export const getBuildingsForClients = (clientIds) => {
  const selectedClientIds = uniqueStrings(clientIds);

  if (selectedClientIds.length === 0) {
    return [];
  }

  return buildingOptions.filter((building) =>
    selectedClientIds.some((clientId) =>
      building.clientIds.includes(clientId)
    )
  );
};

export const getBuildingById = (buildingId) =>
  buildingOptions.find(
    (building) => normalizeId(building.id) === normalizeId(buildingId)
  ) || null;

export const getBlocksForBuilding = (buildingId) =>
  blockOptions.filter(
    (block) => normalizeId(block.buildingId) === normalizeId(buildingId)
  );

export const getBlocksForBuildings = (buildingIds) => {
  const selectedBuildingIds = uniqueStrings(buildingIds);

  return blockOptions.filter((block) =>
    selectedBuildingIds.includes(String(block.buildingId))
  );
};

export const getBlockById = (blockId) =>
  blockOptions.find(
    (block) => normalizeId(block.id) === normalizeId(blockId)
  ) || null;

export const getFloorsForBlock = (blockId) =>
  floorOptions.filter(
    (floor) => normalizeId(floor.blockId) === normalizeId(blockId)
  );

export const getFloorsForBlocks = (blockIds) => {
  const selectedBlockIds = uniqueStrings(blockIds);

  return floorOptions.filter((floor) =>
    selectedBlockIds.includes(String(floor.blockId))
  );
};

export const getFloorById = (floorId) =>
  floorOptions.find(
    (floor) => normalizeId(floor.id) === normalizeId(floorId)
  ) || null;

export const getZoneById = (zoneId) =>
  zoneOptions.find(
    (zone) => normalizeId(zone.id) === normalizeId(zoneId)
  ) || null;

export const getZonesForFloor = (floorId) =>
  zoneOptions.filter(
    (zone) => normalizeId(zone.floorId) === normalizeId(floorId)
  );

export const getZoneForFloorRoute = (buildingId, floorNumber, routeId) =>
  zoneOptions.find(
    (zone) =>
      normalizeId(zone.buildingId) === normalizeId(buildingId) &&
      normalizeId(zone.floorNumber) === normalizeId(floorNumber) &&
      normalizeId(zone.routeId) === normalizeId(routeId)
  ) || null;

export const getSystemsForFloorOrScope = ({
  floorIds = [],
  blockIds = [],
  buildingIds = [],
} = {}) => {
  const selectedFloorIds = uniqueStrings(floorIds);
  const selectedBlockIds = uniqueStrings(blockIds);
  const selectedBuildingIds = uniqueStrings(buildingIds);

  return systemOptions.filter((system) => {
    if (selectedFloorIds.length > 0) {
      return selectedFloorIds.includes(normalizeId(system.floorId));
    }

    if (selectedBlockIds.length > 0) {
      return selectedBlockIds.includes(normalizeId(system.blockId));
    }

    if (selectedBuildingIds.length > 0) {
      return selectedBuildingIds.includes(normalizeId(system.buildingId));
    }

    return false;
  });
};

export const validateClientIds = (ids) =>
  filterValid(ids, clientOptions);

export const validateBuildingIds = (ids) =>
  filterValid(ids, buildingOptions);

export const validateBlockIds = (ids) =>
  filterValid(ids, blockOptions);

export const validateFloorIds = (ids) =>
  filterValid(ids, floorOptions);

export const validateSystemIds = (ids) =>
  filterValid(ids, systemOptions);

export const validateZoneIds = (ids) =>
  filterValid(ids, zoneOptions);

export const isBuildingInsideClient = (buildingId, clientId) =>
  Boolean(
    getBuildingById(buildingId)?.clientIds.some(
      (assignedClientId) =>
        normalizeId(assignedClientId) === normalizeId(clientId)
    )
  );

export const isBlockInsideBuilding = (blockId, buildingId) =>
  normalizeId(getBlockById(blockId)?.buildingId) ===
  normalizeId(buildingId);

export const isFloorInsideBlock = (floorId, blockId) =>
  normalizeId(getFloorById(floorId)?.blockId) === normalizeId(blockId);

export const pruneScope = (scope) => {
  const assignedClientIds = validateClientIds(
    scope.assignedClientIds
  );

  const availableBuildings = getBuildingsForClients(
    assignedClientIds
  );
  const assignedBuildingIds = filterValid(
    scope.assignedBuildingIds,
    availableBuildings
  );

  const availableBlocks = getBlocksForBuildings(
    assignedBuildingIds
  );
  const assignedBlockIds = filterValid(
    scope.assignedBlockIds,
    availableBlocks
  );

  const availableFloors = getFloorsForBlocks(assignedBlockIds);
  const assignedFloorIds = filterValid(
    scope.assignedFloorIds,
    availableFloors
  );

  const availableSystems = getSystemsForFloorOrScope({
    floorIds: assignedFloorIds,
    blockIds: assignedBlockIds,
    buildingIds: assignedBuildingIds,
  });
  const assignedSystemIds = filterValid(
    scope.assignedSystemIds,
    availableSystems
  );

  return {
    assignedClientIds,
    assignedBuildingIds,
    assignedBlockIds,
    assignedFloorIds,
    assignedSystemIds,
  };
};

export const normalizeUserHierarchySelection = (scope = {}) => {
  const selectedClientIds = new Set(validateClientIds(scope.assignedClientIds));
  const selectedBuildingIds = new Set(validateBuildingIds(scope.assignedBuildingIds));
  const selectedBlockIds = new Set(validateBlockIds(scope.assignedBlockIds));
  const selectedFloorIds = new Set(validateFloorIds(scope.assignedFloorIds));
  const selectedSystemIds = new Set(validateSystemIds(scope.assignedSystemIds));
  const selectedZoneIds = new Set(validateZoneIds(scope.assignedZoneIds));

  selectedZoneIds.forEach((zoneId) => {
    const zone = getZoneById(zoneId);

    if (zone) {
      selectedClientIds.add(zone.clientId);
      selectedFloorIds.add(zone.floorId);
      selectedBlockIds.add(zone.blockId);
      selectedBuildingIds.add(zone.buildingId);
    }
  });

  selectedSystemIds.forEach((systemId) => {
    const system = systemOptions.find(
      (item) => normalizeId(item.id) === normalizeId(systemId)
    );

    if (system) {
      selectedFloorIds.add(system.floorId);
      selectedBlockIds.add(system.blockId);
      selectedBuildingIds.add(system.buildingId);
    }
  });

  selectedFloorIds.forEach((floorId) => {
    const floor = getFloorById(floorId);

    if (floor) {
      selectedBlockIds.add(floor.blockId);
      selectedBuildingIds.add(floor.buildingId);
    }
  });

  selectedBlockIds.forEach((blockId) => {
    const block = getBlockById(blockId);

    if (block) {
      selectedBuildingIds.add(block.buildingId);
    }
  });

  return {
    assignedClientIds: filterValid([...selectedClientIds], clientOptions),
    assignedBuildingIds: filterValid([...selectedBuildingIds], buildingOptions),
    assignedBlockIds: filterValid([...selectedBlockIds], blockOptions),
    assignedFloorIds: filterValid([...selectedFloorIds], floorOptions),
    assignedSystemIds: filterValid([...selectedSystemIds], systemOptions),
    assignedZoneIds: filterValid([...selectedZoneIds], zoneOptions),
  };
};

export const migrateFloorAssignmentsToZones = (scope = {}) => {
  if (Array.isArray(scope.assignedZoneIds)) {
    return normalizeUserHierarchySelection(scope);
  }

  const assignedZoneIds = validateFloorIds(scope.assignedFloorIds).flatMap(
    (floorId) => getZonesForFloor(floorId).map((zone) => zone.id)
  );

  return normalizeUserHierarchySelection({
    ...scope,
    assignedZoneIds,
  });
};

export const getScopeLabels = (scope = {}) => {
  const lookupLabels = (ids, getter) =>
    uniqueStrings(ids)
      .map((id) => getter(id)?.name || getter(id)?.title || id)
      .filter(Boolean);

  return {
    clients: lookupLabels(scope.assignedClientIds, getClientById),
    buildings: lookupLabels(scope.assignedBuildingIds, getBuildingById),
    blocks: lookupLabels(scope.assignedBlockIds, getBlockById),
    floors: lookupLabels(scope.assignedFloorIds, getFloorById),
    zones: lookupLabels(scope.assignedZoneIds, getZoneById),
    systems: uniqueStrings(scope.assignedSystemIds).map(
      (id) => systemOptions.find((system) => system.id === id)?.name || id
    ),
  };
};

export const hierarchySnapshot = {
  clients: clientOptions,
  buildings: buildingOptions,
  blocks: blockOptions,
  floors: floorOptions,
  zones: zoneOptions,
  systems: systemOptions,
};
