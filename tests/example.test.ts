import { describe, it, expect } from 'vitest';
import { normalizeWhitespace } from '../src/lib/text';

describe('normalizeWhitespace', () => {
  it('trims trailing spaces and normalizes tabs', () => {
    const input = 'a\tb  \nline2\t';
    const out = normalizeWhitespace(input);
    expect(out).toBe('a  b\nline2');
  });
});

