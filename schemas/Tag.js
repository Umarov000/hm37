const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Tag", tagSchema);
