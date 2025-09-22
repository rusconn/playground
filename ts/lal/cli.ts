#!/usr/bin/env -S deno run

import * as Decodable from "./decodable.ts";
import * as Encodable from "./encodable.ts";

const [mode, message] = Deno.args;
if ((mode !== "encode" && mode !== "decode") || message == null) {
  console.error("USAGE: <encode|decode> <message>");
  Deno.exit(1);
}

const run = <T extends string, U>(is: (s: string) => s is T, codec: (s: T) => U) => {
  if (!is(message)) {
    console.error("Invalid input");
    Deno.exit(1);
  }
  console.log(codec(message));
};

if (mode === "encode") {
  run(Encodable.is, Encodable.encode);
} else {
  run(Decodable.is, Decodable.decode);
}
