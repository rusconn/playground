import type { Base64 } from "../../../lib/base64.ts";
import { TABLE } from "./_common.ts";

export function decode(base64: Base64): Uint8Array {
  const chars = base64.replaceAll("=", "");
  let bits = 0b0;
  let bitCount = 0;
  const bytes: number[] = [];

  for (const ch of chars) {
    const val = TABLE[ch]!;
    bits = (bits << 6) | val;
    bitCount += 6;

    if (bitCount >= 8) {
      bitCount -= 8;
      bytes.push((bits >> bitCount) & 0xff);
    }
  }

  return new Uint8Array(bytes);
}
