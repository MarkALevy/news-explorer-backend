const router = require("express").Router();
const userRouter = require("./users");
const newsRouter = require("./articles");
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateUserLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/users", userRouter);
router.use("/articles", newsRouter);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
