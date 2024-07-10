"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article, {
        foreignKey: "author_id",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Comment, {
        foreignKey: "commenter_id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (validator.isEmail(value)) {
              throw new Error("Invalid input on field 'email'");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "This user hasn't left a bio yet",
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "reading",
      },
      avatar: { type: DataTypes.STRING, allowNull: true },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      last_active: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword"],
        },
      },
      scopes: {
        standard: {
          attributes: {
            exclude: ["email", "hashedPassword"],
          },
        },
      },
    },
  );
  return User;
};
