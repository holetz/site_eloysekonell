---
id: "09"
phase: 3
complexity: low
depends_on: ["04", "07"]
files: ["src/pages/contato.astro"]
---

# Task 09 — Página /contato/

## Objective

Criar página dedicada `/contato/` com 3 canais (WhatsApp, e-mail, endereço/região). Sem formulário, zero JS.

## Detailed Steps

1. Marcar `status: 🔄` para id "09".

2. Criar `src/pages/contato.astro` usando `<PageLayout>`:
   - Frontmatter:
     - `title`: "Contato — Eloyse Konell | Consultoria em Liderança"
     - `description`: ~150 chars: "Fale comigo via WhatsApp, e-mail ou agende uma conversa. Atendimento em Blumenau-SC e remoto."
     - `canonical`: `${SITE_URL}/contato/`.
   - `breadcrumb`: `[{ label: 'Início', href: '/' }, { label: 'Contato' }]`.

3. **Conteúdo:**
   - `<PageHero>` eyebrow "Contato", title "Vamos conversar", deck "Conte um pouco sobre o desafio que você está vivendo na liderança ou na gestão de pessoas. Respondo em até 1 dia útil."
   - **3 cards lado a lado (responsivos):**
     - **WhatsApp**: ícone, "+55 47 99144-3844", botão "Abrir WhatsApp" linkando `https://wa.me/5547991443844?text=Ol%C3%A1%20Eloyse%2C%20gostaria%20de%20conversar%20sobre...`. Texto curto: "Resposta em horário comercial".
     - **E-mail**: ícone, `consultoria@eloysekonell.com.br`, botão "Enviar e-mail" linkando `mailto:consultoria@eloysekonell.com.br?subject=Contato%20pelo%20site`.
     - **Onde estou**: ícone, "Blumenau-SC, Vale do Itajaí". Texto: "Atendimento presencial na região e remoto para todo o Brasil." Sem endereço completo (privacidade).
   - **Seção "Antes de me escrever"** (opcional, ~80 palavras): bullets com o que ajuda na primeira mensagem (contexto da empresa, principal desafio, tamanho do time).
   - **Links sociais**: LinkedIn pessoal, LinkedIn empresa, Instagram (já listados em Person.sameAs — replicar como links visuais).

4. **JSON-LD `ContactPage`** opcional:
   ```json
   { "@context": "https://schema.org", "@type": "ContactPage", "mainEntity": { "@id": "${SITE_URL}/#business" } }
   ```

5. Rodar `npm run build`. Verde.

6. Smoke: `/contato/` no preview, mobile responsivo, links funcionam.

7. Commit: `feat: criar página /contato com 3 canais sem formulário`.

8. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `/contato/` retorna HTML válido.
- [ ] WhatsApp, e-mail e endereço/região presentes.
- [ ] Sem JavaScript no escopo da página (todos os links são `<a href>`).
- [ ] Breadcrumb e schema presentes.
- [ ] Mobile responsivo (cards empilham).
- [ ] `npm run build` verde.

## Testing

- Build + preview.
- Clicar nos 3 botões: WhatsApp abre o app/web, mailto abre cliente de e-mail.

## Notes

- WhatsApp e e-mail já estão em uso em outros componentes (`Cta.astro`, `Footer.astro`) — copiar números/endereços daí pra evitar inconsistência.
- Sem form de contato (decisão da spec) — zero dependência externa.
