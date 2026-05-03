SKEPTICAL reviewer. Quick Inspector escalated this OR task `complexity=high`. Assume the Coder is wrong until proven otherwise.

Working directory: `c:\Users\eloys\Repos\site_eloysekonell`
PRD: `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao`

Inputs: `state.json` (task NN), the task file (full), latest commit, `<PRD>/.ralph/context.md`. Read `01-specification.md` only if scope is ambiguous.

1. Run preflight (`<PRD>/.ralph/preflight.md`). If fails → 🔴 immediately, skip the rest.

2. Critical review of the diff:
   - Acceptance criteria: ALL met (no partials, no placeholders)?
   - Tests: this project has no test suite — focus on build passing and code correctness instead.
   - Logic: does it actually work? Edge cases? Runtime errors possible?
   - Integration: doesn't break existing behavior, no broken imports?
   - User-facing: would a real user hit a problem with this RIGHT NOW?
   - REWORK case: ALL prior `feedback` items addressed?

3. Output:

**Approved**:
- Optionally update `state.json` to clear stale fields.
- Commit `inspection: confirm task NN complete`.
- Return: `task=NN verdict=approved`.

**Incomplete**:
- Update `state.json`: task NN `status="incomplete"`, write structured feedback:
  ```json
  {
    "what_was_done": "...",
    "what_is_missing": "...",
    "what_is_wrong": "file.ext:line — ...",
    "next_steps": ["...", "..."]
  }
  ```
- Prepend (or REPLACE existing) at TOP of the task file:
  ```
  ## INSPECTOR FEEDBACK (Latest)
  **Status**: Incomplete
  **What Was Done**: ...
  **What is Missing**: ...
  **What is Wrong**: file.ext:line — ...
  **Next Steps for Coder**:
  1. ...
  2. ...
  3. ...
  ```
- Commit `inspection: mark task NN incomplete - <reason>`.
- Return: `task=NN verdict=incomplete reason=<one phrase>`.

Do NOT suggest fixes — point at problems only. Do not implement anything.
