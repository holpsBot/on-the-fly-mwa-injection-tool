const FLAG = '__MWA_INJECTOR_ACTIVE__';
const VERSION = '0.1.0';

export const InjectorErrorCode = Object.freeze({
  ALREADY_INJECTED: 'ALREADY_INJECTED',
  INVALID_TARGET: 'INVALID_TARGET',
  REGISTRATION_FAILED: 'REGISTRATION_FAILED',
  UNSUPPORTED_RUNTIME: 'UNSUPPORTED_RUNTIME',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
});

function stateOf(target) {
  return {
    injected: Boolean(target?.[FLAG]),
    walletCount: Array.isArray(target?.wallets) ? target.wallets.length : 0,
    version: VERSION
  };
}

export function getInjectionState(target = globalThis) {
  return stateOf(target);
}

export function injectProvider(target = globalThis) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    return {
      ok: false,
      code: InjectorErrorCode.INVALID_TARGET,
      message: 'Target must be an object-like runtime context',
      state: stateOf({})
    };
  }

  if (target[FLAG]) {
    return {
      ok: false,
      code: InjectorErrorCode.ALREADY_INJECTED,
      message: 'Provider already injected for this runtime context',
      state: stateOf(target)
    };
  }

  try {
    if (!target.window) target.window = target;

    target.wallets = target.wallets || [];
    target.wallets.push({
      name: 'MWA Injected Wallet',
      version: VERSION,
      features: ['standard:connect', 'standard:disconnect']
    });

    target[FLAG] = true;

    return { ok: true, code: 'INJECTED', state: stateOf(target) };
  } catch (err) {
    return {
      ok: false,
      code: InjectorErrorCode.REGISTRATION_FAILED,
      message: err instanceof Error ? err.message : 'Unknown registration failure',
      state: stateOf(target)
    };
  }
}

export function resetInjection(target = globalThis) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) return;
  delete target[FLAG];
}
