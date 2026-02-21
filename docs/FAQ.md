# FAQ & Troubleshooting

Perguntas frequentes e resolução de problemas comuns no desenvolvimento do site Eloyse Konell.

## Desenvolvimento

### 1. Como adiciono uma nova seção ao site?

1. Copie o arquivo `src/components/TEMPLATE.html` para `src/components/sections/nova-secao.html`.
2. Implemente o HTML e adicione o ID e classes apropriadas.
3. Crie o arquivo de estilo `src/styles/components/nova-secao.css`.
4. Importe o novo CSS em `src/styles/main.css`.
5. Adicione a referência para `{{ include "sections/nova-secao.html" }}` no arquivo `src/templates/index.html`.
6. Rode `npm run build`.

### 2. Editei o arquivo, mas não mudou no navegador. Por quê?

- **Verifique onde você editou:** Você editou o arquivo na pasta `dist/` ou na raiz? As alterações devem ser feitas sempre dentro de `src/`.
- **Rode o build:** Você rodou `npm run build` após salvar? O navegador lê a pasta `dist/`, que precisa ser atualizada.
- **Cache:** Tente limpar o cache do navegador (Ctrl+F5) ou rodar `npm run build:prod` que pode ajudar a invalidar caches em alguns setups.

### 3. Como alterar as cores ou fontes globais?

Edite o arquivo `src/styles/settings/variables.css`. Lá estão definidas as variáveis CSS (CSS Custom Properties) usadas em todo o site.

### 4. Posso usar SASS/SCSS?

Atualmente o projeto usa CSS puro (Vanilla CSS) para manter a simplicidade e reduzir dependências. A estrutura modular já oferece boa organização. Se necessário no futuro, o build system pode ser adaptado.

## Build e Ferramentas

### 5. O comando `npm run watch` (ou `dev`) falha.

Verifique se você tem o `nodemon` instalado. Ele é listado como `devDependency`, então `npm install` deveria resolver. Se persistir, tente instalar globalmente: `npm install -g nodemon`.

### 6. O script de build deu erro de "File not found".

Verifique se todos os caminhos nos seus componentes `{{ include ... }}` estão corretos e relativos a `src/components/`.

## IAs e Automação

### 7. Como peço para a IA fazer uma alteração segura?

Seja específico e peça para ela seguir o **Documento de Diretrizes de IA** (`docs/AI_GUIDELINES.md`).
Exemplo: "Adicione um botão no componente Hero seguindo os padrões do projeto e atualize o CSS correspondente."

### 8. A IA pode criar novos componentes sozinha?

Sim, desde que orientada a usar o template `src/components/TEMPLATE.html` e registrar o novo componente no `index.html` (template) e no `main.css`.
