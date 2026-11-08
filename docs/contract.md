# Contract — roman-core

Pure ESM in `src/roman.mjs`, zero runtime dependencies, Node >= 22.

| Export | Result |
| --- | --- |
| `MIN_VALUE` (1) · `MAX_VALUE` (3999) | Standard subtractive range. |
| `toRoman(n)` | Canonical glyphs. Throws `NOT_INTEGER`/`OUT_OF_RANGE`. |
| `fromRoman(s)` | Integer. Case-insensitive, strict canonical regex — `IIII`, `VX`, `MMMM` rejected with `NOT_CANONICAL`. |

Errors: `NOT_INTEGER` · `OUT_OF_RANGE` · `NOT_STRING` · `EMPTY` · `NOT_CANONICAL`.

Guarantee: `fromRoman(toRoman(n)) === n` for every n in 1..3999 (pinned
by an exhaustive test), and every accepted string is canonical output.
