// SPDX-License-Identifier: MIT
// Roman numerals 1..3999 (standard subtractive form): integer encoding,
// strict decoding, round-trip guarantee. No network, no I/O.

export const MIN_VALUE = 1;
export const MAX_VALUE = 3999;

export class RomanError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'RomanError';
    this.code = code;
  }
}

const TABLE = Object.freeze([
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]);

const CANONICAL = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/** Integer 1..3999 -> canonical Roman. */
export function toRoman(n) {
  if (!Number.isInteger(n)) throw new RomanError('NOT_INTEGER');
  if (n < MIN_VALUE || n > MAX_VALUE) throw new RomanError('OUT_OF_RANGE');
  let out = '';
  let rest = n;
  for (const [value, glyph] of TABLE) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}

/** Strict canonical Roman -> integer. Rejects non-standard forms. */
export function fromRoman(s) {
  if (typeof s !== 'string') throw new RomanError('NOT_STRING');
  const t = s.trim().toUpperCase();
  if (t.length === 0) throw new RomanError('EMPTY');
  if (!CANONICAL.test(t)) throw new RomanError('NOT_CANONICAL');
  let total = 0;
  let i = 0;
  for (const [value, glyph] of TABLE) {
    while (t.startsWith(glyph, i)) {
      total += value;
      i += glyph.length;
    }
  }
  if (total < MIN_VALUE || total > MAX_VALUE) throw new RomanError('OUT_OF_RANGE');
  return total;
}
