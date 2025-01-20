const log = (message) => console.log(`[Models] [Magazine] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Magazine model")
  // Define the Magazine model
  // This is equivalent to creating a table named 'Magazines' in SQL
  const Magazine = sequelize.define("Magazine", {
    // Define the issueNumber field
    // This is equivalent to: issueNumber INTEGER in SQL
    issueNumber: {
      type: DataTypes.INTEGER,
    },
    // Define the publisher field
    // This is equivalent to: publisher VARCHAR(255) in SQL
    publisher: {
      type: DataTypes.STRING,
    },
  })

  // Define associations
  Magazine.associate = (models) => {
    // Set up a one-to-one relationship with LibraryItem
    // This is equivalent to adding a foreign key in SQL:
    // LibraryItemId INTEGER REFERENCES LibraryItems(id)
    Magazine.belongsTo(models.LibraryItem)
  }

  return Magazine
}

