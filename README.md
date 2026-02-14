# On-the-fly MWA Injection Tool

Inject `@solana-mobile/wallet-standard-mobile` into mobile web contexts (Android Chrome) where native integration is missing.

## Scope
- DevTools snippet injection (MVP)
- Bookmarklet injection
- Thorough test matrix (unit + integration + compatibility)
- Reproducible docs and archive trail

## Monorepo layout
- `packages/injector-core` – provider bootstrap + guards
- `packages/injector-payload` – single-file injectable payload
- `examples/test-dapp` – compatibility validation page
- `docs/archive` – progress and release archives

## Quickstart
```bash
npm install
npm run build
npm test
```
