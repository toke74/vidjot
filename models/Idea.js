const mongoose = require("mongoose");
const { Schema } = mongoose;

//create Schema
const IdeaSchema = new Schema([
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
]);

module.exports = Idea = mongoose.model("Ideas", IdeaSchema);
