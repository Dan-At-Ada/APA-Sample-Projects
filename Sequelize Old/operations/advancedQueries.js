import { Sequelize } from 'sequelize';
import { Book, Author } from '../models/index';

async function advancedQueries() {
  const bookCount = await Book.count();
  console.log('\nTotal number of books:', bookCount);

  console.log('\nBooks published after 1940:');
  const recentBooks = await Book.findAll({
    where: {
      publicationYear: {
        [Sequelize.Op.gt]: 1940
      }
    },
    attributes: ['title', 'publicationYear']
  });
  console.log(recentBooks.map(b => `${b.title} (${b.publicationYear})`).join(', '));

  console.log('\nDistinct authors:');
  const distinctAuthors = await Book.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('author')), 'author']],
    raw: true
  });
  console.log(distinctAuthors.map(a => a.author).join(', '));

  const avgPublicationYear = await Book.findOne({
    attributes: [[Sequelize.fn('AVG', Sequelize.col('publicationYear')), 'avgYear']],
    raw: true
  });
  console.log('\nAverage publication year of books:', Math.round(avgPublicationYear.avgYear));

  console.log('\nFinding or creating a new author...');
  const [author, created] = await Author.findOrCreate({
    where: { name: 'Ray Bradbury' },
    defaults: { birthYear: 1920 }
  });
  console.log(created ? 'New author created:' : 'Existing author found:', author.toJSON());

  console.log('\nIncrementing all book publication years by 1...');
  await Book.increment('publicationYear', { by: 1 });
  const updatedBooks = await Book.findAll({ attributes: ['title', 'publicationYear'] });
  console.log('Updated books:', updatedBooks.map(b => `${b.title} (${b.publicationYear})`).join(', '));
}

module.exports = advancedQueries;

