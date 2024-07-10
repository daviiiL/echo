const { handleValidationErrors } = require("../../utils/validation.js");
const { check } = require("express-validator");

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

module.exports = { validateComment };
