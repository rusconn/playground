import { CHARS } from "./_common.ts";
import type { Base62 } from "./base62.ts";

export function decode(decodable: Base62): Uint8Array {
  const coeffs = [...decodable].map((ch) => TABLE[ch]!);

  let decimal = coeffs.reduce((acc, coeff) => acc * 62n + BigInt(coeff), 0n);

  const bytes: number[] = [];
  while (decimal > 0n) {
    bytes.push(Number(decimal & 0xffn));
    decimal >>= 8n;
  }

  return Uint8Array.from(bytes.reverse());
}

const TABLE = Object.fromEntries([...CHARS].map((c, i) => [c, i]));
