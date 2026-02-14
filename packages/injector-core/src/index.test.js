import test from 'node:test';
import assert from 'node:assert/strict';
import { injectProvider, resetInjection, getInjectionState, InjectorErrorCode } from './index.js';

test('injects provider once', () => {
  const ctx = {};
  const first = injectProvider(ctx);
  const second = injectProvider(ctx);
  assert.equal(first.ok, true);
  assert.equal(first.code, 'INJECTED');
  assert.equal(second.ok, false);
  assert.equal(second.code, InjectorErrorCode.ALREADY_INJECTED);
  assert.equal(Array.isArray(ctx.wallets), true);
  assert.equal(ctx.wallets.length, 1);
});

test('reset allows reinjection', () => {
  const ctx = {};
  injectProvider(ctx);
  resetInjection(ctx);
  const again = injectProvider(ctx);
  assert.equal(again.ok, true);
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

test('invalid target returns deterministic error', () => {
  const result = injectProvider(null);
  assert.equal(result.ok, false);
  assert.equal(result.code, InjectorErrorCode.INVALID_TARGET);
});

test('exposes injection state for diagnostics', () => {
  const ctx = {};
  const before = getInjectionState(ctx);
  injectProvider(ctx);
  const after = getInjectionState(ctx);
  assert.equal(before.injected, false);
  assert.equal(after.injected, true);
  assert.equal(after.walletCount, 1);
});
