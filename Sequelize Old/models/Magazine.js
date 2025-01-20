import { DataTypes } from 'sequelize';
import LibraryItem from './LibraryItem';

class Magazine extends LibraryItem {
  static init(sequelize) {
    super.init(
      {
        issueNumber: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        publisher: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Magazine'
      }
    );
    return this;
  }
}

module.exports = Magazine;

