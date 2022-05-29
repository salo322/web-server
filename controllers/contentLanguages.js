const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Content = mongoose.model("Content");

router.get("/", (req, res) => {
   res.render("content/addOrEdit", {
      viewTitle: "Insert Employee",
   });
});

router.post("/", (req, res) => {
   if (req.body._id == "") insertRecord(req, res);
   else updateRecord(req, res);
});

function insertRecord(req, res) {
   var content = new Content();
   content.key = req.body.key;
   content.en = req.body.en;
   content.ka = req.body.ka;
   content.ru = req.body.ru;
   content.save((err, doc) => {
      if (!err) res.redirect("content/list");
      else {
         if (err.name == "ValidationError") {
            handleValidationError(err, req.body);
            res.render("content/addOrEdit", {
               viewTitle: "Insert Content",
               content: req.body,
            });
         } else console.log("Error during record insertion : " + err);
      }
   });
}

function updateRecord(req, res) {
   Content.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err) {
         res.redirect("content/list");
      } else {
         if (err.name == "ValidationError") {
            handleValidationError(err, req.body);
            res.render("content/addOrEdit", {
               viewTitle: "Update Content ",
               content: req.body,
            });
         } else console.log("Error during record update : " + err);
      }
   });
}

router.get("/list", (req, res) => {
   Content.find((err, docs) => {
      if (!err) {
         res.render("content/list", {
            list: docs,
         });
      } else {
         console.log("Error in retrieving content list :" + err);
      }
   });
});

function handleValidationError(err, body) {
   for (field in err.errors) {
      switch (err.errors[field].path) {
         case "key":
            body["keyError"] = err.errors[field].message;
            break;

         default:
            break;
      }
   }
}

router.get("/:id", (req, res) => {
   Content.findById(req.params.id, (err, doc) => {
      if (!err) {
         res.render("content/addOrEdit", {
            viewTitle: "Update Content",
            content: doc,
         });
      }
   });
});

router.get("/delete/:id", (req, res) => {
   Content.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
         res.redirect("/content/list");
      } else {
         console.log("Error in content delete :" + err);
      }
   });
});

module.exports = router;
