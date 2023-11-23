const Task = require("../models/task");

const postTasks = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// /tasks?completed=true
const getTasks = async (req, res) => {
  // const userId = req.user._id;

  const match = {};
  const sort = {};
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10,
  };

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({ owner: userId });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: pageOptions.limit,
        skip: pageOptions.page * pageOptions.limit,
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.send("error");
  }
};

const getTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  try {
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(err);
  }
};

const updateTask = async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true });

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    task.description = req.body.description;

    await task.save();

    res.send(task);
  } catch (e) {
    res.send(e);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    // await req.user.deleteOne();
    // await req.user.populate("tasks");
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  postTasks,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
