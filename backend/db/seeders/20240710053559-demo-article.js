"use strict";
const { Article, User } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const userArticles = [
  {
    username: "Spidey",
    payload: [
      {
        title: "Test Article",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sub_title: "A test of articles",
      },
    ],
  },
  {
    username: "Demo-lition",
    payload: [
      {
        title: "An Article about Posting in Postman",
        body: "Building a robust API backend requires careful consideration of design principles, security measures, and efficient data management. A well-structured API should be easy to use, scalable, and secure, ensuring smooth communication between your application and its consumers.",
        sub_title: "An exploration on posting in Postman",
        preview_image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/NYPL_1814_postman.jpg/170px-NYPL_1814_postman.jpg",
      },
    ],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(_queryInterface, _Sequelize) {
    for (let article of userArticles) {
      const { username, payload } = article;
      const user = await User.findOne({ where: { username } });
      if (user) {
        for (let article of payload) {
          await Article.create({ ...article, author_id: user.id });
        }
      } else throw new Error("cannot find the specified username to seed");
    }
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let article of userArticles) {
      const { username, payload } = article;
      const user = await User.findOne({ where: { username } });
      if (user) {
        for (let article of payload) {
          await Article.destroy({ where: { ...article, author_id: user.id } });
        }
      } else throw new Error("cannot find the specified username to seed");
    }
  },
};
