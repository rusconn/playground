import type { Base64 } from "../../../lib/base64.ts";
import type { PosInt } from "../../_data/posint.ts";
import * as ArrayUtil from "../../_utils/array.ts";
import { CHARS } from "./_common.ts";

export function encode(bytes: Uint8Array): Base64 {
  const bits = [...bytes].map((byte) => byte.toString(2).padStart(8, "0")).join("");

  const paddedBits = bits.padEnd(Math.ceil(bits.length / 6) * 6, "0");

  const segs = ArrayUtil.chunks([...paddedBits], 6 as PosInt).map((seg) => seg.join(""));
  const chars = segs.map((seg) => CHARS[parseInt(seg, 2)]!).join("");

  return chars.padEnd(Math.ceil(chars.length / 4) * 4, "=") as Base64;
}
