# Portfolio Agent Instructions

These instructions apply to the entire repository unless a deeper `AGENTS.md` overrides them.

## Priorities

1. Performance first.
2. Reliability first.
3. Preserve predictable behavior under load, partial failure, session restart, reconnect, and partial stream conditions.
4. When tradeoffs exist, choose correctness and robustness over speed of implementation.

## Constraints

- Do not read, edit, move, delete, rename, regenerate, or otherwise modify `.guidelines/` or `.prompts/`.
- Do not edit, move, delete, rename, regenerate, or otherwise modify `.skills/`.
- Do not read, edit, move, delete, rename, regenerate, or otherwise modify `guidelines/` or `prompts/` unless the user explicitly instructs otherwise in the current task.
- Do not change behavior unless the user explicitly requests a behavior change.
- Do not make broad rewrites when a scoped change will satisfy the task.
- Do not make unrelated refactors, formatting-only churn, dependency changes, or generated-file updates.
- Do not introduce nondeterministic runtime behavior without an explicit product requirement.

## Rules

- Reuse existing project conventions, components, utilities, and styling patterns before adding new abstractions.
- Keep changes limited to the files and logic required for the task.
- For user-facing changes, handle loading, empty, error, retry, and degraded states when they are affected by the change.
- For changes affecting runtime behavior, preserve correctness across normal operation, failures, retries, reconnects, and resumed sessions.

## Verification

- Before claiming a change is complete, run the relevant checks for the touched scope.
- For any change that can affect runtime behavior, run `pnpm lint`, `pnpm type-check`, and `pnpm build`.
- If any required verification cannot be run, state that explicitly and give the reason.
