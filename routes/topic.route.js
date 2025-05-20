const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/topic.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/", create);
router.get("/", authorJwtGuard,findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;


