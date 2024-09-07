import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        min: [1000000000, "Must be 10 digits"],
        max: [9999999999, '10 digit number only'],//{ value: 9999999999, message: '10 digit number only' },->sends own message
        trim: true
    },
    role: {
        type: Number,
        default: 2,
        enum: [1, 2]
    },
    address: {
        type: String,
        trim: true
    }
})

export default mongoose.model("user", userSchema)

//1 -> admin
//2 -> normalUser