import test from 'node:test';
import assert from 'node:assert/strict';
import { runPayload } from './payload.js';

test('payload calls injector and is idempotent', () => {
  const ctx = {};
  const a = runPayload(ctx);
  const b = runPayload(ctx);
  assert.equal(a.ok, true);
  assert.equal(a.code, 'INJECTED');
  assert.equal(b.ok, false);
  assert.equal(b.code, 'ALREADY_INJECTED');
});
