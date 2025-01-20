const log = (message) => console.log(`[Models] [Author] ${message}`)

module.exports = (sequelize, DataTypes) => {
  log("Defining Author model")
  // Define the Author model
  // This is equivalent to creating a table named 'Authors' in SQL
  const Author = sequelize.define("Author", {
    // Define the id field
    // This is equivalent to: id INTEGER PRIMARY KEY AUTOINCREMENT in SQL
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the name field
    // This is equivalent to: name VARCHAR(255) NOT NULL in SQL
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the birthYear field
    // This is equivalent to: birthYear INTEGER in SQL
    birthYear: {
      type: DataTypes.INTEGER,
    },
  })

  // Define associations
  Author.associate = (models) => {
    // Set up a one-to-many relationship with Book
    // This is equivalent to adding a foreign key in the Books table in SQL:
    // AuthorId INTEGER REFERENCES Authors(id)
    Author.hasMany(models.Book)
  }

  return Author
}

