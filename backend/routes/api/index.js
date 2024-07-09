const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth.js");

const router = require("express").Router();
router.use(restoreUser);

module.exports = router;
