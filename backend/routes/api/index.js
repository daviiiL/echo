const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");

const router = require("express").Router();
router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
module.exports = router;
