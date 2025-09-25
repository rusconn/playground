import { assertEquals } from "@std/assert";

import type { Base64 } from "../base64.ts";
import * as AtoB from "./algorithms/atob.ts";
import * as Num from "./algorithms/num.ts";
import * as Str from "./algorithms/str.ts";

const cases = [
  { input: "", outAsStr: "" },
  { input: "Zm9v", outAsStr: "foo" },
  { input: "Zm9vYmFy", outAsStr: "foobar" },
  { input: "IA==", outAsStr: " " },
  { input: "IQ==", outAsStr: "!" },
  { input: "SGVsbG8sIFdvcmxkIQ==", outAsStr: "Hello, World!" },
  { input: "Cg==", outAsStr: "\n" },
  { input: "DQo=", outAsStr: "\r\n" },
  { input: "44GT44KT44Gr44Gh44Gv", outAsStr: "こんにちは" },
  { input: "8KCut+mHjuWutg==", outAsStr: "𠮷野家" },
  { input: "8J+Yig==", outAsStr: "😊" },
] as { input: Base64; outAsStr: string }[];

for (const { input, outAsStr } of cases) {
  const name = input || "(empty)";
  const output = new TextEncoder().encode(outAsStr);

  Deno.test(`BtoA: ${name}`, () => {
    assertEquals(AtoB.decode(input), output);
  });
  Deno.test(`Num: ${name}`, () => {
    assertEquals(Num.decode(input), output);
  });
  Deno.test(`Str: ${name}`, () => {
    assertEquals(Str.decode(input), output);
  });
}
