const { sendErrorRes } = require("../helpers/send_error_res");
const Dict = require("../schemas/Dict");
const { dictValidation } = require("../validation/dict.validation");

const create = async (req, res) => {
  try {
    
    const {error, value} = dictValidation(req.body)
    if(error){
      return sendErrorRes(error, res)
    }
    const newDict = await Dict.create({...value, letter: value[0]} );
    res.status(201).send({ message: "New Term added", newDict });
  } catch (error) {
    sendErrorRes(error, res);
  }
};


const findAll = async (req, res) => {
  try {
    const dicts = await Dict.find();
    res.status(200).send(dicts);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const dict = await Dict.findById(id );
    res.status(200).send(dict);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Dict.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Term updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Dict.findByIdAndDelete(id);
    res.status(200).send({ message: "Term deleted successfully" });
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
