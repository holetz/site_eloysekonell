# READ BEFORE — Boot context para todos os tasks

> Leia este arquivo **antes** de iniciar qualquer task `03-tasks-NN-*.md`.
> Contexto compartilhado para execução paralela.

---

## 1. Sobre o projeto

- **Site:** eloysekonell.com.br — site institucional de Eloyse Konell, consultora em Liderança e Gestão Estratégica de Pessoas em Blumenau-SC.
- **Stack:** Astro 4.16 SSG → `docs/` → GitHub Pages.
- **Locale:** pt-BR. Todo conteúdo, slugs, schemas em português.
- **Fontes:** Cormorant Garamond (títulos), Manrope (corpo).
- **Paleta:** ver CSS variables em [src/styles/global.css](../../../src/styles/global.css) — `--sand`, `--bronze`, `--olive-deep`, etc. **Não alterar paleta nem tipografia.**

## 2. Comandos essenciais

```bash
npm run dev        # http://localhost:4321 — desenvolvimento
npm run build      # gera docs/ — DEVE rodar verde no fim de cada task
npm run preview    # preview local do build
```

**Não há** `lint`, `test`, `typecheck` configurados. Verificação é via `build` + smoke visual.

## 3. Convenções obrigatórias

- **Não committar imagens base64** — sempre extrair para arquivo (em `src/assets/` ou `public/images/`).
- **Não alterar `outDir: './docs'`** em `astro.config.mjs` (obrigatório para GitHub Pages).
- **Estilos globais** ficam exclusivamente em `src/styles/global.css`. Estilos de componente em `<style>` dentro do `.astro`.
- **Componentes**: um `.astro` por seção/responsabilidade, props tipadas com TS interface no frontmatter.
- **Frontmatter de posts**: schema Zod em [src/content/config.ts](../../../src/content/config.ts) — respeitar.
- **Slugs**: kebab-case ASCII. Sem acentos.
- **JSON-LD**: emitir no `<head>` via slot do Layout (não no body).
- **Voz/tom**: formal-acolhedora, pt-BR, frases curtas, sem jargão MBA. Espelhar tom dos posts existentes em `src/content/blog/` e dos componentes `Hero.astro`, `About.astro`, `Consultoria.astro`.

## 4. Dados factuais (única fonte de verdade)

Após S01 existir, importar **sempre** de `src/data/credenciais.ts`. Nunca duplicar números nos `.astro` ou `.md`.

| Dado | Valor |
|---|---|
| Anos atuando | 18 |
| Empresas atendidas | +15 |
| Líderes desenvolvidos | +500 |
| Assessments realizados | +500 |
| Setor foco | Sem foco específico |
| Base | Blumenau-SC, Vale do Itajaí |

**Formação:**
- Graduação em Psicologia (FURB)
- MBA em Neurociência e Comportamento (PUCRS)
- Pós-graduação Lato Sensu em Gestão de Pessoas (FURB)
- Certificação PCC® - Professional Coach (SLAC)
- Certificação em Governança Corporativa em Empresas Familiares (IBGC)
- Certificação em Análise Comportamental Avançada (GROU)

**Áreas (`Person.knowsAbout`):**
"Desenvolvimento de líderes", "Gestão estratégica de pessoas", "Análise comportamental", "Assessment executivo", "Sucessão em empresas familiares", "Governança corporativa", "Coaching executivo", "Neurociência e comportamento"

**Contato (já em uso no site):**
- WhatsApp: +55 47 99144-3844 → `https://wa.me/5547991443844`
- E-mail: consultoria@eloysekonell.com.br
- LinkedIn (pessoal/empresa) e Instagram já listados em `Person.sameAs` no Layout.astro.

## 5. Schema linkage (IDs estáveis)

Ao emitir JSON-LD em qualquer task, usar estes `@id` consistentes:

| Entidade | `@id` |
|---|---|
| Eloyse Konell (Person) | `${SITE_URL}#eloyse` |
| Consultoria (ProfessionalService) | `${SITE_URL}#business` |
| Service de cada `/servicos/[slug]` | `${SITE_URL}/servicos/[slug]/#service` |
| Article de cada post | `${SITE_URL}/blog/[slug]/` |

Em `Article.author`, sempre referenciar Eloyse por `@id`:
```json
"author": { "@id": "https://eloysekonell.com.br/#eloyse" }
```

## 6. Convenções de commit

- 1 commit por task concluído.
- Mensagem em português, formato `tipo: descrição curta` (ex: `feat: criar página /sobre`, `content: adicionar FAQ aos posts existentes`, `chore: sitemap auto-detect`).
- **Não incluir** `Co-Authored-By` (não foi solicitado).
- **Não usar** `--no-verify` ou skip de hooks.

## 7. Cases fictícios — protocolo

Os 3 case studies (Datarunk, Nuvme, Grupo Top) são **narrativas fictícias plausíveis com nomes reais autorizados**. Protocolo:

1. **Sempre criar com `draft: true`** no frontmatter.
2. Não usar números absurdos — métricas verossímeis (ex: "redução de 28% em turnover", não "300%").
3. Histórias devem ser plausíveis para o setor do cliente (Datarunk = tech/data, Nuvme = SaaS/cloud, Grupo Top = grupo de empresas/multinegócios).
4. Eloyse promove para `draft: false` manualmente após aprovar.

## 8. Posts novos (cluster) — protocolo

Os 4 posts novos também nascem com `draft: true`. `pubDate` distribuído nas próximas 8 semanas a partir de hoje (data atual: 2026-05-02), respeitando ordem temática. `tags` consistentes com taxonomia já em uso nos 8 posts existentes.

## 9. Ordem de execução & dependências

Cada task tem `depends_on` no frontmatter. Não iniciar uma task antes de TODAS as dependências terem `status: completed` em `.ralph/state.json`. O orchestrator gerencia isso — workers só pegam tasks com status `🔄 in_progress` ou `not_started` cujas deps estão verdes.

## 10. Workflow do task individual

Cada `03-tasks-NN-*.md` segue o ritual:

1. Marcar `status: in_progress` em `.ralph/state.json` (campo `status`, valor `🔄`).
2. Executar os "Detailed Steps" do task.
3. Rodar `npm run build` — não pode quebrar (a menos que step explicitamente diga que outro task vai consertar).
4. Verificar "Acceptance Criteria" do próprio task — todos ✅.
5. Commit conventional (ver §6).
6. Marcar `status: completed` em state.json (`✅`).
7. Preencher `commit` no state.json com o hash curto.

## 11. Quando algo bloqueia

- **Build quebra e não é trivial:** marcar `status: blocked`, escrever `feedback` em state.json com a causa, parar e relatar ao orchestrator.
- **Deps não resolvidas:** não iniciar a task. Voltar à fila.
- **Conflito de merge com outra task em paralelo:** parar, marcar bloqueado, relatar.

## 12. Restrições firmes (CLAUDE.md)

- **Não alterar** estrutura visual sem aprovação explícita. Mudanças visuais permitidas neste change: extrair seções pra rotas dedicadas, criar novas páginas internas com layout consistente. **Não permitidas**: trocar paleta, trocar fontes, redesenhar componentes existentes que permanecem na home.
- **Não remover** CNAME (`eloysekonell.com.br`).
- **Não alterar** `astro.config.mjs` exceto se um task explicitamente exige (ex: image config — caso houver).

---

**Pronto.** Vai pra task ID 01 ou pegue a primeira `not_started` cuja `depends_on` esteja vazia.
