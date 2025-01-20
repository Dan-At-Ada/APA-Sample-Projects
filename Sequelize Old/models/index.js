import { Sequelize } from 'sequelize';
import LibraryItem from './LibraryItem';
import Book from './Book';
import Magazine from './Magazine';
import Author from './Author';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './library.sqlite',
  logging: false
});

console.log('Sequelize initialized.');
console.log('Sequelize:', sequelize);

const models = {
  LibraryItem: LibraryItem.init(sequelize),
  Book: Book.init(sequelize),
  Magazine: Magazine.init(sequelize),
  Author: Author.init(sequelize)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
LibraryItem.associate(models);
Book.associate(models);
Magazine.associate(models);
Author.associate(models);

module.exports = {
  ...models,
  sequelize
};

