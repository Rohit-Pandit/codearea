import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required: true,
        select : false
    },
    solvedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    role : {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;