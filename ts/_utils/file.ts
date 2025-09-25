/**
 * ファイルの内容を全て読み込む
 *
 * **メモリ消費量がファイルのサイズに比例するので、大きなファイルに対してはストリーム処理を検討すること**
 */
export async function tryRead(
  ...params: Parameters<typeof Deno.readFile>
): Promise<Uint8Array | Error> {
  try {
    return await Deno.readFile(...params);
  } catch (e) {
    return e as Error;
  }
}
