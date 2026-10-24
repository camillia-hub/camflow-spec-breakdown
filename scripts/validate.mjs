#!/usr/bin/env node
// Validates camflow.yaml for the Camillia Community Hub and enforces the
// anti-collision placement contract: extension.json declares the extension id and
// the camflow payload is exactly one fixed-name camflow.yaml.
// Zero-dependency text checks only (no YAML library allowed).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const fail = (message) => {
  console.error(`validate: FAIL - ${message}`);
  process.exit(1);
};

const here = dirname(fileURLToPath(import.meta.url));
const KEBAB_ID = /^[a-z0-9](-?[a-z0-9]){2,39}$/;

let hub;
try {
  hub = JSON.parse(readFileSync(join(here, '..', 'extension.json'), 'utf8'));
} catch {
  fail('extension.json is missing or not valid JSON');
}
const id = hub.id;
if (typeof id !== 'string' || !KEBAB_ID.test(id)) {
  fail("extension.json must declare a unique kebab-case extension 'id'");
}
if (hub.kind !== 'camflow') {
  fail(`extension.json kind must be 'camflow' (found '${hub.kind}')`);
}
const include = Array.isArray(hub.include) ? hub.include : [];
if (include.length !== 1 || include[0] !== 'camflow.yaml') {
  fail("extension.json must publish exactly ['camflow.yaml']; a camflow carries one fixed-name file");
}

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
