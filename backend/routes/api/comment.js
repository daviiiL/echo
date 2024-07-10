const router = require("express").Router();
const { Comment } = require("../../db/models");

router.get("/", async (req, res, next) => {
  return res.json({ message: "ROUTE HIT" });
});

module.exports = router;
