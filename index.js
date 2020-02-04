// Cria variavel com express (ja instalado no package.json)
const express = require('express');

// Chama express de server
const server = express();

// Habilita o server a usar json
server.use(express.json());

const projectsList = [];

//Middleware que verifica id
function checkId(req, res, next) {
  const idProjeto = projectsList[req.params.index];

  if (!idProjeto) {
  
    return res.status(400).json({ error: "Project does not exists"});
  }

  return next();
}

//Middleware de contagem global

let usos = 0;

server.use((req, res, next) => {
  usos = usos + 1;

  console.log(`${usos} requisições`);

  next();
})

//Cria novo Projeto
server.post('/projects', (req, res) => {
  const { title } = req.body;
  const { id } = req.body;
  const { tasks } = req.body;
  
  const project = {id, title, tasks }

  projectsList.push(project);
  return res.json(projectsList);

})

//Lista todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projectsList);
})

//Troca Titulo
server.put('/projects/:index', checkId, (req, res) => {
  const {index} = req.params;
  const {title} = req.body;
  
  projectsList[index].title = title;
  return res.json(projectsList);
});


//Insere Tarefa
server.post('/projects/:index/tasks', checkId, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projectsList[index].tasks.push(title);

  return res.json(projectsList);
});


//Deleta Projeto
server.delete('/projects/:index', checkId, (req, res) => {
  const {index} = req.params;
  projectsList.splice(index, 1);
  return res.json(projectsList);
})




//Define porta 3000 para servidor
server.listen(3000);