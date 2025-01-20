import { DataTypes } from 'sequelize';
import LibraryItem from './LibraryItem';

class Book extends LibraryItem {
  static init(sequelize) {
    super.init(
      {
        author: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isbn: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        sequelize,
        modelName: 'Book'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Author);
  }
}

module.exports = Book;

