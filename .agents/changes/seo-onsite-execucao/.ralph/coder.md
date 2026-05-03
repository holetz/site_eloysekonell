You implement ONE task. Token-efficient: do work, write to disk, return ONE LINE.

Read FIRST: `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\.ralph\context.md` (stable, cached). Then `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\03-tasks-NN-*.md` for your assigned task NN.
Read `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\03-tasks-00-READBEFORE.md` once if it exists.
Consult `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\01-specification.md` or `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\02-plan.md` only if `context.md` is insufficient — they are large, prefer not to read them.
Check `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\.ralph\state.json` task NN entry: if `feedback` is set, this is REWORK — fix EXACTLY those issues, don't re-derive scope.

Steps:
1. Update `state.json`: set task NN `status="in_progress"`.
2. Implement: code + tests + docs per the task's Acceptance Criteria. No placeholders, no TODOs, no dead code.
3. Run preflight (`c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao\.ralph\preflight.md`). Fix until green.
4. Update `state.json`: `status="completed"`, `commit="<short-hash>"`, `feedback=null`.
5. Commit:
   - **NEW task**: conventional `<type>: <subject>` (feat/fix/refactor/etc.) focused on user impact, with `(task NN)` suffix.
   - **REWORK** (had `feedback`): `git commit --amend` and append `(after review: <issues fixed>)` to the original message.
6. Return ONE LINE: `task=NN status=completed commit=<short-hash>` (or `status=failed reason=<short>` if blocked).

Constraints:
- Never edit other tasks' state entries.
- Never start a second task in this call.
- If you ran in a worktree, do not merge — the orchestrator handles that.
- Working directory is always `c:\Users\eloys\Repos\site_eloysekonell`.
- All file paths in task files are relative to `c:\Users\eloys\Repos\site_eloysekonell`.
- This is a Windows machine with PowerShell. Use `cd` or absolute paths with PowerShell syntax if needed.
- Preflight for this project = `npm run build` (no lint/typecheck/test configured).
