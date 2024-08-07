"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Like.belongsTo(models.Article, {
        foreignKey: "article_id",
      });
    }
  }
  Like.init(
    {
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_likes",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_likes",
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
