const router = require("express").Router();
const userRouter = require("./users");
const newsRouter = require("./articles");
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateUserLogin,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/articles", newsRouter);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserBody, createUser);
module.exports = router;
