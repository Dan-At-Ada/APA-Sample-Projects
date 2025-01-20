// Import the Sequelize instance and models
const { sequelize } = require("./models")
// Import operation modules
const authorOps = require("./operations/authorOperations")
const bookOps = require("./operations/bookOperations")
const magazineOps = require("./operations/magazineOperations")

const log = (message) => console.log(`[App] ${message}`)

async function runDemo() {
  try {
    log("Starting demo")
    // Sync all models with the database
    // This creates the database tables if they don't exist
    // or updates them if they do
    // The `force: true` option drops the tables first if they exist
    // Equivalent to: DROP TABLE IF EXISTS; CREATE TABLE ...
    await sequelize.sync({ force: true })
    log("Database synced. Models created.")

    // Create authors
    // Equivalent to: INSERT INTO Authors (name, birthYear) VALUES (?, ?)
    log("Creating authors")
    const author1 = await authorOps.createAuthor("George Orwell", 1903)
    const author2 = await authorOps.createAuthor("Aldous Huxley", 1894)

    // Create books
    // This operation creates both a LibraryItem and a Book
    // Equivalent to:
    // INSERT INTO LibraryItems (title, publicationYear) VALUES (?, ?);
    // INSERT INTO Books (isbn, pages, LibraryItemId, AuthorId) VALUES (?, ?, ?, ?);
    log("Creating books")
    await bookOps.createBook("1984", 1949, "9780451524935", 328, author1.id)
    await bookOps.createBook("Brave New World", 1932, "9780060850524", 311, author2.id)

    // Create magazines
    // This operation creates both a LibraryItem and a Magazine
    // Equivalent to:
    // INSERT INTO LibraryItems (title, publicationYear) VALUES (?, ?);
    // INSERT INTO Magazines (issueNumber, publisher, LibraryItemId) VALUES (?, ?, ?);
    log("Creating magazines")
    await magazineOps.createMagazine("National Geographic", 2023, 1, "National Geographic Society")
    await magazineOps.createMagazine("Time", 2023, 15, "Time USA, LLC")

    // List all books
    // This operation performs a JOIN between Books, LibraryItems, and Authors
    log("Listing all books")
    const books = await bookOps.listBooks()
    console.log("All books:")
    books.forEach((book) => {
      console.log(
        `${book.LibraryItem.title} by ${book.Author.name}, Published: ${book.LibraryItem.publicationYear}, ISBN: ${book.isbn}`,
      )
    })

    // List all magazines
    // This operation performs a JOIN between Magazines and LibraryItems
    log("Listing all magazines")
    const magazines = await magazineOps.listMagazines()
    console.log("\nAll magazines:")
    magazines.forEach((magazine) => {
      console.log(
        `${magazine.LibraryItem.title}, Issue: ${magazine.issueNumber}, Published: ${magazine.LibraryItem.publicationYear}, Publisher: ${magazine.publisher}`,
      )
    })

    // Update a book
    // This operation updates both the Book and its associated LibraryItem
    log("Updating a book")
    const updatedBook = await bookOps.updateBook(1, { pages: 330 })
    console.log("\nUpdated book:", updatedBook.LibraryItem.title, "Pages:", updatedBook.pages)

    // Delete a magazine
    // This operation deletes both the Magazine and its associated LibraryItem
    log("Deleting a magazine")
    await magazineOps.deleteMagazine(2)
    console.log("\nDeleted magazine with ID 2")

    // List authors with their books
    // This operation performs a complex JOIN between Authors, Books, and LibraryItems
    log("Listing authors with their books")
    const authors = await authorOps.listAuthors()
    console.log("\nAuthors and their books:")
    authors.forEach((author) => {
      console.log(`${author.name}:`)
      author.Books.forEach((book) => {
        console.log(`  - ${book.LibraryItem.title} (${book.LibraryItem.publicationYear})`)
      })
    })
  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    // Close the database connection
    await sequelize.close()
    log("Database connection closed.")
  }
}

// Run the demo
log("Running demo")
runDemo()

