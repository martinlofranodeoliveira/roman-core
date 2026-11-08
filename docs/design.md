# Design — roman-core

Greedy encoding over the 13-entry subtractive table; decoding guarded by
a canonical-form regex before the same table runs in reverse. The regex
is the spec: anything it rejects never reaches arithmetic, so
non-standard forms cannot decode by accident.

Oracle: textbook numerals plus the exhaustive 1..3999 round-trip.
No additive variants, no overlines, no zero.
