const { Task, Project, Tag } = require("../models")

// Logging function
const log = (message) => console.log(`[Operations] [Task] ${message}`)

async function getAllTasks() {
  log("Fetching all tasks")
  const tasks = await Task.findAll({
    include: [Project, Tag],
    order: [["createdAt", "DESC"]],
  })
  log(`Fetched ${tasks.length} tasks`)
  return tasks
}

async function createTask(taskData) {
  log("Creating new task")
  const { title, description, status, dueDate, projectId, tags } = taskData
  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    ProjectId: projectId,
  })

  if (tags && tags.length > 0) {
    log(`Associating ${tags.length} tags with the task`)
    const tagInstances = await Tag.findAll({
      where: {
        id: tags,
      },
    })
    await task.setTags(tagInstances)
  }

  log(`Created task with ID: ${task.id}`)
  return task
}

async function updateTaskStatus(id, status) {
  log(`Updating status of task ${id} to ${status}`)
  const result = await Task.update({ status }, { where: { id } })
  log(`Updated ${result[0]} task(s)`)
  return result
}

async function deleteTask(id) {
  log(`Deleting task ${id}`)
  const result = await Task.destroy({ where: { id } })
  log(`Deleted ${result} task(s)`)
  return result
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
}

