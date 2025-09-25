import type { Tagged } from "type-fest";

import type { Int } from "./int.ts";

export type PosInt = Tagged<Int, "Pos">;
