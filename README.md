# The World Beacon

A one-page newspaper front page summing up the world's news of
**Tuesday 17 November 2026** — 47 stories, 7 regions, all from Tuesday.

[![news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/Vrp2111/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/Vrp2111/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117)

Built for the [make.fun](https://make.fun) bounty
[news-image-20261117](https://make.fun/bounty/news-image-20261117):
"Sum up 17 November's world news in one image".

## What's in the picture

Three illustrated lead stories (Kerch Bridge, Ebola in DR Congo,
Nvidia's $115.8bn quarter), a grid of illustrated stories where each
story is drawn as a flat-vector scene, a per-region count bar, a world
map with a zoomed Europe–Middle East inset and numbered pins, a
"DATE CHECK" strip naming the big pre-17-November stories that were
deliberately left out, and the rest of the day in the "ALSO ON
TUESDAY" list. Every story happened or was first reported on Tuesday
17 November 2026; contested claims are marked as claims or attributed.
Sources: Reuters, AP, AFP, BBC, Al Jazeera, WHO, UN.

## Run

Requires Node.js 22+ (type-stripping).

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `entry.png` (1024×1024, 313,865 bytes) to `out/entry.png`,
after checking it is a real PNG/JPEG image under the 1 MiB limit.
Running it twice writes the same bytes both times.

## Referral

Referral code: `s75rqb78`
