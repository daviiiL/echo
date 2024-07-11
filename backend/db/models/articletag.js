"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArticleTag.belongsTo(models.Article, {
        foreignKey: "article_id",
        otherKey: "id",
      });

      ArticleTag.belongsTo(models.Tag, {
        foreignKey: "tag_id",
        otherKey: "id",
      });
    }
  }
  ArticleTag.init(
    {
      article_id: { type: DataTypes.INTEGER, allowNull: false },
      tag_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ArticleTag",
    },
  );
  return ArticleTag;
};
