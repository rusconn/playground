import type { Base64 } from "../../../lib/base64.ts";
import type { PosInt } from "../../_data/posint.ts";
import * as TypedArrayUtil from "../../_utils/typed-array.ts";

export function encode(bytes: Uint8Array): Base64 {
  const chunkSize = 32 * 2 ** 10 as PosInt; // 32Ki
  const chunks = TypedArrayUtil.chunks(bytes, chunkSize);
  const latin1s = chunks.map((chunk) => String.fromCharCode(...chunk));
  return btoa(latin1s.join("")) as Base64;
}
