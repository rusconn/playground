import type { Tagged } from "type-fest";

export { decode } from "./decode.ts";
export { encode } from "./encode.ts";

export type Base62 = Tagged<string, "Base62">;

export function is(input: string): input is Base62 {
  return /^[0-9A-Za-z]*$/.test(input);
}
