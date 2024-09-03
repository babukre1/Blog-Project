import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("database already connected");
  }

  try {
    mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "BlogProjectDB",
    });
    console.log("connected succesfully to the database");
    
  } catch (error) {
    console.error(error);
  }
};
