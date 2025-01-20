const { Book, Author } = require('../models');

async function readRecords() {
  console.log('\nFetching all books with their authors:');
  const booksWithAuthors = await Book.findAll({
    include: [Author],
    raw: true,
    nest: true
  });
  console.log(JSON.stringify(booksWithAuthors, null, 2));
}

module.exports = readRecords;

