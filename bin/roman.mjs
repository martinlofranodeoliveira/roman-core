#!/usr/bin/env node
// Demo: fixed conversions, asserts expectations. --assert exits non-zero on mismatch.
import { toRoman, fromRoman } from '../src/roman.mjs';

const CASES = [[1994, 'MCMXCIV'], [2026, 'MMXXVI'], [44, 'XLIV'], [3999, 'MMMCMXCIX']];

let failed = 0;
for (const [n, expected] of CASES) {
  const got = toRoman(n);
  const back = fromRoman(expected);
  const pass = got === expected && back === n;
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${n} <-> ${got}`);
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
