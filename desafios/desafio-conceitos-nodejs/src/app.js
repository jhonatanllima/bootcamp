const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
  // TODO
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;

  const respository = {id: uuid(), title,  url, techs, likes};

  repositories.push(respository);

  return response.json(respository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }

  const repository  = {
    id,
    title, 
    url,
    techs,
  }

  repositories[respositoryIndex] = repository;

  return response.json(repository);
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }

  repositories.splice(respositoryIndex, 1);

  return response.status(204).send();
  
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }

  const repository = repositories.find((repository) => repository.id === id);

  repository.likes += 1;

  return response.status(200).json(repository);
  // TODO
});

module.exports = app;
