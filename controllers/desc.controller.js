const { sendErrorRes } = require("../helpers/send_error_res");
const Desc = require("../schemas/Desc");
const descValidation = require("../validation/desc.validation");

const create = async (req, res) => {
  try {
    const { error, value} = descValidation(req.body)
    if(error){
      return sendErrorRes(error, res)
    }
    const newDesc = await Desc.create(value);
    res.status(201).send({ message: "New description added", newDesc });
  } catch (error) {
    sendErrorRes(error, res);
  }
};


const findAll = async (req, res) => {
  try {
    const descs = await Desc.find().populate("category_id");
    res.status(200).send(descs);
  } catch (error) {
    sendErrorRes(error, res);
  }
};



const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const desc = await Desc.findById(id).populate("category_id");
    res.status(200).send(desc);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Desc.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Desc updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Desc.findByIdAndDelete(id);
    res.status(200).send({ message: "Desc deleted successfully" });
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
