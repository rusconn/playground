#!/usr/bin/env -S deno run --allow-read

import * as FileUtil from "../_utils/file.ts";
import * as StdinUtil from "../_utils/stdin.ts";
import * as Base62 from "./base62.ts";

const [mode, path] = Deno.args;

switch (mode) {
  case "encode":
    await encode(path);
    break;
  case "decode":
    await decode(path);
    break;
  default:
    exitErr(new Error("USAGE: <encode|decode> [path]"));
}

async function encode(path?: string): Promise<void> {
  const bytes = await tryRead(path);
  if (Error.isError(bytes)) exitErr(bytes);

  const base62 = Base62.encode(bytes);
  await Deno.stdout.write(new TextEncoder().encode(base62));
}

async function decode(path?: string): Promise<void> {
  const base62Bytes = await tryRead(path);
  if (Error.isError(base62Bytes)) exitErr(base62Bytes);

  const base62 = new TextDecoder().decode(base62Bytes).trim();
  if (!Base62.is(base62)) exitErr("Invalid base62 string");

  const bytes = Base62.decode(base62);
  await Deno.stdout.write(bytes);
}

async function tryRead(path?: string): Promise<Uint8Array | Error> {
  return await (path != null ? FileUtil.tryRead(path) : StdinUtil.tryRead());
}

function exitErr(e: string | Error, code = 1): never {
  console.error(typeof e === "string" ? e : e.message);
  Deno.exit(code);
}
