const { model, Schema } = require("mongoose");

const questionAnswerSchema = new Schema(
  {
    qustion: { type: String },
    answer: { type: String },
    created_date: { type: String },
    updated_date: { type: String },
    isChecked: { type: Boolean },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    expert_id: { type: Schema.Types.ObjectId, ref: "Author" },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);


module.exports = model("QuestionAnswer", questionAnswerSchema);