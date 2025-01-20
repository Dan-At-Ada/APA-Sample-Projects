const express = require("express")
const path = require("path")
const { sequelize } = require("./models")
const taskRoutes = require("./routes/taskRoutes")

// Logging function
const log = (message) => console.log(`[App] ${message}`)

const app = express()
const port = process.env.PORT || 3000

log("Initializing application")

// Set up middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// Set up view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

log("Middleware and view engine set up")

// Set up routes
app.use("/", taskRoutes)

log("Routes set up")

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  log("Database synced")
  app.listen(port, () => {
    log(`Server is running on port ${port}`)
  })
})

