import type { Base64 } from "../../base64.ts";

export function encode(bytes: Uint8Array): Base64 {
  const buf = [];
  const chunkSize = 32 * 2 ** 10; // 32Ki

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    buf.push(String.fromCharCode(...chunk));
  }

  return btoa(buf.join("")) as Base64;
}
