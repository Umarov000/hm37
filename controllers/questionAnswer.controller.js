const { sendErrorRes } = require("../helpers/send_error_res");
const QuestionAnswer = require("../schemas/QuestionAnswer");
const {
  questionAnswerValidation,
} = require("../validation/questionAnswer.validation");

const create = async (req, res) => {
  try {
    const { error, value } = questionAnswerValidation(req.body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const newQuestionAnswer = await QuestionAnswer.create({ value });
    res
      .status(201)
      .send({ message: "New Question-Answer added", newQuestionAnswer });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const questionAnswers = await QuestionAnswer.find()
      .populate("user_id")
      .populate("expert_id");
    res.status(200).send(questionAnswers);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const questionAnswer = await QuestionAnswer.findById(id)
      .populate("user_id")
      .populate("expert_id");
    res.status(200).send(questionAnswer);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await QuestionAnswer.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Question-Answer updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await QuestionAnswer.findByIdAndDelete(id);
    res.status(200).send({ message: "Question-Answer deleted successfully" });
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
