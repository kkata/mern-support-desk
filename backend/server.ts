import path from "path";
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

// Routes Middleware
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.status(200).json({
      message: "Welcome to the Ticketing System",
    });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
