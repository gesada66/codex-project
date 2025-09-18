export function normalizeWhitespace(input: string): string {
  return input
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\t/g, '  ')
    .replace(/[ \t]+$/gm, '');
}

