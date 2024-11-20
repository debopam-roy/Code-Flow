const express = require("express");
const editorInitialize = require("../controllers/Editor.Controller");

const editorRouter = express.Router();

editorRouter.get("/", (req, res) => {
  editorInitialize(req, res);
});

module.exports = editorRouter;
