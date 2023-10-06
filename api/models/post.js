const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 1000 },
  content: { type: String, required: true, minLength: 1, maxLength: 10000 },
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publish: { type: Boolean, required: true },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

PostSchema.pre("validate", function (next) {
  this.author === undefined
    ? (this.author = "651ededd5066a3e87ebdb2e9")
    : undefined;
  next();
});

PostSchema.virtual("date_formatted").get(function () {
  return this.date
    ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
