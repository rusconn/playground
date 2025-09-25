import type { Base64 } from "../../../lib/base64.ts";

export function decode(base64: Base64): Uint8Array {
  const binStr = atob(base64);
  return Uint8Array.from(binStr, (c) => c.charCodeAt(0));
}
