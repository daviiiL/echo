"use strict";

const { Tag, Article } = require("../models");

const seeds = [
  {
    articleName: "What is Lorem Ipsum",
    tags: ["randomfacts", "demo"],
  },
  {
    articleName: "Taking care of your PC",
    tags: ["tech", "demo", "hobby"],
  },
  {
    articleName: "Spider-man's journal: these damn spidy senses",
    tags: ["journal", "demo"],
  },
  {
    articleName: "Using Postman to Test Your APIs",
    tags: ["tech", "demo", "howto"],
  },
  {
    articleName: "How to surf as a Cheetos",
    tags: [
      "demo",
      "lifestyle",
      "health",
      "travel",
      "howto",
      "randomfacts",
      "sports",
    ],
  },
  {
    articleName: "How to be a good Cheetos friend",
    tags: ["demo", "relationships", "howto"],
  },
  {
    articleName: "The Art of Hoarding",
    tags: ["demo", "journal", "tech"],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    for (const item of seeds) {
      const article = await Article.findOne({
        where: {
          title: item.articleName,
        },
      });
      if (article instanceof Article) {
        for (const tagTitle of item.tags) {
          const [tag, _created] = await Tag.findOrCreate({
            where: { title: tagTitle.toLowerCase() },
            defaults: {
              title: tagTitle.toLowerCase(),
            },
          });
          await article.addTag(tag);
        }
      }
    }
  },

  async down() {
    for (const item of seeds) {
      const article = Article.findOne({
        where: {
          title: item.articleName,
        },
      });
      if (article instanceof Article) {
        await article.setTag();
      }
    }
  },
};
