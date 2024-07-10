const router = require("express").Router();
const Sequelize = require("sequelize");
const { Article } = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");
const { handleValidationErrors } = require("../../utils/validation.js");
const { check } = require("express-validator");
//middlewares
const validateArticle = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title"),
  check("title")
    .isLength({ min: 4 })
    .withMessage("Please enter at least 4 characters for your article title"),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a body"),
  check("body")
    .isLength({ min: 40 })
    .withMessage("Please enter at least 40 charactesr for your article body"),
  handleValidationErrors,
];

//helper function that finds the article and also checks for proper ownership
const findAndCheckArticle = async (req) => {
  try {
    const article = await Article.findByPk(parseInt(req.params.articleId));
    if (parseInt(req.user.id) != parseInt(article.author_id)) {
      const err = new Error("User is unauthorized to perform is action");
      err.title = "Forbidden";
      err.status = 403;
      throw err;
    }
    return article;
  } catch (e) {
    return e;
  }
};
//get all articles from all users regardless of tags
//TODO: add pagination
router.get("/", async (_req, res, next) => {
  try {
    const articles = await Article.findAll();
    return res.json(articles);
  } catch (e) {
    const err = new Error(e.message);
    if (e instanceof Sequelize.DatabaseError) {
      err.title = "Database Error";
      //specifying db error title
    }
    return next(err);
    //otherwise, pass err obj to error handling middlewares
  }
});
//TODO: get all articles from all users with tags QUERY params

//post an article with authenticated user
router.post("/", requireAuth, validateArticle, async (req, res, next) => {
  try {
    //fetch user id from the request
    const userId = req.user.id;
    const newArticle = await Article.create({
      ...req.body,
      author_id: parseInt(userId),
      //parsing userId to int to be extra careful...
    });
    return res.json(newArticle);
  } catch (e) {
    const err = new Error(e.message);
    if (e instanceof Sequelize.DatabaseError) {
      err.title = "Database Error";
      //provides a error title if its a database error
    }
    return next(err);
  }
});

//update an article [proper auth required]
router.patch("/:articleId", requireAuth, async (req, res, next) => {
  // const article = await Article.findByPk(parseInt(req.params.articleId));
  const article = await findAndCheckArticle(req);
  /// findAndCheckArticle returns the found article or an error object
  if (article instanceof Error) next(article);
  const { title, body } = req.body;
  if (title) article.title = title;
  if (body) article.body = body;
  try {
    //save the updated instance to db
    const updatedArticle = await article.save();
    return res.json(updatedArticle);
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

//delete an article [proper auth required]
router.delete("/:articleId", requireAuth, async (req, res, next) => {
  const article = await findAndCheckArticle(req);
  //refer to the route above for comments
  if (article instanceof Error) next(article);
  try {
    //attempt to delete record by calling instance.destroy()
    await article.destroy();
    return res.json({ message: "Deletion Successful" });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    next(e);
  }
});

module.exports = router;
