"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process)
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Subscriptions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
        article_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Articles",
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
      });
      await queryInterface.addConstraint(
        {
          schema: options.schema,
          tableName: "Subscriptions",
        },
        {
          fields: ["article_id", "user_id"],
          type: "unique",
          name: "unique_subscriptions",
        },
      );
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Subscriptions");
    },
  };
