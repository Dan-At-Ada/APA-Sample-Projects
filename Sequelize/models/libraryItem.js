const log = (message) => console.log(`[Models] [LibraryItem] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining LibraryItem model")
  // Define the LibraryItem model
  // This is equivalent to creating a table named 'LibraryItems' in SQL
  const LibraryItem = sequelize.define(
    "LibraryItem",
    {
      // Define the id field
      // This is equivalent to: id INTEGER PRIMARY KEY AUTOINCREMENT in SQL
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define the title field
      // This is equivalent to: title VARCHAR(255) NOT NULL in SQL
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define the publicationYear field
      // This is equivalent to: publicationYear INTEGER in SQL
      publicationYear: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Specify the table name
      // If not provided, Sequelize would pluralize the model name
      // This is equivalent to: CREATE TABLE LibraryItems (...) in SQL
      tableName: "LibraryItems",
    },
  )

  // Define associations
  // This method will be called in models/index.js to set up relationships
  LibraryItem.associate = (models) => {
    // Associations will be defined in child models
    // This is where you would define relationships like:
    // LibraryItem.hasOne(models.Book)
    // LibraryItem.hasOne(models.Magazine)
    // Which would be equivalent to adding foreign keys in the Book and Magazine tables in SQL
  }

  return LibraryItem
}

