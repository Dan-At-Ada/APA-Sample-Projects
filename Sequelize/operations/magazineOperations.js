const { Magazine, LibraryItem } = require("../models")

const log = (message) => console.log(`[Operations] [Magazine] ${message}`)

// Function to create a new magazine
async function createMagazine(title, publicationYear, issueNumber, publisher) {
  log(`Creating magazine: ${title}`)
  // Create a new LibraryItem
  // This is equivalent to: INSERT INTO LibraryItems (title, publicationYear) VALUES (?, ?)
  const libraryItem = await LibraryItem.create({ title, publicationYear })

  // Create a new Magazine associated with the LibraryItem
  // This is equivalent to: INSERT INTO Magazines (issueNumber, publisher, LibraryItemId) VALUES (?, ?, ?)
  const magazine = await Magazine.create({ issueNumber, publisher, LibraryItemId: libraryItem.id })
  log(`Magazine created with id: ${magazine.id}`)
  return magazine
}

// Function to get a magazine by its id
async function getMagazineById(id) {
  log(`Fetching magazine with id: ${id}`)
  // Find a magazine by its primary key (id) and include associated LibraryItem
  // This is equivalent to:
  // SELECT Magazines.*, LibraryItems.*
  // FROM Magazines
  // JOIN LibraryItems ON Magazines.LibraryItemId = LibraryItems.id
  // WHERE Magazines.id = ?
  const magazine = await Magazine.findByPk(id, { include: LibraryItem })
  log(magazine ? `Magazine found: ${magazine.LibraryItem.title}` : `No magazine found with id: ${id}`)
  return magazine
}

// Function to update a magazine
async function updateMagazine(id, updates) {
  log(`Updating magazine with id: ${id}`)
  // Find the magazine to update
  const magazine = await Magazine.findByPk(id, { include: LibraryItem })
  if (magazine) {
    // If title or publicationYear is being updated, update the associated LibraryItem
    if (updates.title || updates.publicationYear) {
      // This is equivalent to: UPDATE LibraryItems SET ... WHERE id = ?
      await magazine.LibraryItem.update({
        title: updates.title || magazine.LibraryItem.title,
        publicationYear: updates.publicationYear || magazine.LibraryItem.publicationYear,
      })
    }
    // Update the magazine
    // This is equivalent to: UPDATE Magazines SET ... WHERE id = ?
    const updatedMagazine = await magazine.update({
      issueNumber: updates.issueNumber || magazine.issueNumber,
      publisher: updates.publisher || magazine.publisher,
    })
    log(`Magazine updated: ${updatedMagazine.LibraryItem.title}`)
    return updatedMagazine
  }
  log(`No magazine found with id: ${id}`)
  return null
}

// Function to delete a magazine
async function deleteMagazine(id) {
  log(`Deleting magazine with id: ${id}`)
  // Find the magazine to delete
  const magazine = await Magazine.findByPk(id, { include: LibraryItem })
  if (magazine) {
    // Delete the associated LibraryItem
    // This is equivalent to: DELETE FROM LibraryItems WHERE id = ?
    await magazine.LibraryItem.destroy()
    // Delete the magazine
    // This is equivalent to: DELETE FROM Magazines WHERE id = ?
    await magazine.destroy()
    log(`Magazine deleted: ${magazine.LibraryItem.title}`)
    return true
  }
  log(`No magazine found with id: ${id}`)
  return false
}

// Function to list all magazines
async function listMagazines() {
  log("Listing all magazines")
  // Find all magazines and include their associated LibraryItem
  // This is equivalent to:
  // SELECT Magazines.*, LibraryItems.*
  // FROM Magazines
  // JOIN LibraryItems ON Magazines.LibraryItemId = LibraryItems.id
  const magazines = await Magazine.findAll({ include: LibraryItem })
  log(`Found ${magazines.length} magazines`)
  return magazines
}

module.exports = {
  createMagazine,
  getMagazineById,
  updateMagazine,
  deleteMagazine,
  listMagazines,
}

