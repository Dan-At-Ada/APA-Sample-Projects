const { Author } = require("../models")
const db = require("../models")

const log = (message) => console.log(`[Operations] [Author] ${message}`)

// Function to create a new author
// This is equivalent to: INSERT INTO Authors (name, birthYear) VALUES (?, ?)
async function createAuthor(name, birthYear) {
  log(`Creating author: ${name}, born ${birthYear}`)
  const author = await Author.create({ name, birthYear })
  log(`Author created with id: ${author.id}`)
  return author
}

// Function to get an author by ID, including their books
// This is equivalent to:
// SELECT Authors.*, Books.*, LibraryItems.*
// FROM Authors
// LEFT JOIN Books ON Authors.id = Books.AuthorId
// LEFT JOIN LibraryItems ON Books.LibraryItemId = LibraryItems.id
// WHERE Authors.id = ?
async function getAuthorById(id) {
  log(`Fetching author with id: ${id}`)
  const author = await Author.findByPk(id, {
    include: [
      {
        model: db.Book,
        include: [db.LibraryItem],
      },
    ],
  })
  log(author ? `Author found: ${author.name}` : `No author found with id: ${id}`)
  return author
}

// Function to update an author
// This is equivalent to: UPDATE Authors SET ... WHERE id = ?
async function updateAuthor(id, updates) {
  log(`Updating author with id: ${id}`)
  const author = await Author.findByPk(id)
  if (author) {
    const updatedAuthor = await author.update(updates)
    log(`Author updated: ${updatedAuthor.name}`)
    return updatedAuthor
  }
  log(`No author found with id: ${id}`)
  return null
}

// Function to delete an author
// This is equivalent to: DELETE FROM Authors WHERE id = ?
async function deleteAuthor(id) {
  log(`Deleting author with id: ${id}`)
  const author = await Author.findByPk(id)
  if (author) {
    await author.destroy()
    log(`Author deleted: ${author.name}`)
    return true
  }
  log(`No author found with id: ${id}`)
  return false
}

// Function to list all authors with their books
// This is equivalent to:
// SELECT Authors.*, Books.*, LibraryItems.*
// FROM Authors
// LEFT JOIN Books ON Authors.id = Books.AuthorId
// LEFT JOIN LibraryItems ON Books.LibraryItemId = LibraryItems.id
async function listAuthors() {
  log("Listing all authors")
  const authors = await Author.findAll({
    include: [
      {
        model: db.Book,
        include: [db.LibraryItem],
      },
    ],
  })
  log(`Found ${authors.length} authors`)
  return authors
}

module.exports = {
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  listAuthors,
}

