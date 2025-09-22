#!/usr/bin/env -S deno run

import { readAllSync } from "@std/io";

import * as Decodable from "@rusconn/lal/decodable";
import * as Encodable from "@rusconn/lal/encodable";

function main(): void {
  const [command] = Deno.args;
  if ((command !== "encode" && command !== "decode")) {
    exitError("USAGE: <encode|decode> <message>");
  }

  switch (command) {
    case "encode":
      return encode();
    case "decode":
      return decode();
  }
}

function exitError(message: string, code = 1): never {
  console.error(message);
  Deno.exit(code);
}

function encode(): void {
  const s = readStdin();
  if (!Encodable.is(s)) {
    exitError(`failed to encode: invalid input: ${s}`);
  }
  writeStdout(Encodable.encode(s));
}

function decode(): void {
  const s = readStdin();
  if (!Decodable.is(s)) {
    exitError(`failed to decode: invalid input: ${s}`);
  }
  writeStdout(Decodable.decode(s));
}

function readStdin(): string {
  const bytes = readAllSync(Deno.stdin);
  return new TextDecoder().decode(bytes);
}

function writeStdout(s: string): void {
  const encoder = new TextEncoder();
  Deno.stdout.writeSync(encoder.encode(s));
}

main();
