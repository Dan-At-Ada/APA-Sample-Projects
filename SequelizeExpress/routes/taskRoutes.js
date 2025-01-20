const express = require("express")
const router = express.Router()
const taskOperations = require("../operations/taskOperations")
const projectOperations = require("../operations/projectOperations")
const tagOperations = require("../operations/tagOperations")

// Logging function
const log = (message) => console.log(`[Route] ${message}`)

// Home page - List all tasks
router.get("/", async (req, res) => {
  log("[Task] Fetching all tasks and projects for home page")
  try {
    const tasks = await taskOperations.getAllTasks()
    const projects = await projectOperations.getAllProjects()
    log(`[Task] Fetched ${tasks.length} tasks and ${projects.length} projects`)
    res.render("index", { tasks, projects })
  } catch (error) {
    console.error("[Route] [Task] Error fetching tasks:", error)
    res.status(500).send("Server Error")
  }
})

// Create new task form
router.get("/tasks/new", async (req, res) => {
  log("[Task] Fetching projects and tags for new task form")
  try {
    const projects = await projectOperations.getAllProjects()
    const tags = await tagOperations.getAllTags()
    log(`[Task] Fetched ${projects.length} projects and ${tags.length} tags`)
    res.render("newTask", { projects, tags })
  } catch (error) {
    console.error("[Route] [Task] Error fetching projects and tags:", error)
    res.status(500).send("Server Error")
  }
})

// Create new task
router.post("/tasks", async (req, res) => {
  log("[Task] Creating new task")
  try {
    const task = await taskOperations.createTask(req.body)
    log(`[Task] Created new task with ID: ${task.id}`)
    res.redirect("/")
  } catch (error) {
    console.error("[Route] [Task] Error creating task:", error)
    res.status(500).send("Server Error")
  }
})

// Update task status
router.post("/tasks/:id/update-status", async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  log(`[Task] Updating status of task ${id} to ${status}`)
  try {
    await taskOperations.updateTaskStatus(id, status)
    log(`[Task] Updated status of task ${id}`)
    res.redirect("/")
  } catch (error) {
    console.error("[Route] [Task] Error updating task status:", error)
    res.status(500).send("Server Error")
  }
})

// Delete task
router.post("/tasks/:id/delete", async (req, res) => {
  const { id } = req.params
  log(`[Task] Deleting task ${id}`)
  try {
    await taskOperations.deleteTask(id)
    log(`[Task] Deleted task ${id}`)
    res.redirect("/")
  } catch (error) {
    console.error("[Route] [Task] Error deleting task:", error)
    res.status(500).send("Server Error")
  }
})

// Create new project form
router.get("/projects/new", (req, res) => {
  log("[Project] Rendering new project form")
  res.render("newProject")
})

// Create new project
router.post("/projects", async (req, res) => {
  log("[Project] Creating new project")
  try {
    const project = await projectOperations.createProject(req.body)
    log(`[Project] Created new project with ID: ${project.id}`)
    res.redirect("/")
  } catch (error) {
    console.error("[Route] [Project] Error creating project:", error)
    res.status(500).send("Server Error")
  }
})

// Create new tag form
router.get("/tags/new", (req, res) => {
  log("[Tag] Rendering new tag form")
  res.render("newTag")
})

// Create new tag
router.post("/tags", async (req, res) => {
  log("[Tag] Creating new tag")
  try {
    const tag = await tagOperations.createTag(req.body)
    log(`[Tag] Created new tag with ID: ${tag.id}`)
    res.redirect("/")
  } catch (error) {
    console.error("[Route] [Tag] Error creating tag:", error)
    res.status(500).send("Server Error")
  }
})

module.exports = router

