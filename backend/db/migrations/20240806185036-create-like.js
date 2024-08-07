"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Likes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        article_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Articles",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options,
    );
    await queryInterface.addConstraint(
      "Likes",
      {
        fields: ["article_id", "user_id"],
        type: "unique",
        name: "unique_likes",
      },
      options,
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Likes", options);
  },
};
