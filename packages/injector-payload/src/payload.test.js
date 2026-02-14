import test from 'node:test';
import assert from 'node:assert/strict';
import { runPayload } from './payload.js';

test('payload calls injector and is idempotent', () => {
  const ctx = {};
  const a = runPayload(ctx);
  const b = runPayload(ctx);
  assert.equal(a.injected, true);
  assert.equal(b.injected, false);
});
