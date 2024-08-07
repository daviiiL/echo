"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Subscription.belongsTo(models.Article, {
        foreignKey: "article_id",
      });
    }
  }
  Subscription.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_subscriptions",
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_subscriptions",
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    },
  );
  return Subscription;
};
