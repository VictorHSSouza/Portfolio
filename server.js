const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const portfolioData = {
  nome: 'Victor Henrique Santana de Souza',
  titulo: 'Desenvolvedor Full Stack',
  sobre: 'Desenvolvedor recém-formado no curso técnico do Colégio Cotemig, atualmente cursando Análise e Desenvolvimento de Sistemas na faculdade Cotemig. Apaixonado por tecnologia e sempre em busca de novos desafios.',
  habilidades: [
    'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'React', 'Express.js',
    'MySQL', 'Git', 'Bootstrap', 'Responsive Design'
  ],
  projetos: [
    {
      nome: 'Sistema de Gerenciamento',
      descricao: 'Sistema web para gerenciamento de dados desenvolvido durante o curso técnico',
      tecnologias: ['HTML', 'CSS', 'JavaScript', 'MySQL']
    },
    {
      nome: 'API RESTful',
      descricao: 'API desenvolvida em Node.js com Express para gerenciamento de usuários',
      tecnologias: ['Node.js', 'Express', 'MySQL', 'JWT']
    },
    {
      nome: 'Landing Page Responsiva',
      descricao: 'Página responsiva desenvolvida com foco em UX/UI',
      tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
    }
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
      ano: '2024 - Presente'
    }
  ],
  contato: {
    email: 'victor.henrique@email.com',
    telefone: '(31) 99999-9999',
    linkedin: 'linkedin.com/in/victor-henrique',
    github: 'github.com/victorhenrique'
  }
};

app.get('/', (req, res) => {
  res.render('index', { data: portfolioData });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});