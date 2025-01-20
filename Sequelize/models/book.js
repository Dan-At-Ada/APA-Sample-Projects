const log = (message) => console.log(`[Models] [Book] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Book model")
  // Define the Book model
  // This is equivalent to creating a table named 'Books' in SQL
  const Book = sequelize.define("Book", {
    // Define the isbn field
    // This is equivalent to: isbn VARCHAR(255) UNIQUE in SQL
    isbn: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Define the pages field
    // This is equivalent to: pages INTEGER in SQL
    pages: {
      type: DataTypes.INTEGER,
    },
  })

  // Define associations
  Book.associate = (models) => {
    // Set up a one-to-one relationship with LibraryItem
    // This is equivalent to adding a foreign key in SQL:
    // LibraryItemId INTEGER REFERENCES LibraryItems(id)
    Book.belongsTo(models.LibraryItem)

    // Set up a many-to-one relationship with Author
    // This is equivalent to adding a foreign key in SQL:
    // AuthorId INTEGER REFERENCES Authors(id)
    Book.belongsTo(models.Author)
  }

  return Book
}

