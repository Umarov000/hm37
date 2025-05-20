const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, required: true },
    phone: { type: String, trim: true, unique: true },
    password: { type: String },
    isCreator: { type: Boolean },
    isActive: { type: Boolean },
    created_date: { type: String, trim: true, required: true },
    updated_date: { type: String, trim: true, required: true },
    refreshToken: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Admin", adminSchema);
