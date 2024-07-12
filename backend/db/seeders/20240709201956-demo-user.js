"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(_queryInterface, _Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          first_name: "Demo",
          last_name: "Drake",
          bio: "A test user named Demo Drake",
          stars: 0,
          status: "Testing the frontend",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "demo1@user.io",
          username: "TestingDragon",
          first_name: "Vlad",
          last_name: "Dragon",
          bio: "A test dragon named Vlad Dragon",
          stars: 0,
          status: "Testing the backend",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "demo2@user.io",
          username: "SurfingCheetos",
          first_name: "Awesome",
          last_name: "Cheetos",
          bio: "A test cheetos dwelves in the dark web",
          stars: 0,
          status: "Surfing in the bits",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "spiderman@user.io",
          username: "Spidey",
          first_name: "Spidy",
          last_name: "Man",
          bio: "A test bug named Spidy Man",
          stars: 0,
          status: "Testing the frontend",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      // { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Sequelize.Op.in]: ["Demo-lition", "TestingDragon", "SurfingCheetos"],
        },
      },
      options,
    );
  },
};
