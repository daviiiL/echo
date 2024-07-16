"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "commenter_id",
      });
      Comment.belongsTo(models.Article, {
        foreignKey: "parent_article",
      });
      Comment.hasMany(models.Comment, {
        foreignKey: "parent_comment",
        onDelete: "SET NULL",
        hooks: true,
      });
      Comment.belongsTo(models.Comment, {
        foreignKey: "parent_comment",
        as: "parent",
      });
    }
  }
  Comment.init(
    {
      parent_article: { type: DataTypes.INTEGER, allowNull: false },
      parent_comment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      commenter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: {
            args: [5],
            msg: "Please input more than 5 characters",
          }, //can add additional rules for security against SQL injection attacks
        },
      },
      reaction: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      upvote: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      downvote: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
