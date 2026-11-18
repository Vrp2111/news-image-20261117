// The World Beacon — news-image-20261117 (scene edition)
//
// A one-page newspaper front page summing up the world's news of
// Tuesday 17 November 2026: 47 stories, 7 regions, each illustrated
// story drawn as a flat-vector scene, plus a per-region count bar and
// a DATE CHECK strip. The program's only job is to place that image
// where the harness expects it.
//
// Node 22, standard library only. The image is a JPEG stored under the
// name entry.png; the competition tells the format apart from the first
// bytes, so the name stays entry.png.
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ONE_MIB = 1024 * 1024; // the competition's size cap for the image

const JPEG_MAGIC = Buffer.from([0xff, 0xd8]);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_EOI = Buffer.from([0xff, 0xd9]);

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (rawOutDir !== undefined && rawOutDir.trim() === "") {
    throw new Error("MAKEFUN_OUTPUT_DIR is set but empty");
  }
  const outDir = rawOutDir ?? "/output";
  const target = join(outDir, "entry.png");

  // Guard the size before loading anything into memory.
  const { size } = await stat(source);
  if (size > ONE_MIB) {
    throw new Error(`entry.png is ${size} bytes, above the 1 MiB limit`);
  }

  const image = await readFile(source);

  // The file must be a real JPEG or PNG, judged by its first bytes.
  const isJpeg = image.subarray(0, 2).equals(JPEG_MAGIC);
  const isPng = image.subarray(0, 8).equals(PNG_MAGIC);
  if (!isJpeg && !isPng) {
    throw new Error("entry.png does not start with a JPEG or PNG signature");
  }

  // A JPEG must also end with its end-of-image marker; a truncated
  // render would otherwise slip through the size check.
  if (isJpeg && !image.subarray(image.length - 2).equals(JPEG_EOI)) {
    throw new Error("entry.png is a truncated JPEG (no EOI marker)");
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(target, image);

  // Confirm the copy landed byte-for-byte, not just the right size.
  const written = await readFile(target);
  if (written.length !== image.length || !written.equals(image)) {
    throw new Error("entry.png was not copied byte-for-byte");
  }
  console.log(
    `entry.png (${image.length} bytes, ${isJpeg ? "JPEG" : "PNG"}) -> ${target}`,
  );
}

await main();
