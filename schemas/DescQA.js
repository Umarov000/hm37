const { Schema, model } = require("mongoose");

const descQASchema = new Schema(
  {
    qa_id: { type: Schema.Types.ObjectId, ref: "QuestionAnswer" },
    desc_id: { type: Schema.Types.ObjectId, ref: "Description" },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);


module.exports = model("DescQA", descQASchema);