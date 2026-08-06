---
okf_version: "0.1"
---

# `.docs/` — OKF knowledge bundle

The canonical knowledge tree of this repository, an **Open Knowledge Format (OKF v0.1)**
bundle. Each **home** has a fixed name and a single purpose; anyone moving between
repositories that adopt this method finds the **same tree in the same place**. This
`index.md` is the bundle's front door (a reserved listing — the only one that carries
frontmatter, and only `okf_version`). Folder names and frontmatter keys are canonical
English kebab-case; all prose the agent authors follows the repo's declared language —
[standards/agents/communication.md](/.docs/standards/agents/communication.md) owns that rule.

The bundle root is **`.docs/`** — this repo's variant of the canonical `docs/`, because
`docs/` here is the Astro site's build output (gitignored, regenerated on every build).
This tree is git-tracked and stable.

## Homes

* [standards/](/.docs/standards/index.md) — how **WE** do it (current contracts/conventions), by subject; agreed-but-unproven rules sit here as `authority: background`
* [documentation/](/.docs/documentation/index.md) — internal reference listings (this repo's public documentation **is** the Astro site in `src/`)
* [knowledge/](/.docs/knowledge/index.md) — generic knowledge we hold (domain concepts, explanations, learnings); ships the fixed [glossary.md](/.docs/knowledge/glossary.md) term lookup
* [reference/](/.docs/reference/index.md) — facts about what **WE CONSUME** (external, background)

## Boundaries (memorable summary)

- `standards/` = "how **WE** do it (current/active)"; an agreed-but-unproven rule sits here as `authority: background` (no separate decisions home).
- `documentation/` = "our product's own reference" (Diátaxis prose) — here, only the internal automation registry; the site's public pages are authored in `src/`.
- `knowledge/` = "generic **understanding** we hold" (concepts/explanations; non-binding).
- `reference/` = "facts about what **WE CONSUME** (external, background)".
- The **task inbox** lives at `specs/backlog/`, **outside** this bundle (quenching-managed).
- Not installed in this repo: `catalog/` (no data systems — it is installed when data exists),
  `vision/` (no direction docs).

**Resolving a term.** Unfamiliar repo word, acronym, or codename? Look it up in the glossary
first — [knowledge/glossary.md](/.docs/knowledge/glossary.md), the A–Z lookup (one entry per
term, linked to its full doc when one exists): `grep -i '<term>' .docs/knowledge/glossary.md`.

**Operating this bundle.** How knowledge gets in, which command to run, what the enforcement
hook checks, and how to read a validator finding — [QUENCHING.md](QUENCHING.md), the operator
manual installed beside this listing. This `index.md` says **what** is here; that file says
**how** it is worked.

The full contract (homes, types, migration doctrine, conformance) lives in the `quenching`
skills' `references/`.
