import mongoose from "mongoose";

//TODO: transform to async function
export const connectDatabase = () => {
  console.log(process.env.MONGODB_URI)

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => console.error(err));
};

export const disconnectDatabase = () => {
  mongoose.disconnect();
};
