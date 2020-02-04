const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
var count = 0;

//  Middlewares
const checkIdProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res
      .status(400)
      .json({ error: `Project with ID: ${id} does not exists` });
  }

  return next();
};

server.use((req, res, next) => {
  count ++;
  console.log(`Number of requests made until now: ${count}`);

  return next();
})

//  Rotas
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
