import { assertEquals } from "@std/assert";

import type { Base62 } from "./base62.ts";
import { encode } from "./encode.ts";

const encoder = new TextEncoder();

const cases = [
  { inputAsStr: "", output: "" },
  { inputAsStr: "A", output: "13" },
  { inputAsStr: "a", output: "1Z" },
  { inputAsStr: "0", output: "m" },
  { inputAsStr: "9", output: "v" },
  { inputAsStr: "!", output: "X" },
  { inputAsStr: "AB", output: "4LS" },
  { inputAsStr: "az", output: "6UU" },
  { inputAsStr: "\u0000A", output: "13" },
  { inputAsStr: "ÿ", output: "D2F" },
  { inputAsStr: "\u0000ÿ", output: "D2F" },
  { inputAsStr: "あ", output: "10Yj4" },
  { inputAsStr: "漢", output: "11RoI" },
  { inputAsStr: "Hello", output: "5TP3P3v" },
  { inputAsStr: "Base62", output: "KixpUr22" },
  { inputAsStr: " ", output: "W" },
  { inputAsStr: "\n", output: "A" },
  { inputAsStr: "\u0000", output: "0" },
  { inputAsStr: "😀", output: "4PCnnk" },
  { inputAsStr: "\u0000\u0000\u0000\u0000", output: "0" },
  { inputAsStr: "abc\u0000def", output: "21XiQdAqHO" },
] as { inputAsStr: string; output: Base62 }[];

for (const { inputAsStr, output } of cases) {
  const input = encoder.encode(inputAsStr);

  Deno.test({ name: inputAsStr || "(empty)" }, () => {
    assertEquals(encode(input), output);
  });
}
