#!/usr/bin/env -S deno run --allow-read

import { readAllSync } from "@std/io";

import * as Base64 from "@rusconn/base64";

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

  const base64 = Base64.encode(bytes);
  Deno.stdout.writeSync(new TextEncoder().encode(base64));
}

function decode(path?: string): void {
  const base64Bytes = tryReadSync(path);
  if (Error.isError(base64Bytes)) {
    exitError(base64Bytes);
  }

  const base64 = new TextDecoder().decode(base64Bytes).trim();
  if (!Base64.is(base64)) {
    exitError("Invalid base64 string");
  }

  Deno.stdout.writeSync(Base64.decode(base64));
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
