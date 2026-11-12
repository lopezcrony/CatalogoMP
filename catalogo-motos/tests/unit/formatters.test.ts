import { describe, expect, it } from 'vitest';
import { formatCop } from '../../src/lib/formatters';

describe('formatCop', () => {
  it('formatea un precio en pesos colombianos sin decimales', () => {
    expect(formatCop(10999000)).toContain('10.999.000');
    expect(formatCop(10999000)).toMatch(/^\$\s/);
  });
});
