import { assertEquals } from "@std/assert";

import type { Base62 } from "./base62.ts";
import { decode } from "./decode.ts";

const encoder = new TextEncoder();

const cases = [
  { input: "", outputAsStr: "" },
  { input: "13", outputAsStr: "A" },
  { input: "1Z", outputAsStr: "a" },
  { input: "m", outputAsStr: "0" },
  { input: "v", outputAsStr: "9" },
  { input: "X", outputAsStr: "!" },
  { input: "4LS", outputAsStr: "AB" },
  { input: "6UU", outputAsStr: "az" },
  { input: "D2F", outputAsStr: "ÿ" },
  { input: "10Yj4", outputAsStr: "あ" },
  { input: "11RoI", outputAsStr: "漢" },
  { input: "5TP3P3v", outputAsStr: "Hello" },
  { input: "KixpUr22", outputAsStr: "Base62" },
  { input: "W", outputAsStr: " " },
  { input: "A", outputAsStr: "\n" },
  { input: "4PCnnk", outputAsStr: "😀" },
  { input: "21XiQdAqHO", outputAsStr: "abc\u0000def" },
] as { input: Base62; outputAsStr: string }[];

for (const { input, outputAsStr } of cases) {
  const output = encoder.encode(outputAsStr);

  Deno.test({ name: input || "(empty)" }, () => {
    assertEquals(decode(input), output);
  });
}
