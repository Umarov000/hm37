const Topic = require("../schemas/Topic");
const topicValidation = require("../validation/topic.validation");

const { sendErrorRes } = require("../helpers/send_error_res");

const create = async (req, res) => {
  try {
    const { error, value } = topicValidation(req.body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const newTopic = await Topic.create(value);
    res.status(201).send({ message: "New Topic added", newTopic });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("author_id")
      .populate("expert_id");

    res.status(200).send(topics);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id)
      .populate("author_id")
      .populate("expert_id");

    res.status(200).send(topic);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Topic.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Topic updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "Topic deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
