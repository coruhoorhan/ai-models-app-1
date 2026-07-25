import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge basic tailwind classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should resolve tailwind class conflicts using twMerge', () => {
    // p-2 will be overridden by p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');

    // bg-red-500 will be overridden by bg-blue-500
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle falsy values and conditional classes using clsx', () => {
    expect(cn('p-4', undefined, null, false, 0, '')).toBe('p-4');
    expect(cn('p-4', true && 'bg-red-500', false && 'text-white')).toBe('p-4 bg-red-500');
  });

  it('should handle array inputs', () => {
    expect(cn(['p-2', 'm-2'], ['bg-red-500', 'text-white'])).toBe('p-2 m-2 bg-red-500 text-white');
  });

  it('should handle object inputs', () => {
    expect(cn({ 'bg-red-500': true, 'bg-blue-500': false })).toBe('bg-red-500');
  });

  it('should handle mixed complex inputs', () => {
    const isError = true;
    const isWarning = false;

    expect(
      cn(
        'base-class p-2',
        isError && 'bg-red-500 text-white',
        isWarning && 'bg-yellow-500',
        ['flex', 'items-center'],
        { 'opacity-50': true, 'opacity-100': false },
        'p-4' // overrides p-2
      )
    ).toBe('base-class bg-red-500 text-white flex items-center opacity-50 p-4');
  });
});
