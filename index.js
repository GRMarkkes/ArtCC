const express = require("express");
const multer = require("multer");

require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
// DigitalOcean Spaces Client
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT,
  forcePathStyle: false,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
const storage = multer.memoryStorage(); // Use memory storage to handle the file as a buffer
const upload = multer({ storage: storage });
// Multer configuration

app.post("/upload", upload.single("image"), async (req, res) => {
  const params = {
    Bucket: "artclubcard",
    Key: Date.now().toString() + "_" + req.file.originalname,
    Body: req.file.buffer,
    ACL: "public-read",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    res.status(200).send({
      message:
        "Successfully uploaded object: " + params.Bucket + "/" + params.Key,
      url: "Test",
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({
      error: "Failed to upload to DigitalOcean Spaces",
    });
  }
});
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
