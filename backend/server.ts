import express from "express";
import "dotenv/config";
import router from "./routes/userRoutes";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

// Routes
app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
