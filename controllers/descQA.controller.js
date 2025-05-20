const { sendErrorRes } = require("../helpers/send_error_res");
const DescQA = require("../schemas/DescQA");
const descQAValidation = require("../validation/descQA.validation");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = descQAValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const newDescQA = await DescQA.create(value);
    res.status(201).send({ message: "New Desc-QA added", newDescQA });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const descs = await DescQA.find().populate("user_id").populate("desc_id");

    res.status(200).send(descs);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const descQA = await DescQA.findById(id)
      .populate("user_id")
      .populate("desc_id");

    res.status(200).send(descQA);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await DescQA.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Desc-QA updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await DescQA.findByIdAndDelete(id);
    res.status(200).send({ message: "Desc-QA deleted successfully" });
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
