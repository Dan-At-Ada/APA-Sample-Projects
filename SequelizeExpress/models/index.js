const { Sequelize } = require("sequelize")
const config = require("../config/database")

// Logging function
const log = (message) => console.log(`[Models] ${message}`)

log("Initializing Sequelize")
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  storage: config.storage,
  logging: false, // Disable logging
  // logging: (msg) => console.log(`[Sequelize] ${msg}`) // Enable logging
})

const db = {}

db.sequelize = sequelize


// Import models
log("Importing models")
db.Task = require("./task")(sequelize, Sequelize.DataTypes)
db.Project = require("./project")(sequelize, Sequelize.DataTypes)
db.Tag = require("./tag")(sequelize, Sequelize.DataTypes)

// Set up associations
log("Setting up model associations")
db.Project.hasMany(db.Task)
db.Task.belongsTo(db.Project)

db.Task.belongsToMany(db.Tag, { through: "TaskTags" })
db.Tag.belongsToMany(db.Task, { through: "TaskTags" })

log("Model initialization complete")

module.exports = db

