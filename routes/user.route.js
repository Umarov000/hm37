const {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginUser,
  logoutUser,
  refreshTokenUser,
  userActivate,
} = require("../controllers/user.controller");
const userJwtGuard = require("../middlewares/guards/user-jwt.guard");
const userSelfGuard = require("../middlewares/guards/user-self.guard");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginUser);
router.post("/refresh", refreshTokenUser);
router.post("/logout", logoutUser);
router.get("/", userJwtGuard, findAll);
router.get("/activate/:link", userActivate);
router.get("/:id", userJwtGuard, userSelfGuard, findOne);
router.patch("/:id", userJwtGuard, userSelfGuard, update);
router.delete("/:id", userJwtGuard, userSelfGuard, remove);

module.exports = router;
