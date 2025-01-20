const { Book } = require('../models');

async function updateRecords() {
  console.log('\nUpdating a book...');
  await Book.update({ publicationYear: 1948 }, { where: { title: '1984' } });
  const updatedBook = await Book.findOne({ where: { title: '1984' } });
  console.log('Updated book:', updatedBook.toJSON());
}

module.exports = updateRecords;

