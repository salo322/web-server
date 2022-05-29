const mongoose = require("mongoose");

var contentSchema = new mongoose.Schema({
   key: {
      type: String,
      required: "This field is required.",
   },
   en: {
      type: String,
   },
   ka: {
      type: String,
   },
   ru: {
      type: String,
   },
});

mongoose.model("Content", contentSchema);
