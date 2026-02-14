# Injector API Contract (Issue #1)

Status: Draft v0.1 (M1)

## Public API

### `injectProvider(target?: object): InjectResult`
Injects a wallet-standard-compatible provider into the target runtime.

- Idempotent per target context
- Creates `target.window` reference when missing
- Registers wallet descriptor once

### `resetInjection(target?: object): void`
Clears injection guard for test/runtime resets.

### `getInjectionState(target?: object): InjectionState`
Returns current runtime state snapshot.

## Types

```ts
type InjectResult =
  | { ok: true; code: 'INJECTED'; state: InjectionState }
  | { ok: false; code: InjectorErrorCode; message: string; state: InjectionState };

type InjectionState = {
  injected: boolean;
  walletCount: number;
  version: string;
};

type InjectorErrorCode =
  | 'ALREADY_INJECTED'
  | 'INVALID_TARGET'
  | 'REGISTRATION_FAILED'
  | 'UNSUPPORTED_RUNTIME'
  | 'UNKNOWN_ERROR';
```

## Error Model

- `ALREADY_INJECTED`: attempted duplicate injection in same target context.
- `INVALID_TARGET`: target is null/primitive.
- `REGISTRATION_FAILED`: provider registration failed unexpectedly.
- `UNSUPPORTED_RUNTIME`: runtime cannot host required globals.
- `UNKNOWN_ERROR`: fallback catch-all.

## Lifecycle

1. Validate target/runtime
2. Check guard flag
3. Ensure `window` alias
4. Ensure wallet container
5. Register wallet descriptor
6. Set guard + return state

## Acceptance Mapping

- Idempotency: enforced by guard flag + explicit `ALREADY_INJECTED`
- State visibility: `getInjectionState` for diagnostics
- Deterministic errors: fixed `InjectorErrorCode` union
- Reset path: `resetInjection` keeps tests deterministic
