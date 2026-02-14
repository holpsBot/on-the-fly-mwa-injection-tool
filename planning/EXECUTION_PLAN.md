# Execution Plan — On-the-fly MWA Injection Tool

Last updated: 2026-02-14 (UTC)

## Goal
Inject `@solana-mobile/wallet-standard-mobile` into Android Chrome web contexts that do not natively support MWA, with reproducible setup, strong safety guarantees, and release-grade testing.

## Scope
- DevTools snippet injection (MVP)
- Bookmarklet injection mode
- Core provider bootstrap with idempotent lifecycle
- Security and compatibility validation on real-device flows
- CI and archive discipline for traceable delivery

## Architecture (MVP)
- `packages/injector-core`
  - provider bootstrap
  - inject/reinject guard
  - teardown/reset path
  - event propagation and session/origin safety
- `packages/injector-payload`
  - single-file runtime payload
  - DevTools/bookmarklet execution entry
- `examples/test-dapp`
  - local validation harness for detect/connect/sign/send flows
- `docs/`
  - test matrix, security model, archive logs, release notes

## Milestones

### M1 — MVP Injection + DevTools (active)
1. Define injector interface and lifecycle (#1)
2. Integrate real `@solana-mobile/wallet-standard-mobile` in core (#2)
3. Build deterministic single-file payload pipeline (#3)
4. Publish DevTools setup + troubleshooting docs (#4)

### M2 — Repeatable UX + Compatibility
5. Implement bookmarklet mode (#5)
6. Run compatibility matrix across target dApps/devices/wallets (#6)
7. Lock CI quality gates and broader automated checks (#8)

### M3 — Security + Release Readiness
8. Complete threat model and security tests (#7)
9. Keep archive/release tracking synced with implementation evidence (#9)

## QA Gate (must pass)
- P0: idempotency, session/origin safety, callback tamper/replay defense, no sensitive logging
- P0: connect/sign/send/disconnect happy + reject paths
- P0: network/app interruption resilience (no stale unsafe state)
- P1: compatibility sweep (wallets/chrome variants/dApp frameworks)
- Release criteria: no open P0; P1 resolved or explicitly risk-accepted with rationale

## Risks and Controls
- Deep-link/callback tampering → strict state/nonce validation + negative tests
- Provider spoof/overwrite → integrity checks + duplicate detection
- Runtime race conditions → concurrency guard + deterministic error mapping
- Drift between code and docs → docs-sync gate + issue progress template + archive reminder cron

## First 5 execution tasks (immediate)
1. Finish API contract doc for injector lifecycle and error model (issue #1)
2. Replace stub wallet registration with real MWA integration (issue #2)
3. Add parser/security-focused negative tests and redaction checks (issues #2/#7)
4. Add deterministic payload build artifacts + checksum output (issue #3)
5. Publish Android DevTools runbook and perform first real-device validation pass (issue #4)

## Archive discipline
- Update `docs/archive/PROJECT_ARCHIVE.md` daily when active
- Post issue progress deltas with evidence links (commit/PR/test run)
- Keep release archive files under `docs/archive/releases/`
