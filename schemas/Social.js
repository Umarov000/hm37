const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
  {
    name: { type: String, required: true },
    icon_file: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Social", socialSchema);
