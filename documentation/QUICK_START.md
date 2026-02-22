# Quick Start Guide

Este guia te ajudará a colocar o projeto Eloyse Konell rodando em sua máquina em **menos de 5 minutos**.

## 1. Preparação do Ambiente

Certifique-se de ter instalado:

- **Node.js**: [Download](https://nodejs.org/) (Versão LTS recomendada)
- **Terminal**: Git Bash, PowerShell ou Terminal do Linux/Mac.

## 2. Instalação e Build Inicial

Abra seu terminal na pasta do projeto e execute:

```bash
# 1. Instalar dependências (ferramentas de desenvolvimento)
npm install

# 2. Gerar a primeira versão do site
npm run build
```

Você verá uma mensagem de sucesso indicando que os arquivos foram gerados na pasta `dist/`.

## 3. Visualizando o Site

Para ver o site funcionando no seu navegador:

```bash
npm run preview
```

Isso iniciará um servidor local. Abra o link mostrado (geralmente `http://localhost:8000` ou similar) no seu navegador.

> **Dica:** Se você tiver o `nodemon` instalado globalmente ou como devDependency, pode usar `npm run watch` para recompilar automaticamente enquanto edita arquivos.

## 4. Fazendo sua Primeira Modificação

Vamos praticar a estrutura modular fazendo uma pequena alteração.

### Exemplo: Alterar o texto do Rodapé

1.  Vá para `src/components/common/footer.html`.
2.  Abra o arquivo no seu editor de código.
3.  Encontre um texto para mudar ou adicione um comentário HTML `<!-- Teste de edição -->`.
4.  Salve o arquivo.
5.  No terminal, rode:
    ```bash
    npm run build
    ```
6.  Atualize a página no navegador. Sua alteração estará lá!

**Importante:** Nunca edite arquivos dentro da pasta `dist/`. Eles são sobrescritos a cada build. Edite sempre em `src/`.

## 5. Próximos Passos

Agora que você já sabe o básico, explore a documentação técnica para entender melhor:

- [Entenda a Arquitetura](ARCHITECTURE.md)
- [Veja os Componentes Disponíveis](COMPONENTS.md)
- [Aprenda sobre o CSS](CSS_CONVENTIONS.md)
