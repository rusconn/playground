import type { PosInt } from "../_data/posint.ts";

export function chunks<T>(xs: T[], n: PosInt): T[][] {
  const buf: T[][] = [];
  for (let i = 0; i < xs.length; i += n) {
    buf.push(xs.slice(i, i + n));
  }
  return buf;
}
