import type { Tagged } from "type-fest";

import type { Encodable } from "./encodable.ts";

export type Decodable = Tagged<string, "Decodable">;

export function is(input: string): input is Decodable {
  return /^[1-9A-F]*$/.test(input);
}

export function decode(decodable: Decodable): Encodable {
  return decodable
    .split("")
    .map(decodeDigit)
    .join("") as Encodable;
}

function decodeDigit(digit: string): string {
  const code = parseInt(digit, 16);
  const offset = code - 1;
  return String.fromCharCode("A".charCodeAt(0) + offset);
}
