const { Sequelize, DataTypes } = require("sequelize")
const config = require("../config/database.js")

// Add logging function
const log = (message) => console.log(`[Models] ${message}`)

log("Initializing Sequelize")
const sequelize = new Sequelize(config)

const db = {}

db.sequelize = sequelize

log("Loading models")
db.LibraryItem = require("./libraryItem.js")(sequelize, DataTypes)
db.Author = require("./author.js")(sequelize, DataTypes)
db.Book = require("./book.js")(sequelize, DataTypes)
db.Magazine = require("./magazine.js")(sequelize, DataTypes)

log("Setting up associations")
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

log("Models initialized")
module.exports = db

