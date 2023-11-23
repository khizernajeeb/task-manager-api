const User = require("../models/user");

const getUsers = async (req, res) => {
  const users = await User.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    // await user.save();
    const token = await user.generateAuthToken();

    res.send({ user });
  } catch (error) {
    res.send(error);
  }
};

const getProfile = async (req, res) => {
  res.send(req.user);
};

const getUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const userFound = await User.findById(_id);
    res.send(userFound);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "password"];
  const allowed = keys.every((key) => allowedUpdates.includes(key));

  if (!allowed) {
    return res.status(404).send("Updates not allowed");
  }

  try {
    // const user = await User.findById(req.params.id);
    req.user.password = req.body.password;
    req.user.age = req.body.age;

    await req.user.save();

    // if (!user) {
    //   return res.status(404).send("User not found");
    // }
    res.send(req.user);
  } catch (error) {
    res.send(error);
  }
};

const deleteMe = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (error) {
    res.send(error);
  }
};

const uploadAvatar = async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
};

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("User not found");
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getProfile,
  getUser,
  updateUser,
  deleteMe,
  uploadAvatar,
  deleteAvatar,
  getAvatar,
};
