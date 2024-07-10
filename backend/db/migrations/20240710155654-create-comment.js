"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Comments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        parent_article: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Articles",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        parent_comment: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Comments",
            key: "id",
          },
          onDelete: "SET NULL", //so that one user deletes their comment doesn't collapse the rest of the thread
          defaultValue: null,
        },
        commenter_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "SET NULL",
          defaultValue: null,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        reaction: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        upvote: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        downvote: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
      options
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
