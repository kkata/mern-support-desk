import express from "express";
import "colors";
import "dotenv/config";
import router from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

// Routes
app.use("/api/users", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
