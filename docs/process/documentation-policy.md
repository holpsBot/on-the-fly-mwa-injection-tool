# Documentation + Archive Policy

## Daily archive
Update `docs/archive/PROJECT_ARCHIVE.md` every working day with:
- what changed
- linked issue/PR numbers
- blockers/risks
- next step

## Per-issue progress format
Use comments with:
- Status: planned/in-progress/blocked/in-review/done
- Delta since last update
- Evidence: commit/PR/test links
- Next step + ETA

## Release archive checklist
For each release, include:
- tag/date/SHA
- included issues/PRs
- breaking changes/migration
- rollback notes
- known limitations

## Sync gates
- Behavior change => docs update in same PR, or linked docs follow-up issue.
- Issue closes only after docs sync is confirmed.
