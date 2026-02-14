const FLAG = '__MWA_INJECTOR_ACTIVE__';

export function injectProvider(target = globalThis) {
  if (target[FLAG]) return { injected: false, reason: 'already_injected' };
  if (!target.window) target.window = target;

  target.wallets = target.wallets || [];
  target.wallets.push({
    name: 'MWA Injected Wallet',
    version: '0.1.0',
    features: ['standard:connect', 'standard:disconnect']
  });

  target[FLAG] = true;
  return { injected: true };
}

export function resetInjection(target = globalThis) {
  delete target[FLAG];
}
