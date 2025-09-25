import * as TypedArrayUtil from "./typed-array.ts";

/**
 * stdinの内容を全て読み込む
 *
 * **メモリ消費量がstdinのサイズに比例するので、大きなstdinに対してはストリーム処理を検討すること**
 */
export async function tryRead(): Promise<Uint8Array | Error> {
  const chunks: Uint8Array[] = [];

  try {
    for await (const chunk of Deno.stdin.readable) {
      chunks.push(chunk);
    }
  } catch (e) {
    return e as Error;
  }

  return TypedArrayUtil.concat(chunks);
}
