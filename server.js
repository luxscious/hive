let projects = require("./data.json");
const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

//get project details given username and name of project
app.get("/projectDetails", (req, res) => {
  let username = req.query.username;
  let project = req.query.project;
  const allProjects = [];
  for (const i in projects) {
    if (
      projects[i].username === username &&
      projects[i].projectName === project
    ) {
      allProjects.push(projects[i]);
    }
  }
  res.json(allProjects);
});

//get all projects for a given user
app.get("/userProjects", (req, res) => {
  let username = req.query.username;
  const allProjects = [];
  for (const i in projects) {
    if (projects[i].username === username) {
      allProjects.push(projects[i]);
    }
  }
  res.json(allProjects);
});

//get all projects
app.get("/projects", (req, res) => {
  const allProjects = [];
  for (const i in projects) {
    allProjects.push(projects[i]);
  }
  res.json(allProjects);
});

//get all projects that are a specifc category
app.get("/categoryProjects", (req, res) => {
  const category = req.query.category;
  const allProjects = [];
  for (const i in projects) {
    if (projects[i].categories.includes(category)) {
      allProjects.push(projects[i]);
    }
  }
  res.json(allProjects);
});

//get all projects needing a mentor
app.get("/needMentors", (req, res) => {
  const allProjects = [];
  for (const i in projects) {
    if (projects[i].mentorSearch === "true") {
      allProjects.push(projects[i]);
    }
  }
  res.json(allProjects);
});
