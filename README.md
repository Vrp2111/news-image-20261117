# The World in One Day

A one-page newspaper front page summing up the world's news of
**Tuesday 17 November 2026** — 48 stories, 6 continents, all from Tuesday.

[![news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/Vrp2111/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/Vrp2111/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117)

Built for the [make.fun](https://make.fun) bounty
[news-image-20261117](https://make.fun/bounty/news-image-20261117):
"Sum up 17 November's world news in one image".

## What's in the picture

Three illustrated lead stories (Kerch Bridge, Nvidia's $115.8bn quarter,
the tanker hit in the Strait of Hormuz), a grid of illustrated stories,
a numbered world map, a "BY THE NUMBERS" strip, a markets ticker, and the
rest of the day in the "ALSO ON TUESDAY" list. Every story happened or was
first reported on Tuesday 17 November 2026; contested claims are marked as
claims or attributed. Sources: Reuters, AP, AFP, BBC, Al Jazeera, WHO, UN.

## Run

Requires Node.js 22+ (type-stripping).

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `entry.png` (1024×1024, 286,616 bytes) to `out/entry.png`,
after checking it is a real PNG/JPEG image under the 1 MiB limit.
Running it twice writes the same bytes both times.

## Referral

Referral code: `s75rqb78`
