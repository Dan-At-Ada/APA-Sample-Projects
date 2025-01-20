// Logging function
const log = (message) => console.log(`[Models] [Project] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Project model")
  const Project = sequelize.define(
    "Project",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      // Other model options go here
    },
  )

  log("Project model defined")
  return Project
}

