"use strict";

const { Comment, User, Article } = require("../models");

// const comments = [
//   {
//     from: "Demo-lition",
//     to: "What is Lorem Ipsum",
//     reply: false,
//     payload: { body: "This is a test comment that starts a comment thread" },
//   },
//
//   {
//     from: "Spidey",
//     to: "What is Lorem Ipsum",
//     reply: true,
//     payload: {
//       body: "Thank you for testing out the threaded comment feature! I am replying to your comment, Demo.",
//     },
//   },
//   {
//     from: "Spidey",
//     to: "Taking care of your PC",
//     reply: false,
//     payload: {
//       body: "Great info! No wonder why my laptop is running so hot all the time. Time to clear out some of that dust buildup!",
//     },
//   },
//   {
//     from: "Spidey",
//     to: "Using Postman To Test Your APIs",
//     reply: false,
//     payload: {
//       body: "Marked! Definitly gonna learn my way around Postman",
//     },
//   },
// ];

const comments = [
  {
    from: "Demo-lition",
    to: "What is Lorem Ipsum",
    reply: false,
    payload: { body: "This is a test comment that starts a comment thread" },
  },
  {
    from: "Spidey",
    to: "What is Lorem Ipsum",
    reply: true,
    payload: {
      body: "Thank you for testing out the threaded comment feature! I am replying to your comment, Demo.",
    },
  },
  {
    from: "SurfingCheetos",
    to: "What is Lorem Ipsum",
    reply: false,
    payload: { body: "Lorem Ipsum has always been my go-to placeholder text!" },
  },
  {
    from: "Spidey",
    to: "Taking care of your PC",
    reply: false,
    payload: {
      body: "Great info! No wonder why my laptop is running so hot all the time. Time to clear out some of that dust buildup!",
    },
  },
  {
    from: "TestingDragon",
    to: "Taking care of your PC",
    reply: false,
    payload: {
      body: "Regular cleaning is key! Can’t let the dust bunnies win.",
    },
  },
  {
    from: "Demo-lition",
    to: "Taking care of your PC",
    reply: true,
    payload: {
      body: "I’ve found that cable management also helps with airflow. Keep it tidy!",
    },
  },
  {
    from: "Spidey",
    to: "Spider-man's journal: these damn spidey senses",
    reply: false,
    payload: {
      body: "Totally relatable, balancing school and superhero duties is no joke.",
    },
  },
  {
    from: "SurfingCheetos",
    to: "Spider-man's journal: these damn spidey senses",
    reply: false,
    payload: {
      body: "I can’t imagine dealing with sensory overload on top of everything else.",
    },
  },
  {
    from: "TestingDragon",
    to: "Spider-man's journal: these damn spidey senses",
    reply: true,
    payload: { body: "Maybe meditation or focusing techniques could help?" },
  },
  {
    from: "Demo-lition",
    to: "Using Postman to Test Your APIs",
    reply: true,
    payload: {
      body: "Great tool! Definitely a must for any developer working with APIs.",
    },
  },
  {
    from: "Spidey",
    to: "Using Postman to Test Your APIs",
    reply: false,
    payload: { body: "Marked! Definitely gonna learn my way around Postman." },
  },
  {
    from: "TestingDragon",
    to: "Using Postman to Test Your APIs",
    reply: false,
    payload: {
      body: "I love how Postman simplifies API testing, especially for complex projects.",
    },
  },
  {
    from: "Demo-lition",
    to: "Functional vs Class React Components",
    reply: false,
    payload: {
      body: "Function components with hooks have really streamlined my development process!",
    },
  },
  {
    from: "TestingDragon",
    to: "Functional vs Class React Components",
    reply: false,
    payload: {
      body: "Class components are great, but hooks have made functional components my go-to.",
    },
  },
  {
    from: "SurfingCheetos",
    to: "Functional vs Class React Components",
    reply: true,
    payload: {
      body: "I love the simplicity of functional components. Less boilerplate, more productivity!",
    },
  },
  {
    from: "SurfingCheetos",
    to: "How to surf as a Cheetos",
    reply: false,
    payload: {
      body: "This guide is exactly what I needed for my next beach day, thanks!",
    },
  },
  {
    from: "Spidey",
    to: "How to surf as a Cheetos",
    reply: true,
    payload: { body: "Haha, this is hilarious! Surf safe, little Cheetos." },
  },
  {
    from: "TestingDragon",
    to: "How to surf as a Cheetos",
    reply: false,
    payload: {
      body: "Interesting read! Now I’m craving Cheetos and a day at the beach.",
    },
  },
  {
    from: "SurfingCheetos",
    to: "How to be a Cheetos",
    reply: true,
    payload: {
      body: "As a fellow introvert, this article really speaks to me.",
    },
  },
  {
    from: "Spidey",
    to: "How to be a Cheetos",
    reply: false,
    payload: {
      body: "Introvert or not, everyone can relate to needing some quiet time.",
    },
  },
  {
    from: "TestingDragon",
    to: "How to be a Cheetos",
    reply: false,
    payload: {
      body: "Great tips! Setting boundaries is so important for maintaining energy levels.",
    },
  },
  {
    from: "Spidey",
    to: "The Art of Hoarding",
    reply: false,
    payload: {
      body: "I can see how collecting NFTs could be a dragon’s new favorite pastime.",
    },
  },
  {
    from: "TestingDragon",
    to: "The Art of Hoarding",
    reply: false,
    payload: {
      body: "This really resonates with me. Hoarding treasures, both digital and physical, is an art.",
    },
  },
  {
    from: "Demo-lition",
    to: "The Art of Hoarding",
    reply: true,
    payload: {
      body: "NFTs are definitely the modern-day treasure. Just don’t get too carried away!",
    },
  },
  {
    from: "TestingDragon",
    to: "Dragon Rights in danger",
    reply: false,
    payload: {
      body: "It’s about time someone addressed the misconceptions about dragons in pop culture.",
    },
  },
  {
    from: "SurfingCheetos",
    to: "Dragon Rights in danger",
    reply: false,
    payload: {
      body: "Dragons are majestic creatures, not just monsters to be hunted!",
    },
  },
  {
    from: "Spidey",
    to: "Dragon Rights in danger",
    reply: true,
    payload: {
      body: "Respect for all creatures, dragons included, is important.",
    },
  },
  {
    from: "Demo-lition",
    to: "Pros and Cons of Vite.js",
    reply: false,
    payload: {
      body: "Vite.js has really changed the game for frontend development!",
    },
  },
  {
    from: "Spidey",
    to: "Pros and Cons of Vite.js",
    reply: false,
    payload: { body: "The speed improvements alone make Vite worth it." },
  },
  {
    from: "TestingDragon",
    to: "Pros and Cons of Vite.js",
    reply: true,
    payload: {
      body: "Can’t wait to see how Vite.js evolves. It’s already so powerful.",
    },
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let parent_id;
    for (let comment of comments) {
      const user = await User.findOne({ where: { username: comment.from } });
      const article = await Article.findOne({ where: { title: comment.to } });
      if (!comment.reply) {
        await Comment.create({
          ...comment.payload,
          parent_article: article.id,
          commenter_id: user.id,
          parent_comment: null,
        }).then((res) => (parent_id = res.id));
      } else {
        await Comment.create({
          ...comment.payload,
          parent_comment: parent_id,
          parent_article: article.id,
          commenter_id: user.id,
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let comment of comments) {
      const user = await User.findOne({ where: { username: comment.from } });
      const article = await Article.findOne({ where: { title: comment.to } });
      if (!comment.reply) {
        await Comment.destroy({
          where: {
            ...comment.payload,
            parent_article: article.id,
            commenter_id: user.id,
            parent_comment: null,
          },
        });
      } else {
        await Comment.destroy({
          where: {
            ...comment.payload,
            parent_article: article.id,
            commenter_id: user.id,
          },
        });
      }
    }
  },
};
