import type { Base64 } from "../../../lib/base64.ts";
import { CHARS } from "./_common.ts";

export function encode(bytes: Uint8Array): Base64 {
  let bits = 0b0;
  let bitCount = 0;
  const chars: string[] = [];

  for (const byte of bytes) {
    bits = (bits << 8) | byte;
    bitCount += 8;
    while (bitCount >= 6) {
      bitCount -= 6;
      chars.push(CHARS[(bits >> bitCount) & 0b111111]!);
    }
  }

  if (bitCount > 0) {
    chars.push(CHARS[(bits << (6 - bitCount)) & 0b111111]!);
  }

  return chars.join("").padEnd(Math.ceil(chars.length / 4) * 4, "=") as Base64;
}
