import { Model, DataTypes } from 'sequelize';

class Author extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthYear: {
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      modelName: 'Author'
    });
  }

  static associate(models) {
    this.hasMany(models.Book);
  }
}

module.exports = Author;

