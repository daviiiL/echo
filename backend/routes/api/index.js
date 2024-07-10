const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const articleRouter = require("./article.js");
const commentRouter = require("./comment.js");

const router = require("express").Router();

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/articles", articleRouter);
router.use("/comments", commentRouter);

module.exports = router;
