/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { KillProcess } from "../tools/kill_process.ts";
import { writeJson } from "../temp_deps/writeJson.ts";
import type { objectGen } from "../utils/types.ts";
import { LogPackages } from "../utils/logs.ts";
import { newVersion } from "../tools/logs.ts";

/**
 * takes the import map file and returns its information.
 * @return {string} string.
 */

export async function getImportMap(): Promise<string>{
  const decoder = new TextDecoder("utf-8");

  // * get data from import_map and return data
  const Package = await Deno.readFile("./import_map.json");

  return decoder.decode(Package);
}

/**
 * sort the packages in the import map file in alphabetical order.
 * @param {object} map - object that contains all the packages.
 * @return {object} the ordered object.
 */

function sortedPackage(map: any): objectGen {
  return Object.keys(map)
    .sort()
    .reduce((result: objectGen, key) => {
      result[key] = map[key];
      return result;
    }, {});
}

/**
 * if the import map file does not exist create it and add the packages.
 * @param {object} map - the object with all the packages.
 * @param {boolean} log - parameter to display a message after installation.
 * @return void
 */

export async function createPackage(map: Object, log?: Boolean) {

  // * create import_map.json
  const create = await Deno.create("./import_map.json");
  create.close();

  // * write import config inside import_map.json
  await writeJson(
    "./import_map.json",
    { imports: sortedPackage(map) },
    { spaces: 2 }
  );

  if (log) {
    LogPackages(map);
    // kill opened process
    KillProcess(Deno.resources());
    // show notification if exist a new version avaliable
    await newVersion();
  }
}
