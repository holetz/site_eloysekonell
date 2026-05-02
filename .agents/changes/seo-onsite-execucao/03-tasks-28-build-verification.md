---
id: "28"
phase: 7
complexity: medium
depends_on: ["25", "26", "27"]
files: [".agents/changes/seo-onsite-execucao/99-final-notes.md"]
---

# Task 28 — Build verification + sanity

## Objective

Última verificação completa antes de declarar o change pronto para PR final / merge / deploy.

## Detailed Steps

1. Marcar `status: 🔄` para id "28".

2. **Build limpo:**
   ```bash
   rm -rf docs/
   npm run build
   ```
   Verde, sem warnings novos.

3. **Auditoria de rotas geradas em `docs/`:**
   - [ ] `docs/index.html`
   - [ ] `docs/sobre/index.html`
   - [ ] `docs/contato/index.html`
   - [ ] `docs/metodologia/index.html`
   - [ ] `docs/faq/index.html`
   - [ ] `docs/servicos/index.html`
   - [ ] `docs/servicos/desenvolvimento-de-liderancas/index.html`
   - [ ] `docs/servicos/gestao-estrategica-de-pessoas/index.html`
   - [ ] `docs/servicos/assessment/index.html`
   - [ ] `docs/servicos/mentoria-executiva/index.html`
   - [ ] `docs/cases/index.html`
   - [ ] `docs/blog/index.html` + 8 posts existentes (drafts não geram)
   - [ ] `docs/sitemap.xml`
   - [ ] `docs/llms.txt`
   - [ ] `docs/robots.txt`
   - [ ] `docs/CNAME`

4. **Cases em draft** — `docs/cases/[slug]/index.html` **não** gerado para datarunk, nuvme, grupo-top (drafts). Hub `/cases/` mostra placeholder.

5. **Posts novos em draft** — `docs/blog/identificar-potencial-de-lideranca/index.html` etc. **não** gerados. Listagem `/blog/` ignora drafts.

6. **Sitemap auditoria:**
   - Abrir `docs/sitemap.xml`.
   - Confirmar presença de **todas as URLs públicas** (rotas estáticas + 8 posts não-draft).
   - Confirmar **ausência** de URLs draft.
   - Validar XML em [xml-sitemaps.com/validate](https://www.xml-sitemaps.com/validate-xml-sitemap.html).

7. **Schema validation:**
   - [Schema Validator](https://validator.schema.org/) ou [Rich Results Test](https://search.google.com/test/rich-results) em pelo menos 5 URLs:
     1. Home (`/`) — Person + WebSite + ProfessionalService (com hasOfferCatalog).
     2. `/sobre/` — ProfilePage.
     3. `/servicos/desenvolvimento-de-liderancas/` — Service + BreadcrumbList + FAQPage.
     4. `/blog/cadeira-vazia/` (ou qualquer post) — Article + BreadcrumbList + FAQPage.
     5. `/faq/` — FAQPage com 15-20 perguntas.

8. **Lighthouse local:**
   - `npm run preview`.
   - Lighthouse (CLI ou DevTools) em:
     - `/` — esperado: Performance ≥85, LCP < 2,5s, CLS < 0,1.
     - `/sobre/` — Performance ≥85.
     - `/blog/cadeira-vazia/` — Performance ≥85.
     - `/servicos/desenvolvimento-de-liderancas/` — Performance ≥85.

9. **Links internos** (spot-check):
   - Nav: clicar em cada item.
   - Footer: clicar em cada item.
   - Cards do hub `/servicos/`: cada um leva à pillar/página correta.
   - CTA das pillars: leva a `/contato/`.
   - Posts → pillars: spot-check 1 link em 1 post.

10. **Mobile (375px viewport):**
    - Home, /sobre, /servicos, /servicos/desenvolvimento-de-liderancas, /faq, /contato — sem quebras visuais.

11. **Documentar achados** em `.agents/changes/seo-onsite-execucao/99-final-notes.md`:
    - Resultado do build (verde / warnings).
    - Lista de rotas geradas (saída de `find docs/ -name index.html`).
    - Lighthouse scores das 4 páginas.
    - Schema validator output (capturas ou notas).
    - Issues encontradas (se houver) — categorizar P0/P1/P2.

12. **Atualizar `MEMORY.md`** se algo relevante mudou em arquitetura — apontar para [project_status.md](../../../C:/Users/eloys/.claude/projects/c--Users-eloys-Repos-site-eloysekonell/memory/project_status.md) com nova nota: "Execução SEO on-site concluída em 2026-XX-XX (ver `.agents/changes/seo-onsite-execucao/`)".

13. Commit: `chore: notas finais e validação do change SEO on-site`.

14. Marcar `status: ✅` em state.json para id "28" e `current_phase` como `completed`.

## Acceptance Criteria

- [ ] Build verde, sem warnings novos.
- [ ] Todas as rotas listadas em §3 existem em `docs/`.
- [ ] Sitemap válido com URLs corretas.
- [ ] 5 URLs validadas no Schema Validator.
- [ ] Lighthouse Performance ≥85 em 4 páginas.
- [ ] Mobile sem quebras.
- [ ] `99-final-notes.md` documenta resultado.

## Testing

Já é a task de teste. Resultado dela é o sinal de que o change está pronto.

## Notes

- **Issues P0** (bloqueantes): build vermelho, rota faltando, schema inválido em validator. Reportar e bloquear merge.
- **Issues P1** (não-bloqueantes mas gravíssimos): Lighthouse <70, CLS >0,25.
- **Issues P2**: warnings, otimizações futuras.
- Após esta task, o change está pronto para PR final / merge em `main` / deploy automático via GitHub Actions.
- Lembrar: cases (`/cases/datarunk/` etc.) e 4 posts novos do cluster permanecem em **draft** — Eloyse promove depois da revisão.
