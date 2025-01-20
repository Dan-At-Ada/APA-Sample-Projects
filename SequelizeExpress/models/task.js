// Logging function
const log = (message) => console.log(`[Models] [Task] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Task model")
  const Task = sequelize.define(
    "Task",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("To Do", "In Progress", "Done"),
        defaultValue: "To Do",
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      // Other model options go here
    },
  )

  log("Task model defined")
  return Task
}

