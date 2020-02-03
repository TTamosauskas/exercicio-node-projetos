// Cria variavel com express (ja instalado no package.json)
const express = require('express');

// Chama express de server
const server = express();

//Passa rota /projetos 
server.get('/projetos', (req, res) => {

  //retorna mensagem de confirmação
  return res.json({message: "It's working!"})

})

//Define porta 3000 para servidor
server.listen(3000);