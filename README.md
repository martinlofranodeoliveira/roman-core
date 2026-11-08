# roman-core

Roman numerals 1..3999: canonical encoding, strict decoding, exhaustive
round-trip guarantee. Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { toRoman, fromRoman } from './src/roman.mjs';
toRoman(2026);      // 'MMXXVI'
fromRoman('XLIV');  // 44
```

```sh
npm test          # 6 tests incl. full-range round-trip, no dependencies
npm run demo
```

Standard subtractive form only. MIT — see `LICENSE`. [Versão em português](README.pt-BR.md).
