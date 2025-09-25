#!/usr/bin/env -S deno run --allow-read

import { readAllSync } from "@std/io";

import * as Base62 from "@rusconn/base62";

function main(): void {
  const [command, path] = Deno.args;

  switch (command) {
    case "encode":
      return encode(path);
    case "decode":
      return decode(path);
    default:
      exitError("USAGE: <encode|decode> [path]");
  }
}

function encode(path?: string): void {
  const bytes = tryReadSync(path);
  if (Error.isError(bytes)) {
    exitError(bytes);
  }

  const base62 = Base62.encode(bytes);
  Deno.stdout.writeSync(new TextEncoder().encode(base62));
}

function decode(path?: string): void {
  const base62Bytes = tryReadSync(path);
  if (Error.isError(base62Bytes)) {
    exitError(base62Bytes);
  }

  const base62 = new TextDecoder().decode(base62Bytes).trim();
  if (!Base62.is(base62)) {
    exitError("Invalid base62 string");
  }

  Deno.stdout.writeSync(Base62.decode(base62));
}

function tryReadSync(path?: string): Uint8Array | Error {
  if (path != null) {
    try {
      using file = Deno.openSync(path, { read: true });
      return readAllSync(file);
    } catch (e) {
      return e as Error;
    }
  } else {
    return readAllSync(Deno.stdin);
  }
}

function exitError(e: string | Error, code = 1): never {
  console.error(typeof e === "string" ? e : e.message);
  Deno.exit(code);
}

main();
