import { CHARS } from "./_common.ts";
import type { Base62 } from "./base62.ts";

export function encode(bytes: Uint8Array): Base62 {
  if (bytes.length === 0) return "" as Base62;

  let decimal = bytes.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n);

  if (decimal === 0n) return "0" as Base62;

  const coeffs: number[] = [];
  while (decimal > 0n) {
    const coeff = Number(decimal % 62n);
    coeffs.push(coeff);
    decimal /= 62n;
  }

  return coeffs.reverse().map((coeff) => CHARS[coeff]!).join("") as Base62;
}
