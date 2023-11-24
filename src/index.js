require("./db/mongoose");
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const serverless = require("serverless-http");

require("dotenv").config();

const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);

const router = require("./routers/router");

app.use("/.netlify/functions/", router); // path must route to lambda

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports.handler = serverless(app);
