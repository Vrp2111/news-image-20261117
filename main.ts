// The World Beacon — news-image-20261117
//
// The entry is a single front-page image (entry.png) summing up the
// world's news of Tuesday 17 November 2026: 48 stories, 6 continents,
// with a zoomed Europe–Middle East locator map. The program's only job
// is to place that image where the harness expects it.
//
// Node 22, standard library only. The image is a JPEG stored under the
// name entry.png; the competition tells the format apart from the first
// bytes, so the name stays entry.png.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_ENTRY_BYTES = 1048576; // 1 MiB, the competition's size cap

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outDir, "entry.png");

// Load the image once, then guard it before writing anything out.
const image = readFileSync(sourcePath);
if (image.length > MAX_ENTRY_BYTES) {
  throw new Error(
    `entry.png is ${image.length} bytes, above the 1 MiB limit`,
  );
}

const jpegStart = image[0] === 0xff && image[1] === 0xd8;
const pngStart =
  image[0] === 0x89 &&
  image[1] === 0x50 &&
  image[2] === 0x4e &&
  image[3] === 0x47;
if (!jpegStart && !pngStart) {
  throw new Error("entry.png does not start with a JPEG or PNG signature");
}

// A JPEG must also end with its end-of-image marker (0xFFD9); a
// truncated render would otherwise slip through the size check.
if (jpegStart) {
  const last = image.length - 1;
  if (image[last - 1] !== 0xff || image[last] !== 0xd9) {
    throw new Error("entry.png is a truncated JPEG (no EOI marker)");
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(targetPath, image);

// Confirm the write landed byte-for-byte, not just the right size.
const writtenBack = readFileSync(targetPath);
if (!writtenBack.equals(image)) {
  throw new Error("entry.png was not copied byte-for-byte");
}
console.log(`entry.png (${image.length} bytes) -> ${targetPath}`);
