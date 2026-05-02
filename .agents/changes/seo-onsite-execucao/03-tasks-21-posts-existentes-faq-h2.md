---
id: "21"
phase: 4
complexity: high
depends_on: ["06"]
files: ["src/content/blog/cadeira-vazia.md", "src/content/blog/hora-de-mudar.md", "src/content/blog/rh-futuro.md", "src/content/blog/saude-mental-estrategia.md", "src/content/blog/sucessao-mal-planejada.md", "src/content/blog/sucessor-e-sucessao.md", "src/content/blog/tecnico-virou-gestor.md", "src/content/blog/antes-da-palavra.md"]
---

# Task 21 — 8 posts existentes: FAQ + H2 reescritos

## Objective

Para cada um dos 8 posts existentes em `src/content/blog/`: (a) reescrever 2-3 H2s no formato pergunta com parágrafo-resposta direta logo abaixo; (b) adicionar field `faq` ao frontmatter com 3-5 pares Q&A extractables.

## Detailed Steps

1. Marcar `status: 🔄` para id "21".

2. **Para cada um dos 8 posts**, executar o ritual:

   a. Ler o post atual.

   b. Identificar 2-3 H2s que possam ser reformulados como pergunta. Reescrever:
      - Antes: `## A importância do feedback contínuo`
      - Depois: `## Por que o feedback contínuo importa mais do que ciclo anual?`
      Logo abaixo do H2, **garantir** que o primeiro parágrafo tenha resposta direta em 2-3 frases (citability para AI Overviews). Se o parágrafo já existir e for direto, manter.

   c. Adicionar `faq` ao frontmatter — 3-5 Q&As temáticas do post:
      ```yaml
      faq:
        - q: "Pergunta extractable?"
          a: "Resposta direta de 1-3 frases."
      ```
      Cada pergunta deve ser algo que um líder de PME pesquisaria sobre o tema do post.

   d. **Não reescrever o post inteiro.** Alterações cirúrgicas. Voz mantida.

3. **Mapeamento sugerido (orientativo, ajustar conforme conteúdo real):**

   | Post | Tema | Sugestão de FAQ (exemplos — adaptar) |
   |---|---|---|
   | `cadeira-vazia` | Vacância de liderança | "Como evitar a cadeira vazia?", "O que faço quando perco um líder-chave?" |
   | `hora-de-mudar` | Sinais de momento de mudança | "Como saber a hora certa de mudar uma estrutura?", "Quais sinais indicam transformação organizacional?" |
   | `rh-futuro` | RH estratégico | "O que é RH estratégico em PME?", "Como começar sem ter RH?" |
   | `saude-mental-estrategia` | Saúde mental como estratégia | "Saúde mental no trabalho é responsabilidade da empresa?", "Como implementar sem virar performance?" |
   | `sucessao-mal-planejada` | Erros em sucessão | "Quais erros mais comuns em sucessão?", "Como evitar sucessão de cabeça quente?" |
   | `sucessor-e-sucessao` | Preparar sucessor | "Como identificar sucessor?", "Em quanto tempo se prepara um sucessor?" |
   | `tecnico-virou-gestor` | Transição técnico→gestor | "Como ajudar um técnico a virar gestor?", "Quais erros comuns na transição?" |
   | `antes-da-palavra` | Comunicação de líder | "O que considerar antes de falar como líder?", "Como construir comunicação que conecta?" |

4. Após cada post, rodar `npm run build` (ou ao final, em todos). Verde.

5. Smoke: abrir `/blog/[slug]/` no preview — confirmar que (a) os H2s reformulados aparecem, (b) o `<FaqBlock>` renderiza ao final do post (antes da author bio), (c) JSON-LD `FAQPage` está presente.

6. Commit (preferir 1 commit cobrindo os 8 posts): `content: adicionar FAQ e reescrever H2 dos 8 posts existentes`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Cada um dos 8 posts tem field `faq` com 3-5 Q&As.
- [ ] Cada post tem ≥2 H2s em formato pergunta com parágrafo-resposta direta.
- [ ] Voz e estrutura geral do post preservadas (alterações cirúrgicas).
- [ ] FAQPage schema emitido em cada post.
- [ ] Build verde.

## Testing

- Build verde.
- Schema Validator em pelo menos 2 posts diferentes.
- Spot-check visual no preview.
- Conferir que `:::faq` directive (se usada) ou field `faq` está sendo lido corretamente.

## Notes

- **Field `faq` é fonte preferida.** Se o post tinha um directive `:::faq` planejado, usar o field por consistência.
- Não introduzir contradição — se a resposta no FAQ contradiz o corpo do post, ajustar uma das duas.
- Se um post já tem H2s naturais em forma de pergunta, marcar como "já cumpre" e só adicionar FAQ.
- 8 arquivos = task longa. **Worker serializa internamente** — não tenta paralelizar dentro da task.
