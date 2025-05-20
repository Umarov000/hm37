const { Schema, model } = require("mongoose");

const authorSocialSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: "Author" },
  social_id: { type: Schema.Types.ObjectId, ref: "Social" },
  social_link: {type:String}
},
{
    timestamps:false,
    versionKey:false
});


module.exports = model("AuthorSocail", authorSocialSchema);