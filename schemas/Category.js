const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, trim: true },
    parent_category_id: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Category", categorySchema);
