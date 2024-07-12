"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        foreignKey: "author_id",
        as: "Author",
      });
      Article.hasMany(models.Comment, {
        foreignKey: "parent_article",
        onDelete: "CASCADE",
        hooks: true,
      });
      Article.hasMany(models.ArticleTag, {
        foreignKey: "article_id",
        onDelete: "CASCADE",
        hooks: true,
        sourceKey: "id",
      });
      Article.belongsToMany(models.Tag, {
        through: models.ArticleTag,
        foreignKey: "article_id",
      });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: [4],
            msg: "Please enter at least 4 characters for the article title",
          },
          notEmpty: true,
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: {
            args: [40],
            msg: "Please enter at least 40 characters for the text body",
          },
          notEmpty: true,
        },
      },
      author_id: { type: DataTypes.INTEGER, allowNull: false },
      comment_thread_id: { type: DataTypes.INTEGER, allowNull: true },
      likes_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      preview_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Article",
    },
  );
  return Article;
};
