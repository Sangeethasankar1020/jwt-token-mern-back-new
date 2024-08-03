const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoal = async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json(goals);
};

const setGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
};

const updateGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ message: "Goal not found" });
    return;
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (goal.user.toString() !== user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.status(200).json(updatedGoal);
};

const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ message: "Goal not found" });
    return;
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (goal.user.toString() !== user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Goal deleted" });
};

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
