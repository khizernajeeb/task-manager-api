const express = require("express");
const Task = require("../models/task");

const {
  postTasks,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/task-controller");
const auth = require("../middlewears/auth");

const router = new express.Router();

router.post("/tasks", auth, postTasks);
router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;
