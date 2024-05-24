import { readFileSync } from "fs";
import path from "path";
import { formatAndWriteSolidity, contractToInterface, type RelativeImportDatum } from "@latticexyz/common/codegen";
import { renderSystemInterface } from "./renderSystemInterface";
import { renderWorldInterface } from "./renderWorldInterface";
import { resolveWorldConfig } from "../../config/resolveWorldConfig";
import { World as WorldConfig } from "../../config/v2/output";
import { worldToV1 } from "../../config/v2/compat";

export async function worldgen(
  configV2: WorldConfig,
  existingContracts: { path: string; basename: string }[],
  outputBaseDirectory: string,
) {
  const config = worldToV1(configV2);
  const resolvedConfig = resolveWorldConfig(
    config,
    existingContracts.map(({ basename }) => basename),
  );

  const worldgenBaseDirectory = path.join(outputBaseDirectory, config.worldgenDirectory);
  const systems = existingContracts.filter(({ basename }) => Object.keys(resolvedConfig.systems).includes(basename));

  const systemInterfaceImports: RelativeImportDatum[] = [];
  for (const system of systems) {
    const data = readFileSync(system.path, "utf8");
    // get external funcions from a contract
    const { functions, errors, symbolImports } = contractToInterface(data, system.basename);
    const imports = symbolImports.map((symbolImport) => {
      if (symbolImport.path[0] === ".") {
        // relative import
        return {
          symbol: symbolImport.symbol,
          fromPath: path.join(path.dirname(system.path), symbolImport.path),
          usedInPath: worldgenBaseDirectory,
        };
      } else {
        // absolute import
        return {
          symbol: symbolImport.symbol,
          path: symbolImport.path,
        };
      }
    });

    const systemInterfaceName = `I${system.basename}`;
    const fileName = `${systemInterfaceName}.sol`;

    const parsedPath = path.parse(system.path);

    console.log(parsedPath.dir);
    if (parsedPath.dir === "src/systems" || !parsedPath.dir.includes("src/systems")) {
      const output = renderSystemInterface({
        name: systemInterfaceName,
        functionPrefix: "",
        functions,
        errors,
        imports,
      });

      // write to file
      const fullOutputPath = path.join(worldgenBaseDirectory, fileName);
      await formatAndWriteSolidity(output, fullOutputPath, "Generated system interface");

      // prepare imports for IWorld
      systemInterfaceImports.push({
        symbol: systemInterfaceName,
        fromPath: `${systemInterfaceName}.sol`,
        usedInPath: "./",
      });
    } else {
      const namespace = path.parse(parsedPath.dir).base;
      const directory = path.join(worldgenBaseDirectory, namespace);

      const output = renderSystemInterface({
        name: systemInterfaceName,
        functionPrefix: `${namespace}__`,
        functions,
        errors,
        imports,
      });

      // write to file
      const fullOutputPath = path.join(directory, fileName);
      await formatAndWriteSolidity(output, fullOutputPath, "Generated system interface");

      // prepare imports for IWorld
      systemInterfaceImports.push({
        symbol: `${namespace}__${systemInterfaceName}`,
        alias: systemInterfaceName,
        fromPath: path.join(namespace, fileName),
        usedInPath: "./",
      });
    }
  }

  // render IWorld
  const output = renderWorldInterface({
    interfaceName: config.worldInterfaceName,
    imports: systemInterfaceImports,
    storeImportPath: config.storeImportPath,
    worldImportPath: config.worldImportPath,
  });
  // write to file
  const fullOutputPath = path.join(worldgenBaseDirectory, config.worldInterfaceName + ".sol");
  await formatAndWriteSolidity(output, fullOutputPath, "Generated world interface");
}
