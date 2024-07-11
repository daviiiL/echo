const defaultTags = [
  "Tech",
  "Health",
  "Travel",
  "Art",
  "Food",
  "Politics",
  "Fashion",
  "Environment",
  "Animals",
  "Beauty",
];

const { Sequelize } = require("sequelize");
const { Tag } = require("../../db/models");

const tagRouter = require("express").Router();

tagRouter.get("/", async (_req, res, next) => {
  try {
    const tags = await Tag.findAll();
    return res.json({ tags });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

//TODO: after adding subscription list, add a route to fetch user preference on tags
module.exports = { tagRouter };
