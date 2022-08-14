import mongoosse from "mongoose";

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!uri) {
    throw new Error("No mongo uri provided");
  }
  try {
    const conn = await mongoosse.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
