import type { TypedArray } from "type-fest";

export function concat<T extends TypedArray>(arrays: T[]): T {
  if (arrays.length === 0) return new Uint8Array() as T;

  const size = arrays.reduce((sum, a) => sum + a.length, 0);
  const first = arrays[0]!;
  const constructor = first.constructor as { new (length: number): T };
  const result = new constructor(size);

  let offset = 0;
  for (const array of arrays) {
    // deno-lint-ignore no-explicit-any
    result.set(array as any, offset);
    offset += array.length;
  }

  return result;
}
