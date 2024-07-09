const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
//SIGNUP USER
router.post("/", async (req, res) => {
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
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
