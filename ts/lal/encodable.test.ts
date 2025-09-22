import { assertEquals } from "@std/assert";

import { type Encodable, encode } from "./encodable.ts";

const cases = [
  { input: "ABCD", output: "1234" },
  { input: "ODIO", output: "F49F" },
];

for (const { input, output } of cases) {
  Deno.test({ name: input }, () => {
    assertEquals(encode(input as Encodable), output);
  });
}
