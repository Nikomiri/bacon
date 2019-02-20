const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Busboy = require("busboy");
let mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

let gridFs;
mongoose
  .connect("mongodb://localhost:27017/bacon", { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to db.");
    gridFs = Grid(mongoose.connection.db, mongoose.mongo);
  })
  .catch(error => {
    console.log("Oh no! Could not connect to database.");
    console.log(error);
  });

app.post("/upload", (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  const fileId = new mongoose.Types.ObjectId()
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const writeStream = gridFs.createWriteStream({
      _id: fileId,
      filename
    }); 
    
    file.pipe(writeStream);
  }).on('finish', () => {
    res.json(fileId.toString());
  });

  req.pipe(busboy);
});

app.listen(port, () => {
  console.log("Server started on port 8080.");
});
