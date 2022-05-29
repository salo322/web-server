const mongoose = require("mongoose");

mongoose.connect(
   "mongodb+srv://salome777:Mongo73738@cluster0.r7sa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
   { useNewUrlParser: true },
   (err) => {
      if (!err) {
         console.log("MongoDB Connection Succeeded.");
      } else {
         console.log("Error in DB connection : " + err);
      }
   }
);

require("./employee.model");
require("./content.model");
