<<<<<<< HEAD
# 🚀 Portfólio Pessoal - Victor Henrique

Portfólio web responsivo desenvolvido com Node.js, Express e EJS, apresentando informações profissionais, projetos e habilidades técnicas.

## ✨ Funcionalidades

- **Design Responsivo** - Adaptável a todos os dispositivos
- **Modo Escuro/Claro** - Alternância de temas com persistência
- **Integração GitHub API** - Exibe projetos automaticamente
- **Formulário de Contato** - Sistema de envio de emails funcional
- **Navegação Suave** - Experiência de usuário otimizada
- **Animações CSS** - Interface moderna e interativa
- **Efeito de Digitação** - Animação no título principal

## 🛠️ Tecnologias

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap 5, CSS3, JavaScript
- **APIs:** GitHub REST API, Nodemailer
- **Deploy:** Vercel
- **Autenticação:** GitHub Token, Gmail App Password

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/VictorHSSouza/Portfolio.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
GITHUB_TOKEN=seu-token-github

# Execute o servidor
npm start

# Para desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

## 📁 Estrutura

```
portfolio/
├── public/
│   ├── css/style.css     # Estilos e modo escuro
│   └── js/script.js      # Interatividade e temas
├── views/
│   ├── partials/         # Componentes reutilizáveis
│   ├── index.ejs         # Página inicial
│   ├── sobre.ejs         # Página sobre
│   ├── projetos.ejs      # Página de projetos
│   ├── contato.ejs       # Página de contato
│   └── layout.ejs        # Layout principal
├── server.js             # Servidor principal
├── vercel.json           # Configuração deploy
├── .env                  # Variáveis de ambiente
└── package.json          # Dependências
```

## ⚙️ Configuração

### GitHub Token
1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. Gere um token com permissão `public_repo`
3. Adicione no `.env`: `GITHUB_TOKEN=seu-token`

### Email (Gmail)
1. Ative verificação em 2 etapas
2. Gere senha de app em Configurações > Segurança
3. Adicione no `.env`: `EMAIL_PASS=sua-senha-app`

## 🌐 Deploy

Configurado para deploy automático no Vercel:
- Push para `main` → Deploy automático
- Variáveis de ambiente configuradas no painel Vercel
- Domínio personalizado disponível

## 🎨 Personalização

Edite o objeto `portfolioData` em `server.js`:
- Informações pessoais
- Habilidades técnicas
- Formação acadêmica
- Dados de contato

## 📱 Páginas

- **/** - Página inicial com todas as seções
- **/sobre** - Informações detalhadas e formação
- **/projetos** - Portfólio completo de projetos
- **/contato** - Formulário de contato funcional

---

**Desenvolvido por Victor Henrique Santana de Souza** 💻
=======
# Portfolio
>>>>>>> fc5716eac1c26b0045b7e36086d43afddb95c6a3
