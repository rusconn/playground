#!/usr/bin/env -S deno run --allow-read

import * as FileUtil from "../_utils/file.ts";
import * as StdinUtil from "../_utils/stdin.ts";
import * as Base64 from "./base64.ts";

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

  const base64 = Base64.encode(bytes);
  await Deno.stdout.write(new TextEncoder().encode(base64));
}

async function decode(path?: string): Promise<void> {
  const base64Bytes = await tryRead(path);
  if (Error.isError(base64Bytes)) exitErr(base64Bytes);

  const base64 = new TextDecoder().decode(base64Bytes).trim();
  if (!Base64.is(base64)) exitErr("Invalid base64 string");

  const bytes = Base64.decode(base64);
  await Deno.stdout.write(bytes);
}

async function tryRead(path?: string): Promise<Uint8Array | Error> {
  return await (path != null ? FileUtil.tryRead(path) : StdinUtil.tryRead());
}

function exitErr(e: string | Error, code = 1): never {
  console.error(typeof e === "string" ? e : e.message);
  Deno.exit(code);
}
