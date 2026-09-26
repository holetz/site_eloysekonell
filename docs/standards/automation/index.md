# `standards/automation/`

How this repo's **automation surface** — Claude Code commands, agents, hooks — is
classified, authored, budgeted and swept. One standard per file (files, not
sub-folders); each carries `type: standard` + a derived `resource:`; add each to
[../index.md](../index.md).

## Current docs

| Doc | Covers |
| --- | --- |
| [skills.md](skills.md) | How this repo's Claude Code commands are classified and named — one file per entry point |

## Candidate sub-standards

Break this subject **one concept per file**. The method evaluates each candidate against
the repo, generates the applicable ones (`file:line`-anchored, full OKF frontmatter), and
records the rest below as deferrals (never a silent skip):
`skills` · `agents` · `hooks`.

## Coverage / deferred sub-standards

Per-subject ledger the verify gate reads. A subject is "done" only when every candidate is
**present or listed here** with a one-line why.

- [skills.md](skills.md) — the command-surface taxonomy + naming rule (present)
- `agents` — deferred: no `.claude/agents/*.md` definitions exist yet;
  `/quenching:skill:agent:new` mints one when the first agent is defined
- `hooks` — deferred: no hooks wired in `settings.json`;
  `/quenching:skill:hook:new` mints one when the first hook is wired
