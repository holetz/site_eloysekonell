---
id: "02"
phase: 1
complexity: medium
depends_on: ["01"]
files: ["src/layouts/Layout.astro"]
---

# Task 02 — Schema: Person + ProfessionalService enriquecidos

## Objective

Adicionar `knowsAbout`, `alumniOf`, `hasCredential` ao `Person` schema; adicionar `hasOfferCatalog` ao `ProfessionalService` referenciando os 4 serviços por `@id` (mesmo que páginas ainda não existam — IDs são estáveis).

## Detailed Steps

1. Marcar `status: 🔄` para id "02".
2. Ler [src/layouts/Layout.astro](../../../src/layouts/Layout.astro) atual — localizar bloco JSON-LD do `Person` e do `ProfessionalService`.
3. No topo do frontmatter do Layout, importar:
   ```ts
   import { credenciais } from '../data/credenciais';
   ```
4. **Person schema** — adicionar:
   - `knowsAbout: credenciais.areasConhecimento` (array de strings).
   - `alumniOf`: array de `{ '@type': 'EducationalOrganization', name, url }` para FURB e PUCRS (de `credenciais.alumniOf`).
   - `hasCredential`: array das 6 formações como `{ '@type': 'EducationalOccupationalCredential', credentialCategory, name, recognizedBy: { '@type': 'Organization', name: sigla } }`. `credentialCategory` = "degree" para graduação/pós/MBA, "certification" para PCC/IBGC/GROU.
5. **ProfessionalService schema** — adicionar:
   - `hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Serviços', itemListElement: [...] }` com 4 entries do tipo `{ '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': '${SITE_URL}/servicos/[slug]/#service' } }`.
   - Slugs: `desenvolvimento-de-liderancas`, `gestao-estrategica-de-pessoas`, `assessment`, `mentoria-executiva`.
6. Rodar `npm run build`. Verde.
7. Smoke: abrir `docs/index.html` e confirmar que JSON-LD inclui os novos campos (busca por `knowsAbout`, `hasOfferCatalog`).
8. Commit: `feat: enriquecer Person e ProfessionalService schema com credenciais e offer catalog`.
9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `Person` schema tem `knowsAbout` (8 entradas), `alumniOf` (2 entradas), `hasCredential` (6 entradas).
- [ ] `ProfessionalService` tem `hasOfferCatalog` apontando para os 4 services por `@id` absoluto.
- [ ] `npm run build` verde.
- [ ] Validar via [Schema Markup Validator](https://validator.schema.org/) colando o HTML gerado da home — sem erros (warnings sobre URL não-resolvida dos services são esperados nesta etapa).

## Testing

- Schema Validator: home `docs/index.html` valida sem erros estruturais.
- Spot-check Rich Results Test: Person reconhecido, ProfessionalService reconhecido.

## Notes

- IDs dos services são URLs absolutas com `#service` no fim — esse padrão é mantido em S12-S15 quando as páginas existirem.
- Não tocar nos campos existentes do Person (`name`, `jobTitle`, `address`, `sameAs`) — só adicionar novos.
