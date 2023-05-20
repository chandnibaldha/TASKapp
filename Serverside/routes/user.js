const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/add-task", async (req, res) => {
  try {
    const { firstName, taskName } = req.body;
    const user = new User({
      firstName,
      taskName,
    });
    const newuser = await user.save();
    res.json(newuser);
    // console.log(newuser);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/delete-task/:_id", async (req, res) => {
  try {
    let user = await User.findById(req.params._id);
    if (!user) {
      return res.status(201).send("Not Found");
    }
    user = await User.findByIdAndDelete(req.params._id);
    res.json({ success: "user Delete", user: user });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/update-task/:_id", async (req, res) => {
  const { firstName, taskName } = req.body;
  try {
    const newuser = {};
    if (firstName) {
      newuser.firstName = firstName;
    }
    if (taskName) {
      newuser.taskName = taskName;
    }
    let user = await User.findById(req.params._id);
    if (!user) {
      return res.status(400).send("Not Found");
    }
    user = await User.findByIdAndUpdate(
      req.params._id,
      { $set: newuser },
      { success: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/fetch-task", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
