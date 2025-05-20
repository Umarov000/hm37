const {Schema, model} = require("mongoose")


const descSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    desc: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);


module.exports = model("Description", descSchema);