# 🚀 Deploy no GitHub Pages

## Passos para fazer o deploy:

### 1. Criar repositório no GitHub
1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome sugerido: `portfolio-victor-henrique`
4. Marque como "Public"
5. Clique em "Create repository"

### 2. Fazer upload dos arquivos
Você pode fazer de duas formas:

#### Opção A - Via interface web do GitHub:
1. No seu repositório, clique em "uploading an existing file"
2. Arraste os seguintes arquivos:
   - `index.html`
   - Pasta `public/` (com css e js)
   - `README.md`

#### Opção B - Via Git (se tiver instalado):
```bash
git init
git add .
git commit -m "Primeiro commit - Portfólio Victor Henrique"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio-victor-henrique.git
git push -u origin main
```

### 3. Ativar GitHub Pages
1. No seu repositório, vá em "Settings"
2. Role até "Pages" no menu lateral
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main"
5. Deixe "/ (root)" selecionado
6. Clique em "Save"

### 4. Acessar seu site
- Após alguns minutos, seu site estará disponível em:
- `https://SEU_USUARIO.github.io/portfolio-victor-henrique/`

## 📁 Arquivos necessários para o GitHub Pages:
- ✅ `index.html` (página principal)
- ✅ `public/css/style.css` (estilos)
- ✅ `public/js/script.js` (JavaScript)
- ✅ `README.md` (documentação)

## 🎯 Dicas importantes:
- O arquivo principal DEVE se chamar `index.html`
- Todos os links devem ser relativos (sem barra inicial)
- O site pode demorar até 10 minutos para ficar online
- Mudanças podem demorar alguns minutos para aparecer

## 🔄 Para atualizar o site:
1. Edite os arquivos localmente
2. Faça upload das alterações para o GitHub
3. O site será atualizado automaticamente

---

**Seu portfólio estará online e acessível para qualquer pessoa! 🎉**