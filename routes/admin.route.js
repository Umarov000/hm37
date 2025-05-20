
const {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  adminActivate,
} = require("../controllers/admin.controller");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard");
const adminSelfGuard = require("../middlewares/guards/admin-self.guard");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginAdmin);
router.post("/refresh", refreshTokenAdmin);
router.post("/logout", logoutAdmin);
router.get("/", adminJwtGuard, findAll);
router.get("/activate/:link", adminActivate);
router.get("/:id", adminJwtGuard, adminSelfGuard, findOne);
router.patch("/:id", adminJwtGuard, adminSelfGuard, update);
router.delete("/:id",adminJwtGuard,adminSelfGuard,remove);

module.exports = router;
