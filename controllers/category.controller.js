const { sendErrorRes } = require("../helpers/send_error_res");
const Category = require("../schemas/Category");
const categoryValidation = require("../validation/category.validation");

const create = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const newCategory = await Category.create(value);
    res.status(201).send({ message: "New category added", newCategory });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent_category_id");
    console.log(categories);
    res.status(200).send({ categories });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("parent_category_id");
    res.status(200).send(category);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Category.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Category updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Category deleted successfully" });
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
