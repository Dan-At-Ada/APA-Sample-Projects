import { Model, DataTypes } from 'sequelize';

class LibraryItem extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'LibraryItem',
      discriminatorKey: 'type'
    });
  }
}

module.exports = LibraryItem;

