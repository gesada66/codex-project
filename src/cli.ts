#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { normalizeWhitespace } from './lib/text.js';

function printHelp() {
  console.log(`Agentic Doc Processor

Usage:
  npx agentic-doc-processor --help
  node dist/cli.js --input path/to/file.txt

Options:
  --input, -i   Path to an input text file
  --help, -h    Show this help
`);
}

export function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    printHelp();
    return;
  }

  let inputPath: string | undefined;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') {
      inputPath = args[i + 1];
      i++;
    }
  }

  if (!inputPath) {
    console.error('Missing --input <path>');
    process.exitCode = 1;
    return;
  }

  const content = readFileSync(inputPath, 'utf8');
  const normalized = normalizeWhitespace(content);
  console.log(normalized);
}

const isDirect = fileURLToPath(import.meta.url) === process.argv[1];
if (isDirect) {
  main();
}

