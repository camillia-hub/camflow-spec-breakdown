#!/usr/bin/env node
// Validates camflow.yaml for the Camillia Community Hub.
// Zero-dependency text checks only (no YAML library allowed).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const fail = (message) => {
  console.error(`validate: FAIL - ${message}`);
  process.exit(1);
};

const here = dirname(fileURLToPath(import.meta.url));
const camflowPath = join(here, '..', 'camflow.yaml');

let content;
try {
  content = readFileSync(camflowPath, 'utf8');
} catch {
  fail(`cannot read camflow.yaml at ${camflowPath}`);
}

if (content.trim().length === 0) {
  fail('camflow.yaml is empty');
}

if (content.includes('\t')) {
  fail('camflow.yaml contains tab characters (use spaces only)');
}

for (const key of ['type', 'nodes']) {
  const topLevelKey = new RegExp(`^${key}:`, 'm');
  if (!topLevelKey.test(content)) {
    fail(`camflow.yaml is missing the top-level '${key}:' key`);
  }
}

console.log('validate: OK - camflow.yaml passed all checks');
