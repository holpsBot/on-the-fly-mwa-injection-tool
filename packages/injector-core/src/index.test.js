import test from 'node:test';
import assert from 'node:assert/strict';
import { injectProvider, resetInjection } from './index.js';

test('injects provider once', () => {
  const ctx = {};
  const first = injectProvider(ctx);
  const second = injectProvider(ctx);
  assert.equal(first.injected, true);
  assert.equal(second.injected, false);
  assert.equal(second.reason, 'already_injected');
  assert.equal(Array.isArray(ctx.wallets), true);
  assert.equal(ctx.wallets.length, 1);
});

test('reset allows reinjection', () => {
  const ctx = {};
  injectProvider(ctx);
  resetInjection(ctx);
  const again = injectProvider(ctx);
  assert.equal(again.injected, true);
  assert.equal(ctx.wallets.length, 2);
});

test('isolates state across contexts', () => {
  const a = {};
  const b = {};
  injectProvider(a);
  injectProvider(b);
  assert.equal(a.wallets.length, 1);
  assert.equal(b.wallets.length, 1);
  assert.notEqual(a, b);
});
