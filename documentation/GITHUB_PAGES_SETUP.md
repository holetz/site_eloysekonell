# Configuração GitHub Pages - Eloyse Konell

## ✅ Ajustes Realizados

Este documento descreve as alterações feitas para preparar o projeto para ser servido via GitHub Pages.

### 1. **Remoção do `dist/` do `.gitignore`**

**Antes:**
```
# Node / build artifacts
node_modules/
dist/
```

**Depois:**
```
# Node / build artifacts
node_modules/
```

**Motivo:** O GitHub Pages serve arquivos estáticos. Como o build produz a pasta `dist/` com o HTML final, CSS e assets compilados, precisamos fazer commit dessa pasta no repositório para que o GitHub Pages possa servi-la.

### 2. **Criação do Workflow GitHub Actions**

**Arquivo:** `.github/workflows/deploy.yml`

**Funcionalidade:**
- ✅ Dispara automaticamente em push para as branches `main` ou `master`
- ✅ Instala dependências do Node.js
- ✅ Executa `npm run build:prod` para gerar versão otimizada
- ✅ Faz automatically commit e push da pasta `dist/` atualizada
- ✅ Usa `[skip ci]` no commit para evitar loops de CI/CD

**Execução automática:**
```
Desenvolvedor commit code → GitHub → GitHub Actions
                                   ↓
                         1. Instala dependências
                         2. Executa npm run build:prod
                         3. Commit dist/ (se houver mudanças)
                         4. Push para repositório
                         ↓
                    GitHub Pages serve dist/
```

### 3. **Verificação da Configuração CNAME**

**Arquivo:** `CNAME` (repositório raiz)

**Conteúdo:**
```
eloysekonell.com.br
```

**Status:** ✅ Já estava corretamente configurado. O GitHub Pages vai servir o site no domínio customizado `eloysekonell.com.br`.

---

## 🚀 Próximas Etapas (Para Configurar no GitHub)

Agora você precisa fazer algumas configurações no painel do GitHub:

### No GitHub.com - Página do Repositório

1. **Settings > Pages**

2. **Source Deployment**
   - Escolha: `Deploy from a branch`
   - Branch: `main` (ou `master`, dependendo do seu padrão)
   - Folder: `/ (root)`
   
   *Alternativa: Se preferir usar GitHub Actions para deploy, escolha `GitHub Actions` como source*

3. **Custom Domain**
   - Domínio: `eloysekonell.com.br`
   - O GitHub vai validar os registros DNS
   
4. **Enforce HTTPS**
   - ✅ Recomendado: Ativar "Enforce HTTPS"

### No seu Registrador de Domínio

Você precisará apontar o DNS de `eloysekonell.com.br` para os servidores do GitHub:

**Registros recomendados (A):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Ou registrar CNAME (alternativa):**
```
CNAME: eloysekonell.com.br -> seu-usuario.github.io
```

A documentação do GitHub Pages tem instruções específicas por registrador: https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

---

## 📝 Fluxo de Trabalho Local

Com essa configuração:

1. **Desenvolvimento local:**
   ```bash
   npm install        # Instala dependências
   npm run dev        # Constrói e abre preview
   ```

2. **Testar alterações:**
   ```bash
   npm run build       # Build padrão
   npm run build:prod  # Build otimizado com minificação
   ```

3. **Fazer commit (inclui dist/):**
   ```bash
   git add .
   git commit -m "feat: nova seção de serviços"
   git push origin main
   ```

4. **Automático na nuvem:**
   - GitHub Actions roda automaticamente
   - Reconstrói o site (verificação)
   - Faz commit do `dist/` se houver mudanças
   - GitHub Pages serve o site em `eloysekonell.com.br`

---

## 🔍 Verificação

Para verificar se tudo está funcionando:

- [ ] Pipeline GitHub Actions passa sem erros
- [ ] Site está acessível em `https://eloysekonell.com.br`
- [ ] Alterações aparecem ~2 minutos após push

---

## ⚙️ Configurações Adicionais (Opcional)

### Ignorar Commits do Build Agent

Se preferir que commits do GitHub Actions não disparem novos builds:

No `.github/workflows/deploy.yml`, já está configurado `[skip ci]` no commit message, o que previne loops.

### Proteger a Branch Principal

Recomendação: Em **Settings > Branches > Branch protection rules**

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass

Isso garante que o código sempre passa pelo build antes de ser merged.

---

## 📚 Documentação Oficial

- [GitHub Pages - Configure custom domain](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages - About GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/about-github-pages)
- [GitHub Actions - Workflow syntax](https://docs.github.com/pt/actions/using-workflows/workflow-syntax-for-github-actions)
