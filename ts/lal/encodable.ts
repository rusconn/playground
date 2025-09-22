import type { Tagged } from "type-fest";

import type { Decodable } from "./decodable.ts";

export type Encodable = Tagged<string, "Encodable">;

export function is(input: string): input is Encodable {
  return /^[A-O]*$/.test(input);
}

export function encode(encodable: Encodable): Decodable {
  return encodable
    .split("")
    .map(encodeLetter)
    .join("") as Decodable;
}

function encodeLetter(letter: string): string {
  const offset = letter.charCodeAt(0) - "A".charCodeAt(0);
  const decimal = offset + 1;
  return decimal.toString(16).toUpperCase();
}
