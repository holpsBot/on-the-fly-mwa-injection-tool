import { injectProvider } from '../../injector-core/src/index.js';

export function runPayload(target = globalThis) {
  return injectProvider(target);
}
