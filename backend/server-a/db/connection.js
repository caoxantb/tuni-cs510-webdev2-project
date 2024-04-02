import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => console.error(err));
};

export const disconnectDatabase = () => {
  mongoose.disconnect();
};