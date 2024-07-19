"use strict";

const { Comment, User, Article } = require("../models");

const comments = [
  {
    from: "Demo-lition",
    to: "What is Lorem Ipsum",
    reply: false,
    payload: { body: "This is a test comment that starts a comment thread" },
  },
  {
    from: "Spidey",
    to: "What is Lorem Ipsum",
    reply: true,
    payload: {
      body: "Thank you for testing out the threaded comment feature! I am replying to your comment, Demo.",
    },
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let parent_id;
    for (let comment of comments) {
      const user = await User.findOne({ where: { username: comment.from } });
      const article = await Article.findOne({ where: { title: comment.to } });
      if (!comment.reply) {
        await Comment.create({
          ...comment.payload,
          parent_article: article.id,
          commenter_id: user.id,
          parent_comment: null,
        }).then((res) => (parent_id = res.id));
      } else {
        await Comment.create({
          ...comment.payload,
          parent_comment: parent_id,
          parent_article: article.id,
          commenter_id: user.id,
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let comment of comments) {
      const user = await User.findOne({ where: { username: comment.from } });
      const article = await Article.findOne({ where: { title: comment.to } });
      if (!comment.reply) {
        await Comment.destroy({
          where: {
            ...comment.payload,
            parent_article: article.id,
            commenter_id: user.id,
            parent_comment: null,
          },
        });
      } else {
        await Comment.destroy({
          where: {
            ...comment.payload,
            parent_article: article.id,
            commenter_id: user.id,
          },
        });
      }
    }
  },
};
