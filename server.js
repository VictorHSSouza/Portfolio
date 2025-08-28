const express = require('express');
const path = require('path');
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts');

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
    'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'React', 'Express.js',
    'MySQL', 'Git', 'Bootstrap', 'Responsive Design'
  ],

  educacao: [
    {
      curso: 'Técnico em Informática',
      instituicao: 'Colégio Cotemig',
      status: 'Concluído',
      ano: '2024'
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
    linkedin: 'linkedin.com/in/victor-henrique-santana-de-souza',
    github: 'github.com/VictorHSSouza'
  }
};

async function getGitHubProjects() {
  try {
    const response = await axios.get('https://api.github.com/users/VictorHSSouza/repos');
    return response.data.map(repo => ({
      nome: repo.name,
      descricao: repo.description || 'Sem descrição disponível',
      tecnologias: repo.language ? [repo.language] : ['N/A'],
      url: repo.html_url
    }));
  } catch (error) {
    console.error('Erro ao buscar projetos do GitHub:', error.message);
    return [];
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

app.get('/contato', (req, res) => {
  res.render('contato', { 
    data: portfolioData, 
    message: null,
    title: 'Contato',
    activePage: 'contato'
  });
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  console.log('Mensagem recebida:', { nome, email, assunto, mensagem });
  res.render('contato', { 
    data: portfolioData, 
    message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
    title: 'Contato',
    activePage: 'contato'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});