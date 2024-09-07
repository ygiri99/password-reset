import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`db is connected`);

    } catch (error) {
        console.log(`Error while connecting db: ${error}`);
    }
}

export default db;