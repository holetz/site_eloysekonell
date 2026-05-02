---
id: "24"
phase: 5
complexity: medium
depends_on: ["08", "09", "10", "11", "20"]
files: ["src/components/Nav.astro", "src/components/Footer.astro"]
---

# Task 24 — Nav + Footer apontam para rotas reais

## Objective

Substituir `#sobre`, `#servicos`, `#consultoria`, `#proposito`, `#assessment`, `#contato` por URLs reais (`/sobre/`, `/servicos/`, etc.) em Nav e Footer. Adicionar links para rotas novas.

## Detailed Steps

1. Marcar `status: 🔄` para id "24".

2. **Editar `src/components/Nav.astro`:**
   - Substituir hrefs:
     - `#sobre` → `/sobre/`
     - `#servicos` → `/servicos/`
     - `#consultoria` → `/metodologia/` *(decisão: a antiga seção "Consultoria" fala da abordagem; a página espelho é `/metodologia/`)*
     - `#proposito` → `/metodologia/` (mesma página)
     - `#assessment` → `/servicos/assessment/`
     - `#contato` → `/contato/`
   - **Manter** âncoras que ainda fazem sentido na home:
     - `#depoimentos` (Testimonials ainda na home)
     - `#clientes` (Clients ainda na home)
   - Mobile menu: aplicar mesmas substituições.
   - Adicionar item de menu para `/blog/` (se ainda não existir) e considerar `/cases/` (visível só quando há cases publicados — usar `getCollection` para checagem condicional ou link sempre visível).

3. **Editar `src/components/Footer.astro`:**
   - Replicar substituições de href.
   - Adicionar links que façam sentido no Footer:
     - "Sobre" → `/sobre/`
     - "Serviços" → `/servicos/`
     - "Metodologia" → `/metodologia/`
     - "Cases" → `/cases/`
     - "Blog" → `/blog/`
     - "FAQ" → `/faq/`
     - "Contato" → `/contato/`
   - Manter telefone/e-mail/redes sociais existentes.
   - Manter link para portfólio PDF (`/files/portfolio_eloyse_konell.pdf`).

4. Rodar `npm run build`. Verde.

5. Smoke: clicar em todos os itens do Nav e Footer no preview — sem 404.

6. Commit: `feat: Nav e Footer apontando para rotas dedicadas`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Nav (desktop + mobile) sem hrefs `#sobre`, `#consultoria`, `#proposito`, `#servicos`, `#assessment`, `#contato`.
- [ ] Todos os links do Nav e Footer resolvem para rotas reais (sem 404 no build).
- [ ] Footer cobre as novas rotas principais.
- [ ] Build verde.

## Testing

- Build + preview.
- Clicar em **cada** link do Nav e Footer — confirmar 200 OK.

## Notes

- Decisão `#consultoria` → `/metodologia/`: rationale é que `Consultoria.astro` original fala da abordagem; em `/metodologia/` fica isso. Se Eloyse preferir manter "Consultoria" como label, o label visual pode permanecer mesmo apontando para `/metodologia/` — mas é mais limpo padronizar para "Metodologia".
- Este task NÃO mexe no `index.astro` (S23 cuida disso).
