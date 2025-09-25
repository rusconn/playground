import type { TypedArray } from "type-fest";

import type { PosInt } from "../_data/posint.ts";

export function chunks<T extends TypedArray>(
  array: T,
  chunkSize: PosInt,
): T[] {
  const chunks: T[] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.subarray(i, i + chunkSize) as T;
    chunks.push(chunk);
  }
  return chunks;
}
