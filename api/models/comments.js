const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true, minLength: 1, maxLength: 5000 },
    date: { type: Date, default: Date.now },
    author: { type: String, required: true, minLength: 1, maxLength: 50 },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { toJSON: { virtuals: true } }
);

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

CommentSchema.virtual("date_formatted").get(function () {
  return this.date
    ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
