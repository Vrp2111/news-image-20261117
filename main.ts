// The World in One Day — news-image-20261117
// Entry program: copies the pre-rendered front page (entry.png) to the
// output directory the harness provides through MAKEFUN_OUTPUT_DIR.
// The image is a JPEG kept under the name entry.png (the format is told
// apart by its first bytes, as the rules allow). It sums up the world's
// news of Tuesday 17 November 2026: 48 stories, 6 continents.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1_048_576; // 1 MiB — the competition limit for entry.png

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");

// The harness normally provides the directory, but create it if missing.
mkdirSync(outDir, { recursive: true });

const size = statSync(src).size;
if (size > MAX_BYTES) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}

// The file must really be an image: PNG signature or JPEG start marker.
const header = readFileSync(src).subarray(0, 4);
const isPng =
  header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47;
const isJpeg = header[0] === 0xff && header[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither a PNG nor a JPEG image");
}
copyFileSync(src, dest);

// Sanity check: the copy must be complete.
const written = statSync(dest).size;
if (written !== size) {
  throw new Error(`copy mismatch: wrote ${written} bytes, expected ${size}`);
}
console.log(`Wrote ${dest} (${size} bytes)`);
