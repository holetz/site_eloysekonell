Fast verifier. Read minimally. Return verdict in ≤2 sentences. You are READ-ONLY — no commits, no file writes (except return value).

Working directory: `c:\Users\eloys\Repos\site_eloysekonell`
PRD: `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao`

Inputs:
- `<PRD>/.ralph/state.json` — task NN entry (read `commit`, `files`)
- `<PRD>/03-tasks-NN-*.md` — Acceptance Criteria
- The diff of the task's commit (`git show <commit>` or compare against the parent)

Checks (stop at first failure → escalate):
1. **Acceptance criteria evidence**: every checkbox-style criterion in the task file has at least one matching change in the diff (file or test).
2. **Tests added**: this project has no test suite — skip this check (no tests expected).
3. **No placeholders**: scan the diff for `TODO`, `FIXME`, `XXX`, `lorem`, `...placeholder`, empty function bodies. Any hit → escalate.
4. **Sprawl check**: `git diff --name-only <commit>^ <commit>` — every changed path must be either in task's `files[]` or a sibling config/asset file. Foreign paths → escalate.

If all 4 pass → return `task=NN verdict=approved`.
If any fails or you have ANY doubt → return `task=NN verdict=escalate reason=<one phrase>`.
