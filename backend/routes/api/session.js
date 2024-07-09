// backend/routes/api/session.js
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation.js");
const router = express.Router();

//middlewares
const validateSignIn = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  handleValidationErrors,
];

//LOGIN USER
router.post("/", validateSignIn, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.unscoped().findOne({
    [Op.or]: {
      username: credential,
      email: credential,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed.");
    err.status = 401;
    err.title = "Login failed";
    err.errors = {
      credential: "The provided credentials were invalid",
    };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

//LOGOUT USER
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

//RESTORE USER SESSION
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

module.exports = router;
