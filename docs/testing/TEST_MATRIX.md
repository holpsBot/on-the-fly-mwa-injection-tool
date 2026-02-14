# Test Matrix (Initial)

Priority: P0 blocker, P1 major, P2 improvement.

## Unit
- P0: injection idempotency, session/origin isolation, deep-link parser validation, nonce/state anti-replay, no-secret logging.
- P1: event ordering (connect/disconnect/account/network), timeout/retry behavior, error mapping consistency.

## Integration
- P0: injected provider discoverable by dApp, connect/sign/send paths, disconnect invalidates session.
- P1: background/foreground recovery, multi-tab behavior, account/network switch propagation.

## E2E (real Android Chrome)
- P0: first connect, reject flows, sign+verify, send+confirm, app-kill/network-loss recovery.
- P1: returning-session reuse, repeated operation stability (100 iterations).

## Compatibility
- P0: Android support floor + latest, Chrome stable.
- P1: Chrome beta, at least 3 wallet implementations, SPA dApp route changes.

## Security
- P0: provider spoofing defense, callback tamper detection, replay prevention, intent/deeplink abuse checks.
- P1: flood/backpressure, TLS assumptions and endpoint hardening.

## Regression Cadence
- Every PR: P0 smoke.
- Nightly: core P1 set.
- Weekly: extended compatibility.
