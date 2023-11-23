const User = require("../models/user");
const { sendWelcomeEmail } = require("../utils/emailService");

const signup = async (req, res) => {
  try {
    let user1 = await User.findOne({ email: req.body.email });
    if (user1) return res.status(400).send("User already registered.");

    const user = new User(req.body);

    await user.save();
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user);

    res.send({ token, user });
  } catch (error) {
    res.send(error || "Error");
  }
};

const login = async (req, res) => {
  try {
    console.log("user");

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    console.log(user);

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.send(error);
  }
};

const logout = async (req, res) => {
  req.user.tokens = req.user.tokens.filter(
    (token) => token.token !== req.token
  );

  await req.user.save();

  res.status(200).send();
};

const logoutAllDevices = async (req, res) => {
  req.user.tokens = [];

  await req.user.save();

  res.status(200).send();
};

module.exports = {
  signup,
  login,
  logout,
  logoutAllDevices,
};
