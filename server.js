require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const portfolioData = {
  nome: 'Victor Henrique',
  nome_completo: 'Victor Henrique Santana de Souza',
  titulo: 'Desenvolvedor Full Stack',
  sobre: 'Desenvolvedor recém-formado no curso técnico do Colégio Cotemig, atualmente cursando Análise e Desenvolvimento de Sistemas na faculdade Cotemig. Apaixonado por tecnologia e sempre em busca de novos desafios.',
  habilidades: [
    'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'C#', 'Blazor',
    'ASP.NET', 'MySQL', 'Git', 'Bootstrap', 'PHP', 'Laravel'
  ],

  educacao: [
    {
      curso: 'Técnico em Informática',
      instituicao: 'Colégio Cotemig',
      status: 'Concluído',
      ano: '2022 - 2024'
    },
    {
      curso: 'Análise e Desenvolvimento de Sistemas',
      instituicao: 'Faculdade Cotemig',
      status: 'Cursando',
      ano: '2025 - Presente'
    }
  ],
  contato: {
    email: 'victorhenriquesantanasouza@gmail.com',
    telefone: '(31) 98918-8805',
    linkedin: 'linkedin.com/in/victor-henrique-santana-de-souza-61517b279',
    github: 'github.com/VictorHSSouza'
  }
};

// Projetos estáticos como fallback
const staticProjects = [
  {
    nome: 'Portfolio',
    descricao: 'Portfólio pessoal desenvolvido com Node.js, Express e EJS',
    tecnologias: ['JavaScript', 'Node.js', 'Express'],
    url: 'https://github.com/VictorHSSouza/Portfolio'
  }
];

async function getGitHubProjects() {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await axios.get('https://api.github.com/users/VictorHSSouza/repos', {
      timeout: 5000,
      headers
    });
    const repos = response.data;
    
    const projectsWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        try {
          const langResponse = await axios.get(repo.languages_url, {
            timeout: 3000,
            headers
          });
          const languages = Object.keys(langResponse.data);
          
          const filteredLanguages = languages.filter(lang => 
            !['HTML', 'CSS'].includes(lang)
          );
          
          return {
            nome: repo.name,
            descricao: repo.description || 'Sem descrição disponível',
            tecnologias: filteredLanguages.length > 0 ? filteredLanguages : ['N/A'],
            url: repo.html_url
          };
        } catch (error) {
          const mainLang = repo.language && !['HTML', 'CSS'].includes(repo.language) 
            ? [repo.language] 
            : ['N/A'];
            
          return {
            nome: repo.name,
            descricao: repo.description || 'Sem descrição disponível',
            tecnologias: mainLang,
            url: repo.html_url
          };
        }
      })
    );
    
    return projectsWithLanguages;
  } catch (error) {
    console.error('Erro ao buscar projetos do GitHub:', error.message);
    console.log('Usando projetos estáticos como fallback');
    return staticProjects;
  }
}

app.get('/', async (req, res) => {
  const projetos = await getGitHubProjects();
  const data = { ...portfolioData, projetos };
  res.render('index', { 
    data,
    title: 'Portfólio',
    activePage: 'home'
  });
});

app.get('/sobre', (req, res) => {
  res.render('sobre', { 
    data: portfolioData, 
    title: 'Sobre',
    activePage: 'sobre'
  });
});

app.get('/projetos', async (req, res) => {
  const projetos = await getGitHubProjects();
  const data = { ...portfolioData, projetos };
  res.render('projetos', { 
    data,
    title: 'Projetos',
    activePage: 'projetos'
  });
});

app.get('/contato', (req, res) => {
  res.render('contato', { 
    data: portfolioData, 
    message: null,
    messageType: null,
    title: 'Contato',
    activePage: 'contato'
  });
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'victorhenriquesantanasouza@gmail.com',
    pass: process.env.EMAIL_PASS || 'sua-senha-app'
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/contato', async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  
  // Log da mensagem recebida
  console.log('Mensagem recebida:', { nome, email, assunto, mensagem });
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'victorhenriquesantanasouza@gmail.com',
    to: 'victorhenriquesantanasouza@gmail.com',
    subject: `Contato do Portfólio: ${assunto}`,
    html: `
      <h3>Nova mensagem do portfólio</h3>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${mensagem}</p>
    `,
    replyTo: email
  };

  try {
    // Verifica se as credenciais estão configuradas
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'sua-senha-app-aqui') {
      throw new Error('Credenciais de email não configuradas');
    }
    
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso');
    res.render('contato', { 
      data: portfolioData, 
      message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      messageType: 'success',
      title: 'Contato',
      activePage: 'contato'
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error.message);
    // Por enquanto, simula sucesso para não quebrar a experiência
    res.render('contato', { 
      data: portfolioData, 
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      messageType: 'error',
      title: 'Contato',
      activePage: 'contato'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});