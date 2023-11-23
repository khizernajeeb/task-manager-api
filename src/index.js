require("./db/mongoose");
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
