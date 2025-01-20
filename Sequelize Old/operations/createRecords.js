const { Author, Book, Magazine } = require('../models');

async function createRecords() {
  console.log('\nCreating authors...');
  const authors = await Author.bulkCreate([
    { name: 'George Orwell', birthYear: 1903 },
    { name: 'Aldous Huxley', birthYear: 1894 },
    { name: 'Isaac Asimov', birthYear: 1920 }
  ]);
  console.log('Authors created:', authors.map(a => a.name).join(', '));

  console.log('\nCreating books...');
  const books = await Book.bulkCreate([
    { title: '1984', publicationYear: 1949, author: 'George Orwell', isbn: '9780451524935', AuthorId: 1 },
    { title: 'Brave New World', publicationYear: 1932, author: 'Aldous Huxley', isbn: '9780060850524', AuthorId: 2 },
    { title: 'Foundation', publicationYear: 1951, author: 'Isaac Asimov', isbn: '9780553293357', AuthorId: 3 }
  ]);
  console.log('Books created:', books.map(b => b.title).join(', '));

  console.log('\nCreating magazines...');
  const magazines = await Magazine.bulkCreate([
    { title: 'National Geographic', publicationYear: 2023, issueNumber: 1, publisher: 'National Geographic Partners' },
    { title: 'Time', publicationYear: 2023, issueNumber: 15, publisher: 'Time USA, LLC' }
  ]);
  console.log('Magazines created:', magazines.map(m => m.title).join(', '));
}

module.exports = createRecords;

