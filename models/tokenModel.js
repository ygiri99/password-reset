import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 100
    }
})

export default mongoose.model("Tokens", tokenSchema);