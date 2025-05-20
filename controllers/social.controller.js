const { sendErrorRes } = require("../helpers/send_error_res");
const Social = require("../schemas/Social");
const socailValidation = require("../validation/socail.validation");

const create = async (req, res) => {
  try {
    const {error, value} = socailValidation(req.body)
    if(error){
      return sendErrorRes(error, res)
    }
    const newSocial = await Social.create(value);
    res.status(201).send({ message: "New Social added", newSocial });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).send(socials);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await Social.findById(id);
    res.status(200).send(social);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Social.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Social updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Social.findByIdAndDelete(id);
    res.status(200).send({ message: "Social deleted successfully" });
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
