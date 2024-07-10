const { Comment, Article } = require("../../db/models");

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

module.exports = { findAndCheckComment };
