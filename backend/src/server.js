const express = require("express");
const editorRouter = require("./routes/Editor.Routes");
const ApiResponse = require("./utils/ApiResponse");

const privateRouter = express.Router();
privateRouter.use("/editor", editorRouter);

privateRouter
  .route("/")
  .get((_, res) => {
    res.send(
      new ApiResponse(200, {
        message: "⚙️ Welcome to CodeFlow Homepage! ⚙️",
      })
    );
  })
  .post((_, res) => {
    res.send(
      new ApiResponse(200, {
        message: "⚙️ Welcome to CodeFlow Homepage! ⚙️",
      })
    );
  });
module.exports = privateRouter;
