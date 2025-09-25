import { assertEquals } from "@std/assert";

import type { Base64 } from "../../lib/base64.ts";
import * as BtoA from "./algorithms/btoa.ts";
import * as Num from "./algorithms/num.ts";
import * as Str from "./algorithms/str.ts";

const cases = [
  { inputAsStr: "", output: "" },
  { inputAsStr: "foo", output: "Zm9v" },
  { inputAsStr: "foobar", output: "Zm9vYmFy" },
  { inputAsStr: " ", output: "IA==" },
  { inputAsStr: "!", output: "IQ==" },
  { inputAsStr: "Hello, World!", output: "SGVsbG8sIFdvcmxkIQ==" },
  { inputAsStr: "\n", output: "Cg==" },
  { inputAsStr: "\r\n", output: "DQo=" },
  { inputAsStr: "こんにちは", output: "44GT44KT44Gr44Gh44Gv" },
  { inputAsStr: "𠮷野家", output: "8KCut+mHjuWutg==" },
  { inputAsStr: "😊", output: "8J+Yig==" },
] as { inputAsStr: string; output: Base64 }[];

for (const { inputAsStr, output } of cases) {
  const name = inputAsStr || "(empty)";
  const input = new TextEncoder().encode(inputAsStr);

  Deno.test(`BtoA: ${name}`, () => {
    assertEquals(BtoA.encode(input), output);
  });
  Deno.test(`Num: ${name}`, () => {
    assertEquals(Num.encode(input), output);
  });
  Deno.test(`Str: ${name}`, () => {
    assertEquals(Str.encode(input), output);
  });
}
