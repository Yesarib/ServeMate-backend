import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGO_URL || "";

mongoose.connect(mongoDbUrl, {
    dbName:"servemate_product"
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log('Error when trying to connected MongoDB', err.message))