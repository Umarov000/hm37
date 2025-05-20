const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    author_id: { type: Schema.Types.ObjectId, ref: "Author" },
    title: { type: String, trim: true, required: true },
    text: { type: String, trim: true, required: true },
    created_date: { type: String, trim: true, required: true },
    updated_date: { type: String, trim: true, required: true },
    isChecked: { type: Boolean },
    isApproved: { type: Boolean },
    expert_id: { type: Schema.Types.ObjectId, ref: "Author" },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Topic", topicSchema);
