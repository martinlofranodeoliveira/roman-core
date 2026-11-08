import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman, RomanError } from '../src/roman.mjs';

describe('encoding', () => {
  it('produces textbook numerals', () => {
    assert.equal(toRoman(1), 'I');
    assert.equal(toRoman(4), 'IV');
    assert.equal(toRoman(9), 'IX');
    assert.equal(toRoman(1994), 'MCMXCIV');
    assert.equal(toRoman(2026), 'MMXXVI');
    assert.equal(toRoman(3999), 'MMMCMXCIX');
  });
  it('rejects out of range and non-integers', () => {
    assert.throws(() => toRoman(0), (e) => e.code === 'OUT_OF_RANGE');
    assert.throws(() => toRoman(4000), (e) => e.code === 'OUT_OF_RANGE');
    assert.throws(() => toRoman(1.5), (e) => e.code === 'NOT_INTEGER');
  });
});

describe('decoding', () => {
  it('reads canonical numerals, case-insensitive', () => {
    assert.equal(fromRoman('MCMXCIV'), 1994);
    assert.equal(fromRoman('mmxxvi'), 2026);
  });
  it('rejects non-canonical forms', () => {
    assert.throws(() => fromRoman('IIII'), (e) => e.code === 'NOT_CANONICAL');
    assert.throws(() => fromRoman('VX'), (e) => e.code === 'NOT_CANONICAL');
    assert.throws(() => fromRoman(''), (e) => e.code === 'EMPTY');
    assert.throws(() => fromRoman(42), (e) => e.code === 'NOT_STRING');
    assert.ok(new RomanError('X') instanceof Error);
  });
});

describe('round-trip', () => {
  it('toRoman(fromRoman(x)) is identity over samples', () => {
    for (const n of [1, 2, 3, 4, 5, 9, 14, 40, 44, 99, 400, 944, 1994, 2026, 3999]) {
      assert.equal(fromRoman(toRoman(n)), n);
    }
  });
  it('fromRoman(toRoman) is identity over the full range', () => {
    for (let n = 1; n <= 3999; n++) {
      if (fromRoman(toRoman(n)) !== n) throw new Error(`mismatch at ${n}`);
    }
  });
});
