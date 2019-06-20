const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Post = "../../models/post.js";
// load validation
const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "post works" });
});

// @route  POST api/posts/posts
// @desc   Create Post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(result => res.json(result))
      .catch(err => console.log(err));
  }
);

module.exports = router;
