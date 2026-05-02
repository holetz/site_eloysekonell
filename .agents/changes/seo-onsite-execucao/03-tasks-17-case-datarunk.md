---
id: "17"
phase: 4
complexity: medium
depends_on: ["16"]
files: ["src/content/cases/datarunk.md"]
---

# Task 17 — Case Datarunk (Jornada de liderança)

## Objective

Criar case study fictício plausível "Jornada de liderança da Datarunk". `draft: true` por protocolo.

## Detailed Steps

1. Marcar `status: 🔄` para id "17".

2. Criar `src/content/cases/datarunk.md` com:
   - **Frontmatter:**
     ```yaml
     ---
     title: "Jornada de Liderança na Datarunk"
     client: "Datarunk"
     clientUrl: "https://datarunk.com"
     sector: "Tecnologia / Dados"
     problem: "Crescimento exigia que líderes técnicos virassem gestores sem perder profundidade técnica."
     approach: "Programa de 6 meses com diagnóstico individual, mentoria estruturada e ciclos curtos de feedback."
     result: "Redução de turnover em posições-chave e clareza sobre próximas promoções."
     metric: "−28% em turnover de líderes em 12 meses"
     pubDate: 2026-04-15
     coverImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85"
     draft: true
     tags: ["desenvolvimento de líderes", "tech", "PME"]
     ---
     ```

3. **Body do case (~500-800 palavras), estrutura:**
   - **Contexto** (~100 palavras): empresa em fase de crescimento; time técnico forte; liderança composta principalmente por engenheiros que viraram gestores rapidamente.
   - **Desafio** (~150 palavras): turnover em posições de liderança técnica; conflito entre "fazer" e "gerir"; ausência de framework para promoções; sócios sobrecarregados em decisões de pessoas.
   - **Abordagem** (~250 palavras): diagnóstico individual de cada líder (assessment + entrevistas); plano de desenvolvimento com 3 frentes (gente, processos, decisão); mentoria 1-1 quinzenal; rituais de feedback estruturado entre líderes; mensuração trimestral.
   - **Resultado** (~150 palavras): redução de turnover; ciclo de promoções com critério; sócios menos demandados em decisões de pessoas operacionais; cultura de feedback instalada.
   - **O que aprendi** (~80 palavras, opcional): observação de Eloyse sobre o que tornou o caso bem-sucedido (alinhamento dos sócios com o método).

4. **Voz**: terceira pessoa narrando o trabalho; primeira pessoa só na seção "O que aprendi".

5. Rodar `npm run build`. Verde. Como `draft: true`, o case **não** aparece em `/cases/` nem gera rota.

6. Commit: `content: criar case Datarunk em draft`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `src/content/cases/datarunk.md` existe.
- [ ] Frontmatter cumpre schema da collection.
- [ ] `draft: true` (não publicado por padrão).
- [ ] Body 500-800 palavras com 4-5 seções.
- [ ] Métrica plausível (não absurda).
- [ ] Build verde.

## Testing

- Build verde.
- Para validar render, mudar temporariamente `draft: false`, build, conferir `/cases/datarunk/index.html`. Reverter para `draft: true` antes de commitar.

## Notes

- **Fictício mas plausível.** Eloyse aprova fatos antes de promover. Se ela disser que algum detalhe contradiz a realidade, ela edita.
- Não inventar nomes de pessoas dentro da Datarunk (use "líderes", "sócios", "time").
