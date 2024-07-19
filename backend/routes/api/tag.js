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
const { Tag, User, ArticleTag, Article } = require("../../db/models");

const findTagByName = async (title) => {
  try {
    if (!title instanceof String || !title.length)
      throw new Error("Tag title cannot be empty");
    const tag = await Tag.findOne({
      where: {
        title,
      },
    });
    if (!(tag instanceof Tag)) throw new Error("Tag not found");
    return tag;
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return e;
  }
};

const tagRouter = require("express").Router();

tagRouter.get("/", async (req, res, next) => {
  try {
    //TODO: maybe add logic to accept a param that either fetches all tags or
    //TODO: tags with associated articles
    // const include = [
    //   {
    //     model: Article,
    //     required: true,
    //     //by doing a join exclude all tags without associated articles
    //     attributes: [],
    //   },
    // ];
    // if (req)
    if (!req.query.tag) {
      const tags = await Tag.findAll({
        include: [
          {
            model: Article,
            required: true,
            //by doing a join exclude all tags without associated articles
            attributes: [],
          },
        ],
      });
      return res.json({ tags });
    } else {
      // const tagTitle = res.query.tag;
      const tag = await findTagByName(req.query.tag);
      if (tag instanceof Error) return next(tag);
      const articles = await tag.getArticles({
        include: [
          {
            model: User,
            as: "Author",
            attributes: ["first_name", "last_name", "username"],
          },
        ],
      });
      return res.json({ articles: articles });
    }
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

tagRouter.post("/", async (req, res, next) => {
  const tag = await Tag.create({ title: req.query.tag });
  return res.json({ tag });
});

//TODO: after adding subscription list, add a route to fetch user preference on tags
module.exports = { tagRouter };
