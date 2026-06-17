import mongoose from "mongoose";


const testcaseSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    }
    

},{timestamps: true});

const Testcase = mongoose.model("Testcase", testcaseSchema);