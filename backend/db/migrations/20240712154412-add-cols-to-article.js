"use strict";

let ArticleOptions = {};
if (process.env.NODE_ENV === "production") {
  ArticleOptions.schema = process.env.SCHEMA; // define your schema in options object
}
ArticleOptions.tableName = "Articles";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { ...ArticleOptions },
      "preview_image_url",
      Sequelize.STRING,
    );
    await queryInterface.addColumn(
      { ...ArticleOptions },
      "sub_title",
      Sequelize.STRING,
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(
      { ...ArticleOptions },
      "preview_image_url",
    );
    await queryInterface.removeColumn({ ...ArticleOptions }, "sub_title");
  },
};
