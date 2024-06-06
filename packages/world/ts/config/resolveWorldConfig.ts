import { UnrecognizedSystemErrorFactory } from "@latticexyz/config/library";
import { StoreConfig } from "@latticexyz/store/internal";
import { SystemConfig, WorldConfig } from "./types";
import { NAMESPACE_MAX_LENGTH, NAME_MAX_LENGTH } from "@latticexyz/common";

export type ResolvedSystemConfig = ReturnType<typeof resolveSystemConfig>;

export type ResolvedWorldConfig = ReturnType<typeof resolveWorldConfig>;

/**
 * Resolves the world config by combining the default and overridden system configs,
 * filtering out excluded systems, validate system names refer to existing contracts, and
 * splitting the access list into addresses and system names.
 */
export function resolveWorldConfig(
  config: Pick<StoreConfig & WorldConfig, "namespace" | "systems" | "excludeSystems">,
  existingContracts?: string[],
) {
  // Include contract names ending in "System", but not the base "System" contract, and not Interfaces
  const defaultSystemNames =
    existingContracts?.filter((name) => name.endsWith("System") && name !== "System" && !/(^|__)I[A-Z]/.test(name)) ??
    [];
  const overriddenSystemNames = Object.keys(config.systems);

  // Validate every key in systems refers to an existing system contract (and is not called "World")
  if (existingContracts) {
    for (const systemName of overriddenSystemNames) {
      if (!existingContracts.includes(systemName) || systemName === "World") {
        throw UnrecognizedSystemErrorFactory(["systems", systemName], systemName);
      }
    }
  }

  // Combine the default and overridden system names and filter out excluded systems
  const systemNames = [...new Set([...defaultSystemNames, ...overriddenSystemNames])].filter(
    (name) => !config.excludeSystems.includes(name),
  );

  // Resolve the config
  const resolvedSystems: Record<string, ResolvedSystemConfig> = systemNames.reduce((acc, systemName) => {
    return {
      ...acc,
      [systemName]: resolveSystemConfig({
        systemName,
        configNamespace: config.namespace,
        config: config.systems[systemName],
        existingContracts,
      }),
    };
  }, {});

  return { systems: resolvedSystems };
}

/**
 * Resolves the system config by combining the default and overridden system configs,
 * @param systemName name of the system
 * @param config optional SystemConfig object, if none is provided the default config is used
 * @param existingContracts optional list of existing contract names, used to validate system names in the access list. If not provided, no validation is performed.
 * @returns ResolvedSystemConfig object
 * Default value for name is `systemName`
 * Default value for registerFunctionSelectors is true
 * Default value for openAccess is true
 * Default value for accessListAddresses is []
 * Default value for accessListSystems is []
 */
export function resolveSystemConfig({
  systemName,
  configNamespace,
  config,
  existingContracts,
}: {
  systemName: string;
  configNamespace: string;
  config?: SystemConfig;
  existingContracts?: string[];
}) {
  // If the namespace is not set in the system name, default to the config namespace
  const parts = systemName.split("__");
  const namespaceIsSet = parts.length === 2;
  const namespace = (namespaceIsSet ? parts[0] : configNamespace).slice(0, NAMESPACE_MAX_LENGTH);
  const name = (namespaceIsSet ? parts[1] : parts[0]).slice(0, NAME_MAX_LENGTH);

  const registerFunctionSelectors = config?.registerFunctionSelectors ?? true;
  const openAccess = config?.openAccess ?? true;
  const accessListAddresses: string[] = [];
  const accessListSystems: string[] = [];
  const accessList = config && !config.openAccess ? config.accessList : [];

  // Split the access list into addresses and system names
  for (const accessListItem of accessList) {
    if (accessListItem.startsWith("0x")) {
      accessListAddresses.push(accessListItem);
    } else {
      // Validate every system refers to an existing system contract
      if (existingContracts && !existingContracts.includes(accessListItem)) {
        throw UnrecognizedSystemErrorFactory(["systems", systemName, "accessList"], accessListItem);
      }
      accessListSystems.push(accessListItem);
    }
  }

  return { name, namespace, registerFunctionSelectors, openAccess, accessListAddresses, accessListSystems };
}
