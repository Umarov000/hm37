const DescTopic = require("../schemas/DescTopic");

const { sendErrorRes } = require("../helpers/send_error_res");
const descTopicValidation = require("../validation/descTopic.validation");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = descTopicValidation(body);
    const newDescTopic = await DescTopic.create(value);
    res.status(201).send({ message: "New Description-Topic added", newDescTopic });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const descTopics = await DescTopic.find().populate("desc_id").populate("topic_id");
      
    res.status(200).send(descTopics);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const descTopic = await DescTopic.findById(id)
      .populate("desc_id")
      .populate("topic_id");

    res.status(200).send(descTopic);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await DescTopic.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Description-Topic updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await DescTopic.findByIdAndDelete(id);
    res.status(200).send({ message: "Description-Topic deleted successfully" });
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
