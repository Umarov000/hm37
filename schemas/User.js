const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String },
    info: { type: String },
    photo: { type: String },
    created_date: { type: String, trim: true, required: true },
    updated_date: { type: String, trim: true, required: true },
    isActive: { type: Boolean },
    refreshToken: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
