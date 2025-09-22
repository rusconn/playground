import { assertEquals } from "@std/assert";

import { type Decodable, decode } from "./decodable.ts";

const cases = [
  { input: "", output: "" },
  { input: "1234", output: "ABCD" },
  { input: "F49F", output: "ODIO" },
];

for (const { input, output } of cases) {
  Deno.test({ name: input || "(empty)" }, () => {
    assertEquals(decode(input as Decodable), output);
  });
}
