import type { Tagged } from "type-fest";

export * from "./decode/algorithms/atob.ts";
export * from "./encode/algorithms/btoa.ts";

export type Base64 = Tagged<string, "Base64">;

export function is(input: string): input is Base64 {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(input) && input.length % 4 === 0;
}
