const router = require("express").Router();
const { Sequelize } = require("sequelize");
const { Comment, Article } = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");
const { handleValidationErrors } = require("../../utils/validation.js");
const { check } = require("express-validator");

//middlewares
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
//functions
const findAndCheckComment = async (req, includeParentPost = false) => {
  try {
    const comment = await Comment.findByPk(
      parseInt(req.user.id),
      //for user comments board, including article info is helpful
      includeParentPost
        ? {
            include: [{ model: Article, attributes: ["title", "id"] }],
          }
        : {},
    );
    if (parseInt(req.user.id) !== parseInt(comment.author_id)) {
      const err = new Error("User is unauthorized to perform this action");
      err.title = "Forbidden";
      err.status = 403;
      throw err;
    }
    return comment;
  } catch (e) {
    //adding title to error if is a db error
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return e;
  }
};
//routes
//
//update a comment by comment id
router.update(
  "/:commentId",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    //check if user is the owner of the comment post
    const comment = await findAndCheckComment(req);
    const { body, reaction } = req.body;
    if (body) comment.body = body;
    if (reaction) comment.reaction = reaction;
    try {
      //attempt to save the updated instance to db
      await comment.save();
      return res.json(comment);
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      next(e);
    }
  },
);

module.exports = router;
