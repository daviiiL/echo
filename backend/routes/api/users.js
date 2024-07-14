const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// const { findAndCheckComment } = require("./utils.js");
//middlewares
const validateSignUp = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage("Please provide a password with 8 characters or longer"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters"),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  handleValidationErrors,
];
//SIGNUP USER
router.post("/", validateSignUp, async (req, res) => {
  const { email, password, username, first_name, last_name } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    first_name,
    last_name,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio,
    avatar: user.avatar,
    stars: user.stars,
    status: user.status,
    last_active: user.last_active,
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

//Delete user by user id
router.delete("/delete", requireAuth, async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const user = await User.findByPk(parseInt(userId));
  // return res.json(user);
  if (user) {
    User.destroy({
      where: { id: userId },
    })
      .then(() => res.json({ message: "Deletion Successful" }))
      .catch((e) => {
        const err = new Error(e.message);
        err.status = 500;
        err.title = "Deletion Failed";
        next(e);
      });
  }
});

//Get all comments made by the user
module.exports = router;
