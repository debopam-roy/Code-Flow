const cors = require("cors");
const express = require("express");
const privateRouter = require("./server");
const setupSocketServer = require("./socket/socketServer");
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

function createDocumentIfNotExists(docId, callback) {
  const connection = shareDBBackend.connect();
  const doc = connection.get("documents", docId);

  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ content: "" }, callback);
    } else {
      callback();
    }
  });
}

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", privateRouter);
const server = setupSocketServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`CodeFlow server is listening on port: ${PORT}`);
});
