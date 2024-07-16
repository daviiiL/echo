const router = require("express").Router();
const Sequelize = require("sequelize");
const { Article, Comment, User, Tag, ArticleTag } = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");
const { handleValidationErrors } = require("../../utils/validation.js");
const { check } = require("express-validator");
const { validateComment } = require("./validators.js");

//middlewares
const validateArticle = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title"),
  check("title")
    .isLength({ min: 4 })
    .withMessage("Please enter at least 4 characters for your article title"),
  check("sub_title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title"),
  check("sub_title")
    .isLength({ min: 4 })
    .withMessage(
      "Please enter at least 4 characters for your article sub-title"
    ),
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
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return e;
  }
};
//get all articles from all users regardless of tags
//TODO: add pagination
//TODO: add order by for html buttons: latest first or oldest first
router.get("/", async (_req, res, next) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["first_name", "last_name", "username"],
        },
      ],
    });
    return res.json({ articles: articles });
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

router.get("/current", async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      where: {
        author_id: parseInt(req.user.id),
      },
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["first_name", "last_name", "username"],
        },
      ],
    });
    return res.json({ articles: articles });
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
//post an article with authenticated user
//TODO: add tags if tags are in query param
router.post("/", requireAuth, validateArticle, async (req, res, next) => {
  try {
    //fetch user id from the request
    const userId = req.user.id;
    const newArticle = await Article.create({
      ...req.body,
      author_id: parseInt(userId),
      //parsing userId to int to be extra careful...
    });
    return res.json({ article: newArticle });
  } catch (e) {
    const err = new Error(e.message);
    if (e instanceof Sequelize.DatabaseError) {
      err.title = "Database Error";
      //provides a error title if its a database error
    }
    return next(err);
  }
});

//get details of an article by articleId
// including author info and comments
router.get("/:articleId", async (req, res, next) => {
  try {
    const article = await Article.findByPk(parseInt(req.params.articleId), {
      include: [
        {
          model: User,
          as: "Author",
          attributes: {
            //excluding user personal information from reaching the frontend redux store
            exclude: ["email", "status", "hashedPassword"],
          },
        },
        {
          model: Comment,
          //not requiring comments
          required: false,
        },
      ],
    });
    return res.json({ article: article });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    next(e);
  }
});
//update an article [proper auth required]
router.patch("/:articleId", requireAuth, async (req, res, next) => {
  // const article = await Article.findByPk(parseInt(req.params.articleId));
  const article = await findAndCheckArticle(req);
  /// findAndCheckArticle returns the found article or an error object
  if (article instanceof Error) return next(article);
  const { title, body, sub_title } = req.body;
  if (title) article.title = title;
  if (body) article.body = body;
  if (sub_title) article.sub_title = sub_title;
  try {
    //save the updated instance to db
    const updatedArticle = await article.save();
    return res.json({ article: updatedArticle });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

//delete an article [proper auth required]
router.delete("/:articleId", requireAuth, async (req, res, next) => {
  const article = await findAndCheckArticle(req);
  //refer to the route above for comments
  if (article instanceof Error) return next(article);
  try {
    //attempt to delete record by calling instance.destroy()
    await article.destroy();
    return res.json({ message: "Deletion Successful" });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

//post a root comment by article id
router.post(
  "/:articleId/comments",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    try {
      //root comment: no parent comment
      const newComment = await Comment.create({
        ...req.body,
        parent_article: parseInt(req.params.articleId),
        commenter_id: parseInt(req.user.id),
        parent_comment: null,
      });
      return res.json({ comment: newComment });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
  }
);

//post a child comment by article id
router.post(
  "/:articleId/comments/:parentCommentId",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        parent_article: parseInt(req.params.articleId),
        commenter_id: parseInt(req.user.id),
        //pass in the parent comment id
        parent_comment: parseInt(req.params.parentCommentId),
      });
      return res.json({ comment: newComment });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
  }
);

//add a tag to article by articleId
//the request url should be .../articles/:articlesId/tags?tag=a&tag=b&tag=c
router.post("/:articleId/tags", requireAuth, async (req, res, next) => {
  //deep copy into an array from query param
  //TODO: handle single tags
  const article = await Article.findByPk(parseInt(req.params.articleId));
  const tag = await Tag.create({ title: req.query.tag });
  await article.addTag(tag);
  return res.json(await article.get({ plain: true }));
});

module.exports = router;
