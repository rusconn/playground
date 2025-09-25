import { CHARS } from "../../encode/algorithms/_common.ts";

export const TABLE = Object.fromEntries([...CHARS].map((c, i) => [c, i]));
