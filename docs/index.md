---
okf_version: "0.1"
---

# `docs/` — OKF knowledge bundle

The canonical knowledge tree of this repository, an **Open Knowledge Format (OKF v0.1)**
bundle. Each **home** has a fixed name and a single purpose; anyone moving between
repositories that adopt this method finds the **same tree in the same place**. This
`index.md` is the bundle's front door (a reserved listing — the only one that carries
frontmatter, and only `okf_version`). Folder names and frontmatter keys are canonical
English kebab-case; all prose the agent authors follows the repo's declared language —
[standards/agents/communication.md](/docs/standards/agents/communication.md) owns that rule.

The bundle root is the canonical **`docs/`**. The Astro site builds to `dist/` (gitignored,
regenerated on every build), so this tree is git-tracked and stable.

## Homes

* [standards/](/docs/standards/index.md) — how **WE** do it (current contracts/conventions), by subject; agreed-but-unproven rules sit here as `authority: background`
* [concepts/](/docs/concepts/index.md) — generic knowledge we hold (domain concepts, explanations, learnings); the fixed [glossary.md](/docs/glossary.md) term lookup sits at the bundle root
* [external/](/docs/external/index.md) — facts about what **WE CONSUME** (external, background)

## Boundaries (memorable summary)

- `standards/` = "how **WE** do it (current/active)"; an agreed-but-unproven rule sits here as `authority: background` (no separate decisions home).
- `concepts/` = "generic **understanding** we hold" (concepts/explanations; non-binding).
- `external/` = "facts about what **WE CONSUME** (external, background)".
- `tutorials/` `how-to/` `explanation/` `project/` = the **reader-facing** quadrants. None is
  installed here: this repo's public pages are authored in the Astro app (`src/`).
- The **task inbox** lives in the `specs` front, **outside** this bundle (quenching-managed).
- Not installed in this repo: `catalog/` (no data systems — it is installed when data exists),
  `vision/` (no direction docs).

**Resolving a term.** Unfamiliar repo word, acronym, or codename? Look it up in the glossary
first — [glossary.md](/docs/glossary.md), the A–Z lookup (one entry per term, linked to its full
doc when one exists): `grep -i '<term>' docs/glossary.md`.

The full contract (homes, types, migration doctrine, conformance) lives in the `quenching`
skills' `references/`.
