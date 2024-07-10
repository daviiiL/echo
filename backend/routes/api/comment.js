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
      parseInt(req.params.commentId),
      //for user comments board, including article info is helpful
      includeParentPost
        ? {
            include: [{ model: Article, attributes: ["title", "id"] }],
          }
        : {},
    );
    if (parseInt(req.user.id) !== parseInt(comment.commenter_id)) {
      const err = new Error("User is unauthorized to perform this action");
      err.title = "Forbidden";
      err.message = "User is unauthorized to perform this action";
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
//TODO: add child comment post route
//update a comment by comment id
router.patch(
  "/:commentId",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    //check if user is the owner of the comment post
    const comment = await findAndCheckComment(req);
    //if an error obj is returned, pass it to error handler
    if (comment instanceof Error) next(comment);
    const { body, reaction } = req.body;
    if (body) comment.body = body;
    if (reaction) comment.reaction = reaction;
    try {
      //attempt to save the updated instance to db
      const edited = await comment.save();
      return res.json({ comment: edited });
    } catch (e) {
      if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
      next(e);
    }
  },
);

//delete a comment by id
//erase info and preserve comment node
router.delete("/:commentId", requireAuth, async (req, res, next) => {
  const comment = await findAndCheckComment(req);
  if (comment instanceof Error) next(comment);

  try {
    //rather than deleting the data entry, erase all info and preserve the data node
    comment.commenter_id = null;
    comment.body = "This comment has been deleted.";
    comment.upvote = 0;
    comment.downvote = 0;
    await comment.save();
    return res.json({
      message:
        "Deletion successful. Your information, including identifier and the comment text body, on this comment is erased",
    });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    next(e);
  }
});

//get all comments made by the user
//TODO: fix why article info is not showing up
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const sessionUserComments = await Comment.findAll(
      {
        where: {
          commenter_id: req.user.id,
        },
      },
      {
        include: [
          {
            model: Article,
            attributes: ["id", "title"],
          },
        ],
      },
    );
    return res.json({ comments: sessionUserComments });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) e.title = "Database Error";
    return next(e);
  }
});

module.exports = router;
