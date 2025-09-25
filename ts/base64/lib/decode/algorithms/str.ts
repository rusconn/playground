import type { Base64 } from "../../../lib/base64.ts";
import type { PosInt } from "../../_data/posint.ts";
import * as ArrayUtil from "../../_utils/array.ts";
import { TABLE } from "./_common.ts";

export function decode(base64: Base64): Uint8Array {
  const chars = base64.replaceAll("=", "");
  const segs = [...chars].map((ch) => TABLE[ch]!);

  const bits = segs.map((seg) => seg.toString(2).padStart(6, "0")).join("");
  const trimmedBits = bits.slice(0, Math.floor(bits.length / 8) * 8);
  const bytes = ArrayUtil.chunks([...trimmedBits], 8 as PosInt)
    .map((seg) => parseInt(seg.join(""), 2));

  return new Uint8Array(bytes);
}
