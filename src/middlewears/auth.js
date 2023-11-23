const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("auth");
    const token = req.header("Authorization").replace("Bearer ", "");

    // const tok = req.header("Authorization");

    const decoded = jwt.verify(token, process.env.JSON_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // console.log("token", user);

    if (!user) {
      throw new Error();
    }

    // console.log("requ", user);

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = auth;
