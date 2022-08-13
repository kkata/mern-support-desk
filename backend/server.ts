import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
