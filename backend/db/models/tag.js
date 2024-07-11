"use strict";
const { Model, BelongsToMany, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.hasMany(models.ArticleTag, {
        foreignKey: "tag_id",
        onDelete: "CASCADE",
        hooks: true,
        sourceKey: "id",
      });
      Tag.belongsToMany(models.Article, {
        through: models.ArticleTag,
        foreignKey: "tag_id",
      });
    }
  }
  Tag.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: {
            args: [3],
            msg: "Please enter a tag title with 3 or more characters",
          },
          isAlpha: { args: true, msg: "Only letters are allowed" },
          isLowercase: {
            args: true,
            msg: "Tag title must be all in lowercase",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
    },
  );
  return Tag;
};
