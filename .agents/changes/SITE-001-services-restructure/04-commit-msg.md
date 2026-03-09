feat(services): reestruturar seção de serviços com flip cards 3D e duas frentes estratégicas

A seção de serviços foi completamente reestruturada: os cards estáticos anteriores
foram substituídos por **8 flip cards interativos** organizados em dois grupos temáticos —
**Liderança Alta Performance** e **Gestão Estratégica de Pessoas**.

Cada card exibe título e ícone SVG inline na frente, e ao clique/toque revela descrição
detalhada (parágrafo introdutório + bullets estruturados) mais um botão de CTA ancorando
na seção de contato. A interação é acessível por teclado (Enter/Space) com atualização de
`aria-expanded`.

Closes SITE-001

- Substituídos cards legados por 8 flip cards 3D com transição CSS 0.5s
- Criados dois grupos temáticos com rótulos: Liderança (4 serviços) e Gestão (4 serviços)
- Grade 2×2 em desktop; 1 coluna em mobile (breakpoints: 991px, 767px, 575px)
- Pills/badges coloridas para serviço com subtítulo categorial (Liderança Alta Performance)
- initServiceCards() adicionado ao main.js com suporte ARIA e teclado
- Estrutura HTML preserva id=carousel_23e7 e classes Nicepage existentes
