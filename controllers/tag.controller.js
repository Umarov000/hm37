const { sendErrorRes } = require("../helpers/send_error_res");
const Tag = require("../schemas/Tag");
const tagValidation = require("../validation/tag.validation");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = tagValidation(body);
    const newTag = await Tag.create(value);
    res.status(201).send({ message: "New Tag added", newTag });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const tags = await Tag.find().populate("category_id").populate("topic_id");

    res.status(200).send(tags);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id)
      .populate("category_id")
      .populate("topic_id");

    res.status(200).send(tag);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Tag.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Tag updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Tag.findByIdAndDelete(id);
    res.status(200).send({ message: "Tag deleted successfully" });
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
