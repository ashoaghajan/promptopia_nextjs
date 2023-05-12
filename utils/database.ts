import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MondoDB is already connected");
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: "share_prompt",
      });
      isConnected = true;
      console.log("MondoDB connected");
    } catch (err) {
      console.log(err);
    }
  }
};
