import type { PosInt } from "../_data/posint.ts";

export function chunks<T>(xs: T[], n: PosInt): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < xs.length; i += n) {
    chunks.push(xs.slice(i, i + n));
  }
  return chunks;
}
