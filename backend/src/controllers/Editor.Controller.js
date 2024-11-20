const asyncHandler = require("../utils/AsyncHandler");

const editorInitialize = asyncHandler(async (req, res) => {
  res.send("Editor initialized");
});

module.exports = editorInitialize;
