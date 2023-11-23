const express = require("express");
const multer = require("multer");

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
const auth = require("../middlewears/auth");

const router = new express.Router();

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
