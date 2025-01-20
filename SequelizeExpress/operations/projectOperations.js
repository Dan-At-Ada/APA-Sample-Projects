const { Project } = require("../models")

// Logging function
const log = (message) => console.log(`[Operations] [Project] ${message}`)

async function getAllProjects() {
  log("Fetching all projects")
  const projects = await Project.findAll()
  log(`Fetched ${projects.length} projects`)
  return projects
}

async function createProject(projectData) {
  log("Creating new project")
  const { name, description } = projectData
  const project = await Project.create({ name, description })
  log(`Created project with ID: ${project.id}`)
  return project
}

module.exports = {
  getAllProjects,
  createProject,
}

