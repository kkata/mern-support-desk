import express from "express";
import "colors";
import "dotenv/config";
import { userRouter } from "./routes/userRoutes";
import { ticketRouter } from "./routes/ticketRoutes";
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

// Routes Middleware
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
