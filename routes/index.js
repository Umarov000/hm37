const router = require("express").Router()
const dictRoute = require("./dict.route")
const authorRoute = require("./author.route");
const descRoute = require("./desc.route");
const categoryRoute = require("./category.routes");
const descTopicRoute = require("./descTopic.route");
const socailRoute = require("./social.route");
const synonymRoute = require("./synonym.route");
const tagRoute = require("./tag.route");
const topicRoute = require("./topic.route");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const authorSocialRoute = require("./authorSocial.route");
const questinAnswerRoute = require("./questionAnswer.route");
const descQARoute = require("./descQA.route");





router.use("/dict", dictRoute);
router.use("/author", authorRoute);
router.use("/category", categoryRoute);
router.use("/desc", descRoute);
router.use("/desc-topic", descTopicRoute);
router.use("/socail", socailRoute);
router.use("/synonym", synonymRoute);
router.use("/tag", tagRoute);
router.use("/topic", topicRoute);
router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/author-social", authorSocialRoute);
router.use("/question-answer", questinAnswerRoute);
router.use("/desc-qa", descQARoute);







module.exports = router