const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  Article,
  Comment,
  User,
  Tag,
  ArticleTag,
  Like,
  Subscription,
} = require("../../db/models");
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
  check("sub_title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title"),
  check("sub_title")
    .isLength({ min: 4 })
    .withMessage(
      "Please enter at least 4 characters for your article sub-title",
    ),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a body"),
  check("body")
    .isLength({ min: 40 })
    .withMessage("Please enter at least 40 charactesr for your article body"),
  handleValidationErrors,
];

const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a text for your comment"),
  check("body")
    .isLength({ min: 5 })
    .withMessage("Please enter at least 5 characters for your comment"),
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
        {
          model: Tag,
          required: false,
          attributes: ["id", "title"],
          through: {
            model: ArticleTag,
            attributes: [],
          },
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
        {
          model: Tag,
          required: false,
          attributes: ["id", "title"],
          through: {
            model: ArticleTag,
            attributes: [],
          },
        },
        {
          model: Like,
          attributes: ["user_id"],
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
  const { title, body, sub_title, preview_image_url } = req.body;
  if (title) article.title = title;
  if (body) article.body = body;
  if (sub_title) article.sub_title = sub_title;
  if (preview_image_url) article.preview_image_url = preview_image_url;
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
    return res.json({
      message: "Deletion Successful",
      deletedId: req.params.articleId,
    });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});
// -----------------------------------------------------COMMENTS----------------------------------------------------------
//get comments by article id
router.get("/:articleId/comments", async (req, res, next) => {
  try {
    const articleComments = await Comment.findAll({
      where: {
        parent_article: req.params.articleId,
      },
      include: [
        {
          model: User,
          attributes: [
            "first_name",
            "last_name",
            "username",
            "id",
            "last_active",
          ],
        },
        {
          model: Comment,
          as: "parent",
          include: [
            {
              model: User,
              attributes: [
                "first_name",
                "last_name",
                "username",
                "id",
                "last_active",
              ],
            },
          ],
        },
      ],
    });
    return res.json({ comments: articleComments });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    next(e);
  }
});

//post a root comment by article id
router.post(
  "/:articleId/comments",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    try {
      // return res.json("test");
      //root comment: no parent comment
      const newComment = await Comment.create({
        ...req.body,
        parent_article: parseInt(req.params.articleId),
        commenter_id: parseInt(req.user.id),
        parent_comment: null,
      });
      const comment = await Comment.findByPk(newComment.id, {
        include: [
          {
            model: User,
            attributes: [
              "first_name",
              "last_name",
              "username",
              "id",
              "last_active",
            ],
          },
          {
            model: Comment,
            as: "parent",
            include: [
              {
                model: User,
                attributes: [
                  "first_name",
                  "last_name",
                  "username",
                  "id",
                  "last_active",
                ],
              },
            ],
          },
        ],
      });
      return res.json({ comment: comment });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      next(e);
    }
  },
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
      // return res.json({ comment: newComment });
      const comment = await Comment.findByPk(newComment.id, {
        include: [
          {
            model: User,
            attributes: [
              "first_name",
              "last_name",
              "username",
              "id",
              "last_active",
            ],
          },
          {
            model: Comment,
            as: "parent",
            include: [
              {
                model: User,
                attributes: [
                  "first_name",
                  "last_name",
                  "username",
                  "id",
                  "last_active",
                ],
              },
            ],
          },
        ],
      });
      return res.json({ comment: comment });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
  },
);
// ----------------------------------------TAGS---------------------------------------
//add a tag to article by articleId
//the request url should be .../articles/:articlesId/tags?tag=a&tag=b&tag=c
//returns NEWLY CREATED tags only
router.post("/:articleId/tags", requireAuth, async (req, res, next) => {
  //deep copy into an array from query param
  //TODO: handle single tags
  const article = await findAndCheckArticle(req);
  const addedTags = [];
  const createdTags = [];
  if (article instanceof Error) return next(article);
  //if empty query param then remove all tag associations
  //else construct tags
  if (req.query.tag?.length) {
    const tags = Array.isArray(req.query.tag)
      ? [...req.query.tag]
      : [req.query.tag];

    for (const tagTitle of tags) {
      const [tag, created] = await Tag.findOrCreate({
        where: { title: tagTitle.toLowerCase() },
        defaults: {
          title: tagTitle.toLowerCase(),
        },
      });
      // return res.json(tag instanceof Tag);
      if (tag instanceof Tag) {
        addedTags.push(tag);
        // await article.addTag(tag);
        if (created) createdTags.push(tag);
      }
    }
  }
  await article.setTags(addedTags);
  return res.json({ tags: createdTags });
});

//get all tags of an article by article Id
router.get("/:articleId/tags", async (req, res, next) => {
  const article = await findAndCheckArticle(req);
  if (article instanceof Error) return next(article);
  const articleTags = await article.getTags({
    through: {
      model: ArticleTag,
      attributes: [],
    },
  });
  return res.json({
    tags: articleTags,
  });
});

//-------------------------------------LIKES----------------------------
//post like to article
router.post("/:articleId/likes", async (req, res, next) => {
  // const userId = parseInt(req.user.id);
  const user = await User.findByPk(parseInt(req.user.id));
  if (!user || !user.id) {
    const sessionError = new Error("Forbidden");
    sessionError.status = 403;
    return next(sessionError);
  }
  const article = await Article.findByPk(parseInt(req.params.articleId));

  if (!article) return next(new Error("Article Not Found"));
  // return res.json({ article, user });
  const response = await article.addLikedUser(user);

  if (!response) return next(new Error("User already liked this article"));
  else {
    try {
      //save the updated instance to db
      article.likes_count += 1;
      const updatedArticle = await article.save();
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
    return res.json(response[0]);
  }
  // return response
  //   ? res.json({ message: "Operation successful" })
  //   : next(new Error("User already liked this article"));
});

//unlike an article
router.delete("/:articleId/likes", async (req, res, next) => {
  // const userId = parseInt(req.user.id);
  const user = await User.findByPk(parseInt(req.user.id));
  if (!user || !user.id) {
    const sessionError = new Error("Forbidden");
    sessionError.status = 403;
    return next(sessionError);
  }
  const article = await Article.findByPk(parseInt(req.params.articleId));
  if (!article) return next(new Error("Article Not Found"));
  const response = await article.removeLikedUser(user);
  if (!response) return next(new Error("User hasn't liked this article"));
  else {
    try {
      //save the updated instance to db
      article.likes_count -= 1;
      const updatedArticle = await article.save();
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
    return res.json(response);
  }
});

//get like status of article
router.get("/:articleId/likes", async (req, res, next) => {
  try {
    const like = await Like.findOne({
      where: {
        user_id: parseInt(req.user.id),
        article_id: parseInt(req.params.articleId),
      },
    });
    return res.json({ liked: like ? true : false });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});
//------------------------------------SUBSCRIPTIONS--------------------------------------
//get user article subscriptions
router.get("/current/subscriptions", async (req, res, next) => {
  try {
    const user = await User.findByPk(parseInt(req.user.id));
    if (!user?.id) {
      const authorizationError = new Error("Unauthorized User");
      authorizationError.status = 403;
      throw authorizationError;
    }
    const response = await user.getSubscribedArticle({
      attributes: ["id", "title", "sub_title"],
      joinTableAttributes: [],
    });
    return res.json({ subscribed_articles: response ? response : [] });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

//add article to subscriptions list
router.post("/:articleId/subscribe", async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.user.id));
  if (!user.id) {
    const authorizationError = new Error("Forbidden");
    authorizationError.status = 403;
    return next(authorizationError);
  }
  const article = await Article.findByPk(parseInt(req.params.articleId));
  if (!article) return next(new Error("Article Not Found"));
  if (parseInt(article.author_id) === parseInt(user.id)) {
    const authorizationError = new Error(
      "User cannot subscribe to their own article",
    );
    authorizationError.status = 403;
    return next(authorizationError);
  } else {
    try {
      const response = await user.addSubscribedArticle(article);
      if (!response)
        throw new Error("User has already subscribed to this article");
      return res.json({ bookmark: response[0] });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
  }
});

//remove article from subscriptions list
router.delete("/:articleId/subscribe", async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.user.id));
  if (!user.id) {
    return next(new Error("Forbidden").status(403));
  }
  const article = await Article.findByPk(parseInt(req.params.articleId));
  if (!article) return next(new Error("Article Not Found"));
  else {
    try {
      const response = await user.removeSubscribedArticle(article);
      if (!response) throw new Error("User isn't subscribed to this article");
      return res.json({
        bookmark: {
          user_id: req.user.id,
          article_id: parseInt(req.params.articleId),
          message: "Successfully Unsubscribed",
        },
      });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      return next(e);
    }
  }
});

module.exports = router;
