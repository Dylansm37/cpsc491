import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // DB name goes just before ?
        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log("mongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to mongodb", error);
        process.exit(1); //exit with failure
    }
};