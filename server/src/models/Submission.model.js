import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['javascript', 'python', 'cpp'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
        default: 'Pending'
    },
    executionTime: {
        type: Number,
        default: null
    },
    errorMessage: {
        type: String,
        default: null
    },
    memoryUsage: {
        type: Number,
        default: null
    },
},{timestamps: true});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;