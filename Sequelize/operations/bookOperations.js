// Import the necessary models
const { Book, LibraryItem, Author } = require("../models")

const log = (message) => console.log(`[Operations] [Book] ${message}`)

// Function to create a new book
async function createBook(title, publicationYear, isbn, pages, authorId) {
  log(`Creating book: ${title}`)
  // Create a new LibraryItem
  // This is equivalent to: INSERT INTO LibraryItems (title, publicationYear) VALUES (?, ?)
  const libraryItem = await LibraryItem.create({ title, publicationYear })

  // Create a new Book associated with the LibraryItem and Author
  // This is equivalent to: INSERT INTO Books (isbn, pages, LibraryItemId, AuthorId) VALUES (?, ?, ?, ?)
  const book = await Book.create({
    isbn,
    pages,
    LibraryItemId: libraryItem.id,
    AuthorId: authorId,
  })
  log(`Book created with id: ${book.id}`)
  return book
}

// Function to get a book by its id
async function getBookById(id) {
  log(`Fetching book with id: ${id}`)
  // Find a book by its primary key (id) and include associated LibraryItem and Author
  // This is equivalent to:
  // SELECT Books.*, LibraryItems.*, Authors.*
  // FROM Books
  // JOIN LibraryItems ON Books.LibraryItemId = LibraryItems.id
  // JOIN Authors ON Books.AuthorId = Authors.id
  // WHERE Books.id = ?
  const book = await Book.findByPk(id, {
    include: [{ model: LibraryItem }, { model: Author }],
  })
  log(book ? `Book found: ${book.LibraryItem.title}` : `No book found with id: ${id}`)
  return book
}

// Function to update a book
async function updateBook(id, updates) {
  log(`Updating book with id: ${id}`)
  // Find the book to update
  const book = await Book.findByPk(id, { include: LibraryItem })
  if (book) {
    // If title or publicationYear is being updated, update the associated LibraryItem
    if (updates.title || updates.publicationYear) {
      // This is equivalent to: UPDATE LibraryItems SET ... WHERE id = ?
      await book.LibraryItem.update({
        title: updates.title || book.LibraryItem.title,
        publicationYear: updates.publicationYear || book.LibraryItem.publicationYear,
      })
    }
    // Update the book
    // This is equivalent to: UPDATE Books SET ... WHERE id = ?
    const updatedBook = await book.update({
      isbn: updates.isbn || book.isbn,
      pages: updates.pages || book.pages,
      AuthorId: updates.authorId || book.AuthorId,
    })
    log(`Book updated: ${updatedBook.LibraryItem.title}`)
    return updatedBook
  }
  log(`No book found with id: ${id}`)
  return null
}

// Function to delete a book
async function deleteBook(id) {
  log(`Deleting book with id: ${id}`)
  // Find the book to delete
  const book = await Book.findByPk(id, { include: LibraryItem })
  if (book) {
    // Delete the associated LibraryItem
    // This is equivalent to: DELETE FROM LibraryItems WHERE id = ?
    await book.LibraryItem.destroy()
    // Delete the book
    // This is equivalent to: DELETE FROM Books WHERE id = ?
    await book.destroy()
    log(`Book deleted: ${book.LibraryItem.title}`)
    return true
  }
  log(`No book found with id: ${id}`)
  return false
}

// Function to list all books
async function listBooks() {
  log("Listing all books")
  // Find all books and include their associated LibraryItem and Author
  // This is equivalent to:
  // SELECT Books.*, LibraryItems.*, Authors.*
  // FROM Books
  // JOIN LibraryItems ON Books.LibraryItemId = LibraryItems.id
  // JOIN Authors ON Books.AuthorId = Authors.id
  const books = await Book.findAll({
    include: [{ model: LibraryItem }, { model: Author }],
  })
  log(`Found ${books.length} books`)
  return books
}

module.exports = {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  listBooks,
}

