const express = require("express");
const multer = require("multer");

const {
  signup,
  login,
  logoutAllDevices,
  logout,
} = require("../controllers/auth-controller");

const {
  createUser,
  getProfile,
  getUsers,
  getUser,
  updateUser,
  deleteMe,
  uploadAvatar,
  deleteAvatar,
  getAvatar,
} = require("../controllers/user-controller");

const {
  postTasks,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/task-controller");

const auth = require("../middlewears/auth");

const router = new express.Router();

// Auth controller
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/logout/all", auth, logoutAllDevices);

// Tasks controller
router.post("/tasks", auth, postTasks);
router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

// User Controller
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post("/users", createUser);
router.get("/users/me", auth, getProfile);
router.get("/users", auth, getUsers);
router.get("/users/:id", auth, getUser);
router.patch("/users/:id", auth, updateUser);
router.delete("/users/me", auth, deleteMe);
router.post(
  "/users/avatar",
  auth,
  upload.single("upload"),
  uploadAvatar,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// use sharp package for resize images
router.delete("/users/avatar", auth, deleteAvatar);
router.get("/users/:id/avatar", auth, getAvatar);

module.exports = router;
