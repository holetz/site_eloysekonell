---
id: "25"
phase: 6
complexity: low
depends_on: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "22"]
files: ["public/llms.txt"]
---

# Task 25 — `llms.txt` atualizado

## Objective

Atualizar `public/llms.txt` com as novas rotas para que LLMs (ChatGPT, Perplexity, Claude) tenham contexto claro do site.

## Detailed Steps

1. Marcar `status: 🔄` para id "25".

2. Ler [public/llms.txt](../../../public/llms.txt) atual para preservar tom e estrutura.

3. Reescrever `llms.txt` no formato [llms.txt convention](https://llmstxt.org/):
   ```
   # Eloyse Konell — Consultoria em Liderança e Gestão Estratégica de Pessoas

   > [Descrição da consultoria — 2-3 frases curtas mantendo o que estava antes]

   ## Páginas principais
   - [Início](https://eloysekonell.com.br/): consultoria estratégica em liderança...
   - [Sobre](https://eloysekonell.com.br/sobre/): trajetória, formação e abordagem.
   - [Serviços](https://eloysekonell.com.br/servicos/): hub com 4 frentes de atuação.
   - [Desenvolvimento de Líderes](https://eloysekonell.com.br/servicos/desenvolvimento-de-liderancas/): pillar 1.500+ palavras.
   - [Gestão Estratégica de Pessoas](https://eloysekonell.com.br/servicos/gestao-estrategica-de-pessoas/): pillar 1.500+ palavras.
   - [Assessment](https://eloysekonell.com.br/servicos/assessment/): pillar 1.500+ palavras.
   - [Mentoria Executiva](https://eloysekonell.com.br/servicos/mentoria-executiva/): mentoria 1-1 para executivos.
   - [Metodologia](https://eloysekonell.com.br/metodologia/): abordagem aplicada (neurociência, análise comportamental).
   - [Cases](https://eloysekonell.com.br/cases/): resultados de aplicação em diferentes contextos.
   - [Blog](https://eloysekonell.com.br/blog/): conteúdo sobre liderança, sucessão, gestão de pessoas, saúde mental.
   - [FAQ](https://eloysekonell.com.br/faq/): perguntas frequentes sobre serviços, processo e contratação.
   - [Contato](https://eloysekonell.com.br/contato/): WhatsApp, e-mail e endereço.

   ## Posts em destaque
   - [Cadeira vazia](.../blog/cadeira-vazia/)
   - [Sucessão mal planejada](.../blog/sucessao-mal-planejada/)
   - [Técnico virou gestor](.../blog/tecnico-virou-gestor/)
   - [...] (incluir os 8 existentes; opcional incluir os 4 novos quando promovidos)

   ## Áreas de atuação
   - Desenvolvimento de líderes na PME
   - Gestão estratégica de pessoas
   - Assessment executivo
   - Sucessão em empresas familiares
   - Mentoria executiva 1-1

   ## Contato
   - E-mail: consultoria@eloysekonell.com.br
   - WhatsApp: +55 47 99144-3844
   - Localização: Blumenau-SC, Vale do Itajaí (atendimento presencial e remoto)
   - LinkedIn: [link]
   - Instagram: [link]

   ## Portfólio
   - [PDF do portfólio](https://eloysekonell.com.br/files/portfolio_eloyse_konell.pdf)
   ```

4. Cuidados:
   - **URLs absolutas** com `https://eloysekonell.com.br`.
   - Posts novos do cluster (S22) podem ser listados como "drafts em breve" ou incluídos quando `draft: false`. Por agora, **não** incluir os 4 novos (estão em draft).
   - Cases (S17-S19) também em draft — **não** incluir links específicos; deixar `[Cases](.../cases/)` apenas para o hub.

5. Não tocar em `robots.txt` — já está OK conforme estratégia (`Allow: /` para bots de IA).

6. Build verde (não toca código, mas conferir que `docs/llms.txt` reflete o novo).

7. Commit: `chore: atualizar llms.txt com as novas rotas`.

8. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `public/llms.txt` lista todas as rotas indexáveis criadas neste change.
- [ ] URLs absolutas com domínio canônico.
- [ ] Não inclui rotas de drafts (cases, posts novos).
- [ ] Mantém contato e descrição da consultoria.
- [ ] Build verde.

## Testing

- Build verde.
- Abrir `docs/llms.txt` e conferir conteúdo.

## Notes

- Este task tem deps amplas porque precisa que todas as rotas existam para listá-las com confiança. Se uma rota faltar no momento da execução, registrar e seguir.
