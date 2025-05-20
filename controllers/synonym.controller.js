const { sendErrorRes } = require("../helpers/send_error_res");
const Synonym = require("../schemas/Synonym");
const synonymValidation = require("../validation/synonym.validation");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = synonymValidation(body);
    const newSynonym = await Synonym.create(value);
    res.status(201).send({ message: "New Synonym added", newSynonym });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const synonyms = await Synonym.find()
      .populate("desc_id")
      .populate("dict_id");
    res.status(200).send(synonyms);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const synonym = await Synonym.findById(id)
      .populate("desc_id")
      .populate("dict_id");
    res.status(200).send(synonym);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Synonym.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Synonym updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Synonym.findByIdAndDelete(id);
    res.status(200).send({ message: "Synonym deleted successfully" });
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
