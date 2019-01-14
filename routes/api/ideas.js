const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");

// Load Idaes model
const Idea = require("../../models/Idea");
// Load User model
const User = require("../../models/User");

// Load Input Validation
const validateIdeasInput = require("../../validation/idea");

// @route   GET api/ideas
// @desc    Get ideas
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Idea.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(ideas => {
        if (!ideas) {
          errors.noIdeas = "There is no Idea for this user";
          return res.status(404).json(errors);
        } else {
          res.json({ ideas });
        }
      })
      .catch(err => res.status(404).json({ noIdeas: "No ideas found" }));
  }
);

// @route   POST api/ideas
// @desc    Create  user idea
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateIdeasInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const ideaFields = {};
    ideaFields.user = req.user.id;
    if (req.body.title) ideaFields.title = req.body.title;
    if (req.body.details) ideaFields.details = req.body.details;

    // Save idea
    new Idea(ideaFields)
      .save()
      .then(idea => res.json(idea))
      .catch(err => console.log(err));
  }
);

// @route   PUT api/ideas
// @desc     edit idea
// @access  Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newIdea = {};
    if (req.body.title) newIdea.title = req.body.title;
    if (req.body.details) newIdea.details = req.body.details;

    Idea.find({ user: req.user.id }).then(ideas => {
      if (ideas) {
        Idea.findOneAndUpdate(
          { _id: req.params.id },
          { $set: newIdea },
          { new: true }
        )
          .then(idea => res.json(idea))
          .catch(err => res.status(404).json(err));
      }
    });
  }
);

// @route   DELETE api/ideas
// @desc    Delete idea from ideas
// @access  Private
// router.delete(

//@route   DELETE api/ideas
// @desc    Delete idea from ideas
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Idea.findOneAndDelete({ _id: req.params.id }).then(ideas => {
      res.json(ideas);
    });
  }
);

module.exports = router;
