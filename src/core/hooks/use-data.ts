/* @leny/bowlstats
 *
 * /src/core/hooks/use-data.js
 */

import type {DataStore} from "core/data-store";

import {useContext} from "react";
import {DataStoreContext} from "core/data-store";

export const useData = (): DataStore => useContext(DataStoreContext);
