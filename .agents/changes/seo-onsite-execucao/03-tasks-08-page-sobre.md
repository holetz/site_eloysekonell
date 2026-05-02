---
id: "08"
phase: 3
complexity: medium
depends_on: ["01", "04", "07"]
files: ["src/pages/sobre.astro"]
---

# Task 08 — Página /sobre/

## Objective

Criar página dedicada `/sobre/` com bio expandida, números factuais, formação acadêmica, e CTA para contato.

## Detailed Steps

1. Marcar `status: 🔄` para id "08".

2. Ler [src/components/About.astro](../../../src/components/About.astro) para reaproveitar copy existente como base.

3. Criar `src/pages/sobre.astro` usando `<PageLayout>`:
   - Frontmatter SEO:
     - `title`: "Sobre Eloyse Konell — Consultora em Liderança e Gestão de Pessoas"
     - `description`: ~155 chars, em pt-BR, mencionando Blumenau-SC e 18 anos.
     - `canonical`: `${SITE_URL}/sobre/`.
   - `breadcrumb`: `[{ label: 'Início', href: '/' }, { label: 'Sobre' }]`.

4. **Conteúdo (estrutura):**
   - `<PageHero>` com eyebrow "Sobre", title "Eloyse Konell", deck 1 frase ("Consultora em liderança de alta performance e gestão estratégica de pessoas, baseada em Blumenau-SC."). Foto (importar de `src/assets/photos/eloyse-portrait.jpg` — se ainda não migrado, usar `<img src="/images/photos/eloyse-portrait.jpg">` com width/height; S26 substitui depois).
   - **Seção "Trajetória"** (3-4 parágrafos, ~250-350 palavras): redigir voz formal-acolhedora. Começar com 18 anos de atuação, abordagem aplicada (sem treinamento de prateleira), foco em PMEs do Sul. Mencionar `+15 empresas`, `+500 líderes desenvolvidos`, `+500 assessments`.
   - **Seção "Formação"**: lista das 6 formações (importar `credenciais` de `src/data/credenciais.ts`). Renderizar como `<ul>` ou cards. Cada item: tipo + título + instituição (sigla).
   - **Seção "Como atuo"** (~150 palavras): pequena ponte para `/metodologia/` — 2 parágrafos sobre abordagem baseada em neurociência e análise comportamental. CTA "Conheça a metodologia →".
   - **Seção "Onde me encontro"**: Blumenau-SC, Vale do Itajaí. Atende presencial e remoto. Links para LinkedIn e Instagram (já em `Person.sameAs`).
   - **CTA final** (`.cta-block`): "Vamos conversar sobre sua liderança?" + botão "Falar no WhatsApp" (link `wa.me/...`) + link "Ver formas de contato →" para `/contato/`.

5. **JSON-LD adicional** (opcional, mas alinhado com estratégia): emitir `ProfilePage` schema:
   ```json
   { "@context": "https://schema.org", "@type": "ProfilePage", "mainEntity": { "@id": "${SITE_URL}/#eloyse" } }
   ```
   Via slot do Layout ou inline no head.

6. Rodar `npm run build`. Verde. `docs/sobre/index.html` existe.

7. Smoke visual: `npm run preview`, abrir `/sobre/` — desktop e mobile (375px).

8. Commit: `feat: criar página /sobre com bio expandida e formação`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `/sobre/` retorna HTML válido.
- [ ] H1 único, hierarquia de headings correta.
- [ ] Números factuais vêm de `credenciais.ts` (não duplicados).
- [ ] 6 formações listadas.
- [ ] Foto presente (com width/height para CLS).
- [ ] Breadcrumb funcional.
- [ ] CTA WhatsApp funciona.
- [ ] Schema `ProfilePage` ou similar emitido.
- [ ] Mobile responsivo.
- [ ] `npm run build` verde.

## Testing

- Build + preview.
- Schema Validator no HTML gerado.
- Lighthouse spot-check (não bloqueante; verificação completa em S28).

## Notes

- Voz: formal-acolhedora, primeira pessoa OK ou terceira — manter consistência com `About.astro` atual.
- Não inventar fatos — usar somente o que está em `credenciais.ts` e em `About.astro`.
- Se `src/assets/photos/eloyse-portrait.jpg` ainda não existe (S26 migra), usar `/images/photos/eloyse-portrait.jpg` como fallback temporário com `width`/`height` explícitos.
