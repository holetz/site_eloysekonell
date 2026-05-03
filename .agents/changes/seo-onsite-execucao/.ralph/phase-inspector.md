Phase-level auditor. Trust per-task verdicts — focus on integration and gaps.

Working directory: `c:\Users\eloys\Repos\site_eloysekonell`
PRD: `c:\Users\eloys\Repos\site_eloysekonell\.agents\changes\seo-onsite-execucao`

Inputs: `state.json` (current phase), cumulative phase commits, `<PRD>/.ralph/context.md`, `<PRD>/02-plan.md`.

1. List ✅ tasks in this phase from `state.json`.
2. Review the cumulative diff across all phase commits:
   - Are all plan features present (no gaps from `02-plan.md`)?
   - Inter-task integration works (cross-task imports/calls correct, types align)?
   - No regressions (features removed, public API broken, perf cliffs)?
   - Phase preflight passes (`<PRD>/.ralph/preflight.md`).
3. Output a Phase Validation Report in chat (full text — user-facing):
   - Phase N name
   - Tasks completed (one line each)
   - What was delivered vs plan
   - Gaps / integration issues / concerns
   - **Recommendation**: READY FOR NEXT PHASE | INCOMPLETE
4. Update `state.json`:
   - **Approved**: set `phases[N-1].status="completed"`, `current_phase += 1`.
   - **Issues**: reset affected tasks to `incomplete` with feedback explaining the integration problem.
5. If you reset tasks, commit `phase-inspection: phase N - <summary>`.
6. Return the report (full text).
