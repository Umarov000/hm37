const { sendErrorRes } = require("../helpers/send_error_res");
const AuthorSocial = require("../schemas/AuthorSocial");
const authorSocailValidation = require("../validation/authorSocail.validation");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = authorSocailValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const newAuthorSocial = await AuthorSocial.create(value);
    res
      .status(201)
      .send({ message: "New AuthorSocial added", newAuthorSocial });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const authorSocials = await AuthorSocial.find()
      .populate("author_if")
      .populate("social_id");

    res.status(200).send(authorSocials);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const authorSocial = await AuthorSocial.findById(id)
      .populate("author_if")
      .populate("social_id");

    res.status(200).send(authorSocial);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await AuthorSocial.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "AuthorSocial updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await AuthorSocial.findByIdAndDelete(id);
    res.status(200).send({ message: "AuthorSocial deleted successfully" });
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
