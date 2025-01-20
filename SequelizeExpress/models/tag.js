// Logging function
const log = (message) => console.log(`[Models] [Tag] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Tag model")
  const Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      // Other model options go here
    },
  )

  log("Tag model defined")
  return Tag
}

